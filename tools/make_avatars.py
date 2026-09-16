#!/usr/bin/env python3
"""Generate cute flat-style cartoon avatars for ShuttlesLab members."""
import math
import os
from PIL import Image, ImageDraw

SIZE = 512
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "img")


def circle(d, cx, cy, r, fill):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill)


def ell(d, cx, cy, rx, ry, fill):
    d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=fill)


def draw_avatar(path, bg, skin, hair, style, glasses=False, blush=True,
                hair_accent=None):
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx, cy = SIZE // 2, SIZE // 2

    # background
    circle(d, cx, cy, SIZE // 2, bg)
    # decorative soft circles
    circle(d, int(SIZE * 0.16), int(SIZE * 0.18), 26, (*lighten(bg, 18),))
    circle(d, int(SIZE * 0.86), int(SIZE * 0.80), 34, (*lighten(bg, 12),))

    # face
    fw, fh = 150, 165
    d.ellipse([cx - fw, cy - fh + 30, cx + fw, cy + fh + 30], fill=skin)

    # hair
    if style == "short":
        d.pieslice([cx - fw - 8, cy - fh - 40, cx + fw + 8, cy + 60],
                   180, 360, fill=hair)
        d.rectangle([cx - fw - 8, cy - 60, cx - fw + 42, cy + 30], fill=hair)
        d.rectangle([cx + fw - 42, cy - 60, cx + fw + 8, cy + 30], fill=hair)
    elif style == "side":
        d.pieslice([cx - fw - 8, cy - fh - 40, cx + fw + 8, cy + 60],
                   170, 370, fill=hair)
        d.polygon([(cx - fw - 8, cy - 40), (cx + fw + 8, cy - 90),
                   (cx + fw + 8, cy - 20), (cx - fw - 8, cy + 10)], fill=hair)
    elif style == "bob":
        d.pieslice([cx - fw - 14, cy - fh - 40, cx + fw + 14, cy + 120],
                   180, 360, fill=hair)
        d.ellipse([cx - fw - 34, cy - 40, cx - fw + 50, cy + 150], fill=hair)
        d.ellipse([cx + fw - 50, cy - 40, cx + fw + 34, cy + 150], fill=hair)
    elif style == "ponytail":
        d.pieslice([cx - fw - 8, cy - fh - 40, cx + fw + 8, cy + 60],
                   180, 360, fill=hair)
        ell(d, cx + fw - 10, cy - 90, 46, 70, hair)
        d.ellipse([cx + fw - 56, cy - 130, cx + fw + 30, cy - 60],
                  fill=hair_accent or hair)
    elif style == "curly":
        for i in range(9):
            a = math.pi * (i / 8)
            hx = cx + int(math.cos(a) * (fw - 6))
            hy = (cy - fh + 60) - int(math.sin(a) * 58)
            circle(d, hx, hy, 44, hair)
        d.pieslice([cx - fw - 6, cy - fh - 30, cx + fw + 6, cy + 80],
                   180, 360, fill=hair)

    # eyes
    ey = cy + 10
    ex = 58
    for sx in (-1, 1):
        circle(d, cx + sx * ex, ey, 15, (46, 52, 64, 255))
        circle(d, cx + sx * ex + 5, ey - 5, 5, (255, 255, 255, 255))

    # brows
    for sx in (-1, 1):
        d.arc([cx + sx * ex - 20, ey - 38, cx + sx * ex + 20, ey - 12],
              200, 340, fill=hair, width=7)

    # smile
    d.arc([cx - 30, ey + 18, cx + 30, ey + 52], 20, 160,
          fill=(180, 84, 84, 255), width=8)

    # blush
    if blush:
        for sx in (-1, 1):
            ell(d, cx + sx * 92, ey + 34, 22, 13, (255, 158, 158, 140))

    # glasses
    if glasses:
        gc = (60, 66, 80, 255)
        gw, gh, gt = 52, 40, 7
        for sx in (-1, 1):
            gx = cx + sx * ex
            d.rounded_rectangle([gx - gw, ey - gh, gx + gw, ey + gh],
                                radius=26, outline=gc, width=gt)
        d.line([cx - ex + gw, ey, cx + ex - gw, ey], fill=gc, width=gt)

    # body hint (shoulders)
    d.pieslice([cx - 170, cy + 190, cx + 170, cy + 560], 180, 360,
               fill=hair_accent or (94, 129, 172, 255))

    img.save(path)


def lighten(color, amt):
    return tuple(min(255, c + amt) for c in color[:3]) + (255,)


PEOPLE = {
    "avatar-zhangying.png": dict(bg=(255, 214, 214, 255), skin=(255, 224, 196, 255),
                                 hair=(74, 52, 46, 255), style="bob", glasses=True,
                                 hair_accent=(176, 98, 118, 255)),
    "avatar-zhangkai.png": dict(bg=(205, 229, 255, 255), skin=(255, 224, 196, 255),
                                hair=(40, 40, 48, 255), style="side", glasses=True,
                                hair_accent=(58, 96, 158, 255)),
    "avatar-zhi.png": dict(bg=(255, 236, 190, 255), skin=(255, 226, 200, 255),
                           hair=(52, 44, 40, 255), style="short",
                           hair_accent=(74, 124, 89, 255)),
    "avatar-yurui.png": dict(bg=(221, 214, 255, 255), skin=(255, 226, 200, 255),
                             hair=(58, 48, 44, 255), style="curly",
                             hair_accent=(108, 91, 168, 255)),
    "avatar-qin.png": dict(bg=(206, 245, 224, 255), skin=(255, 226, 200, 255),
                           hair=(66, 52, 44, 255), style="ponytail",
                           hair_accent=(62, 128, 113, 255)),
}

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, kw in PEOPLE.items():
        draw_avatar(os.path.join(OUT, name), **kw)
        print("saved", name)
