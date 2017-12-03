import React, { Component } from 'react';
import $ from 'jquery';
import config from '../config/config';
import cep from 'cep-promise';

class EditDeliveryInfo extends Component {
    constructor() {
        super();
        this.state = {
            cep: "",
            city: "",
            neighborhood: "",
            state: "",
            street: "",
            complement: "",
            number: "",
            reference: "",
            telephone: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendEditedDeliveryInfo = this.sendEditedDeliveryInfo.bind(this);
        this.updateFieldsWithCepInfo = this.updateFieldsWithCepInfo.bind(this);
        this.updateFields = this.updateFields.bind(this);
    }

    componentWillMount() {
        this.updateFields();
    }

    updateFields() {
        let token = localStorage.getItem("token");

        $.ajax({
            type: "POST",
            url: config.api_url + "/api/user/delivery/",
            dataType: 'json',
            beforeSend: function (request) {
                request.setRequestHeader("token", token);
            },
            success: function (data) {
                if(data.success === true){
                    this.setState({
                        cep: data.data.cep,
                        city: data.data.city,
                        neighborhood: data.data.neighborhood,
                        state: data.data.state,
                        street: data.data.street,
                        complement: data.data.complement,
                        number: data.data.number,
                        reference: data.data.reference,
                        telephone: data.data.telephone
                    });
                } 
            }.bind(this)
        });
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    sendEditedDeliveryInfo() {
        let token = localStorage.getItem("token");
        var data = {
            "cep": this.state.cep,
            "city": this.state.city,
            "neighborhood": this.state.neighborhood,
            "state": this.state.state,
            "street": this.state.street,
            "complement": this.state.complement,
            "number": this.state.number,
            "reference": this.state.reference,
            "telephone": this.state.telephone
        };
        $.ajax({
            type: "POST",
            url: config.api_url + "/api/user/delivery/edit",
            dataType: 'json',
            beforeSend: function (request) {
                request.setRequestHeader("token", token);
            },
            data: data,
            success: function (data) {
                //add flash message here
                console.log(data);
            }.bind(this)
        });
    }

    updateFieldsWithCepInfo() {
        cep(this.state.cep).then(function (data) {
            this.setState({
                city: data.city,
                neighborhood: data.neighborhood,
                state: data.state,
                street: data.street
            });
        }.bind(this));
    }

    render() {
        return (
            <div className="row" style={{ background: 'aqua' }}>
                <div className="col-lg-3"  style={{ margin: '30px' }}>
                    <div className="form-group ">
                        <label>CEP</label>
                        <input type="text" value={this.state.cep} onChange={this.handleInputChange} className="form-control" id="cep" name="cep" />
                        <button type="submit" className="btn btn-default" defaultChecked={false} onClick={(e) => this.updateFieldsWithCepInfo()}>OK</button>
                    </div>
                    <div className="form-group ">
                        <label>Cidade</label>
                        <input type="text" value={this.state.city} onChange={this.handleInputChange} className="form-control" id="city" name="city" />
                    </div>
                    <div className="form-group ">
                        <label>Bairro</label>
                        <input type="text" value={this.state.neighborhood} onChange={this.handleInputChange} className="form-control" id="neighborhood" name="neighborhood" />
                    </div>
                    <div className="form-group ">
                        <label>Estado</label>
                        <input type="text" value={this.state.state} onChange={this.handleInputChange} className="form-control" id="state" name="state" />
                    </div>
                    <div className="form-group ">
                        <label>Rua</label>
                        <input type="text" value={this.state.street} onChange={this.handleInputChange} className="form-control" id="street" name="street" />
                    </div>
                    <div className="form-group ">
                        <label>Complemento</label>
                        <input type="text" value={this.state.complement} onChange={this.handleInputChange} className="form-control" id="complement" name="complement" />
                    </div>
                    <div className="form-group ">
                        <label>Numero da casa</label>
                        <input type="text" value={this.state.number} onChange={this.handleInputChange} className="form-control" id="house_number" name="number" />
                    </div>
                    <div className="form-group ">
                        <label>Referencia</label>
                        <input type="text" value={this.state.reference} onChange={this.handleInputChange} className="form-control" id="reference" name="reference" />
                    </div>
                    <div className="form-group ">
                        <label>Contato</label>
                        <input type="text" value={this.state.telephone} onChange={this.handleInputChange} className="form-control" id="telephone" name="telephone" />
                    </div>

                    <button type="submit" className="btn btn-default" defaultChecked={false} onClick={(e) => this.sendEditedDeliveryInfo()}>Salvar</button>
                </div>
            </div>
        );
    }
}

export default EditDeliveryInfo;
