#!/usr/bin/env bash
# One-time setup for the video pipeline. Run from video-src/.
set -e
cd "$(dirname "$0")"
[ -f package.json ] || npm init -y >/dev/null
npm i motion playwright-core @fontsource-variable/sora @fontsource/geist-mono @fontsource-variable/alexandria >/dev/null
cp node_modules/motion/dist/motion.js motion.js
cp node_modules/@fontsource-variable/sora/files/sora-latin-wght-normal.woff2 sora.woff2
cp node_modules/@fontsource/geist-mono/files/geist-mono-latin-500-normal.woff2 mono.woff2
cp node_modules/@fontsource-variable/alexandria/files/alexandria-arabic-wght-normal.woff2 alex-ar.woff2
echo "Ready. Render with: ./make-video.sh sci.html ../videos/name.mp4"
