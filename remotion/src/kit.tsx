import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ARABIC, C, EASE, MONO, SANS} from './brand';

/** On-screen language. 'ar' switches text to Alexandria, right-to-left, and the Arabic lockup. */
export const LangCtx = React.createContext<'en' | 'ar'>('en');
export const useAr = () => React.useContext(LangCtx) === 'ar';
const AR_TEXT: React.CSSProperties = {fontFamily: ARABIC, letterSpacing: 0, direction: 'rtl'};

/** 0→1 progress for an element that enters at `at` frames and takes `dur` frames. */
export const useIn = (at = 0, dur = 18) => {
  const f = useCurrentFrame();
  // Stills have a single frame: show everything in its final state.
  if (useVideoConfig().durationInFrames === 1) return 1;
  return interpolate(f, [at, at + dur], [0, 1], {easing: EASE, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
};

/** Full-bleed photo with a slow push-in and the landing page's bottom-up darkening. */
export const Photo: React.FC<{src: string; zoom?: [number, number]; focus?: string; dim?: number; textAt?: 'top' | 'bottom'; origin?: [number, number]}> = ({
  src,
  zoom = [1.04, 1.12],
  focus = 'center',
  dim = 0.82,
  textAt = 'bottom',
  origin,
}) => {
  const f = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const s = interpolate(f, [0, Math.max(1, durationInFrames - 1)], zoom);
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: focus, transform: `scale(${s})`, transformOrigin: origin ? `${origin[0]}px ${origin[1]}px` : 'center'}} />
      {/* Darken behind the text, as on the landing page; a lighter vignette on the opposite edge. */}
      <AbsoluteFill
        style={{
          background:
            textAt === 'bottom'
              ? `linear-gradient(to top, ${C.bg} 0%, rgba(7,9,10,${dim}) 42%, rgba(7,9,10,0) 72%)`
              : `linear-gradient(to bottom, ${C.bg} 0%, rgba(7,9,10,${dim}) 30%, rgba(7,9,10,0) 58%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            textAt === 'bottom'
              ? 'linear-gradient(to bottom, rgba(7,9,10,.85) 0%, rgba(7,9,10,0) 22%)'
              : 'linear-gradient(to top, rgba(7,9,10,.9) 0%, rgba(7,9,10,0) 26%)',
        }}
      />
    </AbsoluteFill>
  );
};

export const Lockup: React.FC<{top?: number; height?: number}> = ({top = 72, height = 64}) =>
  useAr() ? (
    <Img src={staticFile('brand/lockup-ar.svg')} style={{position: 'absolute', top, right: 72, height}} />
  ) : (
    <Img src={staticFile('brand/lockup-en.svg')} style={{position: 'absolute', top, left: 72, height}} />
  );

export const Overline: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 30, letterSpacing: '.18em', textTransform: 'uppercase', color: C.brand, ...(useAr() ? {...AR_TEXT, fontSize: 36} : {}), ...style}}>
    {children}
  </div>
);

export const Headline: React.FC<{children: React.ReactNode; size?: number; style?: React.CSSProperties}> = ({children, size = 112, style}) => (
  <div style={{fontFamily: SANS, fontWeight: 700, fontSize: size, lineHeight: 1, letterSpacing: '-.03em', color: C.text, ...(useAr() ? {...AR_TEXT, lineHeight: 1.3} : {}), ...style}}>
    {children}
  </div>
);

export const Sub: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{fontFamily: SANS, fontSize: 40, lineHeight: 1.45, color: C.sub, ...(useAr() ? {...AR_TEXT, lineHeight: 1.6} : {}), ...style}}>{children}</div>
);

export const Arabic: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div dir="rtl" style={{fontFamily: ARABIC, fontSize: 44, lineHeight: 1.5, color: C.sub, ...style}}>
    {children}
  </div>
);

/** The landing page's accent block: green start border, bold line + softer line. */
export const Note: React.FC<{strong: string; soft?: string; style?: React.CSSProperties}> = ({strong, soft, style}) => (
  <div style={{borderLeft: `4px solid ${C.brand}`, paddingLeft: 28, ...style}}>
    <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 38, color: C.text}}>{strong}</div>
    {soft && <div style={{fontFamily: SANS, fontSize: 32, color: C.sub, marginTop: 6}}>{soft}</div>}
  </div>
);

export type Tone = 'yes' | 'no' | 'keep';

/** Pill like the landing callouts' chips. 'yes' = saffron (nightshade), 'no' = muted outline, 'keep' = brand green. */
export const Chip: React.FC<{tone?: Tone; children: React.ReactNode}> = ({tone = 'yes', children}) => {
  const styles: Record<Tone, React.CSSProperties> = {
    yes: {background: C.saffron, color: C.bg},
    keep: {background: C.brand, color: C.bg},
    no: {border: `2px solid ${C.muted}`, color: C.muted},
  };
  return (
    <span style={{fontFamily: useAr() ? ARABIC : MONO, fontSize: 26, padding: '6px 16px', borderRadius: 10, whiteSpace: 'nowrap', ...styles[tone]}}>{children}</span>
  );
};

/**
 * Glass callout card in the style of the landing page hero:
 * title on top, a mono "→ detail" line and a chip, with a dot + connector pointing at `point`.
 */
export const Callout: React.FC<{
  x: number;
  y: number;
  title: string;
  detail?: string;
  chip?: string;
  tone?: Tone;
  point?: [number, number];
  at?: number;
  width?: number;
}> = ({x, y, title, detail, chip, tone = 'yes', point, at = 0, width}) => {
  const p = useIn(at, 20);
  const ar = useAr();
  const cardH = detail || chip ? 132 : 92;
  // Connect to the top or bottom edge when the point sits above or below the card, otherwise to the left edge.
  const edgeX = point ? Math.max(x + 40, Math.min(point[0], x + (width ?? 360) - 40)) : x;
  const anchor: [number, number] = !point
    ? [x, y]
    : point[1] < y
      ? [edgeX, y]
      : point[1] > y + cardH
        ? [edgeX, y + cardH]
        : [x, y + cardH / 2];
  return (
    <>
      {point && (
        <svg style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', opacity: p}}>
          <line
            x1={point[0]}
            y1={point[1]}
            x2={point[0] + (anchor[0] - point[0]) * p}
            y2={point[1] + (anchor[1] - point[1]) * p}
            stroke="rgba(236,244,239,.55)"
            strokeWidth={2}
          />
          <circle cx={point[0]} cy={point[1]} r={9} fill={C.saffron} />
          <circle cx={point[0]} cy={point[1]} r={18} fill="none" stroke={C.saffron} strokeOpacity={0.4} strokeWidth={2} />
        </svg>
      )}
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width,
          opacity: p,
          transform: `translateY(${(1 - p) * 24}px)`,
          padding: '22px 28px',
          borderRadius: 22,
          background: 'rgba(14,20,18,.78)',
          border: `1.5px solid ${C.border}`,
          boxShadow: '0 20px 60px rgba(0,0,0,.45)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, letterSpacing: '-.02em', color: C.text, whiteSpace: 'nowrap', ...(ar ? AR_TEXT : {})}}>{title}</div>
        {(detail || chip) && (
          <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 10, direction: ar ? 'rtl' : 'ltr'}}>
            {detail && (ar && /[\u0600-\u06FF]/.test(detail)
              ? <span style={{fontFamily: ARABIC, fontSize: 28, color: C.sub, whiteSpace: 'nowrap'}}>← {detail}</span>
              : <span style={{fontFamily: MONO, fontSize: 28, color: C.sub, whiteSpace: 'nowrap', direction: 'ltr'}}>{ar ? '' : '→ '}{detail}</span>)}
            {chip && <Chip tone={tone}>{chip}</Chip>}
          </div>
        )}
      </div>
    </>
  );
};

/** Fade + rise wrapper for text blocks. */
export const Rise: React.FC<{at?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at = 0, children, style}) => {
  const p = useIn(at, 20);
  return <div style={{opacity: p, transform: `translateY(${(1 - p) * 40}px)`, ...style}}>{children}</div>;
};

export const Handle: React.FC<{text?: string; style?: React.CSSProperties}> = ({text = '@nightshade.health', style}) => (
  <div style={{fontFamily: MONO, fontSize: 28, letterSpacing: '.08em', color: C.muted, ...style}}>{text}</div>
);
