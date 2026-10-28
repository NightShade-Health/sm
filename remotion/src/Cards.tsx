import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {C, MONO, SANS} from './brand';
import {Chip, Handle, Headline, Lockup, Note, Overline, Photo, Sub, Tone} from './kit';

// 1080x1350 feed cards and carousel slides, driven by data (see CARDS below).
// Text sits at the top; photos leave dark space there. No positional callouts: tags sit in rows,
// so a label can never point at the wrong item.

type Group = {chip: string; tone: Tone; items: string[]};
type Item = {title: string; detail?: string; chip?: string; tone?: Tone};

export type CardSpec = {
  photo?: string;
  focus?: string;
  dim?: number;
  shade?: number; // extra darkening over the whole photo (text slides)
  split?: [Half, Half];
  overline?: string;
  headline?: string;
  size?: number;
  sub?: string;
  groups?: Group[];
  items?: Item[];
  big?: {text: string; blur?: string};
  swatches?: {color: string; label: string; detail: string}[];
  scale?: {label: string; shu: string; level: number}[];
  note?: {strong: string; soft?: string};
  slide?: [number, number];
};

type Half = {photo: string; focus?: string; label: string; chip: string; tone: Tone};

const Groups: React.FC<{groups: Group[]}> = ({groups}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 22, marginTop: 40}}>
    {groups.map((g) => (
      <div key={g.chip} style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12}}>
        <Chip tone={g.tone}>{g.chip}</Chip>
        {g.items.map((t) => (
          <span key={t} style={{fontFamily: SANS, fontWeight: 600, fontSize: 32, color: C.text, padding: '8px 20px', borderRadius: 14, background: 'rgba(14,20,18,.72)', border: `1.5px solid ${C.border}`}}>
            {t}
          </span>
        ))}
      </div>
    ))}
  </div>
);

