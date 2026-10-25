"""Generates src/assets/asia-satellite.jpg for the agarwood map.

Source: NASA Blue Marble true-colour mosaic (public domain), equirectangular
4096x2048, as shipped in the npm package `three-globe` (example/img/earth-blue-marble.jpg).
Reprojected to the same Mercator frame scripts/build-map.mjs uses (fitExtent of
[64E,33N]..[156E,13S] into 1000x640), so the country outlines line up.

Run: python3 scripts/build-satellite.py path/to/earth-blue-marble.jpg
"""
import math
import sys

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

# d3 geoMercator().fitExtent(...) parameters from build-map.mjs
S, TX, TY = 622.780212098721, -695.6521739130437, 438.9082215247457
K = 1.6  # output scale over the 1000x640 viewBox
EXT = 200  # extra viewBox units of imagery above and below, so the map can fill taller panels
W, H = int(1000 * K), int((640 + 2 * EXT) * K)

src = Image.open(sys.argv[1]).convert("RGB")
SW, SH = src.size


def lat(y):
    return math.degrees(2 * math.atan(math.exp((TY - y) / S)) - math.pi / 2)


lon0, lon1 = math.degrees((0 - TX) / S), math.degrees((1000 - TX) / S)
px = lambda lo: (lo + 180) / 360 * SW
py = lambda la: (90 - la) / 180 * SH
x0, x1, y0, y1 = px(lon0), px(lon1), py(lat(-EXT)), py(lat(640 + EXT))

pad, up = 4, 4
cx, cy = int(x0) - pad, int(y0) - pad
crop = src.crop((cx, cy, int(math.ceil(x1)) + pad, int(math.ceil(y1)) + pad))
a = np.asarray(crop.resize((crop.width * up, crop.height * up), Image.LANCZOS)).astype(np.float32)

xs = (x0 - cx + (np.arange(W) + 0.5) / W * (x1 - x0)) * up
ys = np.array([py(lat((j + 0.5) / K - EXT)) - cy for j in range(H)]) * up
xi = np.clip(xs.astype(int), 0, a.shape[1] - 2)
yi = np.clip(ys.astype(int), 0, a.shape[0] - 2)
xf, yf = (xs - xi)[None, :, None], (ys - yi)[:, None, None]
out = (a[yi][:, xi] * (1 - xf) + a[yi][:, xi + 1] * xf) * (1 - yf) + (
    a[yi + 1][:, xi] * (1 - xf) + a[yi + 1][:, xi + 1] * xf
) * yf

img = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))
img = ImageEnhance.Contrast(img).enhance(1.08)
img = ImageEnhance.Color(img).enhance(1.1)
img = img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
img.save(sys.argv[2] if len(sys.argv) > 2 else "src/assets/asia-satellite-raw.jpg", quality=86, optimize=True, progressive=True)
