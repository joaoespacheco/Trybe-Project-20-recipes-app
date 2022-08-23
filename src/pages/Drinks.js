import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeContext from '../context/RecipeContext';
import CategoriesButtons from '../components/Categories';

export default function Drinks() {
  const {
    statusSearchBar,
    recipesList,
    handleFoodsAndDriks,
  } = useContext(RecipeContext);

  useEffect(() => {
    handleFoodsAndDriks('drinks', 'name', '');
  }, []);

  return (
    <>
      <Header statusButton pageTitle="Drinks" />
      { statusSearchBar && <SearchBar page="drinks" />}
      <CategoriesButtons />
      <section>
        { recipesList.length > 1 && <Recipes page="drinks" />}
      </section>
      { recipesList.length === 1 && (
        <Redirect to={ `/drinks/${recipesList[0].idDrink}` } />
      )}
    </>
  );
}
