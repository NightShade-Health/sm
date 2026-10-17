import React from 'react';
import {AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, EASE, MONO} from './brand';
import {Callout, Handle, Headline, LangCtx, Lockup, Overline, Photo, Rise, Sub, useAr, useIn} from './kit';
import {LogoReveal} from './reels/engine';

// 1080x1920 Reel, 30 fps. Photo-led remake of "Botany 101" in the landing page style.
const FADE = 15;

// On-screen copy. The Arabic is Egyptian Arabic, matching the captions; Mohamed has the final say on it.
const COPY = {
  en: {
    intro: ['Botany 101', 'Meet the nightshade family.', ''],
    species: ['How big is it?', 'species.', 'Found on every continent except Antarctica.'],
    cousins: ['Four you eat every week', 'Same family, different names.', ['Tomato', 'Potato', 'Eggplant', 'Bell pepper']],
    signature: ['The family signature', 'A star-shaped flower.', 'The same five sepals sit on top of every tomato and eggplant.', "It's also our logo.", ['Five sepals', 'the green star'], ['Five petals', 'fused into one']],
    capsaicin: ['Capsicum', 'Only peppers make capsaicin.', "The compound behind a chili's heat. Every jar here starts as a pepper.", ['Chili flakes', 'Paprika', 'Cayenne'], 'pepper', 'Nightshade'],
    end: ['Know before you bite.', 'Botany, labels and Egyptian kitchens. Every week.'],
  },
  ar: {
    intro: ['بوتاني ١٠١', 'اتعرّف على عيلة النايت شيد.', 'الفصيلة الباذنجانية'],
    species: ['العيلة دي كبيرة قد إيه؟', 'نوع.', 'موجودة في كل القارات ما عدا القارة القطبية الجنوبية.'],
    cousins: ['أربعة بتاكلهم كل أسبوع', 'نفس العيلة، بأسامي مختلفة.', ['طماطم', 'بطاطس', 'بتنجان', 'فلفل رومي']],
    signature: ['توقيع العيلة', 'زهرة شكلها نجمة.', 'نفس السبلات الخمسة بتلاقيها فوق كل طماطم وبتنجان.', 'وده كمان اللوجو بتاعنا.', ['خمس سبلات', 'النجمة الخضرا'], ['خمس بتلات', 'ملزوقين في بعض']],
    capsaicin: ['Capsicum', 'الفلفل بس هو اللي فيه كابسيسين.', 'المادة اللي بتدّي الشطة حرارتها. كل برطمان هنا أصله فلفل.', ['شطة مجروشة', 'بابريكا', 'شطة كايين'], 'فلفل', 'نايت شيد'],
    end: ['اعرف قبل ما تاكل.', 'نبات وملصقات ومطبخ مصري. كل أسبوع.'],
  },
} as const;
const useCopy = () => COPY[useAr() ? 'ar' : 'en'];

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
  const t = useCopy().intro;
  return (
    <Scene>
      <Photo src="photos/veg-flatlay-tall.jpg" textAt="top" zoom={[1.0, 1.08]} />
      <Lockup />
      <Top>
        <Rise at={8}><Overline>{t[0]}</Overline></Rise>
        <Rise at={16}><Headline size={t[2] ? 116 : 132} style={{marginTop: 26}}>{t[1]}</Headline></Rise>
        <div style={{marginTop: 44, fontFamily: MONO, fontSize: 52, color: C.brand, opacity: latin, letterSpacing: `${0.5 - 0.42 * latin}em`, direction: 'ltr', textAlign: t[2] ? 'right' : 'left'}}>Solanaceae</div>
        {t[2] && <Rise at={60}><Sub style={{marginTop: 12}}>{t[2]}</Sub></Rise>}
      </Top>
    </Scene>
  );
};

const Species: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [12, 60], [0, 2700], {easing: EASE, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const ar = useAr();
  const t = useCopy().species;
  return (
    <Scene>
      <Photo src="photos/veg-flatlay-tall.jpg" textAt="top" zoom={[1.08, 1.16]} dim={0.9} />
      <Lockup />
      <Top>
        <Rise at={4}><Overline>{t[0]}</Overline></Rise>
        <Headline size={260} style={{marginTop: 20, letterSpacing: '-.05em', lineHeight: 1.1}}>≈{n.toLocaleString(ar ? 'ar-EG' : 'en-US')}</Headline>
        <Rise at={30}><Headline size={96}>{t[1]}</Headline></Rise>
        <Rise at={56}><Sub style={{marginTop: 40, maxWidth: 820}}>{t[2]}</Sub></Rise>
      </Top>
    </Scene>
  );
};

