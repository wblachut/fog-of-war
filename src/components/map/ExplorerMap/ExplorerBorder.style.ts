import mapBorder from '~/assets/map-border.png';

export const ExplorerBorderStyle = {
  border: '20px solid',
  position: 'fixed' as const,
  top: 0,
  left: 0,
  pointerEvents: 'none' as const,
  zIndex: 300,
  borderColor: 'transparent',
  borderImageSource: `url(${mapBorder})`,
  borderImageSlice: '20',
};
