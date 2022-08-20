import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter'


describe('Testando a página de Login', () => {
it('Verificando se os elementos são renderizados na tela', () => {

renderWithRouter(<App />);

const inputEmail = screen.getByTestId('email-input')
const inputPassword = screen.getByTestId('password-input')
const buttonLogin = screen.getByTestId('login-submit-btn');

expect(inputEmail).toBeInTheDocument();
expect(inputPassword).toBeInTheDocument();
expect(buttonLogin).toBeInTheDocument();
})

it('Verificando se é possível digitar nos campos de input e mudar a rota', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input')
    const inputPassword = screen.getByTestId('password-input')
    const buttonLogin = screen.getByTestId('login-submit-btn');

    expect(buttonLogin).toBeDisabled();

    userEvent.type(inputEmail,'email@teste.com');
    userEvent.type(inputPassword,'1234567');

    expect(buttonLogin).toBeEnabled();
    
    userEvent.click(buttonLogin);
    
    expect(history.location.pathname).toBe('/foods');
})
});