const Cousins: React.FC = () => {
  const t = useCopy().cousins;
  return (
  <Scene>
    <Photo src="photos/veg-flatlay-tall.jpg" textAt="top" zoom={[1.0, 1.0]} />
    <Lockup />
    <Top>
      <Rise at={4}><Overline>{t[0]}</Overline></Rise>
      <Rise at={12}><Headline size={112} style={{marginTop: 22}}>{t[1]}</Headline></Rise>
    </Top>
    <Callout at={40} x={72} y={900} point={[230, 1300]} title={t[2][0]} detail="Solanum lycopersicum" />
    <Callout at={70} x={560} y={760} point={[450, 1170]} title={t[2][1]} detail="Solanum tuberosum" />
    <Callout at={100} x={72} y={1520} point={[640, 1290]} title={t[2][2]} detail="Solanum melongena" />
    <Callout at={130} x={500} y={1700} point={[860, 1320]} title={t[2][3]} detail="Capsicum annuum" />
  </Scene>
  );
};

const Signature: React.FC = () => {
  const f = useCurrentFrame();
  const phase2 = f >= 150;
  const out1 = interpolate(f, [140, 152], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const t = useCopy().signature;
  return (
    <Scene>
      <Photo src="photos/tomato-flower-tall.jpg" textAt="bottom" zoom={[1.0, 1.15]} dim={0.88} />
      <Lockup />
      {!phase2 && (
        <div style={{opacity: out1}}>
          <Callout at={40} x={560} y={560} point={[548, 760]} title={t[4][0]} detail={t[4][1]} />
          <Callout at={70} x={96} y={1100} point={[520, 930]} title={t[5][0]} detail={t[5][1]} />
        </div>
      )}
      {phase2 && <LogoReveal at={150} size={340} style={{left: 540 - 170, top: 1030}} />}
      <Bottom>
        <Rise at={6}><Overline>{t[0]}</Overline></Rise>
        {!phase2 ? (
          <div style={{opacity: out1}}>
            <Rise at={14}><Headline size={112} style={{marginTop: 22}}>{t[1]}</Headline></Rise>
            <Rise at={90}><Sub style={{marginTop: 30}}>{t[2]}</Sub></Rise>
          </div>
        ) : (
          <Rise at={186}>
            <Headline size={112} style={{marginTop: 22}}>{t[3]}</Headline>
          </Rise>
        )}
      </Bottom>
    </Scene>
  );
};

const Capsaicin: React.FC = () => {
  const t = useCopy().capsaicin;
  return (
  <Scene>
    <Photo src="photos/spice-jars-tall.jpg" textAt="top" zoom={[1.0, 1.06]} />
    <Lockup />
    <Top>
      <Rise at={4}><Overline style={{direction: 'ltr', textAlign: useAr() ? 'right' : 'left'}}>{t[0]}</Overline></Rise>
      <Rise at={12}><Headline size={108} style={{marginTop: 22}}>{t[1]}</Headline></Rise>
      <Rise at={34}><Sub style={{marginTop: 30, maxWidth: 860}}>{t[2]}</Sub></Rise>
    </Top>
    <Callout at={60} x={72} y={1480} point={[302, 1230]} title={t[3][0]} detail={t[4]} chip={t[5]} />
    <Callout at={85} x={300} y={1690} point={[528, 1240]} title={t[3][1]} detail={t[4]} chip={t[5]} />
    <Callout at={110} x={640} y={1480} point={[755, 1210]} title={t[3][2]} detail={t[4]} chip={t[5]} />
  </Scene>
  );
};

const End: React.FC = () => {
  const p = useIn(10, 40);
  const ar = useAr();
  const t = useCopy().end;
  return (
    <Scene>
      <AbsoluteFill style={{background: C.bg}} />
      {/* Oversized, dimmed mark as on the site's share image. */}
      <Img src={staticFile('brand/mark.svg')} style={{position: 'absolute', left: -300, top: 260, width: 1100, height: 1100, opacity: 0.16 * p, transform: `rotate(${(1 - p) * -40}deg)`}} />
      <div style={{position: 'absolute', left: 72, right: 72, top: 640}}>
        <Rise at={14}><Img src={staticFile(ar ? 'brand/lockup-ar.svg' : 'brand/lockup-en.svg')} style={{height: 120, display: 'block', marginLeft: ar ? 'auto' : 0}} /></Rise>
        <Rise at={30}><Headline size={124} style={{marginTop: 90}}>{t[0]}</Headline></Rise>
        <Rise at={50}><Sub style={{marginTop: 40}}>{t[1]}</Sub></Rise>
      </div>
      <Bottom bottom={150}><Rise at={64}><Handle style={{fontSize: 34}} /></Rise></Bottom>
    </Scene>
  );
};

export const BOTANY_101_FRAMES = 1320;

export const Botany101: React.FC<{lang?: 'en' | 'ar'}> = ({lang = 'en'}) => (
  <LangCtx.Provider value={lang}>
  <AbsoluteFill style={{background: C.bg}}>
    <Sequence durationInFrames={150}><Intro /></Sequence>
    <Sequence from={135} durationInFrames={180}><Species /></Sequence>
    <Sequence from={300} durationInFrames={255}><Cousins /></Sequence>
    <Sequence from={540} durationInFrames={330}><Signature /></Sequence>
    <Sequence from={855} durationInFrames={270}><Capsaicin /></Sequence>
    <Sequence from={1110} durationInFrames={210}><End /></Sequence>
  </AbsoluteFill>
  </LangCtx.Provider>
);
