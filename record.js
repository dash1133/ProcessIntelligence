// Record animation.html into a WebM video, then mux with the MP3 audio.
// Usage: node record.js
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

const ROOT = __dirname;
const OUT_DIR = path.join(ROOT, 'video-out');
const RECORD_SECONDS = 118;
const W = 1280;
const H = 720;

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const f of fs.readdirSync(OUT_DIR)) fs.rmSync(path.join(OUT_DIR, f), { recursive: true, force: true });

  const browser = await chromium.launch({
    args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio'],
  });
  const context = await browser.newContext({
    viewport: { width: W, height: H },
    recordVideo: { dir: OUT_DIR, size: { width: W, height: H } },
  });
  const page = await context.newPage();

  await page.goto('file://' + path.join(ROOT, 'animation.html'));
  await page.waitForFunction(() => {
    const a = document.getElementById('vo');
    return a && a.readyState >= 3;
  }, { timeout: 30000 });

  await page.evaluate(() => {
    const a = document.getElementById('vo');
    a.currentTime = 0;
    return a.play();
  });

  const start = Date.now();
  while ((Date.now() - start) / 1000 < RECORD_SECONDS) {
    await page.waitForTimeout(500);
  }

  const video = page.video();
  await page.close();
  await context.close();
  await browser.close();

  const webmPath = await video.path();
  const finalWebm = path.join(OUT_DIR, 'animation.webm');
  fs.renameSync(webmPath, finalWebm);

  const mp4Path = path.join(ROOT, 'animation.mp4');
  const audioPath = path.join(ROOT, 'AIZBO - VO.mp3');
  const r = spawnSync('ffmpeg', [
    '-y',
    '-i', finalWebm,
    '-i', audioPath,
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'medium',
    '-c:a', 'aac', '-b:a', '192k',
    '-shortest',
    mp4Path,
  ], { stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status || 1);

  console.log('\nWrote ' + mp4Path);
})();
