import BoarMarker from '~/assets/boar-marker.webp';
import { PlayerMarker } from '~/components/player/PlayerMarker';
import { PlayerWrapper } from '~/components/player/PlayerWrapper';
import { CanvasRef, StageRef } from '~/model/customTypes.model';
import { useMapCanvas } from '../../../hooks/useMapCanvas';
import { useMapImage } from '../../../hooks/useMapImage';
import { usePlayerMovement } from '../../../hooks/usePlayerMovement';
import { ProgressTracker } from '../ProgressTracker/ProgressTracker';
import { ExplorerBorder } from './ExplorerBorder/ExplorerBorder';
import { FogOfWarStage } from './FogOfWarStage/FogOfWarStage';

export interface ExplorerMapProps {
  mapSrc: HTMLImageElement['src'];
}

export const ExplorerMap = ({ mapSrc }: ExplorerMapProps) => {
  const { mapSize, fogImage, mapImage, isMounted, clientSize } = useMapImage(mapSrc);
  const { moveHandler, playerPosition } = usePlayerMovement(mapSize, isMounted);
  const { stageRef, fogLayerRef, percentageUncovered } = useMapCanvas(playerPosition);

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
      <ExplorerBorder width={clientSize.width} height={clientSize.height} />
    </>
  );
};
