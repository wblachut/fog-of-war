import { useRef, useState, useEffect, useCallback, RefObject } from 'react';
import useImage from 'use-image';
import { usePlayerMovement } from './usePlayerMovement';
import {
  clearFogOfWar,
  getPixelBuffer,
  getPixelRatio,
  getRoundedPercentage,
  setUpImage,
} from '~/helpers/mapExploreHelpers';
import { CanvasRef, StageRef, mapSize } from '~/model/types';
import fog from '../../../assets/fog-homm3.png';

const PLAYER_SIGHT_RADIUS = 80;
const FOG_SRC = fog;

export const useMapCanvas = (mapSrc: HTMLImageElement['src']) => {
  const stageRef = useRef<StageRef>(null);
  const fogLayerRef = useRef<CanvasRef>(null);
  const [mapImage] = useImage(mapSrc);
  const [fogImage] = useImage(FOG_SRC);

  const [mapSize, setMapSize] = useState<mapSize>({ width: 0, height: 0 });

  const { playerPosition, moveHandler } = usePlayerMovement(mapSize);
  const [percentageUncovered, setPercentageUncovered] = useState(0);

  /* HANDLE IMAGE SETUP */
  useEffect(() => {
    const image = setUpImage(mapSrc);
    image.onload = () => {
      setMapSize({ width: image.width, height: image.height });
    };
  }, [mapSrc]);

  /* HANDLE MAP UNCOVERING */
  useEffect(() => {
    const stage = stageRef.current;
    const fogLayer = fogLayerRef.current;
    if (!stage || !fogLayer) return;
    clearFogOfWar(fogLayer, playerPosition, PLAYER_SIGHT_RADIUS);

    // Request animation frame to calculate fog coverage at a lower frequency
    const requestID = requestAnimationFrame(calculateFogCoverage);

    return () => cancelAnimationFrame(requestID);
  }, [playerPosition]);

  const calculateFogCoverage = useCallback(() => {
    const fogLayer = fogLayerRef.current;
    if (!fogLayer) return;
    const canvas = fogLayer?.canvas._canvas;
    const data = getPixelBuffer(canvas);
    const totalPixels = canvas.width * canvas.height;
    const newPercentageUncovered = getRoundedPercentage(getPixelRatio(data, totalPixels));
    setPercentageUncovered(newPercentageUncovered);
    console.log(newPercentageUncovered);
  }, []);

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
