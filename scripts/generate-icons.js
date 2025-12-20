// scripts/generate-icons.js
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const sizes = [16, 32, 180, 192, 512];
const publicDir = path.join(__dirname, "../public");

async function generateIcons() {
  const svgBuffer = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#00f0ff;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#a855f7;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="20" fill="#0a0a0a"/>
      <text x="50" y="68" font-family="Arial, sans-serif" font-size="50" font-weight="bold" fill="url(#grad)" text-anchor="middle">S</text>
    </svg>
  `);

  for (const size of sizes) {
    let filename;
    if (size === 16) filename = "favicon-16x16.png";
    else if (size === 32) filename = "favicon-32x32.png";
    else if (size === 180) filename = "apple-touch-icon.png";
    else if (size === 192) filename = "android-chrome-192x192.png";
    else if (size === 512) filename = "android-chrome-512x512.png";

    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, filename));

    console.log(`Generated ${filename}`);
  }

  // Generate favicon.ico (use 32x32)
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFile(path.join(publicDir, "favicon.ico"));

  console.log("Generated favicon.ico");

  // Copy SVG
  fs.writeFileSync(path.join(publicDir, "icon.svg"), svgBuffer.toString());
  console.log("Generated icon.svg");
}

generateIcons()
  .then(() => {
    console.log("All icons generated!");
  })
  .catch(console.error);
