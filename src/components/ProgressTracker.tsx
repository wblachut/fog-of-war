import { CSSProperties } from 'react';

interface ProgressTrackerProps {
  progressPercentage: number;
}

// normally we would have i18n translations here
const PLAYERS_PROGRESS_TEXT = 'Player Progress';

const ProgressTrackerStyle: CSSProperties = {
  backgroundImage: 'url(https://slack.vcmi.eu/assets/background_red.jpg)',
  boxShadow: 'inset 0 0 0 1px rgba(160, 160, 160, 0.3)',
  fontFamily: "'Raleway', Helvetica, sans-serif",
  fontSize: '0.6em',
  fontWeight: 800,
  letterSpacing: '0.25em',
  lineHeight: '4.8125em',
  padding: '0 2.5em',
  textTransform: 'uppercase',
  position: 'absolute',
  top: '5vh',
  right: '5vh',
  zIndex: 200,
  pointerEvents: 'none',
};

export const ProgressTracker = ({ progressPercentage }: ProgressTrackerProps) => {
  return (
    <div style={ProgressTrackerStyle}>{`${PLAYERS_PROGRESS_TEXT}: ${progressPercentage}%`}</div>
  );
};
