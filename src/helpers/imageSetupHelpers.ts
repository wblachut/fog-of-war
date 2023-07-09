export const setUpImage = (mapSrc: HTMLImageElement['src']): HTMLImageElement => {
  const image = new window.Image();
  image.src = mapSrc;

  return image;
};
