import { PlayerMarkerStyle } from './PlayerMarker.styles';

interface PlayerMarkerProps {
  playerImageSrc: string;
}

export const PlayerMarker = ({ playerImageSrc }: PlayerMarkerProps) => {
  return <img src={playerImageSrc} alt='player-marker' style={PlayerMarkerStyle} />;
};
