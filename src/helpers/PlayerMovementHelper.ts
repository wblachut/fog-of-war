import { Position } from '~/model/types';

export const getNormalizedDirections = (prevPosition: Position, position: Position): Position => {
  const directionX = position.x - prevPosition.x;
  const directionY = position.y - prevPosition.y;

  const length = Math.sqrt(directionX * directionX + directionY * directionY);
  const normalizedDirectionX = (directionX / length) * 10;
  const normalizedDirectionY = (directionY / length) * 10;

  return {
    x: prevPosition.x + normalizedDirectionX,
    y: prevPosition.y + normalizedDirectionY,
  };
};
