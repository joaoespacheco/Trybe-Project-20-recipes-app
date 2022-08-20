import React from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import RecipeDetail from './pages/RecipeDetail';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <section>
      <Switch>
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id" component={ RecipeDetail } />
        <Route path="/foods/:id" component={ RecipeDetail } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/foods" component={ Foods } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </section>
  );
}

export default App;
