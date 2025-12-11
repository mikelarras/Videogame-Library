import { render, screen } from '@testing-library/react';
import GameListCard from '../GameListCard';

describe('GameListCard component', () => {
  it('should render the card', () => {
    render(<GameListCard gameImage="./imagenes/elden-ring.jpg" gameName="Elden Ring" />);
    const cardImage = screen.getByAltText('Elden Ring');
    expect(cardImage).toBeInTheDocument();
  });
  it('should render the game title', () => {
    render(<GameListCard gameImage="./imagenes/elden-ring.jpg" gameName="Elden Ring" />);
    const cardTitle = screen.getByText('Elden Ring');
    expect(cardTitle).toBeInTheDocument();
  });
});