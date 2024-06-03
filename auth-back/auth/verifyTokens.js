const jwt = require('jsonwebtoken');

// Definimos una función para verificar un token de acceso
function verifyAccessToken(token){
    // Usamos la función 'verify' de jsonwebtoken para verificar el token
    // 'process.env.ACCESS_TOKEN_SECRET' es la clave secreta usada para verificar el token
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

// Definimos una función para verificar un token de refresco
function verifyRefreshToken(token){
    // Usamos la función 'verify' de jsonwebtoken para verificar el token
    // 'process.env.REFRESH_TOKEN_SECRET' es la clave secreta usada para verificar el token
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {verifyAccessToken, verifyRefreshToken};