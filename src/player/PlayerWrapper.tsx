import { Position } from '~/model/customTypes.model';
import { PlayerWrapperStyles } from './PlayerWrapper.styles';
import { PlayerDirection } from '~/model/PlayerDirectionEnum';

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
    <div style={PlayerWrapperStyles(playerPosition, isStaringLeft)} id='player-marker-wrapper'>
      {playerMarker}
    </div>
  );
};
