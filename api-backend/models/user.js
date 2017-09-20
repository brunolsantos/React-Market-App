const mongoose = require('mongoose');
const pass_hash = require('../controller/pass-hash-controller');

var UserSchema = mongoose.Schema({
    date: { type: Date, default: Date.now, select: false },
    image: String,
    name: String,
    surname: String,
    email: { type: String, unique: true },
    password: { type: String },
    salt: { type: String },
    admin: Boolean
});

const User = module.exports = mongoose.model('User', UserSchema);


//Add new user
module.exports.addUser = function (newUser, callback) {
    var password = newUser.password;
    var hash = pass_hash.saltHashPassword(password);
    newUser.password = hash.newPassword.toString();
    newUser.salt = hash.salt.toString();

    newUser.save(callback);
}

//Edit user
module.exports.editUser = function (id, newUser, callback) {
    User.findOne({ _id: id }, function (err, user) {
        if (err) {
            var err = { success: false, msg: 'Error getting user from database', error: err };
            callback(err);
        } else {
            user.name = newUser.name;
            user.image = newUser.image;
            user.surname = newUser.surname;
            user.save(callback);
        }
    }).select('-password -date -salt');
}

//User login
module.exports.login = function (email, password, callback) {
    User.findOne({ email: email }, function (err, user) {
        if (err) {
            //var err = { success: false, msg: 'Error getting user from database' };
            callback(err);
        } else if (user) {
            var hash = pass_hash.sha512(password, user.salt);

            if (hash.passwordHash == user.password) {
                let tempUser = user.toObject();
                delete tempUser.password;
                delete tempUser.salt;
                delete tempUser.date;

                callback(err, "You are logged in!", tempUser);
            } else {
                err = 'Wrong password';
                callback(err, err, hash);
            }
        } else {
            err={msg:"Wrong email or password!"};
            callback(err, "Wrong email or password!", hash);
        }
    });
}


//Edit user (test use only)
module.exports.removeUser = function (id, callback) {
    User.find({ _id: id }).remove(callback);
}


/* 
  web token tutorial
https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens 

*/