import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';

export default function DoneRecipes() {
  const [list, setList] = useState([]);
  useEffect(() => {
    const storage = localStorage.getItem('doneRecipes');
    const data = storage ? JSON.parse(storage) : [];
    setList(data);
  }, []);

  return (
    <>
      <Header statusButton={ false } pageTitle="Done Recipes" />
      <section>
        <FilterButtons />
        { list.map((item, index) => (
          <div key={ index }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ item.image }
              alt={ item.name }
              style={ { width: '150px', padding: '0 10px' } }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{ item.category }</p>
            <p data-testid={ `${index}-horizontal-name` }>{ item.name }</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ item.doneDate }</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
            >
              Compartilhar
            </button>
            { item.tags.map((tag, i2) => (
              <p
                key={ i2 }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </p>
            )) }
          </div>
        )) }
      </section>
    </>
  );
}
