import React, { Component } from 'react';

class MainMenu extends Component {
    constructor(){
        super();
        this.logOut = this.logOut.bind(this);
    }

    logOut(e){
        e.preventDefault();
        this.props.logOutUser();
    }

    render() {
        console.log(this.props);
        return (
            <div className="row main-menu">
                <img src={require('../image/logo.png')} alt="" id="image-style" />
                <div className="input-group" style={{ float: 'left' }}>
                    <input type="text" className="form-control" placeholder="Search" />
                    <button className="btn btn-danger" type="submit">Buscar</button>
                </div>
                <div className="user-info" style={{ float: 'left' }}>
                    <img src={this.props.user.image} className="img-rounded" alt="" width="40" height="40" data-toggle="dropdown" />
                    <p>{this.props.user.name}</p>
                </div>
                <div className="user-info">
                    <img className="img-rounded" width="40" height="40" src={require("../image/shopping-cart.png")} alt="" />
                    <p>Shop Cart</p>
                </div>
                <div>
                    <a href="#"  onClick={(e) => this.logOut(e)}>sair</a>
                </div>
            </div>
        );
    }
}

export default MainMenu;
