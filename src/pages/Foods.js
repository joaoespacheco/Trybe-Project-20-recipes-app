import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeContext from '../context/RecipeContext';
import CategoriesButtons from '../components/Categories';

export default function Foods() {
  const {
    statusSearchBar,
    recipesList,
    handleFoodsAndDriks,
  } = useContext(RecipeContext);

  useEffect(() => {
    handleFoodsAndDriks('foods', 'name', '');
  }, []);

  return (
    <>
      <Header statusButton pageTitle="Foods" />
      { statusSearchBar && <SearchBar page="foods" />}
      <CategoriesButtons />
      <section>
        { recipesList.length > 1 && <Recipes page="foods" />}
      </section>
      { recipesList.length === 1 && (
        <Redirect to={ `/foods/${recipesList[0].idMeal}` } />
      )}
    </>
  );
}
