#!/usr/bin/env node
// build-map.mjs — precompute the world map + pin/route geometry at build time
// (deterministic: no d3 or network at render time) and inline it into the frame
// composition. Source: world-atlas@2 land-50m TopoJSON, Natural Earth projection.
//
//   node scripts/build-map.mjs
//   reads  scripts/01-journey.src.html  (template with /*__GEO__*/ and <!--__LAND__-->)
//   writes compositions/frames/01-journey.html
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { geoNaturalEarth1, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";

const require = createRequire(import.meta.url);
const topo = require("world-atlas/land-50m.json");
const WORLD_W = 2400;

let land = feature(topo, topo.objects.land);
// Drop Antarctica (never on camera) to keep the path small.
land = {
  type: "FeatureCollection",
  features: (land.type === "FeatureCollection" ? land.features : [land]).map((f) => ({
    ...f,
    geometry:
      f.geometry.type === "MultiPolygon"
        ? { type: "MultiPolygon", coordinates: f.geometry.coordinates.filter((poly) => Math.max(...poly[0].map((c) => c[1])) > -60) }
        : f.geometry,
  })),
};

const proj = geoNaturalEarth1().fitWidth(WORLD_W, { type: "Sphere" });
const path = geoPath(proj).digits(1);
const landD = path(land);
const gratD = path(geoGraticule10());
const sphereBounds = geoPath(proj).bounds({ type: "Sphere" });

const P = (lon, lat) => proj([lon, lat]).map((v) => Math.round(v * 100) / 100);

const pins = {
  potato: P(-72, -13),
  tomato: P(-99, 19),
  peppers: P(-96, 17),
  spain: P(-6, 37),
  india: P(79, 22),
  medEnd: P(25, 34), // open sea south of Crete: the route's Mediterranean landfall
  cairo: P(31.2, 30.0),
};

// Quadratic routes in projected space, sampled with cumulative arclength.
function route(a, ctrlLonLat, b, n = 240) {
  const c = P(...ctrlLonLat);
  const pts = [];
  let len = 0;
  for (let i = 0; i <= n; i++) {
    const t = i / n, u = 1 - t;
    const x = u * u * a[0] + 2 * u * t * c[0] + t * t * b[0];
    const y = u * u * a[1] + 2 * u * t * c[1] + t * t * b[1];
    if (i) len += Math.hypot(x - pts[i - 1][0], y - pts[i - 1][1]);
    pts.push([Math.round(x * 100) / 100, Math.round(y * 100) / 100, Math.round(len * 100) / 100]);
  }
  return pts;
}

const routes = {
  potatoSpain: route(pins.potato, [-32, 4], pins.spain),
  tomatoSpain: route(pins.tomato, [-52, 40], pins.spain),
  peppersSpain: route(pins.peppers, [-50, 28], pins.spain),
  indiaMed: route(pins.india, [52, 37], pins.medEnd),
  spainCairo: route(pins.spain, [12, 40], pins.cairo),
  medCairo: route(pins.medEnd, [29, 34.5], pins.cairo),
};

// Camera focus points (world px) for each beat.
const focus = {
  world: P(10, 12),
  americas: P(-80, 4),
  atlantic: P(-49, 15),
  southAsia: P(52, 26),
  cairo: P(14, 33),
};

const geo = { worldW: WORLD_W, bounds: sphereBounds, pins, routes, focus };
const src = readFileSync(new URL("./01-journey.src.html", import.meta.url), "utf8");
const out = src
  .replace("/*__GEO__*/", `const GEO = ${JSON.stringify(geo)};`)
  .replace("<!--__LAND__-->", `<path id="j01-grat" class="j01-grat" d="${gratD}"/><path id="j01-land" class="j01-land" d="${landD}"/>`);
writeFileSync(new URL("../compositions/frames/01-journey.html", import.meta.url), out);
console.log(`land path ${(landD.length / 1024).toFixed(0)} KB, graticule ${(gratD.length / 1024).toFixed(0)} KB, bounds ${JSON.stringify(sphereBounds)}`);
console.log(JSON.stringify(pins), JSON.stringify(focus));
