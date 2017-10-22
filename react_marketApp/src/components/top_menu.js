import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";

class MainMenu extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor() {
        super();
        this.logOut = this.logOut.bind(this);
    }

    logOut(e) {
        localStorage.clear();
        this.props.history.push("/login");
    }

    render() {
        return (
            <div className="row main-menu">
                <a onClick={(e) => this.props.history.push('/product')}><img src={require('../image/logo.png')} alt="" id="image-style" /></a>
                <div className="input-group" style={{ float: 'left' }}>
                    <input type="text" className="form-control" placeholder="Search" />
                    <button className="btn btn-danger" type="submit">Buscar</button>
                </div>
                <div className="user-info" style={{ float: 'left' }}>
                    <img src={this.props.user.image} className="img-rounded" alt="" width="40" height="40" data-toggle="dropdown" />
                    <a onClick={(e) => this.props.history.push('/edit-user')}><p>{this.props.user.name}</p></a>
                </div>
                <div className="user-info">
                    <img className="img-rounded" width="40" height="40" src={require("../image/shopping-cart.png")} alt="" />
                    <p>Shop Cart</p>
                </div>
                <div>
                    <a href="#" onClick={(e) => this.logOut(e)}>sair</a>
                </div>
            </div>
        );
    }
}

export default MainMenu;
