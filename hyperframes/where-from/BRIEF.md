---
workflow: faceless-explainer
flow: automation
storyboard: no
message: "Tomatoes, potatoes and peppers came from the Americas, eggplant from Asia, and today they share one pan in Cairo."
destination: instagram-reels
aspect: 1080x1920
language: en
audience: "NightShade Health followers on Instagram, Facebook and Threads (Egypt / Arabic-speaking region, English version)"
length: 25s
angle: narrative
narration: no
style_preset: brand (NightShade Health landing-page style, mapped onto a dark preset)
---

## Intent

A short, silent Botany 101 reel for NightShade Health's Sunday slot: where do
nightshades come from? One dark world map, a continuous camera that travels
Americas → Atlantic → South Asia → Cairo, saffron pins and dotted routes, and
short on-screen headlines. Calm, editorial, landing-page look; ends on the
brand lockup and "Know before you bite."

Brief written by the orchestrating agent from Mohamed's final brief; run
non-interactively (no intent interview, no questions). Derived mode: autonomous.

## Assets

- assets/brand/lockup-en.svg — NightShade Health lockup (from remotion/public/brand); top-left on every map beat, large on the end card.
- assets/fonts/ — Sora (headlines), Geist Mono (details, "1500s", handle).
- assets/map/land.svg path data — world-atlas@2 land-110m, projected with d3-geo at build time (static, deterministic).

## Customizations

- Output 1080x1920, 30 fps, H.264, no audio, ~25 s. Delivered to /home/user/sm/videos/nightshade-where-from-en.mp4 (faststart re-mux).
- One continuous map with camera moves between beats 1-5 (no hard cuts); text blocks swap with a short rise/fade (blur 8→0 px, y +24→0).
- Pins: saffron dots with one soft pulse ring that settles. Routes: dotted saffron curves that draw on with a travelling saffron head dot.
- Glass label cards: #131A18 at ~85% opacity, 1px border rgba(110,195,140,.32), radius 20, mono detail line.

## Scenes and exact copy (verbatim, already edited)

1. ~3.5 s. World map fades/zooms in. Overline "BOTANY 101". Headline "Where do nightshades come from?"
2. ~4.5 s. Camera to the Americas. Pins with label cards: "Potato" + "the Andes" (Peru ~13°S 72°W); "Tomato" (~19°N 99°W) and "Peppers" (~17°N 96°W) in Mexico. Headline "Tomatoes, potatoes and peppers started in the Americas."
3. ~5 s. Camera pulls out over the Atlantic; three dotted routes from the American pins to Spain (~37°N 6°W). Mono label "1500s". Headline "Ships carried them across the Atlantic in the 1500s."
4. ~5 s. Camera to South Asia. Pin "Eggplant" + "Asia" (India ~22°N 79°E). Dotted route west through the Middle East to the Mediterranean. Headline "Eggplant came from Asia." Sub "Arab traders brought it to the Mediterranean in the Middle Ages."
5. ~4 s. Camera to Egypt; routes converge on a Cairo pin (~30°N 31°E). Overline "CAIRO". Headline "Eggplant, tomato and pepper now share one pan of mesa'a'a."
6. ~3.5 s. End card: map dims, large lockup at left, headline "Know before you bite.", handle "@nightshade.health" in mono bottom left.

## Notes

- Brand tokens: bg #07090A, surface #0E1412, card #131A18, text #ECF4EF, sub #C4D6CC, muted #9DB5A8, green #6EC38C, shade #2E6A48, saffron #E9B949 (pins/routes and at most one highlight).
- One easing everywhere: cubic-bezier(.2,.8,.2,1). Nothing bounces more than once.
- Type: Sora bold ~96-110 px headlines, green uppercase letter-spaced overline ~30 px, sub #C4D6CC. Lockup ~64 px tall at (72,72). Left-aligned text, 72 px side margins, upper or lower third so the map stays visible.
- Content rules: no phones, app screens, barcodes, scan lines or scanning; nothing about NSX; no health or medical claims; never the word "Safe". No facts beyond the copy above.
- Silent: no narration, no music, no SFX.
