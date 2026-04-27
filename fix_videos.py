#!/usr/bin/env python3
import os, glob

BASE = os.path.join(os.path.dirname(__file__), 'AM_DECOR')

old_style = 'style="width:100%;height:100%;object-fit:cover;border-radius:8px;"'
new_style = 'style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;border-radius:8px;"'

for fp in sorted(glob.glob(os.path.join(BASE, '*.html'))):
    with open(fp, 'r', encoding='utf-8') as f:
        c = f.read()
    orig = c
    c = c.replace(old_style, new_style)
    if c != orig:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(c)
        print('Fixed video position:', os.path.basename(fp))
