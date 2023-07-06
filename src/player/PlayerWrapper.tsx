import { PlayerDirection, Position } from '~/model/types';

interface PlayerWrapperProps {
  playerMarker: JSX.Element;
  playerPosition: Position;
  playerDirection: PlayerDirection;
}

export const PlayerWrapper = ({
  playerMarker,
  playerPosition,
  playerDirection,
}: PlayerWrapperProps) => {
  const isStaringLeft = playerDirection === PlayerDirection.LEFT;

  return (
    <div
      style={{
        position: 'absolute',
        left: playerPosition.x,
        top: playerPosition.y,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scaleX(${isStaringLeft ? -1 : 1})`,
      }}
      id='player-marker-wrapper'
    >
      {playerMarker}
    </div>
  );
};
