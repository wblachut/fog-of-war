import { mapSize, Position } from '~/model/types';

const RESTRICTED_RADIUS = 25;
const MAGNITUDE = 10;

export const getNormalizedDirections = (
  prevPosition: Position,
  position: Position,
  mapSize: mapSize,
): Position => {
  const { leftRestrict, topRestrict, rightRestrict, bottomRestrict } = getMapRestrictions(mapSize);
  const { x: prevX, y: prevY } = prevPosition;
  const { x: newX, y: newY } = position;
  const dX = newX - prevX;
  const dY = newY - prevY;
  const dist = Math.sqrt(dX * dX + dY * dY);
  const normalizedDX = (dX / dist) * MAGNITUDE;
  const normalizedDY = (dY / dist) * MAGNITUDE;

  const isOnBoarderX =
    leftRestrict >= prevX + normalizedDX || prevX + normalizedDX >= rightRestrict;

  const isOnBoarderY =
    topRestrict >= prevY + normalizedDY || prevY + normalizedDY >= bottomRestrict;

  return {
    x: isOnBoarderX ? prevX : prevX + normalizedDX,
    y: isOnBoarderY ? prevY : prevY + normalizedDY,
  };
};

export const getPlayerCoordsOnKeydown = (key: string, prevPosition: Position) => {
  switch (key) {
    case 'ArrowLeft':
      return {
        ...prevPosition,
        x: prevPosition.x - 10,
      };
    case 'ArrowUp':
      return {
        ...prevPosition,
        y: prevPosition.y - 10,
      };
    case 'ArrowRight':
      return {
        ...prevPosition,
        x: prevPosition.x + 10,
      };
    case 'ArrowDown':
      return {
        ...prevPosition,
        y: prevPosition.y + 10,
      };
    default:
      return prevPosition;
  }
};

export const checkForRestrictedMove = (key: string, prevPosition: Position, mapSize: mapSize) => {
  const { leftRestrict, topRestrict, rightRestrict, bottomRestrict } = getMapRestrictions(mapSize);

  const restrictedLeft = key === 'ArrowLeft' && prevPosition.x <= leftRestrict;
  const restrictedTop = key === 'ArrowUp' && prevPosition.y <= topRestrict;
  const restrictedRight = key === 'ArrowRight' && prevPosition.x >= rightRestrict;
  const restrictedBottom = key === 'ArrowDown' && prevPosition.y >= bottomRestrict;

  const isRestricted = restrictedLeft || restrictedRight || restrictedBottom || restrictedTop;

  return isRestricted;
};

function getMapRestrictions(canvasSize: mapSize, radius = RESTRICTED_RADIUS) {
  const leftRestrict = radius;
  const topRestrict = radius;
  const rightRestrict = canvasSize.width - radius;
  const bottomRestrict = canvasSize.height - radius;

  return { leftRestrict, topRestrict, rightRestrict, bottomRestrict };
}
