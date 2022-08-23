import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

export default function CategoriesButtons() {
  const { categories } = useContext(RecipeContext);
  const maxNumberCategories = 5;
  const availableCategories = categories
    .filter((_category, index) => index < maxNumberCategories);
  return (
    <div>
      { availableCategories.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
        >
          { strCategory }
        </button>
      )) }
    </div>
  );
}
