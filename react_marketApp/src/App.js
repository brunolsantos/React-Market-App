import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import config from './config/config';

class App extends Component {
  /* change port on node_modules/react-scripts/start */
  constructor(){
    super();
    this.state = {
      products: [],
      addedProduct: {
        name: "",
        price:0,
        quantity:0
      }
    };

    this.addToList = this.addToList.bind(this);
  }

  /*After render */
  componentDidMount(){
    $.ajax({
      url: config.api_url,
      dataType: 'json',
      success:function(data){
        console.log(data);
        this.setState({products:data.msg})
      }.bind(this)
    });
  }

  /*Before render */
  componentWillMount(){
   
  }

  addToList(event){
    event.preventDefault();
    alert($(event.currentTarget).attr('data-id'));
    console.log("data sent");
  }

  render() {
    return (
      <div className="container">
        <div className="row main-menu">
          <img src={require('./image/logo.png')} alt="" id="image-style"/>
          <div className="input-group" style={{float:'left'}}>
            <input type="text" className="form-control" placeholder="Search"/>
            <button className="btn btn-danger" type="submit">Buscar</button>
          </div>
          <div className="user-info" style={{float:'left'}}>
            <img src={require("./image/user1.png")} className="img-rounded" alt="" width="40" height="40" data-toggle="dropdown"/>
            <p>User Name</p>
          </div>
          <div className="user-info">
            <img className="img-rounded" width="40" height="40" src={require("./image/shopping-cart.png")} alt=""/>
            <p>Shop Cart</p>
          </div>
        </div>
      <div className="row product-block">
        {
          this.state.products.map(function(product){
            return (
              <form key={product._id}>
                <div className="product">
                  <img src={require("./image/logo.png")} alt=""/>
                  <h2>{product.name}</h2>
                  <h3>{product.price/1000000}</h3>
                  <button className="btn btn-info" defaultChecked={false} onClick={this.addToList}>adicionar ao carrinho</button>
                </div>
              </form>
            );
          }.bind(this))
        }

      </div>
    </div>
    );
  }
}

/**
 * <div className="product">
    <img src={require("./image/logo.png")} alt=""/>
    <h2>nome do produto</h2>
    <h3>R$30,00</h3>
    <button className="btn btn-info">adicionar ao carrinho</button>
  </div>
 */

export default App;
