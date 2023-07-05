import { CSSProperties } from 'react';

interface PlayerMarkerProps {
  playerImageSrc: string;
}

const PlayerMarkerStyle: CSSProperties = {
  height: 120,
  pointerEvents: 'none',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export const PlayerMarker = ({ playerImageSrc }: PlayerMarkerProps) => {
  return <img src={playerImageSrc} alt='player-marker' style={PlayerMarkerStyle} />;
};
