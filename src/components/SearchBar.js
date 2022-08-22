import React from 'react';

export default function SearchBar() {
  return (
    <section>
      <label
        htmlFor="search-input"
      >
        Pesquisar
        <input
          id="search-input"
          data-testid="search-input"
          type="text"
        />
      </label>
      <label htmlFor="ingredient">
        Ingredient
        <input
          id="ingredient-radio"
          name="filter"
          type="radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
        />
      </label>
      <label htmlFor="name-radio">
        Name
        <input
          id="name-radio"
          name="filter"
          type="radio"
          data-testid="name-search-radio"
          value="name"
        />
      </label>
      <label htmlFor="first-letter-radio">
        First Letter
        <input
          id="first-letter-radio"
          name="filter"
          type="radio"
          data-testid="first-letter-search-radio"
          value="first-letter"
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
      >
        Search
      </button>
    </section>
  );
}
