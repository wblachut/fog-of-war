import { PlayerMarker } from '~/player/PlayerMarker';
import { FogOfWarCanvas } from './FogOfWarCanvas';
import BoarMarker from '~/assets/marker.webp';

export interface ExplorerMapProps {
  mapSrc: HTMLImageElement['src'];
}

export const ExplorerMap = ({ mapSrc }: ExplorerMapProps) => {
  return (
    <>
      <FogOfWarCanvas mapSrc={mapSrc} PlayerMarker={<PlayerMarker playerImageSrc={BoarMarker} />} />
      {/* // ADD: ProgressTracker */}
    </>
  );
};
