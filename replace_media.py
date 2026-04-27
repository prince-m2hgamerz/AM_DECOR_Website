#!/usr/bin/env python3
"""
Replace Unsplash images and YouTube videos with local media files
across all HTML files in AM_DECOR/.
"""

import os
import re
import glob

BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'AM_DECOR')

# Mapping of Unsplash photo IDs to local custom photo filenames
# Reuse photos across sections since we have 12 photos for ~40+ usages
PHOTO_MAP = {
    # Hero section
    'photo-1618221195710-dd6b41faaea6': 'photo_6305560514146274933_y.jpg',   # hero-img-one
    'photo-1555041469-a586c61ea9bc':    'photo_6305560514146274934_y.jpg',   # hero-img-two
    'photo-1497366216548-37526070297c': 'photo_6305560514146274935_y.jpg',   # hero-img-three / office

    # About section
    'photo-1616486338812-3dadae4b4ace': 'photo_6305560514146274936_y.jpg',   # about img1 bedroom
    'photo-1556909114-f6e7ad7d3136':    'photo_6305560514146274937_y.jpg',   # about img2 kitchen
    'photo-1600607686527-6fb886090705': 'photo_6305560514146274938_x.jpg',   # about img3 living

    # Process section
    'photo-1581291518857-4e27b48ff24e': 'photo_6305560514146274939_y.jpg',   # consultation
    'photo-1541123437800-1bb1317badc2': 'photo_6305560514146274940_y.jpg',   # design
    'photo-1504307651254-35680f356dfd': 'photo_6305560514146274941_y.jpg',   # execution
    'photo-1556228453-efd6c1ff04f6':    'photo_6305560514146274942_y.jpg',   # handover

    # Projects - Residential
    'photo-1484154218962-a197022b5858': 'photo_6305560514146274933_y.jpg',   # dining

    # Projects - Office
    'photo-1497366754035-f200968a6e72': 'photo_6305560514146274934_y.jpg',   # exec boardroom
    'photo-1504384308090-c894fdcc538d': 'photo_6305560514146274935_y.jpg',   # coworking
    'photo-1524758631624-e2822e304c36': 'photo_6305560514146274936_y.jpg',   # reception

    # Projects - Modular
    'photo-1558618666-fcd25c85cd64':    'photo_6305560514146274939_y.jpg',   # wardrobe
    'photo-1560448204-e02f11c3d0e2':    'photo_6305560514146274940_y.jpg',   # bedroom suite / false ceiling

    # Services
    'photo-1600210492486-724fe5c67fb0': 'photo_6305560514146274933_y.jpg',   # home interior

    # Gallery
    # (reuse same mappings as above)

    # Testimonials
    # testi-img1, testi-img2 reuse from above

    # Why Choose Us
    # reuse from above
}

# For Unsplash URLs that use size parameters, we need to match the base photo ID
def replace_unsplash_urls(content):
    """Replace all Unsplash image URLs with local paths."""
    # Pattern: https://images.unsplash.com/photo-XXXXXXXXXXXXXXXX?w=NNN&q=NN
    pattern = r'https://images\.unsplash\.com/([a-z0-9-]+)\?[^"\s]*'

    def replacer(match):
        photo_id = match.group(1)
        if photo_id in PHOTO_MAP:
            return f'assets/img/custom/{PHOTO_MAP[photo_id]}'
        else:
            # Fallback: keep URL if no mapping (shouldn't happen)
            return match.group(0)

    return re.sub(pattern, replacer, content)

def replace_youtube_videos(content):
    """Replace YouTube popup-video links with local muted video elements."""
    # Pattern for popup-video links to YouTube
    # <a href="https://www.youtube.com/watch?v=XXXXXXXX" class="... popup-video">...</a>
    pattern = r'<a\s+href="https://www\.youtube\.com/watch\?v=[^"]+"\s+class="([^"]*popup-video[^"]*)"\s*>\s*<i\s+class="([^"]*)"></i>\s*</a>'

    def video_replacer(match):
        classes = match.group(1)
        icon_class = match.group(2)
        # Return a muted local video player
        return f'''<video class="local-video" autoplay loop muted playsinline style="width:100%;height:100%;object-fit:cover;border-radius:8px;">
  <source src="assets/video/document_6305560513686281792.mp4" type="video/mp4">
</video>
<a href="assets/video/document_6305560513686281792.mp4" class="{classes}" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10;">
  <i class="{icon_class}"></i>
</a>'''

    return re.sub(pattern, video_replacer, content, flags=re.IGNORECASE)

def process_file(filepath):
    """Process a single HTML file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    content = replace_unsplash_urls(content)
    content = replace_youtube_videos(content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'  -> Updated: {os.path.basename(filepath)}')
        return True
    else:
        print(f'  -> No changes: {os.path.basename(filepath)}')
        return False

def main():
    html_files = glob.glob(os.path.join(BASE_DIR, '*.html'))
    print(f'Found {len(html_files)} HTML files to process...')
    changed = 0
    for filepath in sorted(html_files):
        if process_file(filepath):
            changed += 1
    print(f'\nDone. {changed} files modified.')

if __name__ == '__main__':
    main()
