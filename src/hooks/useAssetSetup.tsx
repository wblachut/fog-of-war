import { useEffect, useRef, useState } from 'react';
import useImage from 'use-image';
import fog from '~/assets/fog-homm3.png';
import { setUpImage } from '~/helpers/imageSetupHelpers';
import { ElementSize } from '~/model/customTypes.model';

const FOG_SRC = fog;

export const useAssetSetup = (mapSrc: HTMLImageElement['src']) => {
  /* GET DOCUMENT CLIENT DIMENSIONS */
  const document = useRef(window.document.documentElement);
  const { clientWidth, clientHeight } = document.current;
  const clientSize = { width: clientWidth, height: clientHeight };

  /* LOAD IMAGES FOR KONVA LIB */
  const [mapImage] = useImage(mapSrc);
  const [fogImage] = useImage(FOG_SRC);
  const isMounted = !!fogImage && !!mapImage;

  const [mapSize, setMapSize] = useState<ElementSize>({ width: 0, height: 0 });

  /* IMAGE & FOG SETUP */
  useEffect(() => {
    const mapImage = setUpImage(mapSrc);
    mapImage.onload = () => {
      setMapSize({ width: mapImage.width, height: mapImage.height });
    };
  }, [mapSrc]);

  return { mapImage, fogImage, mapSize, isMounted, clientSize };
};
