// Exportamos una función llamada 'jsonResponse'
exports.jsonResponse = function (statusCode, body) {
    // La función toma dos argumentos: 'statusCode' y 'body'
    // 'statusCode' es el código de estado HTTP que se devolverá
    // 'body' es el cuerpo de la respuesta que se devolverá
    // La función devuelve un objeto con 'statusCode' y 'body' como propiedades
    return {
        statusCode,
        body,
    };
};