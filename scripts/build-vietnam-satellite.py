"""Generates src/assets/vietnam-satellite.jpg for the Vietnamese agarwood card.

Same source and look as the region map: NASA Blue Marble (public domain,
equirectangular 4096x2048, from the npm package `three-globe`), reprojected to
the Mercator frame of scripts/build-vietnam.mjs, then graded like
scripts/grade-satellite.py (navy seas, natural land) using the Natural Earth
land shapes in src/content/vietnam-map.ts as the coast mask.

Run:
  node scripts/build-vietnam.mjs            # prints S and T below if they change
  node --experimental-strip-types -e 'import("./src/content/vietnam-map.ts").then(m=>require("fs").writeFileSync("vn-paths.json", JSON.stringify(m.vnLand)))'
  python3 scripts/build-vietnam-satellite.py earth-blue-marble.jpg vn-paths.json
"""
import json
import math
import re
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

S, TX, TY = 2752.6335989416943, -4782.2767802863455, 1213.920675256124
W, H, K = 600, 860, 2  # viewBox size, output scale

src = Image.open(sys.argv[1]).convert("RGB")
SW, SH = src.size
OW, OH = W * K, H * K

# lon/lat for every output pixel (inverse Mercator)
xs = (np.arange(OW) + 0.5) / K
ys = (np.arange(OH) + 0.5) / K
lon = np.degrees((xs - TX) / S)
lat = np.degrees(2 * np.arctan(np.exp((TY - ys) / S)) - math.pi / 2)
sx = (lon + 180) / 360 * SW
sy = (90 - lat) / 180 * SH

# Upscale the needed crop with Lanczos first, then sample bilinearly.
pad, up = 4, 8
x0, x1 = int(sx.min()) - pad, int(math.ceil(sx.max())) + pad
y0, y1 = int(sy.min()) - pad, int(math.ceil(sy.max())) + pad
crop = src.crop((x0, y0, x1, y1))
a = np.asarray(crop.resize((crop.width * up, crop.height * up), Image.LANCZOS)).astype(np.float32)
fx = (sx - x0) * up
fy = (sy - y0) * up
xi = np.clip(fx.astype(int), 0, a.shape[1] - 2)
yi = np.clip(fy.astype(int), 0, a.shape[0] - 2)
wx = (fx - xi)[None, :, None]
wy = (fy - yi)[:, None, None]
img = (a[yi][:, xi] * (1 - wx) + a[yi][:, xi + 1] * wx) * (1 - wy) + (
    a[yi + 1][:, xi] * (1 - wx) + a[yi + 1][:, xi + 1] * wx
) * wy
img = img / 255

# Land mask from the Natural Earth shapes.
paths = json.load(open(sys.argv[2]))
SS = 2
mask = Image.new("L", (OW * SS, OH * SS), 0)
draw = ImageDraw.Draw(mask)
for d in paths:
    for sub in re.findall(r"M[^M]*", d):
        pts = [(float(x) * K * SS, float(y) * K * SS) for x, y in re.findall(r"(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)", sub)]
        if len(pts) >= 3:
            draw.polygon(pts, fill=255)
mask = mask.resize((OW, OH), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.2))
land = np.asarray(mask).astype(np.float32)[..., None] / 255

# Grade as in grade-satellite.py.
lum = img @ np.array([0.2, 0.3, 0.5], dtype=np.float32)
depth = np.clip((lum - 0.1) / 0.36, 0, 1) ** 1.1
deep = np.array([0.04, 0.09, 0.2], dtype=np.float32)
mid = np.array([0.07, 0.2, 0.36], dtype=np.float32)
shelf = np.array([0.16, 0.4, 0.5], dtype=np.float32)
t = depth[..., None]
ocean = np.where(t < 0.5, deep + (mid - deep) * (t / 0.5), mid + (shelf - mid) * ((t - 0.5) / 0.5))
ocean = ocean * (0.85 + 0.3 * lum[..., None])
g = img.mean(axis=2, keepdims=True)
landc = np.clip((g + (img - g) * 0.95 - 0.45) * 1.12 + 0.47, 0, 1)
out = ocean * (1 - land) + landc * land

# Fine grain so the enlargement reads as photographic texture, not blur.
rng = np.random.default_rng(7)
out = out + rng.normal(0, 0.012, out.shape[:2])[..., None] * (0.4 + 0.6 * land)

res = Image.fromarray(np.clip(out * 255, 0, 255).astype(np.uint8))
res = res.filter(ImageFilter.UnsharpMask(radius=2, percent=70, threshold=1))
res = ImageEnhance.Contrast(res).enhance(1.05)
res.save("src/assets/vietnam-satellite.jpg", quality=86, optimize=True, progressive=True)
print(res.size)
