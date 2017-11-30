import React, { Component } from 'react';
import $ from 'jquery';
import config from '../config/config';
import "../css/product.css";

class Product extends Component {
  /* change port on node_modules/react-scripts/start */
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.addToList = this.addToList.bind(this);
    this.calculateProductQuantity = this.calculateProductQuantity.bind(this);
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

    //Preparing cart
    if (localStorage.getItem("cart") === null) {
      let cart = {
        //token: localStorageToken,
        products: []
      }
      cart = JSON.stringify(cart);
      localStorage.setItem("cart", cart);
    }
  }

  /*Before render */
  componentWillMount() {

  }

  addToList(event, data) {
    event.preventDefault();
    let productList = localStorage.getItem("cart");
    let equalId = {
      equal: false,
      position: -1
    };
    productList = JSON.parse(productList);


    for (let i = 0; i < productList.products.length; i++) {
      if (data._id === productList.products[i].product._id) {
        equalId.equal = true;
        equalId.position = i;
      }
    }

    if ((equalId.equal === true) && (equalId.position !== -1)) {
      productList.products[equalId.position].product.quantity += 1;
    } else {
      data["quantity"] = 1;
      data = {
        product: data
      }
      productList.products.push(data);
    }
    productList = JSON.stringify(productList);
    localStorage.setItem("cart", productList);
    this.calculateProductQuantity();
  }

  calculateProductQuantity() {
    let productList = localStorage.getItem("cart");
    productList = JSON.parse(productList);
    let quantity = 0;

    for (let i = 0; i < productList.products.length; i++) {
      quantity += productList.products[i].product.quantity;
    }
    this.props.setCartQty(quantity);
  }

  render() {
    return (
      <div className="product-container">
        {
          this.state.products.map(function (product) {
            return (
              <div key={product._id} className="product-card">
                <img src={require("../image/logo.png")} alt="" />
                <h2>{product.name}</h2>
                <h3>{product.price / 1000000}</h3>
                <button className='button -green rounded-button' onClick={(e) => this.addToList(e, product)}>
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
            );
          }.bind(this))
        }
      </div>
    );
  }
}

export default Product;
