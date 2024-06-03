const router = require("express").Router();
const Todo = require("../schema/todo");

// Definimos la ruta GET para obtener todos los 'todos' de un usuario
router.get("/", async (req, res) => {
        try {
                // Buscamos todos los 'todos' que pertenecen al usuario actual
                const todos = await Todo.find({idUser: req.user.id});
                // Si encontramos 'todos', los devolvemos
                if(todos){
                        res.json(todos);
                }else{
                        // Si no encontramos 'todos', devolvemos un error
                        res.status(404).json({ error: "No todos found" });
                }
        } catch (error) {
                // Si ocurre un error, lo registramos
                console.log(error);
        }
});

// Definimos la ruta POST para crear un nuevo 'todo'
router.post("/", async (req, res) => {
        // Verificamos que se proporcionó un título
        if(!req.body.title){
                res.status(400).send("Title is required");
        }

        try {
                // Creamos un nuevo 'todo'
                const todo = new Todo({
                        title: req.body.title,
                        completed: false,
                        idUser: req.user.id,
                });

                // Guardamos el nuevo 'todo' en la base de datos
                const newTodo = await todo.save();
                // Guardamos el nuevo 'todo' en la base de datos
                res.json(newTodo);
        } catch (error) {
                // Guardamos el nuevo 'todo' en la base de datos
                console.log(error);
        }
});

// Definimos la ruta DELETE para eliminar un 'todo'
router.delete('/:id', async (req, res) => {
    console.log('DELETE route activated');
    try {
        // Eliminamos el 'todo' con el id proporcionado
        const result = await Todo.findByIdAndDelete(req.params.id);
        console.log('Result:', result);

        // Si el 'todo' se eliminó con éxito, devolvemos un mensaje de éxito
        if (result) {
            res.status(200).send({ message: 'Todo deleted successfully' });
        } else {
                // Si el 'todo' no se encontró, devolvemos un error
            res.status(404).send({ message: 'Todo not found' });
        }
    } catch (error) {
        // Si ocurre un error, lo registramos y devolvemos un error de servidor interno
        console.log('Error:', error);
        res.status(500).send({ message: 'An error occurred while deleting the todo' });
    }
});

module.exports = router;