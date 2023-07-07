import { CanvasRef, Position } from '~/model/customTypes';

const PLAYER_SIGHT_RADIUS = 140;
const PLAYER_BLUR_RADIUS = 200;

export const clearFogOfWar = (
  fogLayer: CanvasRef,
  playerPosition: Position,
  radius = PLAYER_SIGHT_RADIUS,
  blurRadius = PLAYER_BLUR_RADIUS,
) => {
  if (!fogLayer) return;
  const { x, y } = playerPosition;
  const canvas = fogLayer.canvas._canvas;
  const context = canvas.getContext('2d');

  context.fillStyle = getGradientFillStyle(context, playerPosition, radius, blurRadius);
  context.globalCompositeOperation = 'destination-out';
  context.beginPath();
  context.arc(x, y, blurRadius, 0, Math.PI * 2, false);
  context.fill();
};

const getRoundedPercentage = (ratio: number) => Math.round(ratio * 100);

export const calculateFogCoverage = (canvas: HTMLCanvasElement): number => {
  const data = getPixelBuffer(canvas);
  const totalPixels = canvas.width * canvas.height;
  const newPercentageUncovered = getRoundedPercentage(getPixelRatio(data, totalPixels));

  return newPercentageUncovered;
};

function getGradientFillStyle(
  context: CanvasRenderingContext2D,
  playerPosition: Position,
  radius = PLAYER_SIGHT_RADIUS,
  blurRadius = PLAYER_BLUR_RADIUS,
): CanvasGradient {
  const { x, y } = playerPosition;
  const gradient = context.createRadialGradient(x, y, radius, x, y, blurRadius);

  gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
  gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.2)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  return gradient;
}

function getPixelBuffer(canvas: HTMLCanvasElement): Uint8Array {
  if (canvas.width === 0 || canvas.width === 0) return new Uint8Array(1);

  const context = canvas?.getContext('2d');
  const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
  const pixelBuffer = new Uint8Array(imageData!.data.buffer);

  return pixelBuffer;
}

function getPixelRatio(data: Uint8Array, totalPixels: number): number {
  if (!data) return 0;
  let coveredPixels = 0;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] !== 0) {
      coveredPixels++;
    }
  }

  return (totalPixels - coveredPixels) / totalPixels;
}
