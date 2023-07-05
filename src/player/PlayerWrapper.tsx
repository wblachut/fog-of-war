import { Position } from '~/model/types';

interface PlayerWrapperProps {
  playerMarker: JSX.Element;
  playerPosition: Position;
}

export const PlayerWrapper = ({ playerMarker, playerPosition }: PlayerWrapperProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: playerPosition.x,
        top: playerPosition.y,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      id='player-marker-wrapper'
    >
      {playerMarker}
    </div>
  );
};
