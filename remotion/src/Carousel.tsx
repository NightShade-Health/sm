import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {C, MONO, SANS} from './brand';
import {Chip, Handle, Headline, Overline, Sub} from './kit';

// Swipeable quiz carousel: one 6480x1350 panorama, cut into six 1080x1350 slides.
// A dotted saffron path runs from each question across the slide edge to its answer on the next slide.
export const SLIDE_W = 1080;
export const SLIDE_H = 1350;

type Item = {name: string; photo: string; at: [number, number]; yes: boolean};
export const QUIZ: Item[] = [
  {name: 'Tomato', photo: 'veg-flatlay-tall.jpg', at: [220, 1328], yes: true},
  {name: 'Sweet potato', photo: 'not-nightshades.jpg', at: [168, 1296], yes: false},
  {name: 'Black pepper', photo: 'peppercorns.jpg', at: [185, 1215], yes: false},
  {name: 'Goji berries', photo: 'goji-tomatoes.jpg', at: [421, 1523], yes: true},
];

const CARD_W = 900;
const CARD_H = 620;
const ZOOM = 1.7;

/** Rounded photo card cropped around one item of a 1080x1920 cover-fitted photo. */
const PhotoCard: React.FC<{item: Item; x: number; y: number}> = ({item, x, y}) => {
  const w = SLIDE_W * ZOOM;
  const h = 1920 * ZOOM;
  const left = Math.min(0, Math.max(CARD_W - w, CARD_W / 2 - item.at[0] * ZOOM));
  const top = Math.min(0, Math.max(CARD_H - h, CARD_H / 2 - item.at[1] * ZOOM));
  return (
    <div style={{position: 'absolute', left: x, top: y, width: CARD_W, height: CARD_H, borderRadius: 36, overflow: 'hidden', border: `2px solid ${C.border}`, boxShadow: '0 30px 80px rgba(0,0,0,.5)'}}>
      <Img src={staticFile(`photos/${item.photo}`)} style={{position: 'absolute', left, top, width: w, height: h, objectFit: 'cover'}} />
    </div>
  );
};

const Answer: React.FC<{item: Item; x: number}> = ({item, x}) => (
  <div style={{position: 'absolute', left: x + 150, top: 176, display: 'flex', alignItems: 'center', gap: 22}}>
    <span style={{fontWeight: 600, fontSize: 44, color: C.text, letterSpacing: '-.02em'}}>{item.name}</span>
    <Chip tone={item.yes ? 'yes' : 'no'}>{item.yes ? '✓ Nightshade' : '✕ Not a nightshade'}</Chip>
  </div>
);

/** Dotted bezier from the bottom of slide k, past the card's right edge, to the answer on slide k+1. */
const Path: React.FC<{k: number}> = ({k}) => {
  const x0 = SLIDE_W * k;
  const p0: [number, number] = [x0 + 760, 1250];
  const c1: [number, number] = [x0 + 1240, 1330];
  const c2: [number, number] = [x0 + 880, 150];
  const p1: [number, number] = [x0 + SLIDE_W + 96, 210];
  const pt = (u: number) => {
    const v = 1 - u;
    return [0, 1].map((i) => v * v * v * p0[i] + 3 * v * v * u * c1[i] + 3 * v * u * u * c2[i] + u * u * u * p1[i]);
  };
  return (
    <>
      {Array.from({length: 46}, (_, i) => pt(i / 45)).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={5.5} fill={C.saffron} fillOpacity={0.8} />
      ))}
      <circle cx={p1[0]} cy={p1[1]} r={30} fill={C.saffron} fillOpacity={0.25} />
      <circle cx={p1[0]} cy={p1[1]} r={14} fill={C.saffron} />
    </>
  );
};

export const NightshadeOrNotCarousel: React.FC = () => (
  <AbsoluteFill style={{background: C.bg, fontFamily: SANS}}>
    {/* Soft brand glow per slide */}
    {Array.from({length: 6}, (_, k) => (
      <div key={k} style={{position: 'absolute', left: SLIDE_W * k, top: 0, width: SLIDE_W, height: SLIDE_H, background: 'radial-gradient(800px 600px at 50% 45%, rgba(110,195,140,.08), transparent 70%)'}} />
    ))}

    {/* Slide 1: cover */}
    <Img src={staticFile('brand/lockup-en.svg')} style={{position: 'absolute', left: 72, top: 72, height: 64}} />
    <div style={{position: 'absolute', left: 72, right: SLIDE_W * 5 + 72, top: 300}}>
      <Overline>Quiz · 4 foods</Overline>
      <Headline size={128} style={{marginTop: 26}}>Nightshade or not?</Headline>
      <Sub style={{marginTop: 40, maxWidth: 820}}>Guess each one, then swipe. The answer waits on the next slide.</Sub>
    </div>
    <div style={{position: 'absolute', left: 72, top: 1196, fontFamily: MONO, fontSize: 30, color: C.muted}}>Swipe →</div>

    {/* Slides 2-5: questions (answers sit on the next slide) */}
    {QUIZ.map((item, i) => {
      const x = SLIDE_W * (i + 1);
      return (
        <React.Fragment key={item.name}>
          {i > 0 && <Answer item={QUIZ[i - 1]} x={x} />}
          <div style={{position: 'absolute', left: x + 90, top: 330}}>
            <Overline>Question {i + 1} of 4</Overline>
            <Headline size={110} style={{marginTop: 18}}>{item.name}?</Headline>
          </div>
          <PhotoCard item={item} x={x + 90} y={560} />
          <div style={{position: 'absolute', left: x + 90, top: 1226, fontFamily: MONO, fontSize: 30, color: C.muted}}>Swipe for the answer →</div>
        </React.Fragment>
      );
    })}

    {/* Slide 6: last answer + end card */}
    <Answer item={QUIZ[3]} x={SLIDE_W * 5} />
    <div style={{position: 'absolute', left: SLIDE_W * 5 + 72, right: 72, top: 470}}>
      <Img src={staticFile('brand/lockup-en.svg')} style={{height: 96}} />
      <Headline size={112} style={{marginTop: 70}}>How many did you get right?</Headline>
      <Sub style={{marginTop: 36}}>Comment your score out of 4 👇</Sub>
    </div>
    <div style={{position: 'absolute', left: SLIDE_W * 5 + 72, top: 1220}}><Handle /></div>

    {/* Dotted paths across the slide edges */}
    <svg style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible'}}>
      {[1, 2, 3, 4].map((k) => <Path key={k} k={k} />)}
    </svg>
  </AbsoluteFill>
);
