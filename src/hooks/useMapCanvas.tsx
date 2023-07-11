import { useCallback, useEffect, useRef, useState } from 'react';
import { calculateFogCoverage, clearFogOfWar } from '~/helpers/mapExploreHelpers';
import { CanvasRef, StageRef } from '~/model/customTypes.model';
import { MoveHandler } from './usePlayerMovement';

export const useMapCanvas = (moveHandler: MoveHandler) => {
  const stageRef = useRef<StageRef>(null);
  const fogLayerRef = useRef<CanvasRef>(null);
  const [percentageUncovered, setPercentageUncovered] = useState(0);

  /* PROGRESS TRACKING */
  const getFogCoverage = useCallback(() => {
    const fogLayer = fogLayerRef.current;
    if (!fogLayer) return;
    // @ts-expect-error conversion from MutableRefObject to HTMLCanvasElement
    const fogCanvas = fogLayer.canvas;

    const newPercentageUncovered = calculateFogCoverage(fogCanvas);
    setPercentageUncovered(newPercentageUncovered);
  }, []);

  /* MAP UNCOVERING */
  useEffect(() => {
    const stage = stageRef.current;
    const fogLayer = fogLayerRef.current;
    if (!stage || !fogLayer) return;
    // @ts-expect-error conversion from MutableRefObject to HTMLCanvasElement
    const fogCanvas = fogLayer.canvas;

    clearFogOfWar(fogCanvas, moveHandler.playerPosition);

    const requestID = requestAnimationFrame(getFogCoverage);

    return () => cancelAnimationFrame(requestID);
  }, [getFogCoverage, moveHandler.playerPosition]);

  return {
    stageRef,
    fogLayerRef,
    percentageUncovered,
    moveHandler,
  };
};
