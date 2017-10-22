import React, { Component } from 'react';
import $ from 'jquery';
import config from '../config/config';
import { getUserId } from '../extras/extra';

class Product extends Component {
  /* change port on node_modules/react-scripts/start */
  constructor() {
    super();
    this.state = {
      products: [],
      productShopList: [],
    };
    this.addToList = this.addToList.bind(this);
  }

  /*After render */
  componentDidMount() {
    let localStorageToken = localStorage.getItem("token");
    if (localStorageToken !== null) {
      $.ajax({
        url: config.api_url + "/api/product/list",
        dataType: 'json',
        beforeSend: function (request) {
          request.setRequestHeader("token", localStorageToken);
        },
        success: function (data) {
          this.setState({ products: data.msg })
        }.bind(this)
      });
    }
    let cart = {
      token: localStorageToken,
      product: []
    }
    cart = JSON.stringify(cart);
    localStorage.setItem("cart",cart);
  }

  /*Before render */
  componentWillMount() {
    
  }

  addToList(event, data) {
    event.preventDefault();
    let productList = localStorage.getItem("cart");
    productList = JSON.parse(productList);
    let product = {
      product: data._id,
      quantity: 0
    }

    productList.product.push(product);
    productList = JSON.stringify(productList);
    localStorage.setItem("cart", productList);
    event.preventDefault();
  }

  render() {
    return (
      <div className="row product-block">
        {
          this.state.products.map(function (product) {
            return (
              <form key={product._id}>
                <div className="product">
                  <img src={require("../image/logo.png")} alt="" />
                  <h2>{product.name}</h2>
                  <h3>{product.price / 1000000}</h3>
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
