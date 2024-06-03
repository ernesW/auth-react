const getTokenFromHeader = require('../auth/getTokenFromHeader');
const Token = require('../schema/token');
const { jsonResponse } = require('../lib/jsonResponse');
const { verifyRefreshToken } = require('../auth/verifyTokens');
const { generateAccessToken } = require('../auth/generateTokens');
const router = require('express').Router();

// Definimos la ruta POST para la renovación del token de acceso
router.post('/', async (req, res) => {

    // Obtenemos el token de refresco de la cabecera de la petición
    const refreshToken = getTokenFromHeader(req.headers);
    
    // Si el token de refresco existe
    if(refreshToken){
        try {
            // Buscamos el token de refresco en la base de datos
            const found = await Token.findOne({token: refreshToken});

            // Si el token de refresco no se encuentra en la base de datos, devolvemos un error
            if(!found){
                return res.status(401).send(jsonResponse(401, {error: "Unauthorized"}));
            }

            // Verificamos el token de refresco
            const payload = verifyRefreshToken(found.token);

            // Si el token de refresco es válido
            if(payload){
                // Generamos un nuevo token de acceso
                const accessToken = generateAccessToken(payload.user);

                // Devolvemos el nuevo token de acceso
                return res.status(200).send(jsonResponse(200, {accessToken}));
            } else {
                // Si el token de refresco no es válido, devolvemos un error
                return res.status(401).send(jsonResponse(401, {error: "Unauthorized"}));
            }

        } catch (error) {
            // Si ocurre un error durante la verificación del token de refresco, devolvemos un error
           return res.status(401).send(jsonResponse(401, {error: "Unauthorized"})); 
        }

    } else {
        // Si no se proporcionó un token de refresco, devolvemos un error
        return res.status(401).send(jsonResponse(401, {error: "Unauthorized"}));
    }
});

module.exports = router;