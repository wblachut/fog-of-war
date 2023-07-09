import { useEffect, useState } from 'react';
import useImage from 'use-image';
import fog from '~/assets/fog-homm3.png';
import { setUpImage } from '~/helpers/imageSetupHelpers';
import { ElementSize } from '~/model/customTypes.model';

const FOG_SRC = fog;

export const useMapImage = (mapSrc: HTMLImageElement['src']) => {
  const [mapImage] = useImage(mapSrc);
  const [fogImage] = useImage(FOG_SRC);

  const [mapSize, setMapSize] = useState<ElementSize>({ width: 0, height: 0 });

  /* IMAGE SETUP */
  useEffect(() => {
    const mapImage = setUpImage(mapSrc);
    mapImage.onload = () => {
      setMapSize({ width: mapImage.width, height: mapImage.height });
    };
  }, [mapSrc]);

  return { mapImage, fogImage, mapSize };
};
