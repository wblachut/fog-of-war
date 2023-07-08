import { CSSProperties } from 'react';
import { Position } from '~/model/customTypes.model';

export const PlayerWrapperStyles = (
  playerPosition: Position,
  isStaringLeft: boolean,
): CSSProperties => ({
  position: 'absolute',
  left: playerPosition.x,
  top: playerPosition.y,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transform: `scaleX(${isStaringLeft ? -1 : 1})`,
});
