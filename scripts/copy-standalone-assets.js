import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, '.next', 'standalone');
const publicSrc = path.join(rootDir, 'public');
const publicDest = path.join(standaloneDir, 'public');
const staticSrc = path.join(rootDir, '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');

console.log('[Desktop Setup] Synchronizing static assets into .next/standalone...');

if (!fs.existsSync(standaloneDir)) {
  console.error('[Desktop Setup] Error: .next/standalone does not exist. Did you run "next build"?');
  process.exit(1);
}

if (fs.existsSync(publicSrc)) {
  fs.cpSync(publicSrc, publicDest, { recursive: true });
  console.log('✓ Copied public/ -> .next/standalone/public/');
}

if (fs.existsSync(staticSrc)) {
  fs.cpSync(staticSrc, staticDest, { recursive: true });
  console.log('✓ Copied .next/static/ -> .next/standalone/.next/static/');
}

console.log('[Desktop Setup] Standalone assets ready.');
