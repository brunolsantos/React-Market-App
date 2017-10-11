const mongoose = require('mongoose');

var UserDeliveryInfoSchema = mongoose.Schema({
    date: { type: Date, default: Date.now },
    cep: String,
    city: String,
    neighborhood: String,
    state: String,
    street: String,
    complement: String,
    number: String,
    reference: String,
    telephone: String,
    user: String 
});

const UserDeliveryInfo = module.exports = mongoose.model('UserDeliveryInfo', UserDeliveryInfoSchema);

//Add new user delivery info
module.exports.addUserDeliveryInfo = function (newUserDeliveryInfo, callback) {
    newUserDeliveryInfo.save(callback);
}

//Edit User Delivery Info by user id
module.exports.editUserDeliveryInfo = function (idUser, newInfo, callback) {  
    UserDeliveryInfo.findOne({ user: idUser }, function (err, info) {
        if (err) {
            var err = { success: false, msg: 'Error getting user delivery info from database' };
            callback(err);
        } else {
            info.cep=newInfo.cep,
            info.city=newInfo.city,
            info.neighborhood=newInfo.neighborhood,
            info.state=newInfo.state,
            info.street=newInfo.street,
            info.complement=newInfo.complement,
            info.number=newInfo.number,
            info.reference=newInfo.reference,
            info.telephone=newInfo.telephone,
            info.save(callback);
        }
    });
}

//Get User Delivery Info by user id
module.exports.getUserDeliveryInfo = function (idUser, callback) {  
    UserDeliveryInfo.findOne({ user: idUser }, function (err, data) {
        if (err) {
            var err = { success: false, msg: 'Error getting user delivery info from database' };
            callback(err);
        } else {
            callback(err, data);
        }
    });
}

//Remove user's info
module.exports.removeUserDeliveryInfo = function (id, callback) {
    UserDeliveryInfo.find({user: id }).remove(callback);
}