const Items: React.FC<{items: Item[]}> = ({items}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 20, marginTop: 44}}>
    {items.map((it) => (
      <div key={it.title} style={{padding: '26px 30px', borderRadius: 22, background: 'rgba(14,20,18,.82)', border: `1.5px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20}}>
        <div>
          <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 46, letterSpacing: '-.02em', color: C.text}}>{it.title}</div>
          {it.detail && <div style={{fontFamily: MONO, fontSize: 28, color: C.sub, marginTop: 8}}>→ {it.detail}</div>}
        </div>
        {it.chip && <Chip tone={it.tone ?? 'yes'}>{it.chip}</Chip>}
      </div>
    ))}
  </div>
);

const Split: React.FC<{halves: [Half, Half]}> = ({halves}) => (
  <AbsoluteFill style={{flexDirection: 'row', backgroundColor: C.bg}}>
    {halves.map((h, i) => (
      <div key={i} style={{position: 'relative', width: '50%', height: '100%', overflow: 'hidden', borderLeft: i ? `2px solid ${C.bg}` : undefined}}>
        <Img src={staticFile(`photos/${h.photo}`)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: h.focus ?? 'center'}} />
        <AbsoluteFill style={{background: `linear-gradient(to bottom, ${C.bg} 0%, rgba(7,9,10,.85) 34%, rgba(7,9,10,0) 60%, rgba(7,9,10,.85) 100%)`}} />
        <div style={{position: 'absolute', left: 40, right: 40, bottom: 150}}>
          <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 52, color: C.text, letterSpacing: '-.02em', marginBottom: 16}}>{h.label}</div>
          <Chip tone={h.tone}>{h.chip}</Chip>
        </div>
      </div>
    ))}
  </AbsoluteFill>
);

const Big: React.FC<{text: string; blur?: string}> = ({text, blur}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center'}}>
    <div style={{position: 'relative', display: 'inline-block', fontFamily: SANS, fontWeight: 800, fontSize: 300, letterSpacing: '-.04em', color: C.text, lineHeight: 1}}>
      {text}
      <span style={{position: 'absolute', right: -46, top: 34, width: 40, height: 40, borderRadius: 20, background: C.saffron}} />
    </div>
    {blur && <div style={{marginTop: 60, fontFamily: SANS, fontWeight: 700, fontSize: 220, color: C.brand, filter: 'blur(26px)', opacity: 0.8}}>{blur}</div>}
  </div>
);

const Swatches: React.FC<{swatches: NonNullable<CardSpec['swatches']>}> = ({swatches}) => (
  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 56}}>
    {swatches.map((s) => (
      <div key={s.label} style={{padding: 30, borderRadius: 24, background: 'rgba(14,20,18,.82)', border: `1.5px solid ${C.border}`}}>
        <div style={{width: 120, height: 120, borderRadius: 60, background: s.color, boxShadow: `0 0 60px ${s.color}55`}} />
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 44, color: C.text, marginTop: 26}}>{s.label}</div>
        <div style={{fontFamily: MONO, fontSize: 28, color: C.sub, marginTop: 6}}>→ {s.detail}</div>
      </div>
    ))}
  </div>
);

const Scale: React.FC<{rows: NonNullable<CardSpec['scale']>}> = ({rows}) => (
  <div style={{display: 'flex', gap: 40, marginTop: 56, alignItems: 'stretch'}}>
    <div style={{position: 'relative', width: 46, borderRadius: 23, background: C.surface, border: `1.5px solid ${C.border}`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: '100%', background: `linear-gradient(to top, ${C.brand}, ${C.saffron} 55%, #D9673A)`}} />
    </div>
    <div style={{flex: 1, display: 'flex', flexDirection: 'column-reverse', justifyContent: 'space-between', gap: 18}}>
      {rows.map((r) => (
        <div key={r.label} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '20px 26px', borderRadius: 18, background: 'rgba(14,20,18,.82)', border: `1.5px solid ${C.border}`}}>
          <span style={{fontFamily: SANS, fontWeight: 700, fontSize: 40, color: C.text}}>{r.label}</span>
          <span style={{fontFamily: MONO, fontSize: 28, color: C.sub}}>{r.shu}</span>
        </div>
      ))}
    </div>
  </div>
);

const Dots: React.FC<{slide: [number, number]}> = ({slide: [n, of]}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
    {Array.from({length: of}, (_, i) => (
      <span key={i} style={{width: i + 1 === n ? 34 : 12, height: 12, borderRadius: 6, background: i + 1 === n ? C.saffron : C.muted, opacity: i + 1 === n ? 1 : 0.5}} />
    ))}
    {n < of && <span style={{fontFamily: MONO, fontSize: 26, color: C.muted, marginLeft: 10}}>swipe →</span>}
  </div>
);

export const Card: React.FC<{spec: CardSpec}> = ({spec: s}) => (
  <AbsoluteFill style={{backgroundColor: C.bg}}>
    {s.split ? <Split halves={s.split} /> : s.photo && <Photo src={`photos/${s.photo}`} zoom={[1, 1]} focus={s.focus} dim={s.dim} textAt="top" />}
    {s.shade ? <AbsoluteFill style={{background: `rgba(7,9,10,${s.shade})`}} /> : null}
    {!s.photo && !s.split && (
      <Img src={staticFile('brand/mark.svg')} style={{position: 'absolute', right: -260, bottom: -200, width: 900, height: 900, opacity: 0.08}} />
    )}
    <Lockup />
    {s.big && <Big text={s.big.text} blur={s.big.blur} />}
    <div style={{position: 'absolute', top: 190, left: 72, right: 72}}>
      {s.overline && <Overline>{s.overline}</Overline>}
      {s.headline && <Headline size={s.size ?? 96} style={{marginTop: 22}}>{s.headline}</Headline>}
      {s.sub && <Sub style={{marginTop: 26, maxWidth: 900}}>{s.sub}</Sub>}
      {s.groups && <Groups groups={s.groups} />}
      {s.items && <Items items={s.items} />}
      {s.swatches && <Swatches swatches={s.swatches} />}
      {s.scale && <Scale rows={s.scale} />}
    </div>
    <div style={{position: 'absolute', bottom: 64, left: 72, right: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
      <div>{s.slide ? <Dots slide={s.slide} /> : s.note && <Note strong={s.note.strong} soft={s.note.soft} />}</div>
      <Handle />
    </div>
  </AbsoluteFill>
);

const NS: Group['tone'] = 'yes';

export const CARDS: Record<string, CardSpec> = {
  // ---- October catch-up ----
  'spice-jars': {
    photo: 'spice-jars-tall.jpg', focus: 'center 70%', overline: 'Spice rack check', headline: 'Four jars. One plant.', sub: 'All ground from Capsicum peppers.',
    groups: [{chip: 'Nightshade', tone: NS, items: ['Paprika', 'Cayenne', 'Chili flakes', 'Chili powder']}],
  },
  'spice-blends-1': {photo: 'spice-blends.jpg', overline: 'Spice-blend check', headline: 'Blends to double-check.', sub: 'They often include paprika or chili.', slide: [1, 4]},
  'spice-blends-2': {photo: 'spice-blends.jpg', shade: 0.55, overline: 'Often includes paprika or chili', headline: 'Curry & ras el hanout', size: 88, items: [{title: 'Curry powder', chip: 'Check', tone: 'no'}, {title: 'Ras el hanout', chip: 'Check', tone: 'no'}], slide: [2, 4]},
  'spice-blends-3': {photo: 'spice-blends.jpg', shade: 0.55, overline: 'Often includes paprika or chili', headline: 'Harissa, BBQ & taco', size: 88, items: [{title: 'Harissa', detail: 'a chili paste', chip: 'Nightshade'}, {title: 'BBQ seasoning', chip: 'Check', tone: 'no'}, {title: 'Taco seasoning', chip: 'Check', tone: 'no'}], slide: [3, 4]},
  'spice-blends-4': {photo: 'spice-blends.jpg', shade: 0.55, overline: 'Often includes paprika or chili', headline: 'Shawarma & kofta mixes', size: 88, items: [{title: 'Shawarma mix', chip: 'Check', tone: 'no'}, {title: 'Kofta mix', chip: 'Check', tone: 'no'}], sub: 'Recipes vary by brand, so always read the list.', slide: [4, 4]},
  kofta: {
    photo: 'kofta.jpg', overline: 'Egyptian kitchen swap', headline: 'Homemade kofta, nightshade-free.', size: 92,
    groups: [{chip: 'Keep', tone: 'keep', items: ['Onion', 'Parsley', 'Garlic', 'Cumin', 'Black pepper']}],
    note: {strong: 'Skip the ready-made mix.', soft: 'Many add paprika and chili.'},
  },
  'potato-vs-sweet-potato': {
    split: [{photo: 'potato-sprouts.jpg', label: 'Batates', chip: 'Nightshade', tone: 'yes'}, {photo: 'sweet-potato-roots.jpg', label: 'Batata', chip: 'Not a nightshade', tone: 'no'}],
    overline: 'Only one is a nightshade', headline: 'Batates vs. batata.',
  },
  'potato-names-1': {photo: 'label-aisle.jpg', overline: 'Read the label', headline: "Potato's other names.", sub: 'Five ways potato shows up in an ingredient list.', slide: [1, 3]},
  'potato-names-2': {photo: 'potato-sprouts.jpg', shade: 0.6, overline: 'All potato', headline: 'Look for these', size: 88, items: [{title: 'Potato starch', chip: 'Nightshade'}, {title: 'Potato flour', chip: 'Nightshade'}, {title: 'Potato flakes', chip: 'Nightshade'}, {title: 'Dehydrated potato', chip: 'Nightshade'}], slide: [2, 3]},
  'potato-names-3': {photo: 'potato-sprouts.jpg', shade: 0.6, overline: 'Check the source', headline: '"Modified starch"', size: 96, sub: 'Can come from potato, corn, wheat or tapioca. The label may not say which.', items: [{title: 'Modified starch', chip: 'Check', tone: 'no'}], slide: [3, 3]},
  'sweet-potato-wedges': {
    photo: 'sweet-potato-wedges.jpg', overline: 'The batata swap', headline: 'Craving fries? Try batata wedges.', size: 92,
    sub: 'Olive oil, salt and cumin. Roast at 200°C for 25–30 minutes, turning once.',
  },
  'team-batata': {
    split: [{photo: 'sweet-potato-roots.jpg', label: 'Team batata', chip: 'Comment 1', tone: 'keep'}, {photo: 'potato-sprouts.jpg', label: 'Team batates', chip: 'Comment 2', tone: 'keep'}],
    overline: 'Vote in the comments', headline: 'Batata or batates?',
  },

  // ---- November ----
  'peppers-split': {
    split: [{photo: 'peppers-chilies.jpg', label: 'Bell pepper & chili', chip: 'Nightshade', tone: 'yes'}, {photo: 'peppercorns.jpg', label: 'Black pepper', chip: 'Not a nightshade', tone: 'no'}],
    overline: 'Same word, different plants', headline: 'One word. Very different plants.', size: 88,
  },
  'pepper-words-1': {photo: 'peppers-chilies.jpg', overline: 'Read the label', headline: 'Pepper words to look for.', sub: 'Seven names on a label, one plant.', slide: [1, 4]},
  'pepper-words-2': {photo: 'peppers-chilies.jpg', shade: 0.6, overline: 'All from the pepper plant', headline: 'Look for these', size: 88, items: [{title: 'Capsicum', chip: 'Nightshade'}, {title: 'Paprika', chip: 'Nightshade'}, {title: 'Pimiento', chip: 'Nightshade'}], slide: [2, 4]},
  'pepper-words-3': {photo: 'peppers-chilies.jpg', shade: 0.6, overline: 'All from the pepper plant', headline: 'And these', size: 88, items: [{title: 'Cayenne', chip: 'Nightshade'}, {title: 'Red pepper', chip: 'Nightshade'}, {title: 'Chili', chip: 'Nightshade'}], slide: [3, 4]},
  'pepper-words-4': {photo: 'peppers-chilies.jpg', shade: 0.6, overline: 'The easy one to miss', headline: 'E160c', size: 120, sub: 'Paprika extract, added for colour. Still the pepper plant.', items: [{title: 'E160c', detail: 'paprika extract', chip: 'Nightshade'}], slide: [4, 4]},
  'heat-swap': {
    photo: 'heat-flatlay.jpg', overline: 'Heat without nightshades', headline: 'Want a kick? Try these.',
    groups: [{chip: 'Not nightshades', tone: 'keep', items: ['Ginger', 'Garlic', 'Black pepper', 'Mustard', 'Horseradish', 'Wasabi']}],
  },
  'nsx-1': {big: {text: 'NSX'}},
  berries: {
    photo: 'berries-cut.jpg', overline: 'Botany 101', headline: "Botanically, they're all berries.", size: 92,
    sub: 'A berry is a fleshy fruit grown from a single flower, usually with many seeds.',
    groups: [{chip: 'Berry', tone: 'keep', items: ['Tomato', 'Eggplant', 'Chili']}],
  },
  'tomato-disguise-1': {photo: 'tomato-products.jpg', overline: 'Read the label', headline: 'Tomato in disguise.', sub: 'Four ways tomato shows up in an ingredient list.', slide: [1, 4]},
  'tomato-disguise-2': {photo: 'tomato-products.jpg', shade: 0.6, overline: 'Easy to spot', headline: 'The obvious ones', size: 88, items: [{title: 'Tomato paste', chip: 'Nightshade'}, {title: 'Tomato purée', chip: 'Nightshade'}, {title: 'Ketchup', chip: 'Nightshade'}], slide: [2, 4]},
  'tomato-disguise-3': {photo: 'tomato-products.jpg', shade: 0.6, overline: 'Easy to miss', headline: 'Tomato powder', size: 96, sub: 'Common in instant noodles and soup packets.', items: [{title: 'Tomato powder', detail: 'noodles, soups', chip: 'Nightshade'}], slide: [3, 4]},
  'tomato-disguise-4': {photo: 'tomato-products.jpg', shade: 0.6, overline: 'Check what is inside', headline: '"Vegetable powder"', size: 96, sub: 'It can include tomato. If you see it, check the full list.', items: [{title: 'Vegetable powder', chip: 'Check', tone: 'no'}], slide: [4, 4]},
  salad: {
    photo: 'salad.jpg', overline: 'Egyptian kitchen', headline: 'A nightshade-free salad that tastes like home.', size: 84,
    groups: [{chip: 'Keep', tone: 'keep', items: ['Cucumber', 'Lettuce', 'Radish', 'Carrot', 'Parsley', 'Sumac']}],
    note: {strong: 'Dress it simply.', soft: 'Lemon, olive oil, salt.'},
  },
  'canned-ful': {
    photo: 'breakfast.jpg', shade: 0.45, overline: 'Read the label', headline: 'Canned ful check.',
    items: [{title: 'Plain ful', detail: 'fava beans, water, salt', chip: 'Keep', tone: 'keep'}, {title: 'Spicy or Alexandrian', detail: 'may add tomato, chili, "spices"', chip: 'Check', tone: 'no'}],
    note: {strong: 'Read before you pour.'},
  },
  'green-shakshuka': {
    overline: 'Nightshade-free recipe', headline: 'Green shakshuka.', size: 120,
    sub: 'Soften leeks and garlic in olive oil, add spinach and cumin, crack in the eggs and cover until set. Finish with feta.',
    groups: [{chip: 'Keep', tone: 'keep', items: ['Leeks', 'Garlic', 'Spinach', 'Cumin', 'Eggs', 'Feta']}],
    note: {strong: 'All the comfort.', soft: 'No tomato, no peppers.'},
  },
  'ful-debate': {
    photo: 'breakfast.jpg', overline: 'The big ful debate', headline: 'Tahini, or oil and lemon?',
    items: [{title: 'Tahini', chip: 'Comment 1', tone: 'keep'}, {title: 'Oil and lemon', chip: 'Comment 2', tone: 'keep'}],
  },
  'street-food-1': {photo: 'koshari.jpg', overline: 'Egyptian street food 101', headline: 'Where nightshades usually hide.', slide: [1, 4]},
  'street-food-2': {photo: 'koshari.jpg', shade: 0.6, overline: 'Where it hides', headline: 'Koshari & hawawshi', size: 88, items: [{title: 'Koshari', detail: 'the salsa and shatta', chip: 'Check', tone: 'no'}, {title: 'Hawawshi', detail: 'peppers and chili inside', chip: 'Check', tone: 'no'}], slide: [2, 4]},
  'street-food-3': {photo: 'koshari.jpg', shade: 0.6, overline: 'Where it hides', headline: 'Fries & shawarma', size: 88, items: [{title: 'Fries', detail: 'the potato itself', chip: 'Nightshade'}, {title: 'Shawarma', detail: 'the spice mix and sauces', chip: 'Check', tone: 'no'}], slide: [3, 4]},
  'street-food-4': {photo: 'koshari.jpg', shade: 0.6, overline: 'Before you order', headline: 'Ask about the sauce.', size: 104, sub: 'Most of it hides in sauces and spice mixes, not in the main ingredients.', slide: [4, 4]},
  snacks: {
    photo: 'label-aisle.jpg', shade: 0.35, overline: 'Not a potato chip?', headline: 'Still check the flavour.',
    sub: 'Corn and wheat snacks can carry nightshades too, especially the flavoured ones.',
    groups: [{chip: 'Check for', tone: 'no', items: ['Paprika', 'Tomato powder', '"Spices"']}],
  },
  hawawshi: {
    overline: 'Egyptian kitchen swap', headline: 'Hawawshi, nightshade-free.', size: 110,
    groups: [{chip: 'Keep', tone: 'keep', items: ['Minced meat', 'Onion', 'Parsley', 'Garlic', 'Cumin', 'Black pepper']}],
    note: {strong: 'Skip the bell peppers and chili.', soft: 'Stuff into baladi bread and bake until crisp.'},
  },
  'nsx-2': {big: {text: 'NSX', blur: '7'}},
  'chili-heat': {
    photo: 'peppers-chilies.jpg', shade: 0.55, overline: 'Botany 101', headline: 'Only Capsicum makes capsaicin.', size: 84,
    sub: 'Chili heat is measured in Scoville Heat Units, a scale from 1912.',
    scale: [{label: 'Bell pepper', shu: '0 SHU', level: 0}, {label: 'Jalapeño', shu: '2,500–8,000', level: 1}, {label: 'Cayenne', shu: '30,000–50,000', level: 2}, {label: 'Habanero', shu: '100,000–350,000', level: 3}],
  },

  // ---- December ----
  e160c: {
    photo: 'spice-jars-tall.jpg', shade: 0.55, overline: 'Colour from peppers', headline: 'E160c', size: 200,
    sub: 'Paprika extract. It gives a red-orange colour to snacks, sausages, sauces and some cheeses.',
    groups: [{chip: 'Nightshade', tone: NS, items: ['E160c = pepper']}],
  },
  'colour-swaps': {
    overline: 'Colour without paprika', headline: 'Red and gold, no paprika.', size: 92,
    swatches: [
      {color: '#E3A62B', label: 'Turmeric', detail: 'gold'},
      {color: '#8E1F4A', label: 'Beetroot', detail: 'deep red'},
      {color: '#E8742A', label: 'Carrot', detail: 'orange'},
      {color: '#A3302E', label: 'Sumac', detail: 'tangy red'},
    ],
  },
};
