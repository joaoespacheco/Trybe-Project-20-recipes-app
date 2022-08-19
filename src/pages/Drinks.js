import React, { useContext } from 'react';

import RecipeContext from '../context/RecipeContext';

export default function Drinks() {
  const { handleCategoryDrink } = useContext(RecipeContext);

  return (
    <section>
      <p>Oi, eu sou o Drinks</p>
      <button
        type="button"
        onClick={ handleCategoryDrink }
      >
        Click
      </button>
    </section>
  );
}
