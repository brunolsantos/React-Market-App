const mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
    date: { type: Date, default: Date.now },
    name: String,
    description: String,
    price: { type: Number, set: setPrice, get: getPrice }
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

// Getter
function getPrice(num) {
    return (num / 100).toFixed(2);
};

// Setter
function setPrice(num) {
    return num * 100;
};

//Get all products
module.exports.getProductList = function (callback) {
    Product.find(callback);
}

//Add new product
module.exports.addProduct = function (newProduct, callback) {
    newProduct.save(callback);
}

//Edit product
module.exports.editProduct = function (id, newProduct, callback) {
    Product.findOne({ _id: id }, function (err, product) {
        if (err) {
            res.json({ success: false, msg: 'Error getting product from database' });
        } else {
            product.name = newProduct.name;
            product.description = newProduct.description;
            product.price = newProduct.price;
            product.save(callback);
        }
    });
}

//Remove products
module.exports.removeProduct = function (id, callback) {
    Product.find({ _id: id }).remove(callback);
}

/*
    VALIDATION USING REGEX
    IMPLEMENT LATER

    https://stackoverflow.com/questions/13304129/how-should-i-store-a-price-in-mongoose

*/