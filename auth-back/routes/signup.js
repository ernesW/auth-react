const router = require('express').Router();
const { jsonResponse } = require('../lib/jsonResponse');
const User = require('../schema/user');

// Definimos la ruta POST para el registro de usuarios
router.post('/', async (req, res) => {
    // Extraemos el nombre de usuario, el nombre y la contraseña del cuerpo de la petición
    const {username, name, password} = req.body;

    // Si no se proporcionó el nombre de usuario, el nombre o la contraseña, devolvemos un error
    if(!!!username || !!!name || !!!password) {
        return res.status(400).json(
            jsonResponse(400, {
                error: 'Fields are required'
            })
        );
    }

    //crear el usuario
    // const user = new User({username, name, password});

    // Intentamos crear el usuario
    try {
        // Creamos un nuevo objeto de usuario
        const user = new User();
        // Comprobamos si el nombre de usuario ya existe
        const exists = await user.usernameExist(username);

        // Si el nombre de usuario ya existe, devolvemos un error
    if(exists) {
        return res.status(400).json(
            jsonResponse(400, {
                error: 'Username already exists'
            })
        );
    }

    // Si el nombre de usuario no existe, creamos un nuevo usuario
    const newUser = new User({username, name, password});

    // Guardamos el nuevo usuario en la base de datos
    await newUser.save();
    
    // Devolvemos un mensaje indicando que el usuario se creó con éxito
    res.status(200).json(jsonResponse(200, { message: 'User created successfully' }));

    // res.send('singout');
        
    } catch (error) {
        // Si ocurre un error durante la creación del usuario, devolvemos un error
        res.status(500).json(
            jsonResponse(500, {
                error: 'Error creating user'
            })
        );
        
    }

});

module.exports = router;