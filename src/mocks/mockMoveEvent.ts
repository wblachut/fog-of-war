import { KeyboardArrow } from '~/model/KeyboardArrowEnum';
import { CustomMouseEvent, Position } from '~/model/customTypes.model';

export const mockMoveEvent = {
  mouseEvent: (position: Position) => ({
    evt: {
      offsetX: position.x,
      offsetY: position.y,
    } as Partial<CustomMouseEvent['evt']>,
    currentTarget:
      '{"attrs":{"width":3170,"height":1720},"className":"Stage","children":[{"attrs":{"id":"map-layer"},"className":"Layer","children":[{"attrs":{"width":3170,"height":1720},"className":"Rect"}]},{"attrs":{"id":"fog-layer","listening":false},"className":"Layer","children":[{"attrs":{"width":3170,"height":1720},"className":"Rect"}]}]}',
    type: 'mousemove',
  }),
  keyboardEvent: (key: KeyboardArrow) => ({
    isTrusted: true,
    code: 'ArrowLeft',
    currentTarget: null,
    key,
    keyCode: 37,
    location: 0,
    type: 'keydown',
  }),
};
