const mongoose = require("mongoose");

// Estructura de Tokens para la base de datos

const TokenSchema = new mongoose.Schema({
    id: { type: Object },
    token: { type: String, required: true },
});

module.exports = mongoose.model("Token", TokenSchema);