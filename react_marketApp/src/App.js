import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom';
import Spinner from 'react-spinner';

import Login from './components/login';
import EditUser from './components/user_information';
import MainPage from './components/main_page';

class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: []
    };
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.getLoggedIn = this.getLoggedIn.bind(this);
  }

  setLoggedIn(logged, data) {
    this.setState({ user: data });
    this.setState({ isLoggedIn: logged });
    console.log("setLoggedIn: " + this.state.isLoggedIn);
    console.log("logged: " + this.state.isLoggedIn);
  }
  getLoggedIn() {
    return this.state.isLoggedIn;
  }



  render() {
    let user = this.state.user;
    console.log("render: " + this.state.isLoggedIn);
    //if (loggedUser === false) {
    return (

      <BrowserRouter>
        <Switch>
          <Route path="/login" render={() => (
            ((localStorage.getItem("user") !== null )) ?
              <Redirect to="/product" /> :
              <Login loggedIn={this.setLoggedIn.bind(this)} />
          )} />

          <Route path="/product" render={() => (
            ((localStorage.getItem("user") !== null )) ?
              <MainPage /> :
              <Redirect to="/login" />
          )} />

          <Route path="/" render={() => (
            ((localStorage.getItem("user") !== null )) ?
              <Redirect to="/product" /> :
              <Redirect to="/login" />
          )} />

        </Switch>
      </BrowserRouter>
    );
    //} 
    /*else{
      return (
        <BrowserRouter>
          <div className="container">
          <Route exact path="/product" render={props => <MainPage setLoggedIn={this.setLoggedIn.bind(this)} user={this.state.user} />} />
          </div>
        </BrowserRouter>
      );
    }*/

  }
}

export default App;
