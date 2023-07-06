import { useRef, useState, useEffect, useCallback } from 'react';
import useImage from 'use-image';
import { calculateFogCoverage, clearFogOfWar } from '~/helpers/mapExploreHelpers';
import { CanvasRef, Position, StageRef } from '~/model/types';
import fog from '../../../assets/fog-homm3.png';

const FOG_SRC = fog;

export const useMapCanvas = (playerPosition: Position) => {
  const stageRef = useRef<StageRef>(null);
  const fogLayerRef = useRef<CanvasRef>(null);
  const [fogImage] = useImage(FOG_SRC);
  const [percentageUncovered, setPercentageUncovered] = useState(0);

  /* PROGRESS TRACKING */
  const getFogCoverage = useCallback(() => {
    const fogLayer = fogLayerRef.current;
    if (!fogLayer) return;
    const newPercentageUncovered = calculateFogCoverage(fogLayer?.canvas._canvas);
    setPercentageUncovered(newPercentageUncovered);
  }, []);

  /* MAP UNCOVERING */
  useEffect(() => {
    const stage = stageRef.current;
    const fogLayer = fogLayerRef.current;
    if (!stage || !fogLayer) return;
    clearFogOfWar(fogLayer, playerPosition);

    const requestID = requestAnimationFrame(getFogCoverage);

    return () => cancelAnimationFrame(requestID);
  }, [getFogCoverage, playerPosition]);

  return {
    stageRef,
    fogLayerRef,
    fogImage,
    playerPosition,
    percentageUncovered,
  };
};
