// Definimos una función para obtener la información de un usuario
function getUserInfo(user) {
    // Devolvemos un objeto con la información del usuario
    // 'username' es el nombre de usuario
    // 'name' es el nombre real del usuario
    // 'id' es el id del usuario, que puede estar en 'id' o '_id'
    return {
        username: user.username,
        name: user.name,
        id: user.id || user._id,
    };
}

module.exports = getUserInfo;