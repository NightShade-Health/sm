import React from 'react';
import {Composition, Still} from 'remotion';
import './fonts';
import {Botany101, BOTANY_101_FRAMES} from './Botany101';
import {Family, Koshari, LabelSpotting, Question} from './Stills';

export const Root: React.FC = () => (
  <>
    <Still id="family" component={Family} width={1080} height={1350} />
    <Still id="label-spotting" component={LabelSpotting} width={1080} height={1350} />
    <Still id="koshari" component={Koshari} width={1080} height={1350} />
    <Still id="question" component={Question} width={1080} height={1350} />
    <Composition id="botany-101" component={Botany101} durationInFrames={BOTANY_101_FRAMES} fps={30} width={1080} height={1920} />
  </>
);
