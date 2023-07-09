import {
  getMapRestrictions,
  getNormalizedDirections,
  getPlayerCoordsOnKeydown,
  getPlayerDirection,
} from '~/helpers/PlayerMovementHelpers';
import { mockMoveEvent } from '~/mocks/mockMoveEvent';
import { KeyboardArrow } from '~/model/KeyboardArrowEnum';
import { PlayerDirection } from '~/model/PlayerDirectionEnum';

describe('test PlayerMovementHelpers', () => {
  const mockCanvasSize = { width: 800, height: 600 };
  const mockRadius = 10;
  const prevPosition = { x: 100, y: 100 };

  describe('getMapRestrictions', () => {
    it('should return the map restrictions based on the canvas size and radius', () => {
      const expectedRestrictions = {
        leftRestrict: mockRadius,
        topRestrict: mockRadius,
        rightRestrict: mockCanvasSize.width - mockRadius,
        bottomRestrict: mockCanvasSize.height - mockRadius,
      };

      const restrictions = getMapRestrictions(mockCanvasSize, mockRadius);

      expect(restrictions).toEqual(expectedRestrictions);
    });
  });

  describe('getNormalizedDirections', () => {
    it('should return the normalized directions based on the previous position and current position', () => {
      const cursorPosition = { x: 200, y: 200 };
      const expectedPlayerPosition = { x: 114.14213562373095, y: 114.14213562373095 };
      const normalizedDirections = getNormalizedDirections(
        prevPosition,
        cursorPosition,
        mockCanvasSize,
      );

      expect(normalizedDirections).toEqual(expectedPlayerPosition);
    });

    it('should return the previous position when the mouse position is in the left restrict area', () => {
      const restrictedPosition = { x: 5, y: 200 };
      const prevPosition = { x: 10, y: 200 };
      const normalizedDirections = getNormalizedDirections(
        prevPosition,
        restrictedPosition,
        mockCanvasSize,
      );

      expect(normalizedDirections).toEqual(prevPosition);
    });

    it('should return the previous position when the mouse position is in the top restrict area', () => {
      const restrictedPosition = { x: 200, y: 5 };
      const prevPosition = { x: 200, y: 10 };

      const normalizedDirections = getNormalizedDirections(
        prevPosition,
        restrictedPosition,
        mockCanvasSize,
      );

      expect(normalizedDirections).toEqual(prevPosition);
    });
  });

  describe('getPlayerCoordsOnKeydown', () => {
    it('should return the updated position when ArrowLeft key is pressed', () => {
      const expectedPosition = { x: 90, y: 100 };
      const newPosition = getPlayerCoordsOnKeydown(KeyboardArrow.LEFT, prevPosition);

      expect(newPosition).toEqual(expectedPosition);
    });

    it('should return the updated position when ArrowUp key is pressed', () => {
      const expectedPosition = { x: 100, y: 90 };
      const newPosition = getPlayerCoordsOnKeydown(KeyboardArrow.UP, prevPosition);

      expect(newPosition).toEqual(expectedPosition);
    });

    it('should return the updated position when ArrowRight key is pressed', () => {
      const expectedPosition = { x: 110, y: 100 };
      const newPosition = getPlayerCoordsOnKeydown(KeyboardArrow.RIGHT, prevPosition);

      expect(newPosition).toEqual(expectedPosition);
    });

    it('should return the updated position when ArrowDown key is pressed', () => {
      const expectedPosition = { x: 100, y: 110 };
      const newPosition = getPlayerCoordsOnKeydown(KeyboardArrow.DOWN, prevPosition);

      expect(newPosition).toEqual(expectedPosition);
    });

    it('should return the same position when a key other than arrow keys is pressed', () => {
      const nonArrowKey = 'Enter';
      const newPosition = getPlayerCoordsOnKeydown(nonArrowKey, prevPosition);

      expect(newPosition).toEqual(prevPosition);
    });
  });

  describe('getPlayerDirection', () => {
    const playerPosition = { x: 100, y: 100 };
    const positionLeft = { x: 50, y: 100 };
    const positionRight = { x: 150, y: 100 };

    it('should return the player direction based on the mouse move event and player position', () => {
      // `any` used only to get rid of type conversion between mock and Konva Stage event
      const directionLeft = getPlayerDirection(
        mockMoveEvent.mouseEvent(positionLeft) as any,
        playerPosition,
      );
      const directionRight = getPlayerDirection(
        mockMoveEvent.mouseEvent(positionRight) as any,
        playerPosition,
      );

      expect(directionLeft).toEqual(PlayerDirection.LEFT);
      expect(directionRight).toEqual(PlayerDirection.RIGHT);
    });

    it('should return properly the player direction based on the arrow key event', () => {
      const playerPosition = { x: 100, y: 100 };

      const directionLeft = getPlayerDirection(
        mockMoveEvent.keyboardEvent(KeyboardArrow.LEFT),
        playerPosition,
      );
      const directionRight = getPlayerDirection(
        mockMoveEvent.keyboardEvent(KeyboardArrow.RIGHT),
        playerPosition,
      );
      const directionUp = getPlayerDirection(
        mockMoveEvent.keyboardEvent(KeyboardArrow.UP),
        playerPosition,
      );

      expect(directionLeft).toEqual(PlayerDirection.LEFT);
      expect(directionRight).toEqual(PlayerDirection.RIGHT);
      expect(directionUp).toBeUndefined();
    });

    it('should return undefined for unsupported event types', () => {
      const changeEvent = { type: 'change' };
      const playerPosition = { x: 100, y: 100 };

      const direction = getPlayerDirection(changeEvent, playerPosition);
      expect(direction).toBeUndefined();
    });
  });
});
