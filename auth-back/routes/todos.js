const router = require("express").Router();
const Todo = require("../schema/todo");

router.get("/", async (req, res) => {
        try {
                const todos = await Todo.find({idUser: req.user.id});
                if(todos){
                        res.json(todos);
                }else{
                        res.status(404).json({ error: "No todos found" });
                }
        } catch (error) {
                console.log(error);
        }
});

router.post("/", async (req, res) => {
        if(!req.body.title){
                res.status(400).send("Title is required");
        }

        try {
                const todo = new Todo({
                        title: req.body.title,
                        completed: false,
                        idUser: req.user.id,
                });

                const newTodo = await todo.save();
                res.json(newTodo);
        } catch (error) {
                console.log(error);
        }
});

router.delete('/:id', async (req, res) => {
    console.log('DELETE route activated');
    try {
        const result = await Todo.findByIdAndDelete(req.params.id);
        console.log('Result:', result);

        if (result) {
            res.status(200).send({ message: 'Todo deleted successfully' });
        } else {
            res.status(404).send({ message: 'Todo not found' });
        }
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send({ message: 'An error occurred while deleting the todo' });
    }
});

module.exports = router;