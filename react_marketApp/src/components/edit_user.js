import React, { Component } from 'react';
import $ from 'jquery';
import config from '../config/config';
import '../css/user-information.css';

class UserInformation extends Component {
    constructor() {
        super();
        this.state = {
            user_name: "",
            user_surname: "",
            user_password: "",
            user_confirmation: "",
            user_image: "",
            user_id: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendUserUpdate = this.sendUserUpdate.bind(this);
        this.logout = this.logout.bind(this);
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
                if (data.success === false) {
                    this.logout();
                } else {
                    this.setState({
                        user_surname: data.user.surname,
                        user_name: data.user.name,
                        user_image: data.user.image,
                        user_id: data.user._id
                    });
                }
            }.bind(this)
        });
    }

    logout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    sendUserUpdate() {
        var data = {
            "image": this.state.user_image,
            "name": this.state.user_name,
            "surname": this.state.user_surname,
            "id": this.state.user_id
        };
        $.ajax({
            type: "POST",
            url: config.api_url + "/api/user/edit",
            dataType: 'json',
            data: data,
            success: function (data) {
                this.props.updateUser();
                console.log(data);
            }.bind(this)
        });
    }

    render() {

        return(
            <div>
                <div className="user-configuration-categories -user">
                    <div className="edit-user-info outer">
                        <div className="inner">
                            <h1>Informações do usuário</h1>
                            <a>
                                <img src={this.state.user_image} alt="" data-toggle="dropdown" name="user_image"/>
                            </a>
                            <div className="button-edit-image">
                                <input type="text" value={this.state.user_image} onChange={this.handleInputChange} className="form-control" name="user_image" />
                                <button className="button -blue">Editar</button>
                            </div>
                            <div className="edit-name-surname">
                                <input type="text" value={this.state.user_name} onChange={this.handleInputChange} name="user_name"/>
                                <input type="text" value={this.state.user_surname} onChange={this.handleInputChange} name="user_surname"/>
                            </div>
            
                            <div className="edit-password">
                                <input type="password" placeholder="Senha" name="password"/>
                                <input type="password" placeholder="Confirmação" id="name" name="confirmation"/>
                            </div>
                            <button className="button -green save-button" defaultChecked={false} onClick={(e) => this.sendUserUpdate()}>Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
        /*
            return (
                <div className="row" style={{ background: 'aqua' }}>
                    <div className="col-lg-3" style={{ margin: '30px' }}>
                        <img src={this.state.user_image} alt="" className="img-rounded" width="40" height="40" data-toggle="dropdown" style={{ float: 'left' }} />
                        <div className="form-group ">
                            <input type="text" value={this.state.user_image} onChange={this.handleInputChange} className="form-control" id="image" name="user_image" />
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="form-group ">
                            <label>Nome</label>
                            <input type="text" value={this.state.user_name} onChange={this.handleInputChange} className="form-control" id="nome" name="user_name" />
                        </div>
                        <div className="form-group ">
                            <label>Sobrenome</label>
                            <input type="text" value={this.state.user_surname} onChange={this.handleInputChange} className="form-control" id="nome" name="user_surname" />
                        </div>
                        <div className="form-group">
                            <label>Nova Senha:</label>
                            <input type="password" className="form-control" id="pwd" name="password" />
                        </div>
                        <div className="form-group">
                            <label>Repita a Senha:</label>
                            <input type="password" className="form-control" id="pwd" name="confirmation" />
                        </div>
                        <button type="submit" className="btn btn-default" defaultChecked={false} onClick={(e) => this.sendUserUpdate()}>Salvar</button>
                    </div>
                </div>
            );
        */
    }
}

export default UserInformation;
