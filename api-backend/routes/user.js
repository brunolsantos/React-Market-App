const express = require('express');
var authController = require('../controller/authenticate-controller');
var router = express.Router();

const User = require('../models/user');

/* Add new user */
router.post('/add', function (req, res, next) {
    let newUser = new User({
        name: req.body.name_register,
        surname: "",
        image: "https://image.freepik.com/free-icon/male-user-shadow_318-34042.jpg",
        email: req.body.email_register,
        password: req.body.password_register,
        salt: "change salt",
        admin: false
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            if (err.code == 11000) {
                res.json({ success: false, msg: "Email already exists", error: err });
            } else {
                res.json({ success: false, msg: "Failed to add new user", error: err });
            }

        } else {
            res.json({ success: true, msg: "Added new user" });
        }
    });
});

/* Edit user */
router.post('/edit', function (req, res, next) {
    var id = req.body.id;

    //add later special field for password change
    //this will edit only selected information about the user

    let user = new User({
        image: req.body.image,
        name: req.body.name,
        surname: req.body.surname,
    });

    User.editUser(id, user, (err, newUser) => {
        if (err) {
            res.json({ success: false, msg: "Failed to edit user", error: err });
        } else {

            /*
                        "data": {
                            "_id": "59b03c0b23c7f42410af4d71",
                            "name": "Teste",
                            "surname": "Teste da Silva",
                            "image": "www.image1.com.br",
                            "email": "teste@teste.com",
                            "password": "b66daaa286d4e128d600ea8f6e158160efa17b51cc97befc66e20165782235f796c42f8126994e0474e707a970a4123fd77a0a9b2d7ec0c398e476290ad15900",
                            "salt": "236b2942e5a78714",
                            "admin": false,
                            "__v": 0,
                            "date": "2017-09-06T18:18:51.590Z"
                        }
            */
            res.json({ success: true, msg: "User edited", data: newUser });
        }
    });
});

/* Remove user */
router.post('/remove', function (req, res, next) {
    var id = req.body.id;
    User.removeUser(id, (err) => {
        if (err) {
            res.json({ success: false, msg: 'Error deleting user from database' });
        } else {
            res.json({ success: true, msg: 'User deleted from database' });
        }
    });
});

router.post('/login', function (req, res, next) {
    var email = req.body.email_login;
    var password = req.body.password_login;

    User.login(email, password, (err, msg, data) => {
        if (err) {
            res.json({ success: false, msg: err.msg, data: data });
        } else if (data) {
            var token = authController.authenticateUser(data);
            res.json({ success: true, msg: msg, data: data, token: token });
        }
    });
});

module.exports = router;
