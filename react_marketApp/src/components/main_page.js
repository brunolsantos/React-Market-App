import React, { Component } from 'react';
import PropTypes from "prop-types";
import $ from 'jquery';
import config from '../config/config';
import "../css/header.css";
import "../css/shop-cart.css";

/* PAGES */
import TopMenu from './top_menu';
import Product from './product';
import EditInfo from './edit_info';
import ShopCart from './shop_cart';

class MainPage extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor() {
        super();
        this.state = {
            user: [],
            productList:[],
            qty:0
        }
        this.logout = this.logout.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.setCartQty = this.setCartQty.bind(this);
    }

    logout() {
        localStorage.clear();
    }

    updateUser() {
        let token = localStorage.getItem("token");
        $.ajax({
            type: "POST",
            url: config.api_url + "/api/user/validate",
            dataType: 'json',
            beforeSend: function (request) {
                request.setRequestHeader("token", token);
            },
            success: function (data) {
                if (data.success === false) {
                    this.logout();
                } else {
                    this.setState({ user: data.user });
                }
            }.bind(this)
        });
    }

    componentWillMount() {
        this.updateUser();
    }

    setCartQty(cartQty){
        console.log('setcartquantity: '+cartQty);
        this.setState({qty:cartQty});
    }

    render() {
        let pathName = this.context.router.history.location.pathname;
        switch (pathName) {
            case '/product':
                return (
                    <div>
                        <TopMenu cartQty={this.state.qty} user={this.state.user} history={this.context.router.history}/>
                        <Product setCartQty={this.setCartQty}/>
                    </div>
                );
            case '/edit-info/user':
                return (
                    <div>
                        <TopMenu cartQty={this.state.qty} user={this.state.user} history={this.context.router.history}/>
                        <EditInfo updateUser={this.updateUser} history={this.context.router.history} />
                    </div>
                );
            case '/edit-info/delivery':
                return (
                    <div>
                        <TopMenu cartQty={this.state.qty} user={this.state.user} history={this.context.router.history}/>
                        <EditInfo user={this.state.user} history={this.context.router.history}/>
                    </div>
                );
            case '/shop-cart':
                return (
                    <div>
                        <TopMenu cartQty={this.state.qty} user={this.state.user} history={this.context.router.history}/>
                        <ShopCart setCartQty={this.setCartQty} history={this.context.router.history} />
                    </div>
                );
            default:
                return (
                    <div>
                        <TopMenu cartQty={this.state.qty} user={this.state.user} history={this.context.router.history}/>
                        <Product setCartQty={this.setCartQty}/>
                    </div>
                );

        }
    }
}

export default MainPage;
