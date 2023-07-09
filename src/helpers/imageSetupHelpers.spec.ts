import { JSDOM } from 'jsdom';
import { setUpImage } from './imageSetupHelpers';

type MockWindowType = Window & typeof globalThis;

const window = new JSDOM('<html></html>').window;
const { document } = window;
global.window = window as unknown as MockWindowType;
global.document = document;

describe('test imageSetupHelpers', () => {
  it('should return an HTMLImageElement with the specified src', () => {
    const mockSrc = 'https://obi.wan/kenobi.jpg';
    const image = setUpImage(mockSrc);

    expect(image.toString()).toBe('[object HTMLImageElement]');
    expect(image.src).toBe(mockSrc);
  });
});
