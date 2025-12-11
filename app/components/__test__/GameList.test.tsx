import { render, screen } from '@testing-library/react';
import GameList from '../GameList';

describe('GameList component', () => {
  it('should render the list', () => {
    render(<GameList />);
    const listId = screen.getByTestId('game-list');
    expect(listId).toBeInTheDocument();
  });
});