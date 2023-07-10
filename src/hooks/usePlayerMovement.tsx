import { useCallback, useEffect, useState } from 'react';
import {
  checkForRestrictedMove,
  getNormalizedDirections,
  getPlayerCoordsOnKeydown,
  getPlayerDirection,
} from '~/helpers/PlayerMovementHelpers';
import { PlayerDirection } from '~/model/PlayerDirectionEnum';
import {
  CustomMouseEvent,
  ElementSize,
  PlayerMoveEvent,
  Position,
} from '~/model/customTypes.model';

const STARTING_POSITION = { x: 560, y: 380 };
const HIDDEN_POSITION = { x: -100, y: -100 };
const RIGHT_CLICK_BUTTON = 2;

export interface MoveHandler {
  playerDirection: PlayerDirection;
  handleMouseMove: (e: CustomMouseEvent) => void;
  handleMouseDown: (e: CustomMouseEvent) => void;
  handleMouseUp: () => void;
}

export const usePlayerMovement = (mapSize: ElementSize, isMounted: boolean) => {
  const [playerPosition, setPlayerPosition] = useState<Position>(HIDDEN_POSITION);
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

      if (!isMousePressed || !isMounted) return;

      const mousePosition = position as Position;
      handlePlayerDirection(e, playerPosition);

      setPlayerPosition((prevPosition) =>
        getNormalizedDirections(prevPosition, mousePosition, mapSize),
      );
    },
    [isMousePressed, mapSize, playerPosition, isMounted],
  );

  const handleMouseDown = useCallback(
    (e: CustomMouseEvent) => {
      const leftMouseButtonClick = e.evt.button !== RIGHT_CLICK_BUTTON;
      if (!leftMouseButtonClick || !isMounted) return;
      setIsMousePressed(true);
    },
    [isMounted],
  );

  const handleMouseUp = useCallback(() => {
    setIsMousePressed(false);
  }, []);

  const handleArrowMove = useCallback(
    (e: KeyboardEvent) => {
      const arrowKeyEvent = e.key.includes('Arrow');
      if (!arrowKeyEvent) return;
      e.preventDefault();
      const isRestricted = checkForRestrictedMove(e.key, playerPosition, mapSize);
      if (isRestricted) return;
      const newCoordinates = getPlayerCoordsOnKeydown(e.key, playerPosition);
      setPlayerPosition(newCoordinates);
      handlePlayerDirection(e, playerPosition);
    },
    [playerPosition, mapSize],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleArrowMove);

    return () => {
      window.removeEventListener('keydown', handleArrowMove);
    };
  }, [handleArrowMove]);

  const MoveToBeginnerLocation = useCallback(() => {
    setPlayerPosition(STARTING_POSITION);
  }, []);

  // SET PLAYER IN THE STARTING POINT
  useEffect(() => {
    if (!isMounted) return;
    const timeoutId = setTimeout(() => {
      MoveToBeginnerLocation();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [MoveToBeginnerLocation, isMounted]);

  const moveHandler = {
    playerDirection,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
  };

  return { playerPosition, setPlayerPosition, moveHandler };
};
