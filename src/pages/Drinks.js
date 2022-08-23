import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import CardDrink from '../components/CardDrink';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeContext from '../context/RecipeContext';

export default function Drinks() {
  const { statusSearchBar, recipesList } = useContext(RecipeContext);
  return (
    <>
      <Header statusButton pageTitle="Drinks" />
      { statusSearchBar && <SearchBar page="drinks" />}
      <section>
        { recipesList.length > 1 && <CardDrink />}
      </section>
      { recipesList.length === 1 && (
        <Redirect to={ `/drinks/${recipesList[0].idDrink}` } />
      )}
      <Footer />
    </>
  );
}
