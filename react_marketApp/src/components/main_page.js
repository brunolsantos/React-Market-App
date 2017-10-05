import React, { Component } from 'react';
import PropTypes from "prop-types";
import Product from './product';
import MainMenu from './main_menu';
import $ from 'jquery';
import '../App.css';
import config from '../config/config';

class MainPage extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            user: []
        }
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        this.props.setLoggedIn(false);
    }

    componentWillMount() {
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
        return (
            <div className="container">
                <MainMenu user={this.state.user} history={this.context.router.history} />
                <Product />
            </div>
        );
    }
}

export default MainPage;
