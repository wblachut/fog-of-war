import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  getNormalizedDirections,
  getPlayerCoordsOnKeydown,
  checkForRestrictedMove,
} from '~/helpers/PlayerMovementHelper';
import { CustomMouseEvent, mapSize, Position } from '~/model/types';

const STARTING_POSITION = { x: 560, y: 380 };
const DEFAULT_POSITION = { x: 0, y: 0 };

export interface MoveHandler {
  handleMouseMove: (e: CustomMouseEvent) => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
}

export const usePlayerMovement = (mapSize: mapSize) => {
  const [playerPosition, setPlayerPosition] = useState<Position>(DEFAULT_POSITION);
  const [isMousePressed, setIsMousePressed] = useState(false);

  const handleMouseMove = useCallback(
    (e: CustomMouseEvent) => {
      const stage = e.currentTarget.getStage();
      const position = stage?.getPointerPosition();

      if (isMousePressed) {
        const mousePosition = position ?? DEFAULT_POSITION;

        setPlayerPosition((prevPosition) =>
          getNormalizedDirections(prevPosition, mousePosition, mapSize),
        );
      }
    },
    [isMousePressed, mapSize],
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
  useLayoutEffect(() => {
    // TODO: map unfolding not working after callback
    MoveToBeginnerLocation();
  }, [MoveToBeginnerLocation]);

  const moveHandler = {
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
  };

  return { playerPosition, setPlayerPosition, moveHandler };
};
