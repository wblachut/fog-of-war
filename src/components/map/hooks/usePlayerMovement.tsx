import { useCallback, useEffect, useState } from 'react';
import {
  checkForRestrictedMove,
  getNormalizedDirections,
  getPlayerCoordsOnKeydown,
  getPlayerDirection,
} from '~/helpers/PlayerMovementHelpers';
import {
  CustomMouseEvent,
  PlayerDirection,
  PlayerMoveEvent,
  Position,
  mapSize,
} from '~/model/customTypes';

const STARTING_POSITION = { x: 560, y: 380 };
const DEFAULT_POSITION = { x: 0, y: 0 };
const LEFT_CLICK_BUTTON = 2;

export interface MoveHandler {
  playerDirection: PlayerDirection;
  handleMouseMove: (e: CustomMouseEvent) => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
}

export const usePlayerMovement = (mapSize: mapSize) => {
  const [playerPosition, setPlayerPosition] = useState<Position>(DEFAULT_POSITION);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [playerDirection, setPlayerDirection] = useState(PlayerDirection.RIGHT);

  const handlePlayerDirection = (e: PlayerMoveEvent, playerPosition: Position) => {
    const newDirection = getPlayerDirection(e, playerPosition);
    setPlayerDirection((prevDirection) => newDirection ?? prevDirection);
  };

  const handleMouseMove = useCallback(
    (e: CustomMouseEvent) => {
      const stage = e.currentTarget.getStage();
      const position = stage?.getPointerPosition();

      if (!isMousePressed && e.evt.button !== LEFT_CLICK_BUTTON) return;

      const mousePosition = position ?? DEFAULT_POSITION;
      handlePlayerDirection(e, playerPosition);

      setPlayerPosition((prevPosition) =>
        getNormalizedDirections(prevPosition, mousePosition, mapSize),
      );
    },
    [isMousePressed, mapSize, playerPosition],
  );

  const handleMouseDown = useCallback(() => {
    setIsMousePressed(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsMousePressed(false);
  }, []);

  useEffect(() => {
    const handleArrowMove = (e: KeyboardEvent) => {
      e.preventDefault();
      const isRestricted = checkForRestrictedMove(e.key, playerPosition, mapSize);
      if (isRestricted) return;
      const newCoordinates = getPlayerCoordsOnKeydown(e.key, playerPosition);
      setPlayerPosition(newCoordinates);
      handlePlayerDirection(e, playerPosition);
    };

    window.addEventListener('keydown', handleArrowMove);

    return () => {
      window.removeEventListener('keydown', handleArrowMove);
    };
  }, [playerPosition, mapSize]);

  const MoveToBeginnerLocation = useCallback(() => {
    setPlayerPosition(STARTING_POSITION);
  }, []);

  // SET PLAYER IN THE STARTING POINT
  useEffect(() => {
    // TODO: Change code to obtain same effect
    const timeoutId = setTimeout(() => {
      MoveToBeginnerLocation();
    }, 20);

    return () => clearTimeout(timeoutId);
  }, [MoveToBeginnerLocation]);

  const moveHandler = {
    playerDirection,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
  };

  return { playerPosition, setPlayerPosition, moveHandler };
};
