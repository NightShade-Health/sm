import React from 'react';
import {AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, EASE, MONO, SANS} from '../brand';
import {Callout, Handle, Headline, Lockup, Overline, Photo, Rise, Sub, Tone, useIn} from '../kit';

// Scene-based 1080x1920 Reels. Each reel is a list of SceneSpecs (see specs.ts).
export const FPS = 30;
const FADE = 12;

export type CalloutSpec = {x: number; y: number; title: string; detail?: string; chip?: string; tone?: Tone; point?: [number, number]; at?: number; width?: number};

export type SceneSpec = {
  /** Seconds on screen (crossfades overlap the next scene by FADE frames). */
  sec: number;
  kind?: 'photo' | 'mark' | 'end';
  photo?: string;
  textAt?: 'top' | 'bottom';
  /** Push-in from/to scale, around `origin` (output pixels). Callout points follow the zoom. */
  zoom?: [number, number];
  origin?: [number, number];
  dim?: number;
  overline?: string;
  headline?: string;
  size?: number;
  sub?: string;
  callouts?: CalloutSpec[];
  /** Quiz reveal: a big chip that stamps in at `at` frames. */
  answer?: {text: string; tone: Tone; at?: number; note?: string};
};

const Fade: React.FC<{children: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const o = interpolate(f, [0, FADE, d - FADE, d], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{opacity: o}}>{children}</AbsoluteFill>;
};

const Answer: React.FC<{text: string; tone: Tone; at: number; note?: string}> = ({text, tone, at, note}) => {
  const p = useIn(at, 14);
  const style: React.CSSProperties =
    tone === 'no'
      ? {border: `3px solid ${C.muted}`, color: C.text, background: 'rgba(14,20,18,.82)'}
      : {background: tone === 'keep' ? C.brand : C.saffron, color: C.bg};
  return (
    <div style={{position: 'absolute', left: 72, right: 72, bottom: 230, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 26}}>
      <div style={{fontFamily: MONO, fontSize: 52, padding: '18px 34px', borderRadius: 18, opacity: p, transform: `scale(${1.25 - 0.25 * p})`, transformOrigin: 'left center', ...style}}>
        {tone === 'no' ? '✕ ' : '✓ '}
        {text}
      </div>
      {note && <Rise at={at + 10}><Sub style={{fontSize: 38}}>{note}</Sub></Rise>}
    </div>
  );
};

const PhotoScene: React.FC<{s: SceneSpec}> = ({s}) => {
  const f = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const zoom = s.zoom ?? [1.0, 1.06];
  const origin = s.origin ?? [540, 960];
  const k = interpolate(f, [0, durationInFrames - 1], zoom);
  const move = (p: [number, number]): [number, number] => [origin[0] + (p[0] - origin[0]) * k, origin[1] + (p[1] - origin[1]) * k];
  const textAt = s.textAt ?? 'top';
  const text = (
    <>
      {s.overline && <Rise at={4}><Overline>{s.overline}</Overline></Rise>}
      {s.headline && <Rise at={10}><Headline size={s.size ?? 112} style={{marginTop: s.overline ? 22 : 0}}>{s.headline}</Headline></Rise>}
      {s.sub && <Rise at={22}><Sub style={{marginTop: 28, maxWidth: 900}}>{s.sub}</Sub></Rise>}
    </>
  );
  return (
    <Fade>
      <Photo src={`photos/${s.photo}`} zoom={zoom} origin={origin} textAt={textAt} dim={s.dim} />
      <Lockup />
      {textAt === 'top' ? (
        <div style={{position: 'absolute', left: 72, right: 72, top: 230}}>{text}</div>
      ) : (
        <div style={{position: 'absolute', left: 72, right: 72, bottom: 180}}>{text}</div>
      )}
      {s.callouts?.map((c, i) => <Callout key={i} {...c} point={c.point && move(c.point)} at={c.at ?? 24 + i * 18} />)}
      {s.answer && <Answer {...s.answer} at={s.answer.at ?? 30} />}
    </Fade>
  );
};

const MarkScene: React.FC<{s: SceneSpec}> = ({s}) => {
  const p = useIn(6, 36);
  return (
    <Fade>
      <AbsoluteFill style={{background: C.bg}} />
      <Img src={staticFile('brand/mark.svg')} style={{position: 'absolute', left: 540 - 220, top: 560, width: 440, height: 440, opacity: p, transform: `rotate(${(1 - p) * -72}deg) scale(${0.6 + 0.4 * p})`}} />
      <div style={{position: 'absolute', left: 72, right: 72, top: 1120, textAlign: 'center'}}>
        {s.overline && <Rise at={20}><Overline>{s.overline}</Overline></Rise>}
        {s.headline && <Rise at={30}><Headline size={s.size ?? 104} style={{marginTop: 22}}>{s.headline}</Headline></Rise>}
        {s.sub && <Rise at={44}><Sub style={{marginTop: 28}}>{s.sub}</Sub></Rise>}
      </div>
    </Fade>
  );
};

export const EndScene: React.FC<{s: SceneSpec}> = ({s}) => {
  const p = useIn(8, 40);
  return (
    <Fade>
      <AbsoluteFill style={{background: C.bg}} />
      <Img src={staticFile('brand/mark.svg')} style={{position: 'absolute', left: -300, top: 260, width: 1100, height: 1100, opacity: 0.16 * p, transform: `rotate(${(1 - p) * -40}deg)`}} />
      <div style={{position: 'absolute', left: 72, right: 72, top: 600}}>
        <Rise at={10}><Img src={staticFile('brand/lockup-en.svg')} style={{height: 110}} /></Rise>
        <Rise at={24}><Headline size={s.size ?? 108} style={{marginTop: 80}}>{s.headline ?? 'Know before you bite.'}</Headline></Rise>
        {s.sub && <Rise at={40}><Sub style={{marginTop: 36}}>{s.sub}</Sub></Rise>}
      </div>
      <div style={{position: 'absolute', left: 72, bottom: 150}}><Rise at={54}><Handle style={{fontSize: 34}} /></Rise></div>
    </Fade>
  );
};

export const reelFrames = (scenes: SceneSpec[]) => scenes.reduce((n, s) => n + Math.round(s.sec * FPS) - FADE, FADE);

export const Reel: React.FC<{scenes: SceneSpec[]}> = ({scenes}) => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: C.bg, fontFamily: SANS}}>
      {scenes.map((s, i) => {
        const d = Math.round(s.sec * FPS);
        const el = (
          <Sequence key={i} from={from} durationInFrames={d}>
            {s.kind === 'end' ? <EndScene s={s} /> : s.kind === 'mark' ? <MarkScene s={s} /> : <PhotoScene s={s} />}
          </Sequence>
        );
        from += d - FADE;
        return el;
      })}
    </AbsoluteFill>
  );
};
