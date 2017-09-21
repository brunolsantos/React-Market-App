import React, { Component } from 'react';
import './App.css';
import Product from './components/product';
import MainMenu from './components/main_menu';
import Login from './components/login';

class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: []
    };
    this.loggedIn = this.loggedIn.bind(this);
  }

  loggedIn(logged, data){
    this.setState({user:data});
    this.setState({isLoggedIn:logged});
  }

  render() {
    let loggedUser=this.state.isLoggedIn;
    let user = this.state.user;
    if (loggedUser === false) {
      return (
          <Login loggedIn={this.loggedIn.bind(this)}/>
      );
    } else {
      return (
        <div className="container">
          <MainMenu loggedIn={this.loggedIn.bind(this)} user={this.state.user}/>
          <Product />
        </div>
      );
    }
  }
}

export default App;
