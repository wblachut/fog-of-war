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

  test('should initially render InfoModal with proper styles', () => {
    expect(screen.getByTestId('info-modal')).toHaveStyle('opacity: 0');
    expect(screen.getByTestId('info-modal')).toHaveStyle('transform: translateY(-200%)');
  });

  test('should animate InfoModal after first timeout', async () => {
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.getByTestId('info-modal').style['opacity']).toBeCloseTo(0.9360917483504706);
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
