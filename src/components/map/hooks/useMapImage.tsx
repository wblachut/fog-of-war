import { useEffect, useState } from 'react';
import useImage from 'use-image';
import { setUpImage } from '~/helpers/imageSetupHelpers';
import { ElementSize } from '~/model/customTypes.model';

export const useMapImage = (mapSrc: HTMLImageElement['src']) => {
  const [mapImage] = useImage(mapSrc);
  const [mapSize, setMapSize] = useState<ElementSize>({ width: 0, height: 0 });

  /* IMAGE SETUP */
  useEffect(() => {
    const image = setUpImage(mapSrc);
    image.onload = () => {
      setMapSize({ width: image.width, height: image.height });
    };
  }, [mapSrc]);

  return { mapImage, mapSize };
};
