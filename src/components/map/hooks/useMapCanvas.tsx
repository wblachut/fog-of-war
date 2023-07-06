import { useRef, useState, useEffect, useCallback } from 'react';
import useImage from 'use-image';
import { usePlayerMovement } from './usePlayerMovement';
import { calculateFogCoverage, clearFogOfWar, setUpImage } from '~/helpers/mapExploreHelpers';
import { CanvasRef, StageRef, mapSize } from '~/model/types';
import fog from '../../../assets/fog-homm3.png';

const FOG_SRC = fog;

export const useMapCanvas = (mapSrc: HTMLImageElement['src']) => {
  const stageRef = useRef<StageRef>(null);
  const fogLayerRef = useRef<CanvasRef>(null);
  const [mapImage] = useImage(mapSrc);
  const [fogImage] = useImage(FOG_SRC);

  const [mapSize, setMapSize] = useState<mapSize>({ width: 0, height: 0 });

  const { playerPosition, moveHandler } = usePlayerMovement(mapSize);
  const [percentageUncovered, setPercentageUncovered] = useState(0);

  /* IMAGE SETUP */
  useEffect(() => {
    const image = setUpImage(mapSrc);
    image.onload = () => {
      setMapSize({ width: image.width, height: image.height });
    };
  }, [mapSrc]);

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
    mapImage,
    fogImage,
    mapSize,
    moveHandler,
    playerPosition,
    percentageUncovered,
  };
};
