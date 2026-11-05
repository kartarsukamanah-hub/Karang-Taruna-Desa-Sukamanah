import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
const svgPath = path.join(publicDir, 'icon.svg');
const svgBuffer = fs.readFileSync(svgPath);

async function generateIcons() {
  console.log('Generating PWA icons from SVG...');

  // 1. 192x192 PNG
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Generated pwa-192x192.png');

  // 2. 512x512 PNG
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Generated pwa-512x512.png');

  // 3. Apple Touch Icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // 4. Maskable 512x512 with safe zone padding (central 80% content + navy background bleed)
  const innerSize = Math.round(512 * 0.78);
  const padding = Math.round((512 - innerSize) / 2);
  const innerBuffer = await sharp(svgBuffer).resize(innerSize, innerSize).png().toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 7, g: 19, b: 38, alpha: 1 } // Navy #071326
    }
  })
    .composite([{ input: innerBuffer, top: padding, left: padding }])
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('Generated pwa-maskable-512x512.png');

  // 5. Favicon 48x48 PNG (named favicon.ico or used as favicon fallback)
  await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Generated favicon.ico');

  console.log('All PWA icons generated successfully!');
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
