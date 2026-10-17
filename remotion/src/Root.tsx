import React from 'react';
import {Composition, Still} from 'remotion';
import './fonts';
import {Botany101, BOTANY_101_FRAMES} from './Botany101';
import {NightshadeOrNotCarousel, SLIDE_H, SLIDE_W} from './Carousel';
import {Family, Koshari, LabelSpotting, Question} from './Stills';
import {Reel, reelFrames} from './reels/engine';
import {NsxTeaser, NSX_FRAMES} from './reels/NsxTeaser';
import {REELS} from './reels/specs';

export const Root: React.FC = () => (
  <>
    <Still id="carousel-nightshade-or-not" component={NightshadeOrNotCarousel} width={SLIDE_W * 6} height={SLIDE_H} />
    <Still id="family" component={Family} width={1080} height={1350} />
    <Still id="label-spotting" component={LabelSpotting} width={1080} height={1350} />
    <Still id="koshari" component={Koshari} width={1080} height={1350} />
    <Still id="question" component={Question} width={1080} height={1350} />
 {Object.entries(REELS).map(([id, r]) => (
      <Composition key={id} id={id} component={Reel} defaultProps={{scenes: r.scenes}} durationInFrames={reelFrames(r.scenes)} fps={30} width={1080} height={1920} />
    ))}
    <Composition id="nsx-teaser" component={NsxTeaser} durationInFrames={NSX_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="botany-101" component={Botany101} durationInFrames={BOTANY_101_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="botany-101-ar" component={Botany101} defaultProps={{lang: 'ar' as const}} durationInFrames={BOTANY_101_FRAMES} fps={30} width={1080} height={1920} />
  </>
);
