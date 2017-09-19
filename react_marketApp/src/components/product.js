import React, { Component } from 'react';
import $ from 'jquery';
import config from '../config/config';

class Product extends Component {
  /* change port on node_modules/react-scripts/start */
  constructor(){
    super();
    this.state = {
      products: []
    };

    this.addToList = this.addToList.bind(this);
  }

  /*After render */
  componentDidMount(){
    $.ajax({
      url: config.api_url+"/api/product/list",
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

  addToList(event, data){
    event.preventDefault();
    console.log(data);
    console.log("data sent");
  }

  render() {
    return (
      <div className="row product-block">
        {
          this.state.products.map(function(product){
            return (
              <form key={product._id}>
                <div className="product">
                  <img src={require("../image/logo.png")} alt=""/>
                  <h2>{product.name}</h2>
                  <h3>{product.price/1000000}</h3>
                  <button className="btn btn-info" defaultChecked={false} onClick={(e) => this.addToList(e, product)}>adicionar ao carrinho</button>
                </div>
              </form>
            );
          }.bind(this))
        }
      </div>
    );
  }
}

export default Product;
