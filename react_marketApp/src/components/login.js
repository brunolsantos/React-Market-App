import React, { Component } from 'react';
import '../css/login.css';
import $ from 'jquery';
import config from '../config/config';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email_register: "",
            password_register: "",
            confirmation: "",
            name_register: "",
            email_login: "",
            password_login: ""
        };

        this.animateRegister = this.animateRegister.bind(this);

        this.verifyLogin = this.verifyLogin.bind(this);
        this.registerAccount = this.registerAccount.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);


    };

    animateRegister() {
        $('.register-form').animate({ height: "toggle", opacity: "toggle" }, "slow");
        $('.login-form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    };

    verifyLogin(event) {
        var user = {
            email_login: this.state.email_login,
            password_login: this.state.password_login
        }

        JSON.stringify(user);

        $.ajax({
            type: "POST",
            url: config.api_url + "/api/user/login",
            dataType: 'json',
            data: user,
            success: function (user) {
                console.log(user);
            }.bind(this)
        });
    };

    registerAccount(event) {
        var user = {
            email_register: this.state.email_register,
            password_register: this.state.password_register,
            confirmation: this.state.confirmation,
            name_register: this.state.name_register
        }
        $.ajax({
            type: "POST",
            url: config.api_url + "/api/user/add",
            dataType: 'json',
            data: user,
            success: function (data) {
                if(data.success){
                    console.log(data);
                    this.animateRegister();
                }else{
                    console.log(data);
                }
                
            }.bind(this)
        });
    };

    handleInputChange(event) {
        //console.log(event.target.value)
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        var email = this.state.email;
        var password = this.state.password;
        return (
            <div className="login-page">
                <div className="form">
                    <div className="register-form">
                        <input type="text" placeholder="name" onChange={this.handleInputChange} name="name_register" />
                        <input type="password" placeholder="password" onChange={this.handleInputChange} name="password_register" />
                        <input type="text" placeholder="email address" onChange={this.handleInputChange} name="email_register" />
                        <button type="submit" onClick={(e) => this.registerAccount()}>create</button>
                        <p className="message">Already registered? <a href="#" onClick={(e) => this.animateRegister()}>Sign In</a></p>
                    </div>
                    <div className="login-form">
                        <input type="email" placeholder="email" value={email} onChange={this.handleInputChange} name="email_login" />
                        <input type="password" placeholder="password" value={password} onChange={this.handleInputChange} name="password_login" />
                        <button onClick={(e) => this.verifyLogin()}>login</button>
                        <p className="message">Not registered? <a href="#" onClick={(e) => this.animateRegister()}>Create an account</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
