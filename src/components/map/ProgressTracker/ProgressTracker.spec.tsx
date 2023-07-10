import { render, screen } from '@testing-library/react';
import { ProgressTracker } from './ProgressTracker';

describe('test <ProgressTracker />', () => {
  const mockProgressValue = 77;
  const setup = (progressPercentage: number) => {
    render(<ProgressTracker progressPercentage={progressPercentage} />);
  };

  it('renders the component and displays progress percentage correctly', () => {
    setup(77);
    expect(screen.getByText('Player Progress:')).toBeInTheDocument();
    expect(screen.getByTestId('progress-percentage')).toContainHTML(`${mockProgressValue}`);
  });
});
