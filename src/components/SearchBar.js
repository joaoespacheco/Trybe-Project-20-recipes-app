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
    </section>
  );
}
