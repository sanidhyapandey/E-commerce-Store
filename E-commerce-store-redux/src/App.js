// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import GlobalStyle from './styles/GlobalStyle';
import Home from './components/templates/Home';
import store from './store'; // Add this import

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <Home />
      </Router>
    </Provider>
  );
};

export default App;
