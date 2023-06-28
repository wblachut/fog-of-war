import { FogOfWarCanvas } from './FogOfWarCanvas';

export interface ExplorerMapProps {
  mapSrc: string;
  PlayerMarker: JSX.Element;
}

export const ExplorerMap = ({ mapSrc, PlayerMarker }: ExplorerMapProps) => {
  return (
    <>
      <FogOfWarCanvas backgroundImage={mapSrc} PlayerMarker={PlayerMarker} />
      {/* // ADD: PlayerMarker */}
      {/* // ADD: ProgressTracker */}
    </>
  );
};
