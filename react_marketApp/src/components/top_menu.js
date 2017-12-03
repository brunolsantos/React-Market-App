import React, { Component } from 'react';
import PropTypes from "prop-types";

class MainMenu extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor() {
        super();
        this.state = {
            cart: [],
            cartQty: 0
        };
        this.logOut = this.logOut.bind(this);
    }

    /*After render */
    componentWillMount() {
        //Preparing cart
        if (localStorage.getItem("cart") === null) {
            let cart = {
                products: []
            }
            cart = JSON.stringify(cart);
            localStorage.setItem("cart", cart);
        }

        let localStorageCart = localStorage.getItem("cart");
        localStorageCart = JSON.parse(localStorageCart);
        this.setState({ cart: localStorageCart.products });
    }

    logOut(e) {
        localStorage.clear();
        this.props.history.push("/login");
    }

    handleOpenSHopCart() {

    }

    render() {
        //go to shop cart page  onClick={(e) => this.props.history.push('/shop-cart')}
        return (

            <div className="header">
                <div >
                    <a onClick={(e) => this.props.history.push('/product')}><img src={require('../image/logo.png')} alt="" /></a>
                </div>
                <div className="header-container">
                    <div className="header-components">
                        <div className="search-bar">
                            <input type="text" className="form-control" placeholder="Search" />
                            <button className='button -standard center' type="submit">Buscar</button>
                        </div>
                        <div className="user-info">
                            <a onClick={(e) => this.props.history.push('/edit-user')}>
                                <img src={this.props.user.image} alt="" data-toggle="dropdown" />
                                <span>{this.props.user.name}</span>
                                <i onClick={(e) => this.logOut(e)} className="fa fa-sign-out" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className="shop-cart">
                        
                            <a onClick={(e) => this.props.history.push('/shop-cart')}>
                                <i className="fa fa-shopping-cart ui-widget-content" aria-hidden="true"></i>
                                <div className="shop-qty">
                                    <p>{this.props.cartQty}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="icon-bar">
                        <a style={{ cursor: 'pointer' }} className="active">
                            <img src={require('../image/kitchen.png')} alt="" />
                            <p>Cozinha</p>
                        </a>
                        <a style={{ cursor: 'pointer' }}>
                            <img src={require('../image/cleaning.png')} alt="" />
                            <p>Limpeza</p>
                        </a>
                        <a style={{ cursor: 'pointer' }}>
                            <img src={require('../image/bathroom.png')} alt="" />
                            <p>Banho</p>
                        </a>
                    </div>
                    
                </div>
                
            </div>
        );
    }
}

export default MainMenu;
