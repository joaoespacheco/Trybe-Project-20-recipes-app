import React, { useContext } from 'react';
import { bool, string } from 'prop-types';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import RecipeContext from '../context/RecipeContext';

export default function Header({ statusButton, pageTitle }) {
  const { statusSearchBar, setStatusSearchBar } = useContext(RecipeContext);
  return (
    <header>
      <Link to="/profile">
        <img
          src={ profile }
          alt="Ícone de perfil"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{ pageTitle }</h1>
      { statusButton && (
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
      )}
    </header>
  );
}

Header.propTypes = {
  statusButton: bool,
  pageTitle: string,
}.isRequired;
