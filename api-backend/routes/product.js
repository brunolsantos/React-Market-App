const express = require('express');
var router = express.Router();

const Product = require('../models/product');

/* GET products data. */
router.get('/list', function (req, res, next) {
    Product.getProductList((err, products) => {
        if (err) {
            res.json({ success: false, msg: 'Error getting products list from database' });
        } else {
            res.json({ success: true, msg: products });
        }
    });
});

/* Add new product */
router.post('/add', function (req, res, next) {
    
    let newProduct = new Product({
        image: req.body.image,
        name: req.body.name,
        description: req.body.description,
        price:req.body.price
    });

    Product.addProduct(newProduct, (err, product) => {
        if (err) {
            res.json({ success: false, msg: "Failed to add new product" });
        } else {
            res.json({ success: true, msg: "Added new product", data: product });
        }
    });
});

/* Edit product */
router.post('/edit', function(req,res,next){
    var id = req.body.id;

    let product = new Product({
        image: req.body.image,
        name: req.body.name,
        description: req.body.description,
        price:req.body.price
    });

    Product.editProduct(id,product,(err, product) =>{
        if (err) {
            res.json({ success: false, msg: "Failed to edit product" });
        } else {
            res.json({ success: true, msg: "Product edited", data: product });
        }
    });
});

/* Remove Product */
router.post('/remove', function(req,res,next){
    var id = req.body.id;
    Product.removeProduct(id, (err)=>{
        if(err){
            res.json({ success: false, msg: 'Error deleting product from database' });
        } else{
            res.json({ success: true, msg: 'Product deleted from database' });
        }
    });
});

module.exports = router;
