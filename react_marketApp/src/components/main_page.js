import React, { Component } from 'react';
import PropTypes from "prop-types";
import $ from 'jquery';
import '../App.css';
import config from '../config/config';

/* PAGES */
import MainMenu from './top_menu';
import Product from './product';
import EditUser from './edit_user';

class MainPage extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor() {
        super();
        this.state = {
            user: []
        }
        this.logOut = this.logOut.bind(this);
        this.requestUser = this.requestUser.bind(this);
    }

    logOut() {
        this.props.setLoggedIn(false);
    }

    componentWillMount() {
        this.requestUser();
    }

    requestUser(){
        let token = localStorage.getItem("token");
        $.ajax({
            type: "POST",
            url: config.api_url + "/api/user/validate",
            dataType: 'json',
            beforeSend: function (request) {
                request.setRequestHeader("token", token);
            },
            success: function (data) {
                this.setState({ user: data.user });
                //console.log(this.state.user);
            }.bind(this)
        });
    }

    render() {
        let pathName = this.context.router.history.location.pathname;
        let returnedPage;
        switch (pathName) {
            case '/product':
                return (
                    <div className="container">
                        <MainMenu user={this.state.user} history={this.context.router.history} />
                        <Product />
                    </div>
                );
            case '/edit-user':
                return (
                    <div className="container">
                        <MainMenu user={this.state.user} history={this.context.router.history} />
                        <EditUser user={this.state.user} />
                    </div>
                );
            default:
                return (
                    <div className="container">
                        <MainMenu user={this.state.user} history={this.context.router.history} />
                        <Product />
                    </div>
                );

        }
    }
}

export default MainPage;
