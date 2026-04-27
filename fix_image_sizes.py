#!/usr/bin/env python3
"""
Updates HTML files to use properly-sized image variants for each section type.
Portrait phone photos are cropped to landscape ratios that match container expectations.
"""
import os, re, glob

BASE = os.path.join(os.path.dirname(__file__), 'AM_DECOR')

# Mapping: each Unsplash URL -> local image filename
# (original mapping preserved from replace_media.py)
IMAGE_MAP = {
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80":  "photo_6305560514146274933_y.jpg",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80":  "photo_6305560514146274934_y.jpg",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80":  "photo_6305560514146274935_y.jpg",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80":  "photo_6305560514146274936_y.jpg",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80":  "photo_6305560514146274937_y.jpg",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=400&q=80":  "photo_6305560514146274938_x.jpg",
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&q=80":  "photo_6305560514146274939_y.jpg",
    "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=500&q=80":  "photo_6305560514146274940_y.jpg",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80":  "photo_6305560514146274941_y.jpg",
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&q=80":  "photo_6305560514146274942_y.jpg",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80":  "photo_6305560514146274942_y.jpg",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&q=75":  "photo_6305560514146274941_y.jpg",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=75":  "photo_6305560514146274933_y.jpg",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=75":  "photo_6305560514146274936_y.jpg",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=75":  "photo_6305560514146274937_y.jpg",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=400&q=75":  "photo_6305560514146274938_x.jpg",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=75":  "photo_6305560514146274935_y.jpg",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&q=75":  "photo_6305560514146274934_y.jpg",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=75":  "photo_6305560514146274939_y.jpg",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=75":  "photo_6305560514146274940_y.jpg",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75":  "photo_6305560514146274941_y.jpg",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=75":  "photo_6305560514146274934_y.jpg",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80":  "photo_6305560514146274933_y.jpg",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80":  "photo_6305560514146274933_y.jpg",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80":  "photo_6305560514146274942_y.jpg",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80":  "photo_6305560514146274940_y.jpg",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80":  "photo_6305560514146274941_y.jpg",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&q=80":  "photo_6305560514146274933_y.jpg",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=80":  "photo_6305560514146274935_y.jpg",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80":  "photo_6305560514146274939_y.jpg",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80":  "photo_6305560514146274941_y.jpg",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200":       "photo_6305560514146274933_y.jpg",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200":       "photo_6305560514146274935_y.jpg",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200":       "photo_6305560514146274936_y.jpg",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200":       "photo_6305560514146274937_y.jpg",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200":       "photo_6305560514146274938_x.jpg",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200":       "photo_6305560514146274942_y.jpg",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200":       "photo_6305560514146274940_y.jpg",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200":       "photo_6305560514146274941_y.jpg",
}

# Reverse map for detection from current HTML
to_base = {}
for url, fname in IMAGE_MAP.items():
    to_base[url] = fname

# Determine expected variant folder from surrounding HTML context
# We look at up to 500 chars before the image src for context clues
def detect_variant(html_snippet_before, html_snippet_after, fname):
    """
    Returns the variant subfolder name based on HTML context.
    """
    ctx = (html_snippet_before + html_snippet_after).lower()
    
    # Hero images
    if 'hero-img-one' in ctx or 'hero-img-two' in ctx or 'hero-img-three' in ctx:
        return 'landscape_16_9'  # Wide hero images
    
    # Process cards (very wide containers ~2:1)
    if 'process-card' in ctx or 'processslider' in ctx or 'process-img-cover' in ctx:
        return 'landscape_2_1'
    
    # Gallery (wide display)
    if 'gallery-item' in ctx or 'gallery-slider' in ctx or 'gallery-img-cover' in ctx:
        return 'landscape_16_9'
    
    # Project cards
    if 'project-card' in ctx or 'projectslide' in ctx or 'project-img-cover' in ctx:
        return 'landscape_4_3'
    
    # Service cards
    if 'service-card' in ctx or 'serviceslide' in ctx or 'service-img-cover' in ctx:
        return 'landscape_3_2'
    
    # Testimonial images
    if 'testi-img' in ctx or 'testi-image' in ctx or 'testimonial' in ctx:
        return 'square'
    
    # Why choose us images
    if 'why-img-item' in ctx:
        return 'landscape_4_3'
    
    # About section images
    if 'img-box1' in ctx or 'about-area' in ctx:
        return 'landscape_3_2'
    
    # Default for anything else (blog, etc)
    return 'landscape_4_3'

def fix_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig = content
    
    # Find all local custom image references
    pattern = re.compile(r'<img[^>]+src="(assets/img/custom/)([^"]+)"')
    
    for m in pattern.finditer(content):
        full_src = m.group(0)
        base_path = m.group(1)
        fname = m.group(2)
        
        # Get surrounding context (1000 chars before and after)
        start = max(0, m.start() - 800)
        end = min(len(content), m.end() + 800)
        before
