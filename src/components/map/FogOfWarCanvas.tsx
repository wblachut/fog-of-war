import { useMapCanvas } from './hooks/useMapCanvas';
import { Stage, Layer, Rect, Circle } from 'react-konva';

interface FogOfWarCanvasProps {
  mapSrc: HTMLImageElement['src'];
  PlayerMarker: JSX.Element;
}

const FOG_FILL = 'rgba(0, 0, 0, 0.9)';

export const FogOfWarCanvas = ({ mapSrc: mapSrc }: FogOfWarCanvasProps) => {
  const { moveHandler, stageRef, mapImage, fogLayerRef, playerPosition } = useMapCanvas(mapSrc);

  return (
    <>
      <Stage
        width={mapImage?.width}
        height={mapImage?.height}
        onMouseMove={moveHandler.handleMouseMove}
        onMouseDown={moveHandler.handleMouseDown}
        onMouseUp={moveHandler.handleMouseUp}
        ref={stageRef}
      >
        <Layer id='map-layer'>
          <Rect width={mapImage?.width} height={mapImage?.height} fillPatternImage={mapImage} />
        </Layer>
        <Layer ref={fogLayerRef} listening={false} id='fog-layer'>
          {/* TODO: Add image fill to fog */}
          <Rect width={mapImage?.width} height={mapImage?.height} fill={FOG_FILL} />
        </Layer>
        <Layer id='player-marker-layer'>
          {/* Player marker */}
          <Circle x={playerPosition.x} y={playerPosition.y} radius={10} fill='red' />
        </Layer>
      </Stage>
    </>
  );
};
