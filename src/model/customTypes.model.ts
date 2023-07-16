import { Layer } from 'konva/lib/Layer';
import { KonvaEventObject } from 'konva/lib/Node';
import { Stage } from 'konva/lib/Stage';
import { LegacyRef, MutableRefObject } from 'react';

export type Position = {
  x: number;
  y: number;
};

export type ElementSize = {
  width: number;
  height: number;
};

export type CustomMouseEvent = KonvaEventObject<MouseEvent>;

export type StageRef = MutableRefObject<Stage> | null;
export type CanvasRef = MutableRefObject<HTMLCanvasElement> | null;
export type LayerRef = LegacyRef<Layer>;

export type PlayerMoveEvent = CustomMouseEvent | KeyboardEvent;

export type TimeoutType = ReturnType<typeof setTimeout> | null;
