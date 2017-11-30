import React, { Component } from 'react';
import $ from 'jquery';
import config from '../config/config';
import "../css/shop-cart.css";

class ShopCart extends Component {
    /* change port on node_modules/react-scripts/start */
    constructor() {
        super();
        this.state = {
            cart: [],
            paymentType:String,
            deliveryTime: String
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePaymentType = this.handlePaymentType.bind(this);
        this.handleDeliveryTime = this.handleDeliveryTime.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.finishShop = this.finishShop.bind(this);
        this.calculateProductQuantity = this.calculateProductQuantity.bind(this);
    }

    /*After render */
    componentDidMount() {
        let localStorageCart = localStorage.getItem("cart");
        localStorageCart = JSON.parse(localStorageCart);
        this.setState({ cart: localStorageCart.products });
    }

    /*Before render */
    componentWillMount() {

    }

    /* Handlers */
    handleDeliveryTime(e){
        this.setState({deliveryTime: e.target.name});
    }
    handleInputChange(e, cart) {
        cart.quantity = e.target.value;
    }
    handlePaymentType(e){
        this.setState({paymentType:e.target.name});
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
        this.calculateProductQuantity();
    }

    calculateProductQuantity() {
        let productList = localStorage.getItem("cart");
        productList = JSON.parse(productList);
        let quantity = 0;

        for (let i = 0; i < productList.products.length; i++) {
            quantity += productList.products[i].product.quantity;
        }
        this.props.setCartQty(quantity);
    }

    finishShop() {
        let shopList = localStorage.getItem("cart");
        shopList = JSON.parse(shopList);
        shopList["token"] = localStorage.getItem("token");
        console.log(shopList);
        this.props.history.push("/payment");
    }

    render() {
        let day = new Date();
        let hour = day.getHours();
        let minutes = day.getMinutes();
        let deliveryTime = hour.toString()+":"+minutes.toString();

        return (
            <div>
                <div className="product-container">
                    {
                        this.state.cart.map(function (cart) {
                            return (

                                <div key={cart.product._id} className="product-card">
                                    <img src={require("../image/logo.png")} alt="" />
                                    <p>Quantidade: {cart.product.quantity}</p>
                                    <h2>{cart.product.name}</h2>
                                    <h3>{cart.product.price / 1000000}</h3>
                                    <button className='button -standard rounded-button' onClick={(e) => this.removeFromCart(e, cart)}>
                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                </div>

                            );
                        }.bind(this))
                    }
                </div>
                <div className="shop-cart-page">
                    <div className="">
                        <h1>Total: R$250,30</h1>
                    </div>
                    <hr />
                    <div className="delivery-block">
                        <h2>Formas de pagamento</h2>

                        <input type="radio" checked={this.state.paymentType === 'credit_card'} onChange={this.handlePaymentType} name="credit_card" id="credit_card" />
                        <label htmlFor="credit_card">Cartão de Credito</label>
                        
                        <input type="radio"  checked={this.state.paymentType === 'debit_card'} onChange={this.handlePaymentType} name="debit_card" id="debit_card" />
                        <label htmlFor="debit_card">Cartão de Debito</label>

                        <input type="radio"  checked={this.state.paymentType === 'money'} onChange={this.handlePaymentType} name="money" id="money"/>
                        <label htmlFor="money">Dinheiro</label>
                    </div>

                    <div className="delivery-block">
                        <h2>Horario de Entrega</h2>
                        <input type="time" onChange={this.handleDeliveryTime} defaultValue={deliveryTime}/>
                        <h2>Data de entrega</h2>
                        <div className="date-picker open">
                            <div className="input">
                                <div className="result">
                                    <span></span>
                                </div>

                            </div>
                            <div className="calendar"></div>
                        </div>

                    </div>
                    <div className="finish-buying"><button className='button -green'>Finalizar Compra</button></div>
                </div>
            </div>
        );
    }
}

export default ShopCart;
