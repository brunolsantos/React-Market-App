import React, { Component } from 'react';
import $ from 'jquery'
import '../css/shop-cart.css';
import Helper from './complement/ShopCart_global';

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once


class ShopCart extends Component {
    /* change port on node_modules/react-scripts/start */
    constructor() {
        super();
        this.state = {
            cart: [],
            paymentType: String,
            deliveryDateTime: new Date(),
            deliveryTime: String,
            deliveryDate: String
        };
        this.handlePaymentType = this.handlePaymentType.bind(this);
        this.handleDeliveryTime = this.handleDeliveryTime.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.finishShop = this.finishShop.bind(this);
        this.calculateShopCartQty = this.calculateShopCartQty.bind(this);
        this.checkDateTime = this.checkDateTime.bind(this);
    }

    /*After render */
    componentDidMount() {
        let localStorageCart = localStorage.getItem("cart");
        localStorageCart = JSON.parse(localStorageCart);
        this.setState({ cart: localStorageCart.products });
        this.calculateShopCartQty();
    }

    /*Before render */
    componentWillMount() {
        let today = new Date();
        let hour = today.getHours();
        let minutes = ('0'+today.getMinutes()).slice(-2);
        let deliveryTime = hour.toString() + ":" + minutes.toString();

        let deliveryDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let deliveryDateTime = new Date(deliveryDate + ' ' +  deliveryTime+":00");
        this.setState({
            deliveryTime: deliveryTime,
            deliveryDate: deliveryDate,
            deliveryDateTime: deliveryDateTime
        });
        console.log('current Date: '+this.state.deliveryDateTime);
    }



    /* Handlers */
    handleDeliveryTime(e) {
        let deliveryDate = this.state.deliveryDate;
        let fullDeliveryDateTime = new Date(deliveryDate + ' ' + e.target.value+":00");

        this.setState({ 
            deliveryDate: deliveryDate,
            deliveryDateTime: fullDeliveryDateTime,
            deliveryTime: e.target.value
        });
    }
    
    handlePaymentType(e) {
        this.setState({ paymentType: e.target.name });
    }

    removeFromCart(e, cart) {
        e.preventDefault();
        let localStorageCart = localStorage.getItem("cart");
        localStorageCart = JSON.parse(localStorageCart);

        for (let i = 0; i < this.state.cart.length; i++) {
            if (this.state.cart[i].product._id === cart.product._id) {
                if (this.state.cart[i].product.quantity > 1) {
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
        this.calculateShopCartQty();
    }

    calculateShopCartQty() {
        this.props.setCartQty(Helper.getTotalShopCart());
    }

    finishShop() {
        //DO IT LATER
        /*let shopList = localStorage.getItem("cart");
        shopList = JSON.parse(shopList);
        shopList["token"] = localStorage.getItem("token");
        console.log(shopList);
        this.props.history.push("/payment");*/
    }
    checkDateTime(){
        console.log('Updated date time11: '+ this.state.deliveryDateTime);
    }

    render() {
        let today = new Date();
        let threeDaysGrace = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);
        let minMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());

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

                        <input type="radio" checked={this.state.paymentType === 'debit_card'} onChange={this.handlePaymentType} name="debit_card" id="debit_card" />
                        <label htmlFor="debit_card">Cartão de Debito</label>

                        <input type="radio" checked={this.state.paymentType === 'money'} onChange={this.handlePaymentType} name="money" id="money" />
                        <label htmlFor="money">Dinheiro</label>
                    </div>

                    <div className="delivery-block">
                        <h2>Horario de Entrega</h2>
                        <input type="time" onChange={this.handleDeliveryTime} defaultValue={this.state.deliveryTime}/>
                        <h2>Data de entrega</h2>
                        <InfiniteCalendar
                            width={300}
                            height={200}
                            selected={this.state.deliveryDate}
                            minDate={today}
                            maxDate={threeDaysGrace}
                            min={minMonth}
                            max={minMonth}
                            locale={{
                                locale: require('date-fns/locale/pt'),
                                blank: 'Selecione um dia...',
                                headerFormat: 'ddd, D MMM ',
                                todayLabel: {
                                  long: 'Hoje',
                                },
                                weekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                                weekStartsOn: 1,
                            }}
                            theme={{
                                selectionColor: 'rgb(84,89,155)',
                                textColor: {
                                  default: '#333',
                                  active: '#FFF'
                                },
                                weekdayColor: 'rgba(84,89,155, 0.87)',
                                headerColor: 'rgb(84,89,155)',
                                floatingNav: {
                                  background: 'rgb(84,89,155)',
                                  color: '#FFF',
                                  chevron: '#FFA726'
                                }
                            }}
                            onSelect={
                                (v) => {
                                    let delivery = v.getFullYear()+'-'+(v.getMonth()+1)+'-'+v.getDate();
                                    let fullDeliveryDateTime = new Date(delivery + ' ' + this.state.deliveryTime+":00");

                                    this.setState({ 
                                        deliveryDate: delivery,
                                        deliveryDateTime: fullDeliveryDateTime 
                                    });
                                    console.log('Updated date time: '+ this.state.deliveryDateTime);
                                    console.log('fullDeliveryDateTime: '+ fullDeliveryDateTime);
                                }
                            }
                        />
                        
                    </div>
                    <div className="finish-buying" onClick={(e) => this.checkDateTime()}><button className='button -green'>Finalizar Compra</button></div>
                </div>
            </div>
        );
    }
}

export default ShopCart;
