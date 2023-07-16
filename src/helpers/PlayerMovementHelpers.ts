import { PlayerDirection } from '~/model/PlayerDirectionEnum';
import {
  CustomMouseEvent,
  ElementSize,
  PlayerMoveEvent,
  Position,
} from '~/model/customTypes.model';

/* SET CUSTOM VARIABLES  */
const RESTRICTED_DISTANCE = 50;
const MINIMAL_DISTANCE = 60;
const MOVE_MAGNITUDE = 10;
const SCROLL_MAGNITUDE = 3;

export const playerMovementHelpers = {
  /* CALCULATE MAP'S RESTRICTED ZONES  */
  getMapRestrictions: (
    canvasSize: ElementSize,
    distanceX = RESTRICTED_DISTANCE,
    distanceY = RESTRICTED_DISTANCE,
  ) => {
    const leftRestrict = distanceX;
    const topRestrict = distanceY;
    const rightRestrict = canvasSize.width - distanceX;
    const bottomRestrict = canvasSize.height - distanceY;

    return { leftRestrict, topRestrict, rightRestrict, bottomRestrict };
  },

  /* CALCULATE NORMALIZED DISTANCES (by X axis, Y axis and total)  */
  getNormalizedDistances: (
    prevPosition: Position,
    position: Position,
    moveMagnitude = MOVE_MAGNITUDE,
  ) => {
    const { x: prevX, y: prevY } = prevPosition;
    const { x: newX, y: newY } = position;
    const dX = newX - prevX;
    const dY = newY - prevY;
    const dist = Math.sqrt(dX * dX + dY * dY);

    const normalizedDX = (dX / dist) * moveMagnitude;
    const normalizedDY = (dY / dist) * moveMagnitude;

    return { normalizedDX, normalizedDY, dist };
  },

  /* CALCULATE NORMALIZED PLAYER POSITION  */
  getNormalizedPosition: (prevPosition: Position, position: Position, mapSize: ElementSize) => {
    const { x: prevX, y: prevY } = prevPosition;
    const { leftRestrict, topRestrict, rightRestrict, bottomRestrict } =
      playerMovementHelpers.getMapRestrictions(mapSize);
    const { normalizedDX, normalizedDY, dist } = playerMovementHelpers.getNormalizedDistances(
      prevPosition,
      position,
    );

    // return if move occurred to close to player
    if (dist < MINIMAL_DISTANCE) return prevPosition;
    const isOnBoarderX =
      leftRestrict >= prevX + normalizedDX || prevX + normalizedDX >= rightRestrict;

    const isOnBoarderY =
      topRestrict >= prevY + normalizedDY || prevY + normalizedDY >= bottomRestrict;

    // return updated position only for move inside allowed areas
    return {
      x: isOnBoarderX ? prevX : prevX + normalizedDX,
      y: isOnBoarderY ? prevY : prevY + normalizedDY,
    };
  },

  /* CALCULATE POSITION ON ARROW MOVE  */
  getPlayerCoordsOnKeydown: (key: string, prevPosition: Position): Position => {
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
  },

  /* VALIDATE FOR RESTRICTED ARROW MOVE  */
  checkForRestrictedArrowMove: (
    key: string,
    prevPosition: Position,
    mapSize: ElementSize,
  ): boolean => {
    const { leftRestrict, topRestrict, rightRestrict, bottomRestrict } =
      playerMovementHelpers.getMapRestrictions(mapSize);

    const restrictedLeft = key === 'ArrowLeft' && prevPosition.x <= leftRestrict;
    const restrictedTop = key === 'ArrowUp' && prevPosition.y <= topRestrict;
    const restrictedRight = key === 'ArrowRight' && prevPosition.x >= rightRestrict;
    const restrictedBottom = key === 'ArrowDown' && prevPosition.y >= bottomRestrict;

    const isRestricted = restrictedLeft || restrictedRight || restrictedBottom || restrictedTop;

    return isRestricted;
  },

  /* GET PLAYER DIRECTION */
  getDirectionOnMouseMove: (mousePosition: Position, playerPosition: Position) =>
    mousePosition.x < playerPosition.x ? PlayerDirection.LEFT : PlayerDirection.RIGHT,

  getDirectionOnArrowMove: (e: KeyboardEvent) => {
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
  },

  /* SCROLL VIEW BY X & Y */
  scrollPlayerView: (x: number, y: number) => {
    const { scrollLeft: currentScrollX, scrollTop: currentScrollY } = document.documentElement;

    window.scrollTo(currentScrollX + x, currentScrollY + y);
  },

  /* SCROLL VIEW ON PLAYER MOUSE MOVE */
  scrollPlayerViewOnMouseMove: (prevPosition: Position, mousePosition: Position): void => {
    const { normalizedDX, normalizedDY } = playerMovementHelpers.getNormalizedDistances(
      prevPosition,
      mousePosition,
    );
    playerMovementHelpers.scrollPlayerView(
      normalizedDX / SCROLL_MAGNITUDE,
      normalizedDY / SCROLL_MAGNITUDE,
    );
  },

  /* SCROLL VIEW ON PLAYER KEYBOARD ARROW MOVE */
  scrollPlayerViewOnArrowDown: (
    key: KeyboardEvent['key'],
    playerPosition: Position,
    mapSize: ElementSize,
  ): void => {
    const { clientWidth, clientHeight } = document.documentElement;

    const { leftRestrict, topRestrict, rightRestrict, bottomRestrict } =
      playerMovementHelpers.getMapRestrictions(
        mapSize,
        clientWidth / 2, // we want to stop player movement for the half the size of viewport
        clientHeight / 2, // same as above for height
      );
    const leftStop = leftRestrict >= playerPosition.x;
    const rightStop = rightRestrict <= playerPosition.x;
    const upStop = topRestrict >= playerPosition.y;
    const downStop = bottomRestrict <= playerPosition.y;

    // returns - prevent scrolling if player is near the map border
    switch (key) {
      case 'ArrowLeft':
        if (rightStop) return;
        return playerMovementHelpers.scrollPlayerView(-10, 0);
      case 'ArrowRight':
        if (leftStop) return;
        return playerMovementHelpers.scrollPlayerView(10, 0);
      case 'ArrowUp':
        if (downStop) return;
        return playerMovementHelpers.scrollPlayerView(0, -10);
      case 'ArrowDown':
        if (upStop) return;
        return playerMovementHelpers.scrollPlayerView(0, 10);
      default:
        return;
    }
  },
};
