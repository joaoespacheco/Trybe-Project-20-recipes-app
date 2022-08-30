import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeContext from '../context/RecipeContext';
import Categories from '../components/Categories';
import styles from '../styles/Foods.module.css';

export default function Drinks() {
  const {
    statusSearchBar,
    recipesList,
    handleFoodsAndDriks,
    statusFilter,
    setStatusFilter,
  } = useContext(RecipeContext);

  useEffect(() => {
    handleFoodsAndDriks('drinks', 'name', '');
    setStatusFilter(true);
  }, []);

  return (
    <main
      className={ styles.containerFoods }
    >
      <Header statusButton pageTitle="Drinks" />
      { statusSearchBar && <SearchBar page="drinks" />}
      <Categories page="drinks" />
      <section>
        { recipesList.length > 1 && <Recipes page="drinks" />}
      </section>
      {
        statusFilter && (
          recipesList.length === 1
            && <Redirect to={ (`/drinks/${recipesList[0].idDrink}`) } />)
      }
      <Footer />
    </main>
  );
}
