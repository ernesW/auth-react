const moongoose = require('mongoose');

const TodoSchema = new moongoose.Schema({
    id: { type: Object},
    idUser : { type: String, required: true},
    title: { type: String, required: true},
    completed: { type: Boolean, required: true}
});

module.exports = moongoose.model('Todo', TodoSchema);
