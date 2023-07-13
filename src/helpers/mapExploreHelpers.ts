import { Position } from '~/model/customTypes.model';

const PLAYER_SIGHT_RADIUS = 140;
const PLAYER_BLUR_RADIUS = 200; // Gradient blur size

/* CLEAR FOG CANVAS  */
export const mapExplorerHelpers = {
  clearFogOfWar: (
    fogCanvas: HTMLCanvasElement,
    playerPosition: Position,
    radius = PLAYER_SIGHT_RADIUS,
    blurRadius = PLAYER_BLUR_RADIUS,
  ) => {
    const { x, y } = playerPosition;
    const fogContext = fogCanvas.getContext('2d');
    if (!fogContext) return;

    fogContext.fillStyle = mapExplorerHelpers.getGradientFillStyle(
      fogContext,
      playerPosition,
      radius,
      blurRadius,
    );
    fogContext.globalCompositeOperation = 'destination-out';
    fogContext.beginPath();
    fogContext.arc(x, y, blurRadius, 0, Math.PI * 2, false);
    fogContext.fill();
  },

  getRoundedPercentage: (ratio: number) => Math.round(ratio * 100),

  /* CALCULATE FOG COVERAGE  */
  calculateFogCoverage: (canvas: HTMLCanvasElement): number => {
    const data = mapExplorerHelpers.getPixelBuffer(canvas);
    const totalPixels = canvas.width * canvas.height;
    const newPercentageUncovered = mapExplorerHelpers.getRoundedPercentage(
      mapExplorerHelpers.getPixelRatio(data, totalPixels),
    );

    return newPercentageUncovered;
  },

  /* GET GRADIENT FILL (for arc - circles used in fog clearing) */
  getGradientFillStyle: (
    context: CanvasRenderingContext2D,
    playerPosition: Position,
    radius = PLAYER_SIGHT_RADIUS,
    blurRadius = PLAYER_BLUR_RADIUS,
  ): CanvasGradient => {
    const { x, y } = playerPosition;
    const gradient = context.createRadialGradient(x, y, radius, x, y, blurRadius);

    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    return gradient;
  },

  /* CALCULATE PIXEL BUFFER  */
  getPixelBuffer(canvas: HTMLCanvasElement): Uint8Array {
    if (canvas.width === 0 || canvas.height === 0) return new Uint8Array(0);

    const context = canvas?.getContext('2d');
    const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
    const pixelBuffer = new Uint8Array(imageData!.data.buffer);

    return pixelBuffer;
  },

  /* CALCULATE PIXEL RATIO (opaque to fog-filled)  */
  getPixelRatio(data: Uint8Array, totalPixels: number): number {
    let coveredPixels = 0;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] !== 0) {
        coveredPixels++;
      }
    }

    return (totalPixels - coveredPixels) / totalPixels;
  },
};
