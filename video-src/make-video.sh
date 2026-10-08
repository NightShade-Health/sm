#!/usr/bin/env bash
# Usage: ./make-video.sh <scene.html> <output.mp4>   (run from video-src/)
set -e
cd "$(dirname "$0")"
rm -rf frames && node render.js "$1" frames 30
ffmpeg -loglevel error -y -framerate 30 -i frames/f%04d.png -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart "$2"
rm -rf frames && echo "Wrote $2"
