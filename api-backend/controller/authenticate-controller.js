var jwt = require('jsonwebtoken');
var config = require('../config/config');

var webToken = module.exports = {
    
    authenticateUser: function (id) {
        var token = jwt.sign({"id":id}, config.secret,{
            expiresIn: 3600
        });
        return token;
    }
}