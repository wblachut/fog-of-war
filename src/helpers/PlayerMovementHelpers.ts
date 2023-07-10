import { PlayerDirection } from '~/model/PlayerDirectionEnum';
import {
  CustomMouseEvent,
  ElementSize,
  PlayerMoveEvent,
  Position,
} from '~/model/customTypes.model';

const RESTRICTED_DISTANCE = 50;
const MINIMAL_DISTANCE = 60;
const MOVE_MAGNITUDE = 20;
const SCROLL_MAGNITUDE = 2;

export function getMapRestrictions(
  canvasSize: ElementSize,
  distanceX = RESTRICTED_DISTANCE,
  distanceY = RESTRICTED_DISTANCE,
) {
  const leftRestrict = distanceX;
  const topRestrict = distanceY;
  const rightRestrict = canvasSize.width - distanceX;
  const bottomRestrict = canvasSize.height - distanceY;

  return { leftRestrict, topRestrict, rightRestrict, bottomRestrict };
}

export const getNormalizedDistances = (prevPosition: Position, position: Position) => {
  const { x: prevX, y: prevY } = prevPosition;
  const { x: newX, y: newY } = position;
  const dX = newX - prevX;
  const dY = newY - prevY;
  const dist = Math.sqrt(dX * dX + dY * dY);

  const normalizedDX = (dX / dist) * MOVE_MAGNITUDE;
  const normalizedDY = (dY / dist) * MOVE_MAGNITUDE;

  return { normalizedDX, normalizedDY, dist };
};

export const getNormalizedPosition = (
  prevPosition: Position,
  position: Position,
  mapSize: ElementSize,
) => {
  const { x: prevX, y: prevY } = prevPosition;
  const { leftRestrict, topRestrict, rightRestrict, bottomRestrict } = getMapRestrictions(mapSize);
  const { normalizedDX, normalizedDY, dist } = getNormalizedDistances(prevPosition, position);

  if (dist < MINIMAL_DISTANCE) return prevPosition;
  const isOnBoarderX =
    leftRestrict >= prevX + normalizedDX || prevX + normalizedDX >= rightRestrict;

  const isOnBoarderY =
    topRestrict >= prevY + normalizedDY || prevY + normalizedDY >= bottomRestrict;

  return {
    x: isOnBoarderX ? prevX : prevX + normalizedDX,
    y: isOnBoarderY ? prevY : prevY + normalizedDY,
  };
};

export const getPlayerCoordsOnKeydown = (key: string, prevPosition: Position): Position => {
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

export const checkForRestrictedMove = (
  key: string,
  prevPosition: Position,
  mapSize: ElementSize,
): boolean => {
  const { leftRestrict, topRestrict, rightRestrict, bottomRestrict } = getMapRestrictions(mapSize);

  const restrictedLeft = key === 'ArrowLeft' && prevPosition.x <= leftRestrict;
  const restrictedTop = key === 'ArrowUp' && prevPosition.y <= topRestrict;
  const restrictedRight = key === 'ArrowRight' && prevPosition.x >= rightRestrict;
  const restrictedBottom = key === 'ArrowDown' && prevPosition.y >= bottomRestrict;

  const isRestricted = restrictedLeft || restrictedRight || restrictedBottom || restrictedTop;

  return isRestricted;
};

export const getPlayerDirection = (
  e: Partial<PlayerMoveEvent>,
  playerPosition: Position,
): PlayerDirection | undefined => {
  const isMouseEvent = e.type === 'mousemove';
  const isArrowEvent = e.type === 'keydown';
  if (isMouseEvent) return getDirectionOnMouseMove(e as CustomMouseEvent, playerPosition);
  if (isArrowEvent) return getDirectionOnArrowMove(e as KeyboardEvent);
  return;
};

export const getDirectionOnMouseMove = (e: CustomMouseEvent, playerPosition: Position) =>
  e.evt.offsetX < playerPosition.x ? PlayerDirection.LEFT : PlayerDirection.RIGHT;

export const getDirectionOnArrowMove = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowLeft':
      return PlayerDirection.LEFT;
    case 'ArrowRight':
      return PlayerDirection.RIGHT;
    case 'ArrowUp':
    case 'ArrowDown':
    default:
      return;
  }
};

export const scrollPlayerView = (x: number, y: number) => {
  const currentScrollX = window.scrollX || document.documentElement.scrollLeft;
  const currentScrollY = window.screenY || document.documentElement.scrollTop;

  window.scrollTo(currentScrollX + x, currentScrollY + y);
};

export const scrollPlayerViewOnMouseMove = (
  prevPosition: Position,
  mousePosition: Position,
): void => {
  const { normalizedDX, normalizedDY } = getNormalizedDistances(prevPosition, mousePosition);
  scrollPlayerView(normalizedDX / SCROLL_MAGNITUDE, normalizedDY / SCROLL_MAGNITUDE);
};

export const scrollPlayerViewOnArrowDown = (
  key: KeyboardEvent['key'],
  playerPosition: Position,
  mapSize: ElementSize,
): void => {
  const { clientWidth, clientHeight } = document.documentElement;
  const { leftRestrict, topRestrict, rightRestrict, bottomRestrict } = getMapRestrictions(
    mapSize,
    clientWidth / 2,
    clientHeight / 2,
  );
  const leftStop = leftRestrict >= playerPosition.x;
  const rightStop = rightRestrict <= playerPosition.x;
  const upStop = topRestrict >= playerPosition.y;
  const downStop = bottomRestrict <= playerPosition.y;

  switch (key) {
    case 'ArrowLeft':
      if (rightStop) return;
      return scrollPlayerView(-10, 0);
    case 'ArrowRight':
      if (leftStop) return;
      return scrollPlayerView(10, 0);
    case 'ArrowUp':
      if (downStop) return;
      return scrollPlayerView(0, -10);
    case 'ArrowDown':
      if (upStop) return;
      return scrollPlayerView(0, 10);
    default:
      return;
  }
};
