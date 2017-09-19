import React, { Component } from 'react';
import './App.css';
import Product from './components/product';
import MainMenu from './components/main_menu';
import Login from './components/login';

class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }
  render() {
    let isLoggedIn = this.state.isLoggedIn;
    if (isLoggedIn == false) {
      return (
          <Login />
      );
    } else {
      return (
        <div className="container">
          <MainMenu />
          <Product />
        </div>
      );
    }
  }
}

export default App;
