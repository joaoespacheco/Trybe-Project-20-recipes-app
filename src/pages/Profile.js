import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <Header statusButton={ false } pageTitle="Profile" />
      <section>
        <h1 data-testid="profile-email">{ email }</h1>

        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Logout
        </button>

      </section>
      <Footer />
    </>
  );
}
