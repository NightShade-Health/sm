const { chromium } = require('playwright-core');
const path = require('path'), fs = require('fs');
const [,, html, outDir, fpsArg, stillsArg] = process.argv;
const fps = +(fpsArg || 30);
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(html));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  fs.mkdirSync(outDir, { recursive: true });
  const dur = await p.evaluate(() => window.DURATION);
  const times = stillsArg ? stillsArg.split(',').map(Number) : [...Array(Math.round(dur * fps)).keys()].map(i => i / fps);
  let i = 0;
  for (const t of times) {
    await p.evaluate(t => { window.ctl.time = t; return new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); }, t);
    await p.screenshot({ path: `${outDir}/f${String(i++).padStart(4, '0')}.png` });
  }
  await b.close();
})();
