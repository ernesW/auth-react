const getTokenFromHeader = require('../auth/getTokenFromHeader');
const { jsonResponse } = require('../lib/jsonResponse');
const Token = require('../schema/token');

const router = require('express').Router();

// Definimos la ruta DELETE para el cierre de sesión
router.delete('/', async (req, res) => {
    try {
        // Obtenemos el token de refresco de la cabecera de la petición
        const refreshToken = getTokenFromHeader(req.headers);

        // Si el token de refresco existe
        if (refreshToken){
            // Eliminamos el token de refresco de la base de datos
            await Token.findOneAndDelete({ token: refreshToken});
            // Devolvemos un mensaje indicando que el token ha sido eliminado
            res.status(200).json(jsonResponse(200, { message: "Token deleted" }));
        }
        
    } catch (error) {
        // Si ocurre un error, lo registramos y devolvemos un error de servidor interno
        console.log(error);
        res.status(500).json(jsonResponse(500, { error: "Internal server error" }));
    }
});

module.exports = router;