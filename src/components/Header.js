import React, { useContext } from 'react';
import { bool, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import search from '../images/searchIcon.svg';
import RecipeContext from '../context/RecipeContext';
import styles from '../styles/Header.module.css';

export default function Header({ statusButton, pageTitle }) {
  const { statusSearchBar, setStatusSearchBar } = useContext(RecipeContext);
  return (
    <header className={ styles.containerHeader }>
      <Link to="/profile">
        <FaUser />
      </Link>
      <h1 data-testid="page-title">{ pageTitle }</h1>
      { statusButton ? (
        <button
          type="button"
          style={ { background: 'none', border: 'none', cursor: 'pointer' } }
          onClick={ () => setStatusSearchBar(!statusSearchBar) }
        >
          <img
            src={ search }
            alt="Ícone de pesquisa"
            data-testid="search-top-btn"
          />
        </button>
      ) : (
        <div style={ { width: '2rem' } } />
      )}
    </header>
  );
}

Header.propTypes = {
  statusButton: bool,
  pageTitle: string,
}.isRequired;
