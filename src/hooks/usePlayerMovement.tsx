import { useCallback, useEffect, useRef, useState } from 'react';
import { playerMovementHelpers } from '~/helpers/PlayerMovementHelpers';
import { PlayerDirection } from '~/model/PlayerDirectionEnum';
import {
  CustomMouseEvent,
  ElementSize,
  PlayerMoveEvent,
  Position,
  TimeoutType,
} from '~/model/customTypes.model';

/* SET CUSTOM VARIABLES  */
const STARTING_POSITION = { x: 560, y: 380 };
const HIDDEN_POSITION = { x: -100, y: -100 };
const LEFT_CLICK_MOUSE_BUTTON = 0;
const MOVE_ON_HOLD_INTERVAL = 20;

export interface MoveHandler {
  playerPosition: Position;
  playerDirection: PlayerDirection;
  handleMouseMove: (e: CustomMouseEvent) => void;
  handleMouseDown: (e: CustomMouseEvent) => void;
  handleMouseUp: () => void;
}

const {
  getNormalizedPosition,
  getPlayerCoordsOnKeydown,
  getPlayerDirection,
  scrollPlayerViewOnMouseMove,
  scrollPlayerViewOnArrowDown,
  checkForRestrictedArrowMove,
} = playerMovementHelpers;

export const usePlayerMovement = (mapSize: ElementSize, isMounted: boolean) => {
  const [playerPosition, setPlayerPosition] = useState<Position>(HIDDEN_POSITION);
  const [mousePosition, setMousePosition] = useState<Position>(STARTING_POSITION);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [playerDirection, setPlayerDirection] = useState(PlayerDirection.RIGHT);
  const intervalId = useRef<TimeoutType>(null);

  /* HANDLE THE DIRECTION PLAYER IS FACING  */
  const handlePlayerDirection = useCallback((e: PlayerMoveEvent, playerPosition: Position) => {
    const newDirection = getPlayerDirection(e, playerPosition);
    setPlayerDirection((prevDirection) => newDirection ?? prevDirection);
  }, []);

  /* HANDLE MAP SCROLLING ON MOUSE MOVE  */
  const handleScrollPlayerView = useCallback((prevPosition: Position, position: Position) => {
    scrollPlayerViewOnMouseMove(prevPosition, position);
  }, []);

  /* PLAYER MOVEMENT */
  // Player movement is done on mouse down (isMousePressed flag)
  // by mouse move (handleMouseMove) or mouse hold (useEffect with setTimeout)

  /* HANDLE PLAYER MOUSE MOVEMENT  */
  const handleMouseMove = useCallback(
    (e: CustomMouseEvent) => {
      const stage = e.currentTarget.getStage(); // mouse event are stage events
      const newMousePosition = stage?.getPointerPosition() as Position;

      if (!isMousePressed || !isMounted) return;
      setMousePosition(newMousePosition);

      setPlayerPosition((prevPosition) => {
        handlePlayerDirection(e, playerPosition);
        // We need prevPosition for scrolling func that is why we call this function in useState
        handleScrollPlayerView(prevPosition, newMousePosition);

        return getNormalizedPosition(prevPosition, newMousePosition, mapSize);
      });
    },
    [
      isMousePressed,
      mapSize,
      playerPosition,
      isMounted,
      handlePlayerDirection,
      handleScrollPlayerView,
    ],
  );

  /* HANDLE isMousePressed FLAG  */
  const handleMouseDown = useCallback(
    (e: CustomMouseEvent) => {
      const leftMouseButtonClick = e.evt.button === LEFT_CLICK_MOUSE_BUTTON;
      if (!leftMouseButtonClick || !isMounted) return;
      setIsMousePressed(true);
      const stage = e.currentTarget.getStage();
      const newMousePosition = stage?.getPointerPosition() as Position;
      setMousePosition(newMousePosition);
    },
    [isMounted],
  );
  const handleMouseUp = useCallback(() => {
    setIsMousePressed(false);
    clearInterval(intervalId.current as NonNullable<TimeoutType>);
  }, []);

  /* HANDLE PLAYER MOVE ON MOUSE DOWN HOLD (no mouse movement) */
  useEffect(() => {
    if (!isMousePressed) return;
    clearTimeout(intervalId?.current as NonNullable<TimeoutType>);
    intervalId.current = setInterval(() => {
      setPlayerPosition((prevPosition) => {
        return getNormalizedPosition(prevPosition, mousePosition, mapSize);
      });
    }, MOVE_ON_HOLD_INTERVAL);

    return () => {
      clearTimeout(intervalId.current as NonNullable<TimeoutType>);
    };
  }, [isMousePressed, mousePosition, handleScrollPlayerView, mapSize]);

  /* HANDLE PLAYER KEYBOARD ARROW MOVES  */
  const handleArrowMove = useCallback(
    (e: KeyboardEvent) => {
      const arrowKeyEvent = e.key.includes('Arrow');
      if (!arrowKeyEvent) return; // we want other keys to behave as usual
      e.preventDefault();
      const isRestricted = checkForRestrictedArrowMove(e.key, playerPosition, mapSize);
      if (isRestricted) return; // disallow player to leave the map
      const newCoordinates = getPlayerCoordsOnKeydown(e.key, playerPosition);
      setPlayerPosition(newCoordinates);
      scrollPlayerViewOnArrowDown(e.key, playerPosition, mapSize);
      handlePlayerDirection(e, playerPosition);
    },
    [playerPosition, mapSize, handlePlayerDirection],
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

    // make sure that on hard reload scroll is set to starter location
    window.onbeforeunload = () => window.scrollTo(0, 0);
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
