const { jsonResponse } = require("../lib/jsonResponse");
const getTokenFromHeader = require("./getTokenFromHeader");
const { verifyAccessToken } = require("./verifyTokens");

// Definimos una función de middleware para autenticar las peticiones
function authenticate(req, res, next) {
    // Obtenemos el token de la cabecera de la petición
    const token = getTokenFromHeader(req.headers);

    // Verificamos si el token existe
    if (token) {
        // Verificamos el token de acceso
        const decoded = verifyAccessToken(token);
        // Si el token es válido, añadimos la información del usuario a la petición y pasamos al siguiente middleware
        if(decoded){
            req.user = { ...decoded.user };
            next();
        }else {
            // Si el token no es válido, enviamos una respuesta con un error 401
            res.status(401).send(jsonResponse(401, {error: "No token provided"}));
        }

    }else {
        // Si no se proporcionó un token, enviamos una respuesta con un error 401
        res.status(401).send(jsonResponse(401, {error: "No token provided"}));
    }

}


module.exports = authenticate;