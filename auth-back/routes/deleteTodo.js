const express = require('express');
const router = express.Router();
const Todo = require('../schema/todo');

router.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'No se encontró la tarea.' });
        }

        await todo.remove();

        res.json({ message: 'Tarea eliminada con éxito.' });
    } catch (err) {
        res.status(500).json({ message: 'Hubo un error al eliminar la tarea.' });
    }
});

module.exports = router;