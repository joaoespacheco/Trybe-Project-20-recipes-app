import React from 'react';
import { Link } from 'react-router-dom';
import { GiMartini, GiChickenOven } from 'react-icons/gi';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className={ styles.containerFooter }
    >
      <Link to="/foods">
        {/* <img
          src={ mealIcon }
          alt="Ícone de food"
          data-testid="food-bottom-btn"
        /> */}
        <GiChickenOven />
      </Link>
      <Link to="/drinks">
        {/* <img
          src={ drinkIcon }
          alt="Ícone de drink"
          data-testid="drinks-bottom-btn"
        /> */}
        <GiMartini />
      </Link>
    </footer>
  );
}
