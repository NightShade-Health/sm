# NightShade Health — social media automation

This repo holds the public media (videos/, images/) and the video pipeline (video-src/) for NightShade Health's social channels. Files here are public on purpose: Metricool downloads post media from their raw GitHub URLs.

## First task (test the chain)
1. Confirm push works: commit and push any change to this repo.
2. Confirm the public link: `curl -I https://raw.githubusercontent.com/NightShade-Health/sm/<branch>/videos/nightshade-botany-101-en.mp4` → 200.
3. In Metricool, `createScheduledPost` as a DRAFT (`draft: true`) for **Sun 18 Oct 2026 20:00, timezone Africa/Cairo**, blogId `7310267`, providers instagram (type REEL) + facebook (type REEL) + threads, `media: [<raw URL>]`, caption from the Calendar sheet row for 18 Oct (English + Arabic). Return the plannerUrl.
4. If Metricool rejects the raw URL, enable GitHub Pages for this repo and use `https://nightshade-health.github.io/sm/videos/...`.
5. If the Metricool connector isn't available in this session, say so: scheduling can then run from a Claude Cowork scheduled task, with this session only rendering and pushing.

## Accounts and IDs
- **Metricool**: brand "NightShade Health", blogId `7310267`, timezone `Africa/Cairo`. Facebook page 1148472931673146, Instagram `nightshade.health`, Threads `nightshade.health`. Free plan: no Drive integration, no LinkedIn/X, monthly cap on scheduled posts (check in the account). Every Instagram post needs an image or video.
- **Typefully**: social_set_id `341801`. X `@NightShadeHealt`, LinkedIn company page `nightshadehealth`. Free quota: 10 posts/month. Video upload needs S3, which may be blocked, so LinkedIn and X are text-only for now.
- **Google Drive** folder "NightShade Health": `1I-CCAjUxBwSlvTf59FpCN4b66P5SJD8Z` (Videos `1ocOmpkqOEExUt1yHzeF9e1ecQfSwLf1F`, Images `12GCLITET4dAk9mexyLCM98RcjeoCuOjv`).
- **Content calendar (Google Sheet)**: `1QkmiSXKQuEXJ-3cmdLWDk44PXJ4wmhJKYYQqImFGkF0`. Tabs: "Read me", "Calendar" (A1:M92, 91 posts, Oct 12 2026 to Jan 10 2027; Status in column L: Draft / Approved / Scheduled / Posted / Hold), "Videos".

## Weekly automation (target)
Every week: read Approved rows for the coming week, render any missing videos and image cards, push them to this repo, schedule in Metricool (Facebook, Instagram, Threads) and Typefully (LinkedIn, X text), then set those rows' Status to Scheduled. Keep the Approved step unless Mohamed says otherwise.

## Content rules (non-negotiable)
- No medical or health claims. Botany, cooking and label-reading only.
- Never mention medicine or pharmaceutical checking before the launch reveal. Rows marked Hold stay unscheduled until Mohamed sets the launch week.
- Never use the word "Safe" (the app says "Fits you").
- Brand: "NightShade Health" / "نايت شيد هيلث". Mohamed is a native Arabic speaker; the Arabic captions are his to edit.
- All new videos use the science style of Botany 101 (`video-src/sci.html`).
- Mohamed travels 22 Nov to 3 Dec: weeks 7 and 8 must be scheduled before he leaves.

## Video pipeline (`video-src/`)
- `./setup.sh` once: installs Motion, Playwright and the brand fonts (Sora, Geist Mono, Alexandria).
- `./make-video.sh sci.html ../videos/name.mp4`: renders 1080×1920 at 30 fps via headless Chromium, then encodes with ffmpeg.
  - Cloud: Chromium is at `/opt/pw-browsers/...`.
  - Mac: set `CHROME_PATH` to Chrome's binary, e.g. `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.
- Scenes: `sci.html` (Botany 101, 45 s) and `dyk-long.html` (Did you know?, 40 s). Shared files: `base.css` (brand tokens, layout) and `common.js` (logo mark, top bar, end card, animation helpers). Each scene sets `window.ctl` (a paused Motion timeline) and `window.DURATION`.
- Brand: background #07090A, card #131A18, text #ECF4EF, green #6EC38C, shaded sepal #2E6A48, saffron #E9B949 (centre dot and at most one highlight). One easing: cubic-bezier(.2,.8,.2,1). The logo is drawn from the brand description; swap in the real SVG when available.

## Videos to make (science style, English + Arabic)
- Arabic version of Botany 101
- Stem or root? (1 Nov)
- Pepper or not? (8 Nov)
- The lantern (15 Nov)
- Breakfast table (22 Nov)
- Every plant has a signature (6 Dec)
- The scan teaser (13 Dec; no app screens, no medicines)
- Holiday table (27 Dec)
- Nightshade or not? (10 Jan)
