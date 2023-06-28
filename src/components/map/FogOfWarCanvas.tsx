import { useMapCanvas } from './hooks/useMapCanvas';

interface FogOfWarCanvasProps {
  backgroundImage: string;
  PlayerMarker: JSX.Element;
}

export const FogOfWarCanvas = ({ backgroundImage }: FogOfWarCanvasProps) => {
  const { canvasRef } = useMapCanvas(backgroundImage);

  return <canvas ref={canvasRef} />;
};
