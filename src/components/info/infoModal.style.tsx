import { CSSProperties } from 'react';
import { hoMM3BoxStyle } from '~/common/commonStyle.style';

export const ModalStyle: CSSProperties = {
  ...hoMM3BoxStyle,
  backgroundImage: 'url(https://herowo.akamaized.net/BMP-PNG/DIBOX128.png)',
  lineHeight: '2.8125em',
  pointerEvents: 'none',
  top: '2rem',
  right: '2rem',
  position: 'fixed',
  zIndex: 250,
};

export const InfoModalStyles = {
  modal: ModalStyle,
  h2: { fontFamily: 'Georgia,serif', color: '#ffe794', textShadow: '1px 1px 0 #000;' },
};
