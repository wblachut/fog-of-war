import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { getNormalizedDirections } from '~/helpers/PlayerMovementHelper';
import { CustomMouseEvent, Position } from '~/model/types';

const STARTING_POSITION = { x: 560, y: 380 };
const DEFAULT_POSITION = { x: 0, y: 0 };

export const usePlayerMovement = () => {
  const [playerPosition, setPlayerPosition] = useState<Position>(DEFAULT_POSITION);
  const [isMousePressed, setIsMousePressed] = useState(false);

  const handleMouseMove = useCallback(
    (e: CustomMouseEvent) => {
      const stage = e.target.getStage();
      const position = stage?.getPointerPosition();

      if (isMousePressed) {
        const mousePosition = position ?? DEFAULT_POSITION;
        setPlayerPosition((prevPosition) => getNormalizedDirections(prevPosition, mousePosition));
      }
    },
    [isMousePressed],
  );

  const handleMouseDown = useCallback(() => {
    setIsMousePressed(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsMousePressed(false);
  }, []);

  useEffect(() => {
    const handleArrowMove = (e: KeyboardEvent) => {
      const { key } = e;

      switch (key) {
        case 'ArrowLeft':
          setPlayerPosition((prevPosition) => ({
            ...prevPosition,
            x: prevPosition.x - 10,
          }));
          break;
        case 'ArrowUp':
          setPlayerPosition((prevPosition) => ({
            ...prevPosition,
            y: prevPosition.y - 10,
          }));
          break;
        case 'ArrowRight':
          setPlayerPosition((prevPosition) => ({
            ...prevPosition,
            x: prevPosition.x + 10,
          }));
          break;
        case 'ArrowDown':
          setPlayerPosition((prevPosition) => ({
            ...prevPosition,
            y: prevPosition.y + 10,
          }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleArrowMove);

    // TODO: Fix bellow line crushing arrow movement
    // return window.removeEventListener('keydown', handleArrowMove);
  }, []);

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
