import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer
      style={ { position: 'fixed', bottom: '0px' } }
      data-testid="footer"
    >
      <Link to="/foods">
        <img
          src={ mealIcon }
          alt="Ícone de food"
          data-testid="food-bottom-btn"
        />
      </Link>
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="Ícone de drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>
    </footer>
  );
}
