import React from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  return (
    <>
      <Header statusButton={ false } pageTitle="Favorite Recipes" />
      <section>
        <p>Oi, eu sou o FavoriteRecipes</p>
      </section>
    </>
  );
}
