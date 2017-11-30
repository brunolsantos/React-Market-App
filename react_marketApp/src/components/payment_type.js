import React, { Component } from 'react';
import $ from 'jquery';
import config from '../config/config';

class PaymentType extends Component {
    constructor() {
        super();
        this.state = {
            paymentType:""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.showResult = this.showResult.bind(this);
    }

    componentWillMount() {
        
    }

    handleInputChange(event) {
        event.preventDefault();
        let payment = event.target.value;
        this.setState({ paymentType: payment });
        //console.log("payment type: "+this.state.paymentType);
    }

    showResult(event) {
        console.log("payment type: "+this.state.paymentType);
    }

    render() {
        const {paymentType} = this.state.paymentType;
        return (
            <div className="row product-block" onChange={this.handleInputChange}>
                <input type="radio" name="payment" value="credito" /> Crédito<br/>
                <input type="radio" name="payment" value="debito" /> Débito<br/>
                <input type="radio" name="payment" value="dinheiro" /> Dinheiro<br/>
                <button className="btn btn-success" defaultChecked={false}>Finalizar Compra</button>
                <button className="btn btn-danger" defaultChecked={false} onClick={this.showResult}>Finalizar Compra</button>
            </div>
        );
    }
}

export default PaymentType;
