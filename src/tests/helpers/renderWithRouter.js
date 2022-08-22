import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import RecipeProvider from '../../context/RecipeProvider';

function withRouter(component, history) {
    return (
    <Router history={ history }>
      <RecipeProvider>
        { component }
      </RecipeProvider>
    </Router>
    );
    } 
export default function renderWithRouter(
    component,
    {
    initialPath = '/',
    history = createMemoryHistory([initialPath]),
    } = {},
    ) {
    return {
    ...render(withRouter(component, history)),
    history,
    };
}