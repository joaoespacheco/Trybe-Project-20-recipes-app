import React, { useContext, useState } from 'react';
import { string } from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import styles from '../styles/SearchBar.module.css';

export default function SearchBar({ page }) {
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');

  const { handleFoodsAndDriks } = useContext(RecipeContext);

  const handleClick = () => {
    if (radio === 'firstLetter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      handleFoodsAndDriks(page, radio, search);
      setSearch('');
    }
  };

  return (
    <section className={ styles.containerSearchBar }>
      <label
        htmlFor="search-input"
      >
        <input
          value={ search }
          onChange={ (e) => setSearch(e.target.value) }
          id="search-input"
          data-testid="search-input"
          type="text"
          placeholder="Digite o filtro"
        />
      </label>
      <div>
        <label htmlFor="ingredient-radio">
          <input
            id="ingredient-radio"
            name="filter"
            type="radio"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ (e) => setRadio(e.target.value) }
          />
          <span>Ingrediente</span>
        </label>
        <label htmlFor="name-radio">
          <input
            id="name-radio"
            name="filter"
            type="radio"
            data-testid="name-search-radio"
            value="name"
            onChange={ (e) => setRadio(e.target.value) }
          />
          <span>Nome</span>
        </label>
        <label htmlFor="first-letter-radio">
          <input
            id="first-letter-radio"
            name="filter"
            type="radio"
            data-testid="first-letter-search-radio"
            value="firstLetter"
            onChange={ (e) => setRadio(e.target.value) }
          />
          <span>Primeira letra</span>
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </section>
  );
}

SearchBar.propTypes = {
  page: string,
}.isRequired;
