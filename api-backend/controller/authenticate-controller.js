var jwt = require('jsonwebtoken');
var config = require('../config/config');

var webToken = module.exports = {
    
    authenticateUser: function (user) {
        var token = jwt.sign(user, config.secret,{
            expiresIn: 60000
        });
        return token;
    }
}