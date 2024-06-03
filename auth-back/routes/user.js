const { jsonResponse } = require('../lib/jsonResponse');
const router = require('express').Router();

// Definimos la ruta GET para obtener la información del usuario actual
router.get('/', (req, res) => {
    // Devolvemos la información del usuario actual
    // 'req.user' contiene la información del usuario actual
    res.status(200).json(jsonResponse(200, req.user));
});

module.exports = router;