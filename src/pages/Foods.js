import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeContext from '../context/RecipeContext';
import Categories from '../components/Categories';
import styles from '../styles/Foods.module.css';

export default function Foods() {
  const {
    statusSearchBar,
    recipesList,
    handleFoodsAndDriks,
    statusFilter,
    setStatusFilter,
  } = useContext(RecipeContext);

  useEffect(() => {
    handleFoodsAndDriks('foods', 'name', '');
    setStatusFilter(true);
  }, []);

  return (
    <main
      className={ styles.containerFoods }
    >
      <Header statusButton pageTitle="Foods" />
      { statusSearchBar && <SearchBar page="foods" />}
      <Categories page="foods" />
      { recipesList.length > 0 && <Recipes page="foods" />}
      { statusFilter && recipesList.length === 1 && (
        <Redirect to={ `/foods/${recipesList[0].idMeal}` } />
      )}
      <Footer />
    </main>
  );
}
