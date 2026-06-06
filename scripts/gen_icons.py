#!/usr/bin/env python3
"""Generate Twenty-Two PWA icons with no third-party dependencies.

Renders a blocky lime "22" mark on a dark background into PNG files using
nothing but the standard library (struct + zlib). Run from anywhere:

    python3 scripts/gen_icons.py

Outputs into public/icons/:
  icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png
"""

import os
import struct
import zlib

BG = (0x0E, 0x10, 0x0D)       # --bg
LIME = (0xC8, 0xFA, 0x4B)     # --accent

# 5x7 bitmap for the digit "2".
GLYPH_2 = [
    "11110",
    "00001",
    "00001",
    "01110",
    "10000",
    "10000",
    "11111",
]
GW, GH = 5, 7


def write_png(path, width, height, pixels):
    """pixels: flat list of (r,g,b) tuples, length width*height."""
    raw = bytearray()
    for y in range(height):
        raw.append(0)  # filter type 0 (none) per scanline
        row = pixels[y * width:(y + 1) * width]
        for (r, g, b) in row:
            raw += bytes((r, g, b))

    def chunk(tag, data):
        out = struct.pack(">I", len(data)) + tag + data
        crc = zlib.crc32(tag + data) & 0xFFFFFFFF
        return out + struct.pack(">I", crc)

    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)  # 8-bit RGB
    idat = zlib.compress(bytes(raw), 9)
    png = sig + chunk(b"IHDR", ihdr) + chunk(b"IDAT", idat) + chunk(b"IEND", b"")
    with open(path, "wb") as f:
        f.write(png)


def render(size, maskable=False):
    pixels = [BG] * (size * size)

    def put(x, y, color):
        if 0 <= x < size and 0 <= y < size:
            pixels[y * size + x] = color

    # rounded-ish corners: clear a small triangle in each corner (skip for maskable
    # so the maskable safe-zone fills edge to edge).
    if not maskable:
        radius = max(1, size // 12)
        for cy in range(radius):
            for cx in range(radius):
                if cx + cy < radius:
                    put(cx, cy, BG)
                    put(size - 1 - cx, cy, BG)
                    put(cx, size - 1 - cy, BG)
                    put(size - 1 - cx, size - 1 - cy, BG)

    # Maskable icons need their content inside a ~80% safe zone.
    content = size * (0.62 if maskable else 0.74)

    digits = 2
    gap_cells = 1
    total_cells_w = digits * GW + gap_cells
    cell = max(1, int(content / total_cells_w))
    mark_w = total_cells_w * cell
    mark_h = GH * cell
    ox = (size - mark_w) // 2
    oy = (size - mark_h) // 2

    for d in range(digits):
        base_x = ox + d * (GW + gap_cells) * cell
        for ry, line in enumerate(GLYPH_2):
            for rx, ch in enumerate(line):
                if ch == "1":
                    for fy in range(cell):
                        for fx in range(cell):
                            put(base_x + rx * cell + fx, oy + ry * cell + fy, LIME)

    return pixels


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    out_dir = os.path.join(here, "..", "public", "icons")
    out_dir = os.path.normpath(out_dir)
    os.makedirs(out_dir, exist_ok=True)

    targets = [
        ("icon-192.png", 192, False),
        ("icon-512.png", 512, False),
        ("icon-maskable-512.png", 512, True),
        ("apple-touch-icon.png", 180, False),
    ]
    for name, size, maskable in targets:
        px = render(size, maskable=maskable)
        write_png(os.path.join(out_dir, name), size, size, px)
        print("wrote", os.path.join(out_dir, name))


if __name__ == "__main__":
    main()
