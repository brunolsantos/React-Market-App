import React, { Component } from 'react';
import $ from 'jquery';
import config from '../config/config';

class TopShopCart extends Component {
    /* change port on node_modules/react-scripts/start */
    constructor() {
        super();
        this.state = {
            cart: []
        };
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    /*After render */
    componentDidMount() {
        this.setState({ cart: this.props.cartProducts });
        console.log(this.props.showCart);
    }

    /*Before render */
    componentWillMount() {

    }

    removeFromCart(e, cart) {
        e.preventDefault();
        let localStorageCart = localStorage.getItem("cart");
        localStorageCart = JSON.parse(localStorageCart);

        for (let i = 0; i < this.state.cart.length; i++) {
            if (this.state.cart[i].product._id === cart.product._id) {
                if (this.state.cart[i].product.quantity > 1) {
                    let productQty = this.state.cart[i].product;
                    cart.product.quantity -= 1;
                    this.setState({ productQty: cart });
                    localStorageCart.products = this.state.cart;
                } else {
                    localStorageCart.products.splice(i, 1);
                    this.setState({ cart: localStorageCart.products });
                }
            }
        }

        localStorageCart = JSON.stringify(localStorageCart);
        localStorage.setItem("cart", localStorageCart);
    }

    render() {
        if(this.props.showCart === false){
            return (
                <div>
                    {
                        this.state.cart.map(function (cart) {
                            return (
                                <li className="clearfix" key={cart.product._id}>
                                    <img className="item-img" src={require("../image/logo.png")} alt="item1" />
                                    <span className="item-name">{cart.product.name}</span>
                                    <span className="item-price">{cart.product.price / 1000000}</span>
                                    <span className="item-quantity">Quantity: {cart.product.quantity}</span>
                                    <a href="#">
                                        <span className="item-remove" onClick={(e) => this.removeFromCart(e, cart)}>X</span>
                                    </a>
                                </li>
                            );
                        }.bind(this))
                    }
                </div>
            );
        }else{
            return (
                <div> </div>
            );
        }
        
    }
}

export default TopShopCart;
