import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Login from './components/login';
import MainPage from './components/main_page';

class App extends Component {
  constructor() {
    super();
    this.validateSession = this.validateSession.bind(this);
  }

  validateSession() {
    let validation = true;
    if ((localStorage.getItem("token") === null)) {
      validation = false;
      localStorage.clear();
    }
    return validation;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" render={() => (
            (this.validateSession() === true) ?
              <Redirect to="/product" /> :
              <Login />
          )} />

          <Route path="/product" render={() => (
            (this.validateSession() === true) ?
              <MainPage /> :
              <Redirect to="/login" />
          )} />

          <Route path="/edit-info/user" render={() => (
            (this.validateSession() === true) ?
              <MainPage /> :
              <Redirect to="/login" />
          )} />

          <Route path="/edit-info/delivery" render={() => (
            (this.validateSession() === true) ?
              <MainPage /> :
              <Redirect to="/login" />
          )} />

          <Route path="/shop-cart" render={() => (
            (this.validateSession() === true) ?
              <MainPage /> :
              <Redirect to="/login" />
          )} />

          <Route path="/payment" render={() => (
            (this.validateSession() === true) ?
              <MainPage /> :
              <Redirect to="/login" />
          )} />

          <Route path="/" render={() => (
            (this.validateSession() === true) ?
              <Redirect to="/product" /> :
              <Redirect to="/login" />
          )} />
        </Switch>
      </BrowserRouter>
    );
  }
} 
export default App;
