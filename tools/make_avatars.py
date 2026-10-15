#!/usr/bin/env python3
"""Generate GitHub-style identicon avatars for ShuttlesLab members.

Each avatar is a deterministic 5x5, left/right-symmetric block pattern
derived from the member's name (MD5), imitating GitHub's default
identicons.  Run this script to (re)generate the files in assets/img/.

Notes:
- ``avatar-zhangying.png`` is a real photo (not generated) and is
  intentionally not listed here.
"""
import hashlib
import os
from PIL import Image, ImageDraw

GRID = 5          # 5x5 grid, mirrored across the centre column
SIZE = 400        # output size in pixels (400 / 5 = 80px cells)
CELL = SIZE // GRID
BG = (240, 240, 240, 255)
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "img")


def identicon(seed):
    """Return a PIL image with the identicon for *seed*."""
    digest = hashlib.md5(seed.encode("utf-8")).hexdigest()

    # Foreground colour: three bytes pushed into a visible mid-tone range.
    fg = tuple(40 + int(digest[i * 2:i * 2 + 2], 16) % 160
               for i in range(3)) + (255,)

    img = Image.new("RGBA", (SIZE, SIZE), BG)
    d = ImageDraw.Draw(img)

    # Only the left 3 columns are independent; the other 2 mirror them.
    for i in range(15):
        row, col = divmod(i, 3)
        if int(digest[i], 16) % 2 == 0:      # even nibble -> filled cell
            for c in (col, 4 - col):
                x0, y0 = c * CELL, row * CELL
                d.rectangle([x0, y0, x0 + CELL - 1, y0 + CELL - 1], fill=fg)

    return img


PEOPLE = {
    # Current students
    "avatar-zhi.png": "Zhi Li",
    "avatar-yurui.png": "Yurui Wang",
    "avatar-yiheng.png": "Yiheng Yang",
    "avatar-hujun.png": "Hujun Peng",
    "avatar-hanbin.png": "Hanbin Qiu",
    "avatar-zengwei.png": "Zengwei Zheng",
    "avatar-haitao.png": "Haitao Bo",
    "avatar-haowei.png": "Haowei Xu",
    "avatar-jiuyang.png": "Jiuyang Huang",
    "avatar-guanning.png": "Guanning Zhuang",
    "avatar-zhiang.png": "Zhiang Yuan",
    # Alumni
    "avatar-qin.png": "Qin Huang",
    "avatar-tianrui.png": "Tianrui Bao",
    "avatar-xinuo.png": "Xinuo Li",
    "avatar-hongyu.png": "Hongyu Wang",
    "avatar-shaopeng.png": "Shaopeng Zhang",
}

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, seed in PEOPLE.items():
        identicon(seed).save(os.path.join(OUT, name))
        print("saved", name, "<-", seed)
