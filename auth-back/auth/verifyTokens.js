const jwt = require('jsonwebtoken');

function verifyAccessToken(token){
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRE);

}

function verifyRefreshToken(token){
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {verifyAccessToken, verifyRefreshToken};