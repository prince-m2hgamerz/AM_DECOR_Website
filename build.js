/**
 * Build script for Vercel deployment
 * Copies AM_DECOR static files to dist/ output directory
 */

const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Clean and recreate dist
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}

// Copy AM_DECOR to dist
copyDir('AM_DECOR', 'dist');

// Verify
const distFiles = fs.readdirSync('dist');
console.log('Build complete. dist/ contents:', distFiles.slice(0, 10).join(', ') + (distFiles.length > 10 ? '...' : ''));
console.log('Total files in dist:', distFiles.length);
