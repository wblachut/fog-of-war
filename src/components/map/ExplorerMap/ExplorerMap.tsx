import BoarMarker from '~/assets/boar-marker.webp';
import { PlayerMarker } from '~/components/player/PlayerMarker';
import { PlayerWrapper } from '~/components/player/PlayerWrapper';
import { useAssetSetup, useMapCanvas, usePlayerMovement } from '~/hooks/customHooks';
import { CanvasRef, StageRef } from '~/model/customTypes.model';
import { ProgressTracker } from '../ProgressTracker/ProgressTracker';
import { ExplorerBorder } from './ExplorerBorder/ExplorerBorder';
import { FogOfWarStage } from './FogOfWarStage/FogOfWarStage';

export interface ExplorerMapProps {
  mapSrc: HTMLImageElement['src'];
}

export const ExplorerMap = ({ mapSrc }: ExplorerMapProps) => {
  const { mapSize, fogImage, mapImage, isMounted, clientSize } = useAssetSetup(mapSrc);
  const { moveHandler } = usePlayerMovement(mapSize, isMounted);
  const { stageRef, fogLayerRef, percentageUncovered } = useMapCanvas(moveHandler);

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
        playerPosition={moveHandler.playerPosition}
        playerDirection={moveHandler.playerDirection}
      />
      <ProgressTracker progressPercentage={percentageUncovered} />
      <ExplorerBorder width={clientSize.width} height={clientSize.height} />
    </>
  );
};
