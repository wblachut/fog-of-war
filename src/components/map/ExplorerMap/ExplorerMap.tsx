import BoarMarker from '~/assets/boar-marker.webp';
import { CanvasRef, StageRef } from '~/model/customTypes.model';
import { PlayerMarker } from '~/player/PlayerMarker';
import { PlayerWrapper } from '~/player/PlayerWrapper';
import { ProgressTracker } from '../ProgressTracker/ProgressTracker';
import { useMapCanvas } from '../hooks/useMapCanvas';
import { useMapImage } from '../hooks/useMapImage';
import { usePlayerMovement } from '../hooks/usePlayerMovement';
import { FogOfWarStage } from './FogOfWarStage/FogOfWarStage';

export interface ExplorerMapProps {
  mapSrc: HTMLImageElement['src'];
}

export const ExplorerMap = ({ mapSrc }: ExplorerMapProps) => {
  const { mapSize, mapImage } = useMapImage(mapSrc);
  const { moveHandler, playerPosition } = usePlayerMovement(mapSize);
  const { stageRef, fogImage, fogLayerRef, percentageUncovered } = useMapCanvas(playerPosition);

  if (!mapImage || !fogImage) return null;

  return (
    <>
      <FogOfWarStage
        stageRef={stageRef as unknown as StageRef}
        fogLayerRef={fogLayerRef as unknown as CanvasRef}
        mapImage={mapImage}
        fogImage={fogImage}
        moveHandler={moveHandler}
      />
      <PlayerWrapper
        playerMarker={<PlayerMarker playerImageSrc={BoarMarker} />}
        playerPosition={playerPosition}
        playerDirection={moveHandler.playerDirection}
      />
      <ProgressTracker progressPercentage={percentageUncovered} />
    </>
  );
};
