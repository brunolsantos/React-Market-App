import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';
import PropTypes from "prop-types";
import Spinner from 'react-spinner';
import Login from './components/login';
import MainPage from './components/main_page';
import MainPage1 from './components/main_page1';

class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: []
    };
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.getLoggedIn = this.getLoggedIn.bind(this);
    this.validateSession = this.validateSession.bind(this);
  }
  
  setLoggedIn(logged, data) {
    this.setState({ user: data });
    this.setState({ isLoggedIn: logged });
  }
  getLoggedIn() {
    return this.state.isLoggedIn;
  }

  validateSession(){
    let validation = true;
    if((localStorage.getItem("user") === null )){
      validation = false;
      localStorage.clear();
    }
    if((localStorage.getItem("token") === null )){
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
              <Login loggedIn={this.setLoggedIn.bind(this)} />
          )} />

          <Route path="/product" render={() => (
            (this.validateSession() === true) ?
              <MainPage /> :
              <Redirect to="/login" />
          )} />

          <Route path="/product1" render={() => (
            (this.validateSession() === true) ?
              <MainPage1 /> :
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
//<MainPage changePage={this.changePage.bind(this)}/> 
export default App;
