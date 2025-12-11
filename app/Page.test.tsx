import { render, screen } from '@testing-library/react';
import Page from './page';

describe('Home page', () => {
  it('renders title', () => {
    render(<Page />);
    expect(screen.getByText('Video Game Library')).toBeInTheDocument();
  });
});
