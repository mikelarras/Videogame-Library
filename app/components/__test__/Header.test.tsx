import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header component', () => {
  it('should render title', () => {
    render(<Header />);
    const title = screen.getByText('Video Game Library');
    expect(title).toBeInTheDocument();
  });
  it('should render search icon', () => {
    render(<Header />);
    const searchIcon = screen.getByAltText('buscar');
    expect(searchIcon).toBeInTheDocument();
  });
  it('should render search input', () => {
    render(<Header />);
    const searchInput = screen.getByPlaceholderText('Busca un juego...');
    expect(searchInput).toBeInTheDocument();
  });
  it('should render my games link', () => {
    render(<Header />);
    const myGamesLink = screen.getByText('My Games');
    expect(myGamesLink).toBeInTheDocument();
  });
});