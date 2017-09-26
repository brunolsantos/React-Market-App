import React, { Component } from 'react';

class UserInformation extends Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div class="row" style="background-color:aqua;">
                <div class="col-lg-3" style="margin:30px;">
                    <img src="./icons/user1.png" class="img-rounded" width="40" height="40" data-toggle="dropdown" style="float:left" />
                    <br />
                    <br />
                    <br />
                    <div class="form-group ">
                        <label for="nome">Nome</label>
                        <input type="text" class="form-control" id="nome" />
                    </div>
                    <div class="form-group">
                        <label for="pwd">Nova Senha:</label>
                        <input type="password" class="form-control" id="pwd" />
                    </div>
                    <div class="form-group">
                        <label for="pwd">Repita a Senha:</label>
                        <input type="password" class="form-control" id="pwd" />
                    </div>
                    <button type="submit" class="btn btn-default">Salvar</button>
                </div>
            </div>
        );
    }
}

export default UserInformation;
