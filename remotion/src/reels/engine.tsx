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
  /** How this scene enters: crossfade (default), zoom-through, or a travelling saffron dot from the previous scene. */
  transition?: 'fade' | 'zoom' | 'dot';
  /** Where the travelling dot leaves from / lands on this scene. Defaults to origin, then the first callout point. */
  anchor?: [number, number];
  /** Blur-to-sharp: the photo starts blurred and comes into focus when the answer lands. */
  reveal?: boolean;
};

type Transition = NonNullable<SceneSpec['transition']>;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Wraps a scene with its entry and exit transition. Zoom-through: the outgoing scene pushes in and blurs, the incoming one settles from a slight zoom. */
const Fade: React.FC<{children: React.ReactNode; inT?: Transition; outT?: Transition; origin?: [number, number]}> = ({children, inT = 'fade', outT = 'fade', origin = [540, 960]}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const o = interpolate(f, [0, FADE, d - FADE, d], [0, 1, 1, 0], clamp);
  const zIn = inT === 'zoom' ? interpolate(f, [0, FADE + 6], [1.22, 1], {...clamp, easing: EASE}) : 1;
  const zOut = outT === 'zoom' ? interpolate(f, [d - FADE - 4, d], [1, 1.6], {...clamp, easing: (t) => t * t}) : 1;
  const blur = (inT === 'zoom' ? interpolate(f, [0, FADE], [14, 0], clamp) : 0) + (outT === 'zoom' ? interpolate(f, [d - FADE, d], [0, 16], clamp) : 0);
  return (
    <AbsoluteFill style={{opacity: o, transform: `scale(${zIn * zOut})`, transformOrigin: `${origin[0]}px ${origin[1]}px`, filter: blur ? `blur(${blur}px)` : undefined}}>
      {children}
    </AbsoluteFill>
  );
};

/** Travelling saffron dot: draws a dotted, looping path from one scene's anchor into the next. */
const DOT_FRAMES = 30;
const TravellingDot: React.FC<{from: [number, number]; to: [number, number]}> = ({from, to}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, 22], [0, 1], {...clamp, easing: EASE});
  const fade = interpolate(f, [22, DOT_FRAMES], [1, 0], clamp);
  // Cubic bezier with control points pulled up and across, so the path makes a loose loop.
  const c1: [number, number] = [from[0] + 520, from[1] - 760];
  const c2: [number, number] = [to[0] - 520, to[1] - 760];
  const at = (u: number): [number, number] => {
    const v = 1 - u;
    return [0, 1].map((k) => v * v * v * from[k] + 3 * v * v * u * c1[k] + 3 * v * u * u * c2[k] + u * u * u * to[k]) as [number, number];
  };
  const dots = Array.from({length: 60}, (_, i) => i / 59).filter((u) => u <= t);
  const head = at(t);
  return (
    <svg style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', opacity: fade}}>
      {dots.map((u, i) => {
        const [x, y] = at(u);
        return <circle key={i} cx={x} cy={y} r={5} fill={C.saffron} fillOpacity={0.75} />;
      })}
      <circle cx={head[0]} cy={head[1]} r={30} fill={C.saffron} fillOpacity={0.25} />
      <circle cx={head[0]} cy={head[1]} r={14} fill={C.saffron} />
    </svg>
  );
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

/** Pulsing saffron ring that marks which item a quiz question is about. */
const Marker: React.FC<{at: [number, number]}> = ({at}) => {
  const f = useCurrentFrame();
  const p = useIn(6, 14);
  const pulse = 1 + 0.12 * Math.sin(f / 5);
  return (
    <svg style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', opacity: p}}>
      <circle cx={at[0]} cy={at[1]} r={70 * pulse} fill="none" stroke={C.saffron} strokeWidth={6} />
      <circle cx={at[0]} cy={at[1]} r={12} fill={C.saffron} />
    </svg>
  );
};

const PhotoScene: React.FC<{s: SceneSpec; outT?: Transition}> = ({s, outT}) => {
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
  const revealAt = s.answer?.at ?? 30;
  const photoBlur = s.reveal ? interpolate(f, [0, revealAt - 6, revealAt + 4], [30, 24, 0], clamp) : 0;
  return (
    <Fade inT={s.transition} outT={outT} origin={origin}>
      <AbsoluteFill style={{filter: photoBlur ? `blur(${photoBlur}px)` : undefined}}>
        <Photo src={`photos/${s.photo}`} zoom={zoom} origin={origin} textAt={textAt} dim={s.dim} />
      </AbsoluteFill>
      <Lockup />
      {textAt === 'top' ? (
        <div style={{position: 'absolute', left: 72, right: 72, top: 230}}>{text}</div>
      ) : (
        <div style={{position: 'absolute', left: 72, right: 72, bottom: 180}}>{text}</div>
      )}
      {s.callouts?.map((c, i) => <Callout key={i} {...c} point={c.point && move(c.point)} at={c.at ?? 24 + i * 18} />)}
      {s.answer && s.origin && <Marker at={s.origin} />}
      {s.answer && <Answer {...s.answer} at={s.answer.at ?? 30} />}
    </Fade>
  );
};

