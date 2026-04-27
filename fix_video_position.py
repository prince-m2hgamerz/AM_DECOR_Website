#!/usr/bin/env python3
"""
Fix video positioning: add position:absolute to local-video elements
so they properly overlay their parent containers.
"""

import os
import re
import glob

BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'AM_DECOR')

def fix_videos(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Fix local-video inline styles: add position:absolute;top:0;left:0;
    # Current: style="width:100%;height:100%;object-fit:cover;border-radius:8px;"
    # Target:  style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;border-radius:8px;"
    content = re.sub(
        r'(<video class="local-video"[^>]*?)style="width:100%;height:100%;object-fit:cover;border-radius:8px;"',
        r'\1style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;border-radius:8px;"',
        content
    )

    # Also ensure parent .th-hero-img has position:relative for hero slides
    # Pattern: <div class="th-hero-img" data-ani=...> with video inside
    # We can't easily add inline styles to the parent via regex safely,
    # but the template's CSS for .th-hero-img already has position:relative.
    # If not, we can add inline style.

    # Check if th-hero-img has position:relative in CSS or inline
    # If no inline style and not sure about CSS, add it
    content = re.sub(
        r'(<div class="th-hero-img"[^>]*?)(?<!style="[^"]*position)(>)',
        r'\1 style="position:relative"\2',
        content
    )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'  -> Fixed: {os.path.basename(filepath)}')
        return True
    return False

def main():
    html_files = glob.glob(os.path.join(BASE_DIR, '*.html'))
    changed = 0
    for fp in sorted(html_files):
        if fix_videos(fp):
            changed += 1
    print(f'Fixed video positioning in {changed} files.')

if __name__ == '__main__':
    main()
