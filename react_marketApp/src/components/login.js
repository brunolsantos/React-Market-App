import React, { Component } from 'react';
import '../css/login.css';
import $ from 'jquery';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            name:""
        };

        this.animateRegister = this.animateRegister.bind(this);

        this.verifyLogin = this.verifyLogin.bind(this);
        this.registerAccount = this.registerAccount.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);

        
    };

    animateRegister() {
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    };

    verifyLogin(event) {
        event.preventDefault();
        console.log("login: " + this.state.email);
        console.log("password: " + this.state.password);
    };

    registerAccount(event) {
        event.preventDefault();
        console.log("login: " + this.state.email);
        console.log("password: " + this.state.password);
        console.log("name: " + this.state.name);
    };

    handleInputChange(event){
        console.log(event.target.value)
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        var email = this.state.email;
        var password = this.state.password;
        return (
            <div className="login-page">
                <div className="form">
                    <form className="register-form">
                        <input type="text" placeholder="name" onChange={this.handleInputChange} name="name"/>
                        <input type="password" placeholder="password" onChange={this.handleInputChange} name="password"/>
                        <input type="text" placeholder="email address" onChange={this.handleInputChange} name="email"/>
                        <button type="submit" onClick={(e) => this.registerAccount()}>create</button>
                        <p className="message">Already registered? <a onClick={(e) => this.animateRegister()}>Sign In</a></p>
                    </form>
                    <form className="login-form">
                        <input type="email" placeholder="email" value={email} onChange={this.handleInputChange} name="email"/>
                        <input type="password" placeholder="password" value={password} onChange={this.handleInputChange} name="password"/>
                        <button onClick={(e) => this.verifyLogin()}>login</button>
                        <p className="message">Not registered? <a onClick={(e) => this.animateRegister()}>Create an account</a></p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
