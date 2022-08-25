import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter'

describe('Testando a página Profile', () => {
  let getUser;

  beforeEach(() => {
    getUser = jest.spyOn(Storage.prototype, 'getItem')
    .mockReturnValue(JSON.stringify({ email: 'email@mail.com'}));
  });

  it('Verifica se o componente acessa a localStorage para recuperar o e-mail da pessoa usuária', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    expect(getUser).toHaveBeenCalledTimes(1);
    expect(getUser).toHaveBeenCalledWith('user');
  });

  it('Verifica a renderização de elementos na tela', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const elements = [
      screen.getByTestId('profile-email'),
      screen.getByTestId('profile-done-btn'),
      screen.getByTestId('profile-favorite-btn'),
      screen.getByTestId('profile-logout-btn'),
    ];
    elements.forEach((element) => expect(element).toBeInTheDocument());
  });

  it('Verifica o conteúdo do elemento onde deve ser exibido o nome da pessoa usuária na página Profile', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');
  
    const emailProfile = screen.getByTestId('profile-email');
    expect(emailProfile).toHaveTextContent('email@mail.com')
  });

  it('Verifica a funcionabilidade dos botões da página de Profile (Done Recipes)', () => {
    const { history } = renderWithRouter(<App />);

      history.push('/profile')
      userEvent.click(screen.getByTestId('profile-done-btn'))

      expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Verifica a funcionabilidade dos botões da página de Profile (Favorite Recipes)', () => {
    const { history } = renderWithRouter(<App />);

      history.push('/profile')
      userEvent.click(screen.getByTestId('profile-favorite-btn'))

      expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Verifica a funcionabilidade dos botões da página de Profile (Logout)', () => {
    const { history } = renderWithRouter(<App />);

      history.push('/profile')
      userEvent.click(screen.getByTestId('profile-logout-btn'))

      expect(history.location.pathname).toBe('/');
  });

});
