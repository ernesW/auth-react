// Definimos una función para obtener un token de la cabecera de una petición HTTP
function getTokenFromHeader(headers) {
    // Verificamos si las cabeceras existen y si contienen una cabecera de autorización
    if (headers && headers.authorization) {
        // Dividimos la cabecera de autorización en un array utilizando el espacio como separador
        const parted = headers.authorization.split(' ');
        // Verificamos si el array tiene exactamente dos elementos (debería ser "Bearer" y el token)
        if (parted.length === 2) {
            // Si es así, devolvemos el segundo elemento del array (el token)
            return parted[1];
        } else {
            // Si no es así, devolvemos null
            return null;
        }
    } else {
        // Si las cabeceras no existen o no contienen una cabecera de autorización, devolvemos null
        return null;
    }
}

module.exports = getTokenFromHeader;