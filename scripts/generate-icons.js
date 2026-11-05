import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createCRC32Table() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  return table;
}

const crcTable = createCRC32Table();

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, 8 + len);
  chunk.writeUInt32BE(crc32(typeAndData), 8 + len);
  return chunk;
}

function generatePNG(width, height, isMaskable = false) {
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bits per channel
  ihdrData[9] = 6; // RGBA color type
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Generate pixels (RGBA)
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);
  const cx = width / 2;
  const cy = height / 2;
  const rOuter = width * 0.42;
  const rInner = width * 0.35;
  const rCore = width * 0.18;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // No filter for this scanline
    
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Deep Navy Blue Base Background (#071326 -> rgb(7, 19, 38))
      let r = 7;
      let g = 19;
      let b = 38;
      let a = 255;

      // Outer Golden Ring
      if (Math.abs(dist - rOuter) < width * 0.02) {
        r = 245; g = 158; b = 11; // Gold #f59e0b
      } else if (Math.abs(dist - rInner) < width * 0.015) {
        r = 56; g = 189; b = 248; // Sky Blue #38bdf8
      } else if (dist < rCore) {
        // Inner golden emblem emblem core
        const angle = Math.atan2(dy, dx);
        const starFactor = Math.cos(angle * 5);
        if (dist < rCore * (0.8 + 0.2 * starFactor)) {
          r = 251; g = 191; b = 36; // Amber #fbbf24
        } else {
          r = 30; g = 58; b = 138; // Deep Blue #1e3a8a
        }
      }

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write PWA Icons
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), generatePNG(192, 192));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), generatePNG(512, 512));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), generatePNG(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generatePNG(180, 180));

console.log('PWA PNG Icons generated successfully in public/');
