import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Arabic, Callout, Handle, Headline, Lockup, Note, Overline, Photo, Sub} from './kit';

// 1080x1350 (4:5) feed images. Text sits at the top, where the photos leave dark space.
const Top: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{position: 'absolute', top: 190, left: 72, right: 72}}>{children}</div>
);

const Foot: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <div style={{position: 'absolute', bottom: 64, left: 72, right: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
    <div>{children}</div>
    <Handle />
  </div>
);

export const LabelSpotting: React.FC = () => (
  <AbsoluteFill>
    <Photo src="photos/label-aisle.jpg" zoom={[1, 1]} textAt="top" />
    <Lockup />
    <Top>
      <Overline>Label spotting 101</Overline>
      <Headline size={104} style={{marginTop: 22, maxWidth: 760}}>Hiding in plain sight.</Headline>
    </Top>
    <Callout x={548} y={820} point={[560, 580]} title="Potato starch" detail="potato" chip="Nightshade" />
    <Callout x={548} y={985} title="Spices" detail="could be paprika" chip="Check" tone="no" />
    <Foot>
      <Note strong="Flip the pack." soft="Soups, sauces, snacks." />
    </Foot>
  </AbsoluteFill>
);

export const Koshari: React.FC = () => (
  <AbsoluteFill>
    <Photo src="photos/koshari.jpg" zoom={[1, 1]} textAt="top" dim={0.75} />
    <Lockup />
    <Top>
      <Overline>Egyptian kitchen swap</Overline>
      <Headline size={104} style={{marginTop: 22}}>Koshari, your way.</Headline>
    </Top>
    <Callout x={560} y={560} point={[905, 535]} title="Da'ah + lemon" detail="go heavy" chip="Keep" tone="keep" />
    <Callout x={72} y={1010} point={[520, 800]} title="Crispy onions" detail="the best part" chip="Keep" tone="keep" />
    <Callout x={560} y={1150} title="Tomato salsa & shatta" chip="Skip" tone="no" />
  </AbsoluteFill>
);

export const Question: React.FC = () => (
  <AbsoluteFill>
    <Photo src="photos/nightshades-slate.jpg" zoom={[1, 1]} textAt="top" />
    <Lockup />
    <Top>
      <Overline>Honest question</Overline>
      <Headline size={96} style={{marginTop: 22}}>Which nightshade would be hardest to give up?</Headline>
      <Arabic style={{marginTop: 34, textAlign: 'right'}}>إيه أكتر أكلة من النايت شيد صعب تستغنى عنها؟</Arabic>
    </Top>
    <Foot>
      <Sub style={{fontSize: 34}}>Answer in the comments 👇</Sub>
    </Foot>
  </AbsoluteFill>
);

export const Family: React.FC = () => (
  <AbsoluteFill>
    <Photo src="photos/veg-flatlay-tall.jpg" zoom={[1, 1]} textAt="top" />
    <Lockup />
    <Top>
      <Overline>Did you know?</Overline>
      <Headline size={104} style={{marginTop: 22}}>Four foods. One family.</Headline>
      <Sub style={{marginTop: 26}}>The nightshades (Solanaceae).</Sub>
    </Top>
    <Callout x={72} y={600} point={[230, 1008]} title="Tomato" chip="Nightshade" />
    <Callout x={560} y={600} point={[450, 878]} title="Potato" chip="Nightshade" />
    <Callout x={360} y={1150} width={250} point={[640, 998]} title="Eggplant" chip="Nightshade" />
    <Callout x={680} y={1150} width={300} point={[860, 1028]} title="Bell pepper" chip="Nightshade" />
  </AbsoluteFill>
);
