import { useRef, useState, useEffect } from 'react';

const fogOpacity = 0.5;

export const useMapCanvas = (backgroundImage: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [context, setContext] = useState<any>(null);
  // const [canvas, setCanvas] = useState<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!context) return;

    const image = new Image();
    image.src = backgroundImage;

    image.onload = () => {
      if (!canvas) return;
      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      setIsLoaded(true);
    };
  }, [backgroundImage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!context) return;

    if (isLoaded) {
      context.fillStyle = `rgba(0, 0, 0, ${fogOpacity})`;
      context.fillRect(0, 0, canvas!.width, canvas!.height);
    }
  }, [isLoaded]);

  return { canvasRef };
};
