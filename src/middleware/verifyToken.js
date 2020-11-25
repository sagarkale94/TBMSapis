const jwt = require('jsonwebtoken');
const secret = require('../../config').secret;
const errCodeError = require('../../config').errCodeError;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).send({ errCode: errCodeError, errMessage: "No token provided", data: "" });

    jwt.verify(token, secret, function (err, decoded) {
        console.log(err);
        if (err)
            return res.status(401).send({ errCode: errCodeError, errMessage: "Failed to authorize user", data: "" });

        req.userId = decoded.userId;
        req.roleId = decoded.roleId;
        next();
    });
}

module.exports = verifyToken;