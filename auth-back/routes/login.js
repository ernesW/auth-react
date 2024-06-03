const router = require('express').Router();
const { jsonResponse } = require('../lib/jsonResponse');
const User = require('../schema/user');
const getUserInfo = require('../lib/getUserInfo');

// Definimos la ruta POST para el inicio de sesión
router.post('/', async (req, res) => {
    // Extraemos el nombre de usuario y la contraseña del cuerpo de la petición
    const {username, password} = req.body;

    // Si no se proporcionó el nombre de usuario o la contraseña, devolvemos un error
    if(!!!username || !!!password) {
        return res.status(400).json(
            jsonResponse(400, {
                error: 'Fields are required'
            })
        );
    }

    // Buscamos al usuario en la base de datos
    const user =  await User.findOne({ username });

    // Si el usuario existe
    if(user){
        // Comprobamos si la contraseña proporcionada es correcta
        const correctPassword = await user.comparePassword(password, user.password);

        if(correctPassword) {
            //autenticar usuario
            const accessToken = user.createAccessToken();
            const refreshToken = await user.createRefreshToken();
            // Devolvemos la información del usuario y los tokens
            res.status(200).json(jsonResponse(200, { user: getUserInfo(user), accessToken, refreshToken }));
        }else {
            // Si la contraseña no es correcta, devolvemos un error
            return res.status(400).json(
                jsonResponse(400, {
                    error: 'User o password incorrect'
                })
            );
        }
    } else {
        // Si el usuario no existe, devolvemos un error
        return res.status(400).json(
            jsonResponse(400, {
                error: 'User not found'
            })
        );
    }

    
});

module.exports = router;