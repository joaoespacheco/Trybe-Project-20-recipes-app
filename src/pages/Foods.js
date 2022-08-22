import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeContext from '../context/RecipeContext';

export default function Foods() {
  const { statusSearchBar } = useContext(RecipeContext);
  return (
    <>
      <Header statusButton pageTitle="Foods" />
      { statusSearchBar && <SearchBar />}
      <section>
        <p>Oi, eu sou o Foods</p>
      </section>
    </>
  );
}
