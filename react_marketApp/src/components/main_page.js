import React, { Component } from 'react';
import Product from './product';
import MainMenu from './main_menu';
import '../App.css';

class MainPage extends Component {
    constructor() {
        super();
        this.logOut = this.logOut.bind(this);
    }

    logOut(){
        this.props.setLoggedIn(false);
    }

    render() {
        console.log(this.props.history);
        return (
            <div className="container">
                <MainMenu  />
                <Product />
            </div>
        );
    }
}

export default MainPage;
