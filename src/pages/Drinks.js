import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeContext from '../context/RecipeContext';

export default function Drinks() {
  const { statusSearchBar } = useContext(RecipeContext);
  return (
    <>
      <Header statusButton pageTitle="Drinks" />
      { statusSearchBar && <SearchBar page="drinks" />}
      <section>
        <p>Oi, eu sou o Drinks</p>
      </section>
    </>
  );
}
