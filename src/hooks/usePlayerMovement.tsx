import { useCallback, useEffect, useState } from 'react';
import {
  checkForRestrictedMove,
  getNormalizedPosition,
  getPlayerCoordsOnKeydown,
  getPlayerDirection,
  scrollPlayerViewOnArrowDown,
  scrollPlayerViewOnMouseMove,
} from '~/helpers/PlayerMovementHelpers';
import { PlayerDirection } from '~/model/PlayerDirectionEnum';
import {
  CustomMouseEvent,
  ElementSize,
  PlayerMoveEvent,
  Position,
} from '~/model/customTypes.model';

/* SET CUSTOM VARIABLES  */
const STARTING_POSITION = { x: 560, y: 380 }; // Bastion castle position
const HIDDEN_POSITION = { x: -100, y: -100 }; // position outside the map
const LEFT_CLICK_MOUSE_BUTTON = 0; // left mouse button key number

export interface MoveHandler {
  playerPosition: Position;
  playerDirection: PlayerDirection;
  handleMouseMove: (e: CustomMouseEvent) => void;
  handleMouseDown: (e: CustomMouseEvent) => void;
  handleMouseUp: () => void;
}

export const usePlayerMovement = (mapSize: ElementSize, isMounted: boolean) => {
  const [playerPosition, setPlayerPosition] = useState<Position>(HIDDEN_POSITION);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [playerDirection, setPlayerDirection] = useState(PlayerDirection.RIGHT);

  /* HANDLE THE DIRECTION PLAYER IS FACING  */
  const handlePlayerDirection = (e: PlayerMoveEvent, playerPosition: Position) => {
    const newDirection = getPlayerDirection(e, playerPosition);
    setPlayerDirection((prevDirection) => newDirection ?? prevDirection);
  };

  /* HANDLE MAP SCROLLING ON MOUSE MOVE  */
  const handleScrollPlayerView = useCallback((prevPosition: Position, position: Position) => {
    scrollPlayerViewOnMouseMove(prevPosition, position);
  }, []);

  /* PLAYER MOVEMENT  */
  // Player movement is done on Mouse Move when the isMousePressed flag is truthy

  /* HANDLE PLAYER MOUSE MOVEMENT  */
  const handleMouseMove = useCallback(
    (e: CustomMouseEvent) => {
      const stage = e.currentTarget.getStage(); // mouse event are stage events
      const position = stage?.getPointerPosition();

      if (!isMousePressed || !isMounted) return;

      const mousePosition = position as Position;
      handlePlayerDirection(e, playerPosition);
      setPlayerPosition((prevPosition) => {
        // We need prevPosition for scrolling func that is why we call this function in useState
        handleScrollPlayerView(prevPosition, mousePosition);

        return getNormalizedPosition(prevPosition, mousePosition, mapSize);
      });
    },
    [isMousePressed, mapSize, playerPosition, isMounted, handleScrollPlayerView],
  );

  /* HANDLE isMousePressed FLAG  */
  const handleMouseDown = useCallback(
    (e: CustomMouseEvent) => {
      const leftMouseButtonClick = e.evt.button === LEFT_CLICK_MOUSE_BUTTON;
      if (!leftMouseButtonClick || !isMounted) return;
      setIsMousePressed(true);
    },
    [isMounted],
  );

  const handleMouseUp = useCallback(() => {
    setIsMousePressed(false);
  }, []);

  /* HANDLE PLAYER KEYBOARD ARROW MOVES  */
  const handleArrowMove = useCallback(
    (e: KeyboardEvent) => {
      const arrowKeyEvent = e.key.includes('Arrow');
      if (!arrowKeyEvent) return; // we want other keys to behave as usual
      e.preventDefault();
      const isRestricted = checkForRestrictedMove(e.key, playerPosition, mapSize);
      if (isRestricted) return; // disallow player to leave the map
      const newCoordinates = getPlayerCoordsOnKeydown(e.key, playerPosition);
      setPlayerPosition(newCoordinates);
      scrollPlayerViewOnArrowDown(e.key, playerPosition, mapSize);
      handlePlayerDirection(e, playerPosition);
    },
    [playerPosition, mapSize],
  );

  /* SET handleArrowMove LISTENER ON WINDOW */
  useEffect(() => {
    window.addEventListener('keydown', handleArrowMove);

    return () => {
      window.removeEventListener('keydown', handleArrowMove);
    };
  }, [handleArrowMove]);

  // SET PLAYER IN THE STARTING POINT AND UNCOVER FIRST BIT OF MAP
  const MoveToBeginnerLocation = useCallback(() => {
    setPlayerPosition(STARTING_POSITION);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    MoveToBeginnerLocation();
  }, [MoveToBeginnerLocation, isMounted]);

  const moveHandler = {
    playerPosition,
    playerDirection,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
  };

  return { playerPosition, setPlayerPosition, moveHandler };
};
