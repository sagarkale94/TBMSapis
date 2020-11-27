const Config = require('../../config');
const jwt = require('jsonwebtoken');
const Auth = require('../model/auth');

module.exports = {

    login: (req, res) => {
        Auth.find({
            email: req.body.email,
            password: req.body.password,
            isDeleted: 0
        }).then(authCredentials => {
            if (authCredentials.length == 0) {
                res.send({ errCode: Config.errCodeNoRecordFound, message: "Invalid credentials..!!" });
            } else if (authCredentials.length > 0) {
                const token = jwt.sign({ userId: authCredentials[0]._id, role: authCredentials[0].role }, Config.secret, {
                    expiresIn: Config.tokenExpiryTime
                });
                let loginResponse = {
                    token: 'bearer ' + token,
                    email: req.body.email,
                    role: authCredentials[0].role
                }
                res.send({ errCode: Config.errCodeSuccess, message: "Logged in successfully..!!", data: loginResponse });
            }
        }).catch(err => {
            res.send({ errCode: Config.errCodeError, message: Config.errMessage });
        });
    },

    signUp: (req, res) => {
        Auth.find({
            email: req.body.email,
            isDeleted: 0
        }).then(authCredentials => {
            if (authCredentials.length == 0) {
                let auth = new Auth({
                    email: req.body.email,
                    password: req.body.password,
                    role: 2
                });
                auth.save().then(result => {
                    if (result) {
                        res.send({ errCode: Config.errCodeSuccess, message: "Signup successfully..!! Kindly login to continue" });
                    } else {
                        res.send({ errCode: Config.errCodeError, message: Config.errMessage });
                    }
                }).catch(err => {
                    res.send({ errCode: Config.errCodeError, message: Config.errMessage });
                });
            } else if (authCredentials.length > 0) {
                res.send({ errCode: Config.errCodeError, message: "Email is already in use with system..!!" });
            }
        }).catch(err => {
            res.send({ errCode: Config.errCodeError, message: Config.errMessage });
        });
    }

}