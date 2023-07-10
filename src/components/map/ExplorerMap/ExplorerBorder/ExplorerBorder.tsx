import { ElementSize } from '~/model/customTypes.model';
import { ExplorerBorderStyle } from '../ExplorerBorder.style';
import { CSSProperties } from 'react';

export const ExplorerBorder = ({ width, height }: ElementSize) => (
  <div style={getMapBorderStyles(width, height)} />
);

export const getMapBorderStyles = (width: number, height: number): CSSProperties => ({
  width: width - 40,
  height: height - 40,
  ...ExplorerBorderStyle,
});
