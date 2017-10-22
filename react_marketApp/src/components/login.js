import React, { Component } from 'react';
import '../css/login.css';
import $ from 'jquery';
import config from '../config/config';
import PropTypes from "prop-types";

class Login extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor() {
        super();
        this.state = {
            email_register: "",
            password_register: "",
            name_register: "",
            email_login: "",
            password_login: ""
        };
        this.animateRegister = this.animateRegister.bind(this);
        this.verifyLogin = this.verifyLogin.bind(this);
        this.registerAccount = this.registerAccount.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    };

    animateRegister(e) {
        //e.preventDefault();
        $('.register-form').animate({ height: "toggle", opacity: "toggle" }, "slow");
        $('.login-form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    };

    verifyLogin(event) {
        var user = {
            email_login: this.state.email_login,
            password_login: this.state.password_login
        }
        if ((user.email_login === "") || (user.password_login === "")) {
            console.log("Empty field(s) detected");
        } else {
            $.ajax({
                type: "POST",
                url: config.api_url + "/api/user/login",
                dataType: 'json',
                data: user,
                success: function (data) {
                    if(data.success === false){
                        console.log(data.msg);
                    }else{
                        localStorage.setItem("token", data.token);
                        this.context.router.history.push("/");
                    }                    
                }.bind(this)
            });
        }
    };

    registerAccount(event) {
        var user = {
            email_register: this.state.email_register,
            password_register: this.state.password_register,
            name_register: this.state.name_register
        }

        if ((user.email_register === "") || (user.password_register === "") || (user.name_register === "")) {
            console.log("Empty field(s) detected");
        } else {
            $.ajax({
                type: "POST",
                url: config.api_url + "/api/user/add",
                dataType: 'json',
                data: user,
                success: function (data) {
                    if (data.success) {
                        this.setState({
                            email_register: "",
                            password_register: "",
                            name_register: ""
                        }, function () {
                            this.animateRegister();
                            console.log(data.msg);
                        }.bind(this));
                    } else {
                        console.log(data);
                    }
                }.bind(this)
            });
        }
    };

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        var email_login = this.state.email_login;
        var password_login = this.state.password_login;
        var name_register = this.state.name_register;
        var email_register = this.state.email_register;
        var password_register = this.state.password_register;
        return (
            <div className="login-page">
                <div className="form">
                    <div className="register-form">
                        <input type="text" placeholder="name" value={name_register} onChange={this.handleInputChange} name="name_register" />
                        <input type="password" placeholder="password" value={password_register} onChange={this.handleInputChange} name="password_register" />
                        <input type="text" placeholder="email address" value={email_register} onChange={this.handleInputChange} name="email_register" />
                        <button type="submit" onClick={(e) => this.registerAccount()}>create</button>
                        <p className="message">Already registered? <a onClick={(e) => this.animateRegister(e)}>Sign In</a></p>
                    </div>
                    <div className="login-form">
                        <input type="email" placeholder="email" value={email_login} onChange={this.handleInputChange} name="email_login" />
                        <input type="password" placeholder="password" value={password_login} onChange={this.handleInputChange} name="password_login" />
                        <button onClick={(e) => this.verifyLogin()}>login</button>
                        <p className="message">Not registered? <a  onClick={(e) => this.animateRegister(e)}>Create an account</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
