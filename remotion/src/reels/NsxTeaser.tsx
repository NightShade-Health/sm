import React from 'react';
import {AbsoluteFill, Img, interpolate, random, staticFile, useCurrentFrame} from 'remotion';
import {C, EASE, MONO, SANS} from '../brand';
import {Handle, Headline, Lockup, Overline, Photo, Rise, Sub, useIn} from '../kit';

// 13 Dec teaser. Tease only: never says what NSX stands for or what the number measures.
export const NSX_FRAMES = 540;

const Letter: React.FC<{ch: string; at: number}> = ({ch, at}) => {
  const p = useIn(at, 16);
  return <span style={{display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * 60}px)`}}>{ch}</span>;
};

export const NsxTeaser: React.FC = () => {
  const f = useCurrentFrame();
  const mark = useIn(10, 40);
  // A number that keeps spinning and never lands, blurred so no value can be read.
  const spinning = f >= 200 && f < 430;
  const digit = Math.floor(random(`d${Math.floor(f / 2)}`) * 10);
  const blur = interpolate(f, [200, 260, 400, 430], [24, 10, 10, 30], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const numIn = useIn(200, 20);
  const outro = interpolate(f, [420, 440], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: C.bg, fontFamily: SANS}}>
      <AbsoluteFill style={{opacity: 0.35}}>
        <Photo src="photos/label-aisle.jpg" zoom={[1.15, 1.3]} textAt="bottom" dim={0.95} />
      </AbsoluteFill>
      <Lockup />
      <div style={{opacity: outro}}>
        <Img src={staticFile('brand/mark.svg')} style={{position: 'absolute', left: 540 - 130, top: 430, width: 260, height: 260, opacity: mark, transform: `rotate(${(1 - mark) * -144}deg) scale(${0.5 + 0.5 * mark})`}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 760, textAlign: 'center', fontFamily: SANS, fontWeight: 700, fontSize: 300, letterSpacing: '-.04em', color: C.text}}>
          <Letter ch="N" at={60} />
          <Letter ch="S" at={78} />
          <Letter ch="X" at={96} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 1120, textAlign: 'center'}}>
          <Rise at={130}><Overline>Three letters</Overline></Rise>
        </div>
        {spinning && (
          <div style={{position: 'absolute', left: 0, right: 0, top: 1240, textAlign: 'center', fontFamily: MONO, fontSize: 220, color: C.saffron, opacity: numIn, filter: `blur(${blur}px)`}}>
            {digit}
          </div>
        )}
        <div style={{position: 'absolute', left: 0, right: 0, top: 1560, textAlign: 'center'}}>
          <Rise at={280}><Sub>One number. Not yet.</Sub></Rise>
        </div>
      </div>
      {f >= 430 && (
        <div style={{position: 'absolute', left: 72, right: 72, top: 820, textAlign: 'center'}}>
          <Rise at={438}><Overline>Coming soon</Overline></Rise>
          <Rise at={448}><Headline size={124} style={{marginTop: 26}}>The NSX score.</Headline></Rise>
          <Rise at={470}><Handle style={{marginTop: 60, fontSize: 34}} /></Rise>
        </div>
      )}
    </AbsoluteFill>
  );
};
