import { progressTrackerStyle } from './ProgressTracker.style';

interface ProgressTrackerProps {
  progressPercentage: number;
}

export const ProgressTracker = ({ progressPercentage }: ProgressTrackerProps) => {
  return (
    <div style={progressTrackerStyle}>
      Player Progress: <span data-testid='progress-percentage'>{progressPercentage}%</span>
    </div>
  );
};