// K1 Crown, geometry from the design system (Mark component). Index 1 is the sepal that sinks to shade.
const K1 = [
  'M50.00,46.00 C41.38,37.36 45.88,13.60 50.00,1.00 C54.12,13.60 58.62,37.36 50.00,46.00Z',
  'M53.80,48.76 C59.36,37.89 83.34,34.83 96.60,34.86 C85.89,42.67 64.69,54.30 53.80,48.76Z',
  'M52.35,53.24 C64.41,55.16 74.73,77.02 78.80,89.64 C68.06,81.87 50.45,65.30 52.35,53.24Z',
  'M47.65,53.24 C49.55,65.30 31.94,81.87 21.20,89.64 C25.27,77.02 35.59,55.16 47.65,53.24Z',
  'M46.20,48.76 C35.31,54.30 14.11,42.67 3.40,34.86 C16.66,34.83 40.64,37.89 46.20,48.76Z',
];
const mix = (a: string, b: string, t: number) => {
  const ch = (h: string, i: number) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  return '#' + [0, 1, 2].map((i) => Math.round(ch(a, i) + (ch(b, i) - ch(a, i)) * t).toString(16).padStart(2, '0')).join('');
};

// Brand logo reveal (dur-reveal 1200 ms): petals grow out 80 ms apart, the saffron dot pops
// (one overshoot only), one sepal sinks to shade; then the launch turn (dur-launch 600 ms, 72°) to rest.
export const LogoReveal: React.FC<{at?: number; size: number; style?: React.CSSProperties}> = ({at = 0, size, style}) => {
  const f = useCurrentFrame() - at;
  const k = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
  const petal = (i: number) => interpolate(f, [i * 2.4, i * 2.4 + 14], [0, 1], {...k, easing: EASE});
  const dot = interpolate(f, [16, 23, 28], [0, 1.12, 1], {...k, easing: EASE});
  const sink = interpolate(f, [24, 36], [0, 1], {...k, easing: EASE});
  const turn = interpolate(f, [36, 54], [-72, 0], {...k, easing: EASE});
  const glow = interpolate(f, [16, 40, 90], [0, 0.55, 0.32], k);
  return (
    <div style={{position: 'absolute', width: size, height: size, ...style}}>
      <div style={{position: 'absolute', inset: -size * 0.45, borderRadius: '50%', opacity: glow, background: `radial-gradient(circle, ${C.saffron}33 0%, ${C.brand}14 38%, transparent 68%)`}} />
      <svg viewBox="0 0 100 100" width={size} height={size} style={{position: 'absolute', inset: 0, transform: `rotate(${turn}deg)`}}>
        <g transform="translate(50 50) scale(0.93) translate(-50 -50)">
          {K1.map((d, i) => {
            const p = petal(i);
            const fill = i === 1 ? mix(C.brand, C.shade, sink) : C.brand;
            const s = 0.2 + 0.8 * p - (i === 1 ? 0.04 * sink : 0);
            return <path key={i} d={d} fill={fill} opacity={p} transform={`translate(50 50) scale(${s}) translate(-50 -50)`} />;
          })}
          <circle cx={50} cy={50} r={8} fill={C.saffron} transform={`translate(50 50) scale(${dot}) translate(-50 -50)`} />
        </g>
      </svg>
    </div>
  );
};

const MarkScene: React.FC<{s: SceneSpec; outT?: Transition}> = ({s, outT}) => (
  <Fade inT={s.transition} outT={outT}>
    <AbsoluteFill style={{background: C.bg}} />
    <LogoReveal at={8} size={460} style={{left: 540 - 230, top: 540}} />
    <div style={{position: 'absolute', left: 72, right: 72, top: 1120, textAlign: 'center'}}>
      {s.overline && <Rise at={40}><Overline>{s.overline}</Overline></Rise>}
      {s.headline && <Rise at={50}><Headline size={s.size ?? 104} style={{marginTop: 22}}>{s.headline}</Headline></Rise>}
      {s.sub && <Rise at={62}><Sub style={{marginTop: 28}}>{s.sub}</Sub></Rise>}
    </div>
  </Fade>
);

export const EndScene: React.FC<{s: SceneSpec; outT?: Transition}> = ({s, outT}) => {
  const p = useIn(8, 40);
  return (
    <Fade inT={s.transition} outT={outT}>
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

const anchorOf = (s: SceneSpec): [number, number] => s.anchor ?? s.origin ?? s.callouts?.find((c) => c.point)?.point ?? [540, 1150];

export const Reel: React.FC<{scenes: SceneSpec[]}> = ({scenes}) => {
  let from = 0;
  const els: React.ReactNode[] = [];
  scenes.forEach((s, i) => {
    const d = Math.round(s.sec * FPS);
    const outT = scenes[i + 1]?.transition;
    els.push(
      <Sequence key={i} from={from} durationInFrames={d}>
        {s.kind === 'end' ? <EndScene s={s} outT={outT} /> : s.kind === 'mark' ? <MarkScene s={s} outT={outT} /> : <PhotoScene s={s} outT={outT} />}
      </Sequence>,
    );
    if (s.transition === 'dot' && i > 0) {
      els.push(
        <Sequence key={`dot${i}`} from={from - 6} durationInFrames={DOT_FRAMES}>
          <TravellingDot from={anchorOf(scenes[i - 1])} to={anchorOf(s)} />
        </Sequence>,
      );
    }
    from += d - FADE;
  });
  return <AbsoluteFill style={{background: C.bg, fontFamily: SANS}}>{els}</AbsoluteFill>;
};
