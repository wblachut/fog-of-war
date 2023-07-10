import { act, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import InfoModal from './InfoModal';

describe('test <InfoModal />', () => {
  beforeEach(() => {
    render(<InfoModal />);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test('should initially render InfoModal with proper styles', () => {
    expect(screen.getByTestId('info-modal')).toHaveStyle('opacity: 0');
    expect(screen.getByTestId('info-modal')).toHaveStyle('transform: translateY(-200%)');
  });

  test('should animate InfoModal after timeouts', () => {
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId('info-modal')).toHaveStyle('opacity: 1');
    expect(screen.getByTestId('info-modal')).toHaveStyle('transform: translateY(0)');

    act(() => {
      vi.advanceTimersByTime(9000);
    });

    expect(screen.getByTestId('info-modal')).toHaveStyle('opacity: 0');
    expect(screen.getByTestId('info-modal')).toHaveStyle('transform: translateY(-200%)');
  });
});
