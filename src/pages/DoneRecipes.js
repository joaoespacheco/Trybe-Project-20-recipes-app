import React from 'react';
import Header from '../components/Header';

export default function DoneRecipes() {
  return (
    <>
      <Header statusButton={ false } pageTitle="Done Recipes" />
      <section>
        <p>Oi, eu sou o DoneRecipes</p>
      </section>
    </>
  );
}
