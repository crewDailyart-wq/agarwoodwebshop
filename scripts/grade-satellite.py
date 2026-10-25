"""Colour-grades the reprojected Blue Marble crop toward the look of Google Earth.

Blue Marble paints the sea bright royal blue with strong shelf relief, which
reads as artificial. Here the oceans become deep navy (shallow shelves only a
little lighter), and the land gets slightly more contrast and less saturation.
Land and sea are separated with the Natural Earth country outlines already in
src/content/asia-map.ts, so the coast is exact.

Run after build-satellite.py:
  node --experimental-strip-types -e 'import("./src/content/asia-map.ts").then(m=>require("fs").writeFileSync("paths.json", JSON.stringify([...m.landPaths, ...m.regionPaths.map(r=>r.d)])))'
  python3 scripts/grade-satellite.py raw.jpg paths.json src/assets/asia-satellite.jpg
"""
import json
import re
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

K, EXT = 1.6, 200  # must match build-satellite.py

raw = Image.open(sys.argv[1]).convert("RGB")
W, H = raw.size
paths = json.load(open(sys.argv[2]))

# Rasterise land at 2x, then downsample for a soft, anti-aliased coast.
SS = 2
mask = Image.new("L", (W * SS, H * SS), 0)
draw = ImageDraw.Draw(mask)
for d in paths:
    for sub in re.findall(r"M[^M]*", d):
        pts = [(float(x) * K * SS, (float(y) + EXT) * K * SS) for x, y in re.findall(r"(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)", sub)]
        if len(pts) >= 3:
            draw.polygon(pts, fill=255)
mask = mask.resize((W, H), Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.8))
land = np.asarray(mask).astype(np.float32)[..., None] / 255

a = np.asarray(raw).astype(np.float32) / 255

# --- Ocean: depth from Blue Marble's own shading, mapped to navy tones.
lum = a @ np.array([0.2, 0.3, 0.5], dtype=np.float32)
depth = np.clip((lum - 0.1) / 0.36, 0, 1) ** 1.1  # 0 = deep, 1 = shallow shelf
deep = np.array([0.04, 0.09, 0.2], dtype=np.float32)
mid = np.array([0.07, 0.2, 0.36], dtype=np.float32)
shelf = np.array([0.16, 0.4, 0.5], dtype=np.float32)
t = depth[..., None]
ocean = np.where(t < 0.5, deep + (mid - deep) * (t / 0.5), mid + (shelf - mid) * ((t - 0.5) / 0.5))
# keep a little of the original texture so the sea is not flat
ocean = ocean * (0.85 + 0.3 * lum[..., None])

# --- Land: a touch less saturated, more contrast, slightly darker.
g = a.mean(axis=2, keepdims=True)
landc = g + (a - g) * 0.9
landc = np.clip((landc - 0.45) * 1.1 + 0.47, 0, 1)

out = ocean * (1 - land) + landc * land
img = Image.fromarray(np.clip(out * 255, 0, 255).astype(np.uint8))
img = ImageEnhance.Sharpness(img).enhance(1.15)
img.save(sys.argv[3], quality=86, optimize=True, progressive=True)
