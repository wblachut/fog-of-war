import Konva from 'konva';

export interface Position {
  x: number;
  y: number;
}

export type CustomMouseEvent = Konva.KonvaEventObject<MouseEvent>;
