import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  return (
    <>
      <Header statusButton={ false } pageTitle="Profile" />
      <section>
        <p>Oi, eu sou o Profile</p>
      </section>
      <Footer />
    </>
  );
}
