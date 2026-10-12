import {Easing} from 'remotion';

// Brand tokens, matching nightshadehealth.com (docs/brand/tokens/tokens.css).
export const C = {
  bg: '#07090A',
  surface: '#0E1412',
  border: 'rgba(110,195,140,.13)',
  borderStrong: 'rgba(110,195,140,.32)',
  text: '#ECF4EF',
  sub: '#C4D6CC',
  muted: '#9DB5A8',
  brand: '#6EC38C',
  shade: '#2E6A48',
  saffron: '#E9B949',
};

export const SANS = 'Sora, system-ui, sans-serif';
export const MONO = 'GeistMono, ui-monospace, monospace';
export const ARABIC = 'Alexandria, Sora, sans-serif';

// The one brand easing: cubic-bezier(.2,.8,.2,1).
export const EASE = Easing.bezier(0.2, 0.8, 0.2, 1);
