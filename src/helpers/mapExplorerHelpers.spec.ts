import { vi } from 'vitest';
import { mapExplorerHelpers } from './mapExploreHelpers';

describe('test MapExplorerHelpers', () => {
  const { getRoundedPercentage, getPixelBuffer, getPixelRatio } = mapExplorerHelpers;

  describe('getRoundedPercentage', () => {
    it('should return the rounded percentage based on the provided ratio', () => {
      const ratio = 0.768;
      const expectedPercentage = 77;
      const percentage = getRoundedPercentage(ratio);

      expect(percentage).toBe(expectedPercentage);
    });
  });

  describe('getPixelBuffer', () => {
    it('should return the pixel buffer of the canvas', () => {
      const canvasMock = document.createElement('canvas');
      vi.spyOn(canvasMock, 'getContext').mockReturnValue({
        getImageData: () => ({
          // @ts-expect-error only returns needed mock value
          data: new Uint8ClampedArray([
            255, 255, 255, 0, 255, 255, 255, 255, 0, 0, 0, 0,
          ]) as Partial<ImageData>,
        }),
      });

      const pixelBuffer = getPixelBuffer(canvasMock);

      expect(pixelBuffer).toEqual(
        new Uint8Array([255, 255, 255, 0, 255, 255, 255, 255, 0, 0, 0, 0]),
      );
    });

    it('should return an empty Uint8Array if the canvas has width or height equal to 0', () => {
      const canvasMock = document.createElement('canvas');
      canvasMock.width = canvasMock.height = 0;
      vi.spyOn(canvasMock, 'getContext').mockReturnValue(null);
      const pixelBuffer = getPixelBuffer(canvasMock);

      expect(pixelBuffer).toEqual(new Uint8Array(0));
    });
  });

  describe('getPixelRatio', () => {
    const data = new Uint8Array([0, 0, 0, 0, 255, 255, 255, 255, 0, 0, 0, 0]); // Mock pixel data
    const emptyData = new Uint8Array(0);
    const totalPixels = 100;

    it('should return the pixel ratio based on the pixel data and total pixels', () => {
      const pixelRatio = getPixelRatio(data, totalPixels);

      expect(pixelRatio).toBe(0.99);
    });

    it('should return 0 if the data is not provided', () => {
      const pixelRatio = getPixelRatio(emptyData, totalPixels);

      expect(pixelRatio).toEqual(1);
    });
  });
});

// describe('calculateFogCoverage', () => {
//   it('should return the fog coverage percentage based on the pixel data of the canvas', () => {
//     vi.spyOn(mockCtx, 'getImageData').mockReturnValue({
//       data: new Uint8Array([255, 255, 255, 0, 255, 255, 255, 255, 0, 0, 0, 0]), // Mock pixel data
//     });

//     const fogCoverage = calculateFogCoverage(mockCanvas);

//     expect(fogCoverage).toBe(33);
//   });
// });

// describe('getGradientFillStyle', () => {
//   it('should return the gradient fill style for the fog of war', () => {
//     const canvasMock = document.createElement('canvas');
//     mockFunction(canvasMock, 'width').returns(800);
//     mockFunction(canvasMock, 'height').returns(600);
//     const mockContext = canvasMock.getContext('2d');
//     const gradient = getGradientFillStyle(
//       mockContext as CanvasRenderingContext2D,
//       mockPlayerPosition,
//       10,
//       30,
//     );

//     expect(gradient.toString).toEqual('[object CanvasGradient]');
//   });
// });

// describe('getPixelBuffer', () => {
//   it('should return the pixel buffer array based on the canvas pixel data', () => {
//     const canvasMock = document.createElement('canvas');
//     mockFunction(canvasMock, 'width').returns(800);
//     mockFunction(canvasMock, 'height').returns(600);
//     const pixelBuffer = getPixelBuffer(canvasMock);

//     expect(pixelBuffer).toEqual(
//       new Uint8Array([255, 255, 255, 0, 255, 255, 255, 255, 0, 0, 0, 0]),
//     );
//   });

//   it('should return an empty Uint8Array if the canvas has width or height equal to 0', () => {
//     const canvasMock = document.createElement('canvas');
//     mockFunction(canvasMock, 'width').returns(0);
//     mockFunction(canvasMock, 'height').returns(0);
//     mockFunction(canvasMock, 'getContext').returns(null);
//     const pixelBuffer = getPixelBuffer(canvasMock);

//     expect(pixelBuffer).toEqual(new Uint8Array(0));
//   });
// });
// });
