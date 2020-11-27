const express = require('express');
const router = express.Router();
const Auth = require('../controller/auth');

router.post('/login', (req, res) => {
    Auth.login(req, res);
});

router.post('/signUp', (req, res) => {
    Auth.signUp(req, res);
});

module.exports = router;