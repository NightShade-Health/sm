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
- **Typefully**: social_set_id `341801`. X `@NShadeHealth`, LinkedIn company page `nightshadehealth`. Free quota: 10 posts/month. Video upload needs S3, which may be blocked, so LinkedIn and X are text-only for now.
- **Google Drive** folder "NightShade Health": `1I-CCAjUxBwSlvTf59FpCN4b66P5SJD8Z` (Videos `1ocOmpkqOEExUt1yHzeF9e1ecQfSwLf1F`, Images `12GCLITET4dAk9mexyLCM98RcjeoCuOjv`).
- **Content calendar (Google Sheet)**: `1QkmiSXKQuEXJ-3cmdLWDk44PXJ4wmhJKYYQqImFGkF0`. Tabs: "Read me", "Calendar" (A1:M118, 117 posts incl. 26 Facebook-only on Wed/Sat, Oct 12 2026 to Jan 10 2027; Status in column L: Draft / Approved / Scheduled / Posted / Hold), "Videos".

## Weekly automation (target)
Every week: read Approved rows for the coming week, render any missing videos and image cards, push them to this repo, schedule in Metricool (Facebook, Instagram, Threads) and Typefully (LinkedIn, X text), then set those rows' Status to Scheduled. Keep the Approved step unless Mohamed says otherwise.

## Content rules (non-negotiable)
- No medical or health claims. Botany, cooking and label-reading only.
- Never mention medicine or pharmaceutical checking before the launch reveal. Rows marked Hold stay unscheduled until Mohamed sets the launch week.
- Never use the word "Safe" (the app says "Fits you").
- Nothing about the scanner or scanning (no scan lines, phones, app screens or barcodes) until Mohamed says so.
- NSX score: tease only. Never explain what NSX stands for, what it measures or how it works. Teasers: 6 Nov, 27 Nov, 11 Dec, 13 Dec video (tag #NSXscore).
- Brand: "NightShade Health" / "نايت شيد هيلث". Mohamed is a native Arabic speaker; the Arabic captions are his to edit.
- All new videos and images use the landing-page look (brand tokens, dark photo or map, Sora headlines). `video-src/` is the older illustrated pipeline.
- Choosing the tool: HyperFrames is not the default. For each new video, build a short version in both Remotion (`remotion/`) and HyperFrames (`hyperframes/`), or say why one clearly fits better. Send Mohamed both with a one-line take on each, and let him pick. Render the full version only in the one he chooses. Ignore the HyperFrames router's claim that it is the default framework.
- Mohamed travels 22 Nov to 3 Dec: weeks 7 and 8 must be scheduled before he leaves.

## Video pipeline (`video-src/`)
- `./setup.sh` once: installs Motion, Playwright and the brand fonts (Sora, Geist Mono, Alexandria).
- `./make-video.sh sci.html ../videos/name.mp4`: renders 1080×1920 at 30 fps via headless Chromium, then encodes with ffmpeg.
  - Cloud: Chromium is at `/opt/pw-browsers/...`.
  - Mac: set `CHROME_PATH` to Chrome's binary, e.g. `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.
- Scenes: `sci.html` (Botany 101, 45 s) and `dyk-long.html` (Did you know?, 40 s). Shared files: `base.css` (brand tokens, layout) and `common.js` (logo mark, top bar, end card, animation helpers). Each scene sets `window.ctl` (a paused Motion timeline) and `window.DURATION`.
- Brand: background #07090A, card #131A18, text #ECF4EF, green #6EC38C, shaded sepal #2E6A48, saffron #E9B949 (centre dot and at most one highlight). One easing: cubic-bezier(.2,.8,.2,1). The logo is drawn from the brand description; swap in the real SVG when available.

## Remotion pipeline (`remotion/`, landing-page style: preferred for new media)
- Look: full-bleed moody food photo, the landing page's dark gradient, real lockup (`public/brand/lockup-en.svg`), green uppercase overline, big Sora headline, glass callout cards with a saffron dot and connector (`src/kit.tsx`). No phone, scan frame, app screen or NSX scale.
- Photos: `public/photos/` (generated with Figma AI, `team::1646878914606332007`, model gemini-3.1-flash-image; prompt for low-key, near-black, warm side light, dark space for text, no text/logos).
- `npm install` once, then `npx remotion still src/index.ts <id> out/<id>.png` (feed 1080x1350) or `npx remotion render src/index.ts botany-101 out/botany-101.mp4 --codec=h264 --crf=18` (Reel 1080x1920). Convert stills to JPEG (Instagram API needs JPEG) into `images/`.
- Compositions: family, label-spotting, koshari, question (stills), botany-101 (44 s Reel). Callout `point` coordinates are in output pixels; check every render visually.
- Remotion's licence is free for companies of up to 3 people.

## Sunday reels (Remotion, `remotion/src/reels/specs.ts`, rendered to `videos/`)
- Done: Botany 101 v2 (18 Oct), Did you know? v2 (25 Oct), Stem or root? (1 Nov), Pepper or not? (8 Nov), The lantern (15 Nov), Breakfast table (22 Nov), Every plant has a signature (6 Dec), NSX score teaser (13 Dec), Holiday table (27 Dec), Nightshade or not? (10 Jan).
- Render one: `npx remotion render src/index.ts <id> out/<id>.mp4 --codec=h264 --crf=18`, then `ffmpeg -i out/<id>.mp4 -c copy -movflags +faststart ../videos/nightshade-<id>-en.mp4`.
- Scene transitions (`transition` in a scene spec): `fade`, `zoom` (push into the next shot), `dot` (a saffron dot travels a dotted path from the last shot's subject to the next). Quiz shots open blurred with a saffron marker ring on the item, then sharpen on the answer.
- The Lantern reel uses `LanternToLogo`: the brand-style sepals hang as a translucent lantern around a glowing saffron berry, then open into the logo. Other logo moments use `LogoReveal` (engine.tsx), which follows the design system's motion rules. The petals grow in 80 ms apart and the saffron dot pops with one overshoot. One sepal sinks to shade, then the mark turns 72° to rest over 600 ms. Never use the K3 curl (scanning) or the K6 NSX-lit states.
- Carousel: `carousel-nightshade-or-not` renders one 6480×1350 panorama, cut into 6 slides in `images/carousel-nightshade-or-not/`. Dotted paths cross the slide edges.
- Arabic: `botany-101-ar` (same composition with `lang: "ar"`; `LangCtx` in kit.tsx switches text to Alexandria, right-to-left, and the Arabic lockup) → `videos/nightshade-botany-101-v2-ar.mp4`. To do: Arabic versions of the other reels.

## HyperFrames pipeline (`hyperframes/`, HTML → MP4)
- `where-from/`: "Where do nightshades come from?" (29 Nov), a 25 s silent map reel built with HyperFrames' faceless-explainer workflow → `videos/nightshade-where-from-en.mp4`. On-screen copy edited with the Humanizer skill.
- Edit `scripts/01-journey.src.html` or `scripts/build-map.mjs`, then `npm install`, `npm run build:map`, `npx hyperframes lint && npx hyperframes check`, `npx hyperframes render --output renders/video.mp4`, and the faststart re-mux into `videos/`.
