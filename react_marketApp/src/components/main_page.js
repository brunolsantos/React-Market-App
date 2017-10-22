import React, { Component } from 'react';
import PropTypes from "prop-types";
import $ from 'jquery';
import '../App.css';
import config from '../config/config';

/* PAGES */
import TopMenu from './top_menu';
import Product from './product';
import EditUser from './edit_user';
import EditUserDeliveryInfo from './edit_delivery_info';
import ShopCart from './shop_cart';

class MainPage extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor() {
        super();
        this.state = {
            user: []
        }
        this.logout = this.logout.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    logout() {
        localStorage.clear();
        this.props.history.push("/login");
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

    render() {
        let pathName = this.context.router.history.location.pathname;
        let returnedPage;
        switch (pathName) {
            case '/product':
                return (
                    <div className="container">
                        <TopMenu user={this.state.user} history={this.context.router.history} />
                        <Product />
                    </div>
                );
            case '/edit-user':
                return (
                    <div className="container">
                        <TopMenu user={this.state.user} history={this.context.router.history} />
                        <EditUser updateUser={this.updateUser} history={this.context.router.history} />
                    </div>
                );
            case '/edit-user/delivery':
                return (
                    <div className="container">
                        <TopMenu user={this.state.user} history={this.context.router.history} />
                        <EditUserDeliveryInfo user={this.state.user} />
                    </div>
                );
            case '/shop-cart':
                return (
                    <div className="container">
                        <TopMenu user={this.state.user} history={this.context.router.history} />
                        <ShopCart />
                    </div>
                );
            default:
                return (
                    <div className="container">
                        <TopMenu user={this.state.user} history={this.context.router.history} />
                        <Product />
                    </div>
                );

        }
    }
}

export default MainPage;
