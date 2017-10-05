import React, { Component } from 'react';

class UserInformation extends Component {
    constructor() {
        super();
        this.state = {
            user: []
        };

    }

    componentWillMount() {
        var localStorageUser = localStorage.getItem("user");
        localStorageUser = JSON.parse(localStorageUser);

        if (localStorageUser !== null) {
            this.setState({ user: localStorageUser });
        }
    }

    render() {
        return (
            <div className="row" style={{ background: 'aqua' }}>
                <div className="col-lg-3" style="margin:30px;" style={{ margin: '30px' }}>
                    <img src={this.state.user.image} className="img-rounded" width="40" height="40" data-toggle="dropdown" style={{ float: 'left' }} />
                    <br />
                    <br />
                    <br />
                    <div className="form-group ">
                        <label>Nome</label>
                        <input type="text" className="form-control" id="nome" />
                    </div>
                    <div className="form-group">
                        <label>Nova Senha:</label>
                        <input type="password" className="form-control" id="pwd" />
                    </div>
                    <div className="form-group">
                        <label>Repita a Senha:</label>
                        <input type="password" className="form-control" id="pwd" />
                    </div>
                    <button type="submit" className="btn btn-default">Salvar</button>
                </div>
            </div>
        );
    }
}

export default UserInformation;
