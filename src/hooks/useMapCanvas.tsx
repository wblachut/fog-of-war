import { useCallback, useEffect, useRef, useState } from 'react';
import { calculateFogCoverage, clearFogOfWar } from '~/helpers/mapExploreHelpers';
import { CanvasRef, Position, StageRef } from '~/model/customTypes.model';

export const useMapCanvas = (playerPosition: Position) => {
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

    clearFogOfWar(fogCanvas, playerPosition);

    const requestID = requestAnimationFrame(getFogCoverage);

    return () => cancelAnimationFrame(requestID);
  }, [getFogCoverage, playerPosition]);

  return {
    stageRef,
    fogLayerRef,
    playerPosition,
    percentageUncovered,
  };
};
