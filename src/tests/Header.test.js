import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Verificando o componente Header', () => {
  it('Verificando se os elementos são renderizados', () => {
    const { history } = renderWithRouter(<App />);
    
    history.push('/foods');
    
    const iconProfile = screen.getByTestId('profile-top-btn');
    const iconSearch = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(iconProfile).toBeInTheDocument();
    expect(iconSearch).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();

  });

  it('Verificando a funcionabilidade do icon profile', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const iconProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(iconProfile);

    expect(history.location.pathname).toBe('/profile');

  });
  it('Verificando a funcionabilidade do icon search', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const iconSearch = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearch);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });
});