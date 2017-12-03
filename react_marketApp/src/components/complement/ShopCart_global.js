module.exports = {
    getTotalShopCart: function () {
        let productList = localStorage.getItem("cart");
        productList = JSON.parse(productList);
        let quantity = 0;
    
        if (productList.product !== null) {
          for (let i = 0; i < productList.products.length; i++) {
            quantity += productList.products[i].product.quantity;
          }
          return quantity;
        }
    }
}