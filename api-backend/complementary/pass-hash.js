'use strict';
var crypto = require('crypto');

var Hash = module.exports = {
    /**
     * Tutorial for this code
     * https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/
     */



    /**
     * generates random string of characters i.e salt
     * @function
     * @param {number} length - Length of the random string.
     */
    genRandomString: function (length) {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0, length);   /** return required number of characters */
    },

    /**
     * hash password with sha512.
     * @function
     * @param {string} password - List of required fields.
     * @param {string} salt - Data to be validated.
     */
    sha512: function (password, salt) {
        var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest('hex');
        return {
            salt: salt,
            passwordHash: value
        }
    },


    /**
     * hash user's password.
     * @function
     * @param {string} userpassword - List of required fields.
     */
    saltHashPassword: function (userpassword) {
        var salt = Hash.genRandomString(16); /** Gives us salt of length 16 */
        var passwordData = Hash.sha512(userpassword, salt);
        return {
            salt: passwordData.salt,
            newPassword: passwordData.passwordHash
        }
        //console.log('UserPassword = '+userpassword);
        //console.log('Passwordhash = '+passwordData.passwordHash);
        //console.log('nSalt = '+passwordData.salt);
    }
}