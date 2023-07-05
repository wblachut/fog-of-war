import { CanvasRef, Position } from '~/model/types';

export const setUpImage = (mapSrc: HTMLImageElement['src']): HTMLImageElement => {
  const image = new window.Image();
  image.src = mapSrc;

  return image;
};

export const clearFogOfWar = (fogLayer: CanvasRef, playerPosition: Position, radius: number) => {
  const canvas = fogLayer?.canvas._canvas;
  const context = canvas.getContext('2d');
  const { x, y } = playerPosition;

  context.globalCompositeOperation = 'destination-out';
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.fill();
};

export const getPixelBuffer = (canvas: HTMLCanvasElement): Uint8Array => {
  const context = canvas?.getContext('2d');
  const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
  const pixelBuffer = new Uint8Array(imageData!.data.buffer);

  return pixelBuffer;
};

export const getPixelRatio = (data: Uint8Array, totalPixels: number): number => {
  let coveredPixels = 0;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] !== 0) {
      coveredPixels++;
    }
  }

  return (totalPixels - coveredPixels) / totalPixels;
};

export const getRoundedPercentage = (ratio: number) => Math.round(ratio * 100);
