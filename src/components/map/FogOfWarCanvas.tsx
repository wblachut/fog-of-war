import { ProgressTracker } from '../ProgressTracker';
import { useMapCanvas } from './hooks/useMapCanvas';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import { PlayerWrapper } from '~/player/PlayerWrapper';

interface FogOfWarCanvasProps {
  mapSrc: HTMLImageElement['src'];
  PlayerMarker: JSX.Element;
}

// TODO: Make this only visualization component

export const FogOfWarCanvas = ({ mapSrc, PlayerMarker }: FogOfWarCanvasProps) => {
  const {
    moveHandler,
    stageRef,
    mapImage,
    fogImage,
    fogLayerRef,
    playerPosition,
    percentageUncovered,
  } = useMapCanvas(mapSrc);

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
          <Rect width={mapImage?.width} height={mapImage?.height} fillPatternImage={fogImage} />
        </Layer>
        <Layer id='player-marker-layer'>
          {/* Player marker */}
          <Circle x={playerPosition.x} y={playerPosition.y} radius={10} fill='red' />
        </Layer>
      </Stage>
      {/* TODO: Move outside this component if possible */}
      <PlayerWrapper playerMarker={PlayerMarker} playerPosition={playerPosition} />
      <ProgressTracker progressPercentage={percentageUncovered} />
    </>
  );
};
