const jwt = require("jsonwebtoken");

// Definimos una función para firmar un payload con un token
function sign(payload, isAccessToken) {
  // Usamos la función 'sign' de jsonwebtoken para firmar el payload
  // Si 'isAccessToken' es verdadero, usamos 'ACCESS_TOKEN_SECRET' como clave secreta
  // Si 'isAccessToken' es falso, usamos 'REFRESH_TOKEN_SECRET' como clave secreta
  // El token expira en 3600 segundos (1 hora)
  return jwt.sign(
    payload,
    isAccessToken
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET,
    {
      algorithm: "HS256",
      expiresIn: 3600,
    }
  );
}

// Definimos una función para generar un token de acceso
function generateAccessToken(user) {
  // Firmamos el objeto 'user' con un token de acceso
  return sign({ user }, true);
}

// Definimos una función para generar un token de refresco
function generateRefreshToken(user) {
  // Firmamos el objeto 'user' con un token de refresco
  return sign({ user }, false);
}

module.exports = { generateAccessToken, generateRefreshToken };
