import React, { Component } from 'react';
import PropTypes from "prop-types";
import EditUser from './user_information';
import MainMenu from './main_menu';
import '../App.css';
import config from '../config/config';
import $ from 'jquery';

class MainPage1 extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state={
            user:[]
        }
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
                <EditUser />
            </div>
        );
    }
}

export default MainPage1;
