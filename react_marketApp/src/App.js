import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';
import { browserHistory } from 'react-router';
import PropTypes from "prop-types";
import Spinner from 'react-spinner';
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

          <Route path="/edit-user" render={() => (
            (this.validateSession() === true) ?
              <MainPage /> :
              <Redirect to="/login" />
          )} />

          <Route path="/edit-user/delivery" render={() => (
            (this.validateSession() === true) ?
              <MainPage /> :
              <Redirect to="/login" />
          )} />

          <Route path="/shop-cart" render={() => (
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
/*
  
 */
//<MainPage changePage={this.changePage.bind(this)}/> 
export default App;
