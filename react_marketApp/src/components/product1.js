import React, { Component } from 'react';
import $ from 'jquery';
import config from '../config/config';

class Product1 extends Component {
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
    let token = localStorage.getItem("token");
    if(token !== null){
      $.ajax({
        url: config.api_url+"/api/product/list",
        dataType: 'json',
        beforeSend: function(request) {
          request.setRequestHeader("token", token);
        },
        success:function(data){
          this.setState({products:data.msg})
        }.bind(this)
      });
    }    
  }

  /*Before render */
  componentWillMount(){
   
  }

  addToList(event, data){
    event.preventDefault();
  }

  render() {
    return (
      <div className="row product-block">
        <h1>Product1</h1>
      </div>
    );
  }
}

export default Product1;
