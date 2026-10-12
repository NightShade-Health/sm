import React from 'react';
import {AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, EASE, MONO} from './brand';
import {Callout, Handle, Headline, Lockup, Overline, Photo, Rise, Sub, useIn} from './kit';

// 1080x1920 Reel, 30 fps. Photo-led remake of "Botany 101" in the landing page style.
const FADE = 15;

/** Crossfades a scene in and out over FADE frames. */
const Scene: React.FC<{children: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const o = interpolate(f, [0, FADE, d - FADE, d], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{opacity: o}}>{children}</AbsoluteFill>;
};

const Bottom: React.FC<{children: React.ReactNode; bottom?: number}> = ({children, bottom = 180}) => (
  <div style={{position: 'absolute', left: 72, right: 72, bottom}}>{children}</div>
);
const Top: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{position: 'absolute', left: 72, right: 72, top: 230}}>{children}</div>
);

const Intro: React.FC = () => {
  const latin = useIn(40, 36);
  return (
    <Scene>
      <Photo src="photos/veg-flatlay-tall.jpg" textAt="top" zoom={[1.0, 1.08]} />
      <Lockup />
      <Top>
        <Rise at={8}><Overline>Botany 101</Overline></Rise>
        <Rise at={16}><Headline size={132} style={{marginTop: 26}}>Meet the nightshade family.</Headline></Rise>
        <div style={{marginTop: 44, fontFamily: MONO, fontSize: 52, color: C.brand, opacity: latin, letterSpacing: `${0.5 - 0.42 * latin}em`}}>Solanaceae</div>
      </Top>
    </Scene>
  );
};

const Species: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [12, 60], [0, 2700], {easing: EASE, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  return (
    <Scene>
      <Photo src="photos/veg-flatlay-tall.jpg" textAt="top" zoom={[1.08, 1.16]} dim={0.9} />
      <Lockup />
      <Top>
        <Rise at={4}><Overline>How big is it?</Overline></Rise>
        <Headline size={260} style={{marginTop: 20, letterSpacing: '-.05em'}}>≈{n.toLocaleString('en-US')}</Headline>
        <Rise at={30}><Headline size={96}>species.</Headline></Rise>
        <Rise at={56}><Sub style={{marginTop: 40, maxWidth: 820}}>Found on every continent except Antarctica.</Sub></Rise>
      </Top>
    </Scene>
  );
};

const Cousins: React.FC = () => (
  <Scene>
    <Photo src="photos/veg-flatlay-tall.jpg" textAt="top" zoom={[1.0, 1.0]} />
    <Lockup />
    <Top>
      <Rise at={4}><Overline>Four you eat every week</Overline></Rise>
      <Rise at={12}><Headline size={112} style={{marginTop: 22}}>Same family, different names.</Headline></Rise>
    </Top>
    <Callout at={40} x={72} y={900} point={[230, 1300]} title="Tomato" detail="Solanum lycopersicum" />
    <Callout at={70} x={560} y={760} point={[450, 1170]} title="Potato" detail="Solanum tuberosum" />
    <Callout at={100} x={72} y={1520} point={[640, 1290]} title="Eggplant" detail="Solanum melongena" />
    <Callout at={130} x={500} y={1700} point={[860, 1320]} title="Bell pepper" detail="Capsicum annuum" />
  </Scene>
);

const Mark: React.FC<{at: number}> = ({at}) => {
  const p = useIn(at, 36);
  return (
    <Img
      src={staticFile('brand/mark.svg')}
      style={{position: 'absolute', left: 540 - 170, top: 1030, width: 340, height: 340, opacity: p, transform: `rotate(${(1 - p) * -72}deg) scale(${0.6 + 0.4 * p})`}}
    />
  );
};

