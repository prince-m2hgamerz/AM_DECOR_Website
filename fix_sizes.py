#!/usr/bin/env python3
"""
Replace custom images with correctly-sized variants for each section.
"""
import os, re

BASE_DIR = os.path.join(os.path.dirname(__file__), 'AM_DECOR')
CUSTOM_BASE = 'assets/img/custom'

# Context keywords mapped to variant folder
CONTEXT_MAP = {
    # Hero section images
    'hero-img-one':   'landscape_3_2',
    'hero-img-two':   'landscape_3_2',
    'hero-img-three': 'landscape_3_2',

    # About section
    'img-box1':       'landscape_4_3',
    'img1 global-img': 'landscape_4_3',
    'img2 global-img': 'landscape_3_2',
    'img3 global-img': 'landscape_3_2',

    # Process section
    'process-card':   'landscape_16_9',
    'process-img-cover': 'landscape_16_9',

    # Project section
    'project-card':   'landscape_4_3',
    'project-img-cover': 'landscape_4_3',

    # Service section
    'service-card':   'landscape_3_2',
    'service-img-cover': 'landscape_3_2',

    # Gallery section
    'gallery-item2':  'wide',
    'gallery-img-cover': 'wide',

    # Testimonial section
    'testi-review':   'square',
    'testi-img1':     'square',
    'testi-img2':     'square',

    # Why choose us
    'why-img-item':   'landscape_4_3',
}

def find_context(line: str):
    """Find matching variant based on HTML context."""
    line_lower = line.lower()
    for keyword, variant in CONTEXT_MAP.items():
        if keyword.lower() in line_lower:
            return variant
    return None


def process_file(filepath: str):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    changed = False
    new_lines = []

    for i, line in enumerate(lines):
        if CUSTOM_BASE not in line or '.jpg' not in line:
            new_lines.append(line)
            continue

        # Get context from surrounding lines (current + 3 previous)
        context_window = ''.join(lines[max(0, i-3):i+1])
        variant = find_context(context_window)

        if variant:
            # Replace src path
            old_pattern = f'{CUSTOM_BASE}/photo_'
            new_pattern = f'{CUSTOM_BASE}/{variant}/photo_'
            if old_pattern in line:
                new_line = line.replace(old_pattern, new_pattern)
                if new_line != line:
                    changed = True
                    line = new_line

        new_lines.append(line)

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        return True
    return False


def main():
    files = sorted([
        os.path.join(BASE_DIR, f)
        for f in os.listdir(BASE_DIR)
        if f.endswith('.html')
    ])
    modified = 0
    for fp in files:
        if process_file(fp):
            print(f'Updated sizes: {os.path.basename(fp)}')
            modified += 1
    print(f'\nDone. {modified} files updated.')


if __name__ == '__main__':
    main()
