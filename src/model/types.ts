import { KonvaEventObject } from 'konva/lib/Node';
import { Stage } from 'konva/lib/Stage';
import { MutableRefObject } from 'react';

export interface Position {
  x: number;
  y: number;
}

export interface mapSize {
  width: number;
  height: number;
}

export type CustomMouseEvent = KonvaEventObject<MouseEvent>;

export type StageRef = MutableRefObject<Stage> | null;
export type CanvasRef = MutableRefObject<HTMLCanvasElement> | null;
