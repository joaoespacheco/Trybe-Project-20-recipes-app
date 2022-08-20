import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const statusButton = () => {
    const regex = /\S+@\S+\.\S+/;
    const SIX = 6;
    const emailValidator = regex.test(email);
    const passwordValidator = password.length > SIX;
    return !(emailValidator && passwordValidator);
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    history.push('/foods');
  };

  return (
    <main>
      <label htmlFor="email">
        <input
          data-testid="email-input"
          id="email"
          type="email"
          placeholder="Digite seu email"
          value={ email }
          onChange={ ({ target }) => {
            setEmail(target.value);
          } }
        />

      </label>
      <label htmlFor="password">
        <input
          data-testid="password-input"
          id="password"
          type="password"
          placeholder="Digite seu password"
          value={ password }
          onChange={ ({ target }) => {
            setPassword(target.value);
          } }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ statusButton() }
        onClick={ handleClick }
      >
        Enter
      </button>
    </main>
  );
}
