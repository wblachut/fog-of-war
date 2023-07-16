import { act, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import InfoModal from './InfoModal';

describe('test <InfoModal />', () => {
  beforeEach(() => {
    render(<InfoModal />);
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  const mockedOpacityValue = '0.9'; // opacity in test rendering doesn't reach 1

  test('should initially render InfoModal with proper styles', () => {
    expect(screen.getByTestId('info-modal')).toHaveStyle('opacity: 0');
    expect(screen.getByTestId('info-modal')).toHaveStyle('transform: translateY(-200%)');
  });

  test('should animate InfoModal after first timeout', async () => {
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(Number(screen.getByTestId('info-modal').style['opacity']).toFixed(1)).toEqual(
        mockedOpacityValue,
      );
    });
  });

  test('should hide InfoModal after second timeout', async () => {
    act(() => {
      vi.advanceTimersByTime(8000);
    });

    await waitFor(() => {
      expect(screen.getByTestId('info-modal')).toHaveStyle('opacity: 0');
      expect(screen.getByTestId('info-modal')).toHaveStyle('transform: translateY(-200%)');
    });
  });
});
