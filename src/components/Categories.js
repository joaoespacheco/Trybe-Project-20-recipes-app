import React, { useContext, useState } from 'react';
import { string } from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import styles from '../styles/Categories.module.css';

export default function Categories({ page }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const {
    categories,
    handleFoodsAndDriks,
    // statusFilter,
    setStatusFilter } = useContext(RecipeContext);
  const maxNumberCategories = 5;
  const availableCategories = categories
    .filter((_category, index) => index < maxNumberCategories);

  const setFilter = (type, endpoint) => {
    if (endpoint === selectedCategory || endpoint === 'all') {
      handleFoodsAndDriks(page, 'name', '');
      setStatusFilter(true);
      setSelectedCategory('all');
    } else {
      handleFoodsAndDriks(page, type, endpoint);
      setStatusFilter(false);
      setSelectedCategory(endpoint);
    }
  };

  return (
    <div className={ styles.containerCategories }>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setFilter('name', '') }
      >
        All
      </button>
      { availableCategories.map(({ strCategory }, index) => (
        <button
          type="button"
          key={ `${strCategory}-${index}` }
          name={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => setFilter('filter', strCategory) }
        >
          { strCategory }
        </button>
      )) }
    </div>
  );
}

Categories.propTypes = {
  page: string,
}.isRequired;
