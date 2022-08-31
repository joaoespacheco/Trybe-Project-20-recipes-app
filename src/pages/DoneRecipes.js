import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsShare } from 'react-icons/bs';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import styles from '../styles/DoneRecipes.module.css';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [list, setList] = useState([]);
  const [share, setShare] = useState('');

  useEffect(() => {
    const storage = localStorage.getItem('doneRecipes');
    const data = storage ? JSON.parse(storage) : [];
    setRecipes(data);
    setList(data);
  }, []);

  const handleClick = ({ type, id, name }) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setShare(name);
  };

  const filterRecipes = (param) => {
    const result = recipes.filter(({ type }) => type.includes(param));
    setList(result);
  };

  return (
    <main
      className={ styles.containerDoneRecipes }
    >
      <Header statusButton={ false } pageTitle="Done Recipes" />
      <section>
        <FilterButtons filterRecipes={ filterRecipes } />
        { list[0] && list.map((item, index) => (
          <div
            key={ index }
            className={ styles.cardDones }
          >
            <div>
              <div>
                <button
                  type="button"
                  onClick={ () => handleClick(item) }
                  className={ styles.ButtonIcon }
                  style={ { background: 'none', border: 'none', cursor: 'pointer' } }
                >
                  <BsShare
                    className={ styles.icon }
                  />
                </button>
                { share === item.name && <span>Link copied!</span> }
              </div>
              <Link to={ `/${item.type}s/${item.id}` }>
                <h3 data-testid={ `${index}-horizontal-name` }>{ item.name }</h3>
              </Link>
              <Link to={ `/${item.type}s/${item.id}` }>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { item.type === 'food'
                    ? `${`${item.nationality} food`}`
                    : '' }
                </p>
              </Link>
              <Link to={ `/${item.type}s/${item.id}` }>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { item.type === 'food'
                    ? `${item.category}`
                    : `${item.alcoholicOrNot}` }
                </p>
              </Link>

              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                { `${item.doneDate}` }
              </p>
            </div>
            <Link to={ `/${item.type}s/${item.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ item.image }
                alt={ item.name }
                className={ styles.photo }
              />
            </Link>
          </div>
        )) }
      </section>
    </main>
  );
}
