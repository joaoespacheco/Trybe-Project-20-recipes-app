import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/Profile.module.css';

export default function Profile() {
  const history = useHistory();
  const { email } = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')) : '';

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <section className={ styles.containerProfile }>
      <Header statusButton={ false } pageTitle="Profile" />
      <main className={ styles.contentProfile }>
        <h1 data-testid="profile-email">{ email }</h1>
        <nav>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>

          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>

          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ logout }
          >
            Logout
          </button>
        </nav>
      </main>
      <Footer />
    </section>
  );
}
