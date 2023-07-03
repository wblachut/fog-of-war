import { FogOfWarCanvas } from './FogOfWarCanvas';

export interface ExplorerMapProps {
  mapSrc: HTMLImageElement['src'];
  PlayerMarker: JSX.Element;
}

export const ExplorerMap = ({ mapSrc, PlayerMarker }: ExplorerMapProps) => {
  return (
    <>
      <FogOfWarCanvas mapSrc={mapSrc} PlayerMarker={PlayerMarker} />
      {/* // ADD: CustomPlayerMarker */}
      {/* // ADD: ProgressTracker */}
    </>
  );
};