const Signature: React.FC = () => {
  const f = useCurrentFrame();
  const phase2 = f >= 150;
  const out1 = interpolate(f, [140, 152], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Scene>
      <Photo src="photos/tomato-flower-tall.jpg" textAt="bottom" zoom={[1.0, 1.15]} dim={0.88} />
      <Lockup />
      {!phase2 && (
        <div style={{opacity: out1}}>
          <Callout at={40} x={560} y={560} point={[548, 760]} title="Five sepals" detail="the green star" />
          <Callout at={70} x={96} y={1100} point={[520, 930]} title="Five petals" detail="fused into one" />
        </div>
      )}
      {phase2 && <Mark at={152} />}
      <Bottom>
        <Rise at={6}><Overline>The family signature</Overline></Rise>
        {!phase2 ? (
          <div style={{opacity: out1}}>
            <Rise at={14}><Headline size={112} style={{marginTop: 22}}>A star-shaped flower.</Headline></Rise>
            <Rise at={90}><Sub style={{marginTop: 30}}>The same five sepals sit on top of every tomato and eggplant.</Sub></Rise>
          </div>
        ) : (
          <Rise at={160}>
            <Headline size={112} style={{marginTop: 22}}>It's also our logo.</Headline>
          </Rise>
        )}
      </Bottom>
    </Scene>
  );
};

const Capsaicin: React.FC = () => (
  <Scene>
    <Photo src="photos/spice-jars-tall.jpg" textAt="top" zoom={[1.0, 1.06]} />
    <Lockup />
    <Top>
      <Rise at={4}><Overline>Capsicum</Overline></Rise>
      <Rise at={12}><Headline size={108} style={{marginTop: 22}}>Only peppers make capsaicin.</Headline></Rise>
      <Rise at={34}><Sub style={{marginTop: 30, maxWidth: 860}}>The compound behind a chili's heat. Every jar here starts as a pepper.</Sub></Rise>
    </Top>
    <Callout at={60} x={72} y={1480} point={[302, 1230]} title="Chili flakes" detail="pepper" chip="Nightshade" />
    <Callout at={85} x={300} y={1690} point={[528, 1240]} title="Paprika" detail="pepper" chip="Nightshade" />
    <Callout at={110} x={640} y={1480} point={[755, 1210]} title="Cayenne" detail="pepper" chip="Nightshade" />
  </Scene>
);

const End: React.FC = () => {
  const p = useIn(10, 40);
  return (
    <Scene>
      <AbsoluteFill style={{background: C.bg}} />
      {/* Oversized, dimmed mark as on the site's share image. */}
      <Img src={staticFile('brand/mark.svg')} style={{position: 'absolute', left: -300, top: 260, width: 1100, height: 1100, opacity: 0.16 * p, transform: `rotate(${(1 - p) * -40}deg)`}} />
      <div style={{position: 'absolute', left: 72, right: 72, top: 640}}>
        <Rise at={14}><Img src={staticFile('brand/lockup-en.svg')} style={{height: 120}} /></Rise>
        <Rise at={30}><Headline size={124} style={{marginTop: 90}}>Know before you bite.</Headline></Rise>
        <Rise at={50}><Sub style={{marginTop: 40}}>Botany, labels and Egyptian kitchens. Every week.</Sub></Rise>
      </div>
      <Bottom bottom={150}><Rise at={64}><Handle style={{fontSize: 34}} /></Rise></Bottom>
    </Scene>
  );
};

export const BOTANY_101_FRAMES = 1320;

export const Botany101: React.FC = () => (
  <AbsoluteFill style={{background: C.bg}}>
    <Sequence durationInFrames={150}><Intro /></Sequence>
    <Sequence from={135} durationInFrames={180}><Species /></Sequence>
    <Sequence from={300} durationInFrames={255}><Cousins /></Sequence>
    <Sequence from={540} durationInFrames={330}><Signature /></Sequence>
    <Sequence from={855} durationInFrames={270}><Capsaicin /></Sequence>
    <Sequence from={1110} durationInFrames={210}><End /></Sequence>
  </AbsoluteFill>
);
