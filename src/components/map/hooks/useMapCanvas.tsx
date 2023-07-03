import { useRef, useState, useEffect } from 'react';
import useImage from 'use-image';
import { usePlayerMovement } from './usePlayerMovement';

export const useMapCanvas = (mapSrc: HTMLImageElement['src']) => {
  const stageRef = useRef(null);
  const fogLayerRef = useRef(null);
  const [mapImage] = useImage(mapSrc);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const { playerPosition, moveHandler } = usePlayerMovement();

  /* HANDLE IMAGE SETUP */
  useEffect(() => {
    const image = new window.Image();
    image.src = mapSrc;
    image.onload = () => {
      setImageSize({ width: image.width, height: image.height });
    };
  }, [mapSrc]);

  /* HANDLE MAP UNFOLDING */
  useEffect(() => {
    const stage = stageRef.current;
    const fogLayer = fogLayerRef.current;
    if (!stage || !fogLayer) return;

    const canvas = fogLayer.canvas._canvas;
    const ctx = canvas.getContext('2d');
    const { x, y } = playerPosition;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2, false);
    ctx.fill();
  }, [playerPosition]);

  return { stageRef, fogLayerRef, mapImage, imageSize, moveHandler, playerPosition };
};
