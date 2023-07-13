import { useCallback, useEffect, useRef, useState } from 'react';
import { mapExplorerHelpers } from '~/helpers/mapExploreHelpers';
import { CanvasRef, StageRef } from '~/model/customTypes.model';
import { MoveHandler } from './usePlayerMovement';

const PROGRESS_DEBOUNCE_TIMEOUT = 50;

export const useMapCanvas = (moveHandler: MoveHandler) => {
  const { calculateFogCoverage, clearFogOfWar } = mapExplorerHelpers;
  const stageRef = useRef<StageRef>(null);
  const fogLayerRef = useRef<CanvasRef>(null);
  const [percentageUncovered, setPercentageUncovered] = useState(0);

  /* PROGRESS TRACKING */
  const getFogCoverage = useCallback(() => {
    if (!fogLayerRef) return;
    const fogLayer = fogLayerRef.current;
    // @ts-expect-error => conversion from MutableRefObject to HTMLCanvasElement
    const fogCanvas = fogLayer.canvas;

    const newPercentageUncovered = calculateFogCoverage(fogCanvas);
    setPercentageUncovered(newPercentageUncovered);
  }, []);

  /* MAP UNCOVERING */
  useEffect(() => {
    const stage = stageRef.current;
    const fogLayer = fogLayerRef.current;
    if (!stage || !fogLayer) return;
    // @ts-expect-error => conversion from MutableRefObject to HTMLCanvasElement
    const fogCanvas = fogLayer.canvas;

    clearFogOfWar(fogCanvas, moveHandler.playerPosition);

    // debounce progress calculation for better performance
    const debounceFogCoverage = setTimeout(() => {
      getFogCoverage();
    }, PROGRESS_DEBOUNCE_TIMEOUT);

    return () => clearInterval(debounceFogCoverage);
  }, [getFogCoverage, moveHandler.playerPosition, clearFogOfWar]);

  return {
    stageRef,
    fogLayerRef,
    percentageUncovered,
    moveHandler,
  };
};
