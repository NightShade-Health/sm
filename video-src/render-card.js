// Usage: node render-card.js <card.html> <out.png>   (1080x1350 still)
const { chromium } = require('playwright-core');
const path = require('path');
const [,, html, out] = process.argv;
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.goto('file://' + path.resolve(html));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: out });
  await b.close();
})();
