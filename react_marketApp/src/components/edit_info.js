import React, { Component } from 'react';
import '../css/user-information.css';
import EditUser from './edit_user';
import EditDelivery from './edit_delivery';

class EditInfo extends Component {
    constructor() {
        super();
        this.state = {
            page: 'user'
        };
    }

    render() {
        if (this.props.history.location.pathname === '/edit-info/user') {
            return (
                <div>
                    <div className="user-configuration-categories">
                        <div className="edit-user-info -category">
                            <div className="editInfoList">
                                <a onClick={(e) => this.props.history.push('/edit-info/user')}><h3>Informações do usuário</h3></a>
                                <a onClick={(e) => this.props.history.push('/edit-info/delivery')}><h3>Informações de entrega</h3></a>
                            </div>
                        </div>
                    </div>
                    <EditUser updateUser={this.props.updateUser} history={this.props.history} user={this.props.user}/>
                </div>
            );
        } else if (this.props.history.location.pathname === '/edit-info/delivery') { 
            return (
                <div>
                    <div className="user-configuration-categories">
                        <div className="edit-user-info -category">
                            <div>
                                <a onClick={(e) => this.props.history.push('/edit-info/user')}><h3>Informações do usuário</h3></a>
                                <a onClick={(e) => this.props.history.push('/edit-info/delivery')}><h3>Informações de entrega</h3></a>
                            </div>
                        </div>
                    </div>
                    <EditDelivery user={this.props.user} history={this.props.history}/>
                </div>
            );
        }
    }
}
export default EditInfo;