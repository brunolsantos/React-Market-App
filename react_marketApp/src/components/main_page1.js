import React, { Component } from 'react';
import Product1 from './product1';
import MainMenu from './main_menu';
import '../App.css';

class MainPage1 extends Component {
    constructor() {
        super();
        this.logOut = this.logOut.bind(this);
    }

    logOut(){
        this.props.setLoggedIn(false);
    }

    render() {
        return (
            <div className="container">
                <MainMenu  />
                <Product1 />
            </div>
        );
    }
}

export default MainPage1;
