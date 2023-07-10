import { render, screen } from '@testing-library/react';
import BoarMarker from '~/assets/boar-marker.webp';
import { PlayerDirection } from '~/model/PlayerDirectionEnum';
import { PlayerMarker } from './PlayerMarker';
import { PlayerWrapper } from './PlayerWrapper';

describe('test <PlayerWrapper />', () => {
  const mockPlayerPosition = { x: 500, y: 600 };
  const setup = (playerDirection: PlayerDirection) => {
    render(
      <PlayerWrapper
        playerMarker={<PlayerMarker playerImageSrc={BoarMarker} />}
        playerPosition={mockPlayerPosition}
        playerDirection={playerDirection}
      />,
    );
  };

  it('renders the component and displays player marker with right direction correctly', () => {
    setup(PlayerDirection.RIGHT);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByTestId('player-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('player-wrapper')).toHaveStyle('transform: scaleX(1)');
  });

  it('renders the component and displays player marker with left direction correctly', () => {
    setup(PlayerDirection.LEFT);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByTestId('player-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('player-wrapper')).toHaveStyle('transform: scaleX(-1)');
  });
});
