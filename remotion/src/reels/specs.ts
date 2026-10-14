import {SceneSpec} from './engine';

// Scripts for the Sunday Reels. Points are in output pixels on the cover-fitted 1080x1920 photo.
const YES = 'Nightshade';
const NO = 'Not a nightshade';
const quiz = (photo: string, q: string, at: [number, number], yes: boolean, note?: string): SceneSpec => ({
  sec: 3.2,
  photo,
  zoom: [1.7, 1.85],
  origin: at,
  dim: 0.9,
  overline: 'Nightshade or not?',
  headline: q,
  answer: {text: yes ? YES : NO, tone: yes ? 'yes' : 'no', at: 34, note},
  transition: 'zoom',
  reveal: true,
});

export const REELS: Record<string, {date: string; scenes: SceneSpec[]}> = {
  'did-you-know-v2': {
    date: '25 Oct',
    scenes: [
      {
        sec: 6, photo: 'veg-flatlay-tall.jpg', overline: 'Did you know?', headline: 'These are all nightshades.',
        callouts: [
          {x: 72, y: 900, title: 'Tomato', chip: YES, point: [220, 1328], width: 290},
          {x: 560, y: 820, title: 'Potato', chip: YES, point: [447, 1199], width: 290},
          {x: 300, y: 1560, title: 'Eggplant', chip: YES, point: [658, 1296], width: 290},
          {x: 680, y: 1700, title: 'Bell pepper', chip: YES, point: [868, 1360], width: 300},
        ],
      },
      {
        sec: 5, transition: 'dot', photo: 'spice-jars-tall.jpg', overline: 'Even the spice jar', headline: 'Ground from peppers.',
        callouts: [
          {x: 72, y: 1480, title: 'Chili flakes', chip: YES, point: [298, 1296], width: 330},
          {x: 640, y: 1480, title: 'Cayenne', chip: YES, point: [768, 1231], width: 290},
          {x: 300, y: 1690, title: 'Paprika', chip: YES, point: [541, 1280], width: 290},
        ],
      },
      {
        sec: 4.6, transition: 'zoom', photo: 'goji-tomatoes.jpg', overline: 'And a few surprises', headline: 'Goji berries, too.',
        callouts: [
          {x: 72, y: 1690, title: 'Goji berries', detail: 'Lycium barbarum', chip: YES, point: [421, 1523], width: 560},
          {x: 640, y: 1100, title: 'Tomatoes', chip: YES, point: [842, 1393], width: 290},
        ],
      },
      {
        sec: 4.6, transition: 'dot', photo: 'harankash.jpg', overline: 'And in Egypt', headline: 'Harankash. حرنكش.', sub: 'The cape gooseberry, Physalis.',
        callouts: [{x: 560, y: 1640, title: 'Harankash', chip: YES, point: [729, 1392], width: 320}],
      },
      {
        sec: 6.2, transition: 'zoom', photo: 'not-nightshades.jpg', overline: 'Plot twist', headline: 'Not nightshades.',
        callouts: [
          {x: 72, y: 920, title: 'Sweet potato', chip: NO, tone: 'no', point: [168, 1296], width: 420},
          {x: 560, y: 920, title: 'Onion', chip: NO, tone: 'no', point: [632, 1296], width: 420},
          {x: 72, y: 1560, title: 'Cucumber', chip: NO, tone: 'no', point: [411, 1312], width: 420},
          {x: 560, y: 1560, title: 'Mushroom', chip: NO, tone: 'no', point: [904, 1296], width: 420},
        ],
      },
      {sec: 4.2, kind: 'end', headline: 'How many did you know?', sub: 'Comment your number 👇'},
    ],
  },

  'stem-or-root': {
    date: '1 Nov',
    scenes: [
      {sec: 4, photo: 'potato-sprouts.jpg', overline: 'Botany 101', headline: 'Stem or root?', sub: 'Two lookalikes from two different plant families.'},
      {
        sec: 7, transition: 'zoom', photo: 'potato-sprouts.jpg', zoom: [1.05, 1.15], origin: [600, 1100], overline: 'The potato', headline: 'A swollen stem.', sub: 'Botanists call it a tuber.',
        callouts: [
          {x: 600, y: 760, title: 'Eye', detail: 'a bud', point: [739, 1182], width: 300, at: 40},
          {x: 72, y: 1580, title: 'Sprout', detail: 'a new shoot', point: [334, 907], width: 380, at: 70},
          {x: 560, y: 1640, title: 'Potato', chip: YES, width: 290, at: 100},
        ],
      },
      {
        sec: 7, transition: 'dot', photo: 'sweet-potato-roots.jpg', overline: 'The sweet potato', headline: 'A storage root.', sub: 'It belongs to the morning glory family.',
        callouts: [
          {x: 560, y: 1640, title: 'Storage root', detail: 'no eyes', point: [778, 1360], width: 420, at: 40},
          {x: 72, y: 1780, title: 'Sweet potato', chip: NO, tone: 'no', width: 520, at: 80},
        ],
      },
      {sec: 4.2, kind: 'end', headline: 'Different organs. Different families.', size: 96},
    ],
  },

  'pepper-or-not': {
    date: '8 Nov',
    scenes: [
      {sec: 3.6, photo: 'peppers-chilies.jpg', overline: 'Quiz', headline: 'Pepper or not?', sub: 'Six "peppers". Which ones are nightshades?'},
      quiz('peppers-chilies.jpg', 'Bell pepper?', [253, 1344], true),
      quiz('peppers-chilies.jpg', 'Chili?', [625, 1490], true),
      quiz('spice-jars-tall.jpg', 'Paprika?', [541, 1280], true),
      quiz('peppercorns.jpg', 'Black pepper?', [185, 1215], false, 'Piper nigrum, a vine from India.'),
      quiz('peppercorns.jpg', 'Pink peppercorns?', [541, 1215], false, 'Berries from a tree, Schinus.'),
      quiz('peppercorns.jpg', 'Sichuan pepper?', [897, 1225], false, 'From the citrus family, Zanthoxylum.'),
      {sec: 4, kind: 'end', headline: 'How many did you get right?', sub: 'Comment your score out of 6 👇'},
    ],
  },

  'the-lantern': {
    date: '15 Nov',
    scenes: [
      {sec: 4.2, photo: 'harankash.jpg', overline: 'Botany 101', headline: 'Why does harankash wear a lantern?', size: 104},
      {
        sec: 6.5, transition: 'zoom', photo: 'harankash.jpg', zoom: [1.1, 1.35], origin: [600, 1250], overline: 'The papery husk', headline: "It's the calyx.",
        sub: 'The flower\'s five sepals, grown big around the fruit.',
        callouts: [{x: 560, y: 1640, title: 'Husk', detail: 'five sepals', point: [648, 1150], width: 400, at: 40}],
      },
      {
        sec: 6.5, transition: 'dot', photo: 'tomato-calyx.jpg', overline: 'Same family, same part', headline: 'The green star on a tomato.',
        callouts: [{x: 560, y: 1640, title: 'Calyx', detail: 'five sepals', point: [616, 1215], width: 400, at: 40}],
      },
      {sec: 5, kind: 'mark', transition: 'zoom', overline: 'Five sepals', headline: "It's also our logo."},
      {sec: 3.8, kind: 'end'},
    ],
  },

  'breakfast-table': {
    date: '22 Nov',
    scenes: [
      {sec: 3.8, photo: 'breakfast.jpg', overline: 'Egyptian breakfast', headline: 'We tagged the whole table.'},
      {
        sec: 7.5, photo: 'breakfast.jpg', overline: 'The basics', headline: 'No nightshades here.', size: 96,
        callouts: [
          {x: 600, y: 760, title: "Ta'meya", chip: NO, tone: 'no', point: [849, 1004], width: 420, at: 24},
          {x: 72, y: 1500, title: 'Ful', chip: NO, tone: 'no', point: [541, 1393], width: 420, at: 40},
          {x: 600, y: 1560, title: 'Eggs', chip: NO, tone: 'no', point: [978, 1426], width: 420, at: 56},
          {x: 420, y: 1760, title: 'Cheese', chip: NO, tone: 'no', point: [816, 1701], width: 420, at: 72},
        ],
      },
      {
        sec: 7, transition: 'dot', anchor: [541, 1037], photo: 'breakfast.jpg', overline: 'The sides', headline: "Here's where they hide.", size: 96,
        callouts: [
          {x: 72, y: 1500, title: 'Tomato slices', chip: YES, point: [250, 1118], width: 380, at: 24},
          {x: 560, y: 1500, title: 'Pickled peppers', chip: YES, point: [428, 859], width: 420, at: 44},
          {x: 600, y: 600, title: 'Shatta', chip: YES, point: [541, 1037], width: 290, at: 64},
        ],
      },
      {sec: 4.2, kind: 'end', headline: 'Nightshade-free basics.', sub: 'The sides are where they hide.'},
    ],
  },

  'plant-signature': {
    date: '6 Dec',
    scenes: [
      {sec: 4.2, photo: 'veg-flatlay-tall.jpg', overline: 'Built-in chemistry', headline: 'Every plant has a signature.'},
      {sec: 4.6, transition: 'zoom', photo: 'veg-flatlay-tall.jpg', zoom: [1.4, 1.55], origin: [447, 1199], overline: 'Potato', headline: 'Solanine.', callouts: [{x: 560, y: 1640, title: 'Potato', detail: 'solanine', point: [447, 1199], width: 400, at: 24}]},
      {sec: 4.6, transition: 'dot', photo: 'tomato-calyx.jpg', overline: 'Tomato', headline: 'Tomatine.', callouts: [{x: 560, y: 1640, title: 'Tomato', detail: 'tomatine', point: [616, 1215], width: 400, at: 24}]},
      {sec: 4.6, transition: 'dot', photo: 'peppers-chilies.jpg', zoom: [1.3, 1.45], origin: [625, 1490], overline: 'Chili', headline: 'Capsaicin.', callouts: [{x: 72, y: 1700, title: 'Chili', detail: 'capsaicin', point: [625, 1490], width: 400, at: 24}]},
      {sec: 5, transition: 'zoom', photo: 'spice-jars-tall.jpg', overline: 'Why?', headline: 'Natural compounds plants make to defend themselves.', size: 92},
      {sec: 3.8, kind: 'end'},
    ],
  },

  'holiday-table': {
    date: '27 Dec',
    scenes: [
      {sec: 3.8, photo: 'holiday-table.jpg', overline: 'Holiday table', headline: 'Where nightshades hide at a feast.', size: 100},
      {
        sec: 7.5, photo: 'holiday-table.jpg', overline: 'Check these', headline: 'Ask the cook.', size: 96,
        callouts: [
          {x: 72, y: 1100, title: 'Roast potatoes', chip: YES, point: [204, 842], width: 420, at: 24},
          {x: 560, y: 560, title: 'Hummus', detail: 'paprika on top', point: [593, 778], width: 460, at: 44},
          {x: 72, y: 1700, title: 'Gravy', detail: 'check the stock', point: [528, 1118], width: 460, at: 64},
          {x: 560, y: 1300, title: 'Pastries', detail: 'check the filling', point: [917, 1069], width: 480, at: 84},
        ],
      },
      {
        sec: 6.5, transition: 'zoom', photo: 'holiday-table.jpg', zoom: [1.1, 1.2], overline: 'Easy swaps', headline: 'Same feast, new twists.', size: 96,
        callouts: [
          {x: 72, y: 1460, title: 'Sweet potato & carrot', detail: 'instead of potatoes', chip: 'Swap', tone: 'keep', width: 700, at: 24},
          {x: 72, y: 1660, title: 'Cumin & olive oil', detail: 'instead of paprika', chip: 'Swap', tone: 'keep', width: 700, at: 50},
        ],
      },
      {sec: 4.2, kind: 'end', headline: 'Save this for your next feast.', size: 100},
    ],
  },

  'nightshade-or-not': {
    date: '10 Jan',
    scenes: [
      {sec: 3.4, photo: 'veg-flatlay-tall.jpg', overline: 'Quiz', headline: 'Nightshade or not?', sub: '10 foods. 2 seconds each. Keep score.'},
      quiz('veg-flatlay-tall.jpg', 'Tomato?', [220, 1328], true),
      quiz('not-nightshades.jpg', 'Sweet potato?', [168, 1296], false),
      quiz('veg-flatlay-tall.jpg', 'Eggplant?', [658, 1296], true),
      quiz('peppercorns.jpg', 'Black pepper?', [185, 1215], false),
      quiz('spice-jars-tall.jpg', 'Paprika?', [541, 1280], true),
      quiz('not-nightshades.jpg', 'Cucumber?', [411, 1312], false),
      quiz('goji-tomatoes.jpg', 'Goji berries?', [421, 1523], true),
      quiz('not-nightshades.jpg', 'Mushrooms?', [904, 1296], false),
      quiz('veg-flatlay-tall.jpg', 'Potato?', [447, 1199], true),
      quiz('not-nightshades.jpg', 'Onion?', [632, 1296], false),
      {sec: 4, kind: 'end', headline: 'Score out of 10?', sub: 'Tell us in the comments 👇'},
    ],
  },
};
