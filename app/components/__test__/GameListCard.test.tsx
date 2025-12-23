import { render, screen } from '@testing-library/react';
import GameListCard from '../GameListCard';

describe('GameListCard component', () => {
    it('should render the card', () => {
        render(
            <GameListCard
                gameId={1}
                gameImage="./imagenes/elden-ring.jpg"
                gameName="Elden Ring"
            />
        );
        const cardImage = screen.getByAltText('Portada de Elden Ring');
        expect(cardImage).toBeInTheDocument();
    });
    it('should render the game title', () => {
        render(
            <GameListCard
                gameId={1}
                gameImage="./imagenes/elden-ring.jpg"
                gameName="Elden Ring"
            />
        );
        const cardTitle = screen.getByText('Elden Ring');
        expect(cardTitle).toBeInTheDocument();
    });
});
