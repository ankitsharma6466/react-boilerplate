import React, { Component } from 'react';
import { Provider } from "react-redux";
import { store } from "./store.js";
import { BrowserRouter as Router}  from 'react-router-dom';
import './app.css';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Routes/>
        </Router>
      </Provider>
    );
  }
}

export default App;
