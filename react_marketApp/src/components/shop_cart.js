import React, { Component } from 'react';
import $ from 'jquery';
import config from '../config/config';

class ShopCart extends Component {
    /* change port on node_modules/react-scripts/start */
    constructor() {
        super();
        this.state = {
            cart: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    /*After render */
    componentDidMount() {
        let localStorageCart = localStorage.getItem("cart");
        localStorageCart = JSON.parse(localStorageCart);
        this.setState({cart:localStorageCart.product});
    }

    /*Before render */
    componentWillMount() {
        
    }

    handleInputChange(e, cart) {
        cart.quantity = e.target.value;
    }

    removeFromCart(e, cart){
        e.preventDefault();
        for(let i = 0; i < this.state.cart.length;i++){
            if(this.state.cart[i].product._id === cart.product._id){
                console.log("position: "+i);
                let localStorageCart = localStorage.getItem("cart");
                localStorageCart = JSON.parse(localStorageCart);
                localStorageCart.product.splice(i, 1);
                this.setState({cart:localStorageCart.product});
                localStorageCart = JSON.stringify(localStorageCart);
                localStorage.setItem("cart", localStorageCart);
            }
        }
    }

    render() {
        return (
            <div className="row product-block">
                {
                    this.state.cart.map(function (cart) {
                        return (
                            <form key={cart.product._id}>
                                <div className="product">
                                    <img src={require("../image/logo.png")} alt="" />
                                    <h2>{cart.product.name}</h2>
                                    <h3>{cart.product.price / 1000000}</h3>
                                    <input type="number" name="quantity" value={cart.product.quantity} onChange={(e) => this.handleInputChange(e, cart)}/>
                                    <br/>
                                    <button className="btn btn-danger" defaultChecked={false} onClick={(e) => this.removeFromCart(e, cart)}>adicionar ao carrinho</button>
                                </div>
                            </form>
                        );
                    }.bind(this))
                }
            </div>
        );
    }
}

export default ShopCart;
