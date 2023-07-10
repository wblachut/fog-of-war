import { PlayerDirection } from '~/model/PlayerDirectionEnum';
import { Position } from '~/model/customTypes.model';
import { PlayerWrapperStyles } from './PlayerWrapper.styles';

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
      data-testid='player-wrapper'
      style={PlayerWrapperStyles(playerPosition, isStaringLeft)}
      id='player-marker-wrapper'
    >
      {playerMarker}
    </div>
  );
};
