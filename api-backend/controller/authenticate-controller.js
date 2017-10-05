var jwt = require('jsonwebtoken');
var config = require('../config/config');

var webToken = module.exports = {
    
    authenticateUser: function (user) {
        var token = jwt.sign(user, config.secret,{
            expiresIn: 3600
        });
        return token;
    }
}