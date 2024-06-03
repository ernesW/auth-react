const moongoose = require('mongoose');

//Estructura de Todos para la base de datos

const TodoSchema = new moongoose.Schema({
    id: { type: Object},
    idUser : { type: String, required: true},
    title: { type: String, required: true},
    completed: { type: Boolean, required: true}
});

module.exports = moongoose.model('Todo', TodoSchema);
