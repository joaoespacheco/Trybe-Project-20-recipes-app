import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import CardFood from '../components/CardFood';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeContext from '../context/RecipeContext';

export default function Foods() {
  const { statusSearchBar, recipesList } = useContext(RecipeContext);
  return (
    <>
      <Header statusButton pageTitle="Foods" />
      { statusSearchBar && <SearchBar page="foods" />}
      <section>
        { recipesList.length > 1 && <CardFood />}
      </section>
      { recipesList.length === 1 && (
        <Redirect to={ `/foods/${recipesList[0].idMeal}` } />
      )}
      <Footer />
    </>
  );
}
