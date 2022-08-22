import React from 'react';
import { bool, string } from 'prop-types';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

export default function Header({ statusButton, pageTitle }) {
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
        <img
          src={ search }
          alt="Ícone de pesquisa"
          data-testid="search-top-btn"
        />
      )}
    </header>
  );
}

Header.propTypes = {
  statusButton: bool,
  pageTitle: string,
}.isRequired;
