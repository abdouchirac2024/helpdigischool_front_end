#!/usr/bin/env node

/**
 * Script pour generer les icones PWA placeholder.
 * Remplacez ces icones par vos vrais logos ensuite.
 *
 * Usage: node scripts/generate-icons.js
 *
 * Pour des icones de production, utilisez un outil comme:
 * - https://realfavicongenerator.net
 * - https://maskable.app/editor
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '..', 'public', 'icons');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function generateSVG(size, maskable = false) {
  const padding = maskable ? size * 0.1 : 0;
  const innerSize = size - padding * 2;
  const fontSize = Math.round(innerSize * 0.25);
  const smallFontSize = Math.round(innerSize * 0.08);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#2563eb" rx="${maskable ? 0 : size * 0.15}"/>
  <text x="50%" y="45%" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Arial, sans-serif" font-weight="bold" font-size="${fontSize}">HDS</text>
  <text x="50%" y="68%" text-anchor="middle" dominant-baseline="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="${smallFontSize}">DigiSchool</text>
</svg>`;
}

// Generer les icones regulieres
for (const size of sizes) {
  const svg = generateSVG(size, false);
  writeFileSync(join(iconsDir, `icon-${size}x${size}.png`), svg);
  console.log(`Generated icon-${size}x${size}.png (SVG placeholder)`);
}

// Generer les icones maskable
for (const size of [192, 512]) {
  const svg = generateSVG(size, true);
  writeFileSync(join(iconsDir, `icon-maskable-${size}x${size}.png`), svg);
  console.log(`Generated icon-maskable-${size}x${size}.png (SVG placeholder)`);
}

console.log('\n⚠️  Les fichiers generes sont des SVG renommes en .png (placeholder).');
console.log('Pour la production, remplacez-les par de vraies images PNG.');
console.log('Utilisez https://realfavicongenerator.net ou un outil similaire.');