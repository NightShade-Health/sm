import {continueRender, delayRender, staticFile} from 'remotion';

const faces: [string, string, string][] = [
  ['Sora', 'brand/Sora-Variable.woff2', '100 800'],
  ['GeistMono', 'brand/GeistMono-500.woff2', '500'],
  ['Alexandria', 'brand/Alexandria.woff2', '100 900'],
];

const handle = delayRender('Loading brand fonts');
Promise.all(
  faces.map(([family, file, weight]) => {
    const face = new FontFace(family, `url(${staticFile(file)}) format("woff2")`, {weight});
    document.fonts.add(face);
    return face.load();
  }),
).then(() => continueRender(handle));
