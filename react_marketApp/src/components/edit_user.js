import React, { Component } from 'react';

class UserInformation extends Component {
    constructor() {
        super();
        this.state = {
            user_name: "",
            user_password: "",
            user_confirmation: "",
            user_image: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.user1 !== null){
            this.state.user_name = nextProps.user.name;
            this.state.user_image = nextProps.user.image;
            console.log("name from state: " + this.state.user_name);
        }
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        //console.log(this.props.user);
        return (
            <div className="row" style={{ background: 'aqua' }}>
                <div className="col-lg-3" style="margin:30px;" style={{ margin: '30px' }}>
                    <img src={this.props.user.image} className="img-rounded" width="40" height="40" data-toggle="dropdown" style={{ float: 'left' }} />
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
                    <div className="form-group">
                        <label>Nova Senha:</label>
                        <input type="password" className="form-control" id="pwd" name="password" />
                    </div>
                    <div className="form-group">
                        <label>Repita a Senha:</label>
                        <input type="password" className="form-control" id="pwd" name="confirmation" />
                    </div>
                    <button type="submit" className="btn btn-default">Salvar</button>
                </div>
            </div>
        );
    }
}

export default UserInformation;
