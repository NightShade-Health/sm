---
format: 1080x1920
duration: 25s
message: "Tomatoes, potatoes and peppers came from the Americas, eggplant from Asia, and today they share one pan in Cairo."
arc: Question → Americas → Atlantic crossing → Asia → Cairo pan → Brand
audience: NightShade Health followers on Instagram, Facebook and Threads
mode: autonomous
music: none
---

## Video direction

- **Palette:** frame.md with the NightShade overrides. Ground #07090A; land #0E1412 with a #6EC38C hairline edge at low opacity; faint graticule; text #ECF4EF, sub #C4D6CC, overline #6EC38C; saffron #E9B949 only for pins, routes, route heads and the "1500s" label.
- **Motion grammar:** one ease everywhere, cubic-bezier(.2,.8,.2,1). One continuous virtual camera (single camera state: centre + zoom) over one world map for beats 1-5; no cuts. Text blocks swap with a rise/fade (blur 8→0 px, y +24→0); old block leaves with a short fade. Pins pop once with one pulse ring that settles. Routes draw on as dotted saffron curves with a travelling head dot.
- **Reveal model (silent film):** reveals are paced to the beat — each pin, route and label arrives after the camera lands, never all at t=0.
- **Holds:** every beat ends on a short held read (≥1 s still after its last reveal). The end card is a deliberate hold.
- **Negative list:** no phones, app screens, barcodes, scan lines or scanning; nothing about NSX; no health claims; never the word "Safe"; no facts beyond the brief copy; no bounces, no floating screensaver drift, no front-loaded slide.
- **Keep-out:** all content above y ≈ 1600 (83%).

## Frame 1 — Where nightshades come from

- scene: One dark world map; a camera flies Americas → Atlantic → South Asia → Cairo while saffron pins and dotted routes trace the nightshades, ending on the brand card
- duration: 25s
- poster: 6.5s
- transition_in: cut
- status: animated
- voiceover: (silent — on-screen copy only)
- src: compositions/frames/01-journey.html
- type: hook
- beat: comprehension
- blueprint: spatial-pan-stations (Adapt)
- focal: the world map with saffron pins and routes
- roles: world map (land + faint graticule) = background · pins, routes, label cards = foreground subject · headline blocks + lockup = supporting

Adapt: keep the signature — stations pre-placed on one oversized canvas (the world map), one virtual camera traversing them with a callout revealed at every stop, landing held on the last. Change: stops are geographic, the camera also zooms (pull-out over the Atlantic, pull-out-and-in on the long Atlantic→Asia move), callouts are glass label cards, and leading lines are dotted saffron routes (svg-path-draw) rather than hand-drawn arrows. Single frame because the brief requires one continuous map with no cuts; the six beats are the Scene windows below.

Scene 1 (0.0–3.5s): whole world fades in and eases into place (slight zoom-in). Small lockup top-left. Upper-third text block: green overline "BOTANY 101", headline "Where do nightshades come from?" rises in at 0.3s. Hold.
Scene 2 (3.5–8.0s): headline swaps to "Tomatoes, potatoes and peppers started in the Americas." (upper third). Camera flies to the Americas (3.5–5.1s). Pins pop one by one after landing, each with a glass card: Potato / the Andes (Peru), Tomato (Mexico), Peppers (Mexico). Hold.
Scene 3 (8.0–13.0s): headline swaps to "Ships carried them across the Atlantic in the 1500s." Cards fade, pins stay; camera pulls out over the Atlantic (8.0–9.6s). Three dotted routes draw from the American pins to Spain, staggered, with head dots; Spain pin pops as the first route lands; mono "1500s" label fades in near the routes. Hold.
Scene 4 (13.0–18.0s): headline "Eggplant came from Asia." + sub "Arab traders brought it to the Mediterranean in the Middle Ages." Camera pulls out and in to South Asia (13.0–14.9s). Eggplant pin + card "Eggplant / Asia" over India; a dotted route draws west through the Middle East to the Mediterranean. Hold.
Scene 5 (18.0–21.5s): text moves to the lower third: overline "CAIRO", headline "Eggplant, tomato and pepper now share one pan of mesa'a'a." Camera to Egypt (18.0–19.6s); two routes (from Spain and from the eastern Mediterranean) converge on a Cairo pin that pops on arrival. Hold.
Scene 6 (21.5–25.0s): end card. Map, pins and routes dim; the small lockup travels to a large lockup at left; headline "Know before you bite."; handle "@nightshade.health" in mono at bottom left. Held to the end.
