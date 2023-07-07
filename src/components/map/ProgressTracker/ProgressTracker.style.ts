import { CSSProperties } from 'react';
import { hoMM3BoxStyle } from '~/common/commonStyle.style';

export const progressTrackerStyle: CSSProperties = {
  ...hoMM3BoxStyle,
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  zIndex: 200,
  pointerEvents: 'none',
  width: '12rem',
};
