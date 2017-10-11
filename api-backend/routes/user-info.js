const express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var router = express.Router();
const UserInfo = require('../models/user-info');

/* Validation middleware*/
router.use(function (req, res, next) {
    var token = req.body.token || req.headers['token'];
    if (token) {
        jwt.verify(token, config.secret, function (err, decode) {
            if (err) {
                res.status(500).send('Invalid Token');
            } else {
                next();
            }
        });
    } else {
        res.json({ success: false, msg: 'Please send a token.' });
    }
});

/* Edit user's delivery information */
router.post('/edit', function (req, res, next) {
    var token = req.body.token || req.headers['token'];

    let userInfo = new UserInfo({
        cep: req.body.cep,
        city: req.body.city,
        neighborhood: req.body.neighborhood,
        state: req.body.state,
        street: req.body.street,
        complement: req.body.complement,
        number: req.body.number,
        reference: req.body.reference,
        telephone: req.body.telephone
    });

    if (token) {
        jwt.verify(token, config.secret, function (err, decode) {
            if (err) {
                res.status(500).send('Invalid Token');
            } else {
                UserInfo.editUserDeliveryInfo(decode.id, userInfo, (err, data) => {
                    if (err) {
                        res.json({ success: false, msg: "Failed to edit user's delivery information" });
                    } else {
                        res.json({ success: true, msg: "User's delivery information edited", data: data });
                    }
                });
            }
        });
    } else {
        res.json({ success: false, msg: 'Please send a token.' });
    }    
});

/* Get user's delivery information */
router.post('/', function (req, res, next) {
    var token = req.body.token || req.headers['token'];

    if (token) {
        jwt.verify(token, config.secret, function (err, decode) {
            if (err) {
                res.status(500).send('Invalid Token');
            } else {
                UserInfo.getUserDeliveryInfo(decode.id, (err, userInfo) => {
                    if (err) {
                        res.json({ success: false, msg: "Failed to get user's delivery information", err: err });
                    } else {
                        res.json({ success: true, msg: "Success getting user's delivery information!", data: userInfo });
                    }
                });
            }
        });
    } else {
        res.json({ success: false, msg: 'Please send a token.' });
    }
});

module.exports = router;
