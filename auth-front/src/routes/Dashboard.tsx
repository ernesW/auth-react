import { useAuth } from "../auth/AuthProvider";
import { useState, useEffect } from "react";
import { API_URL } from "../auth/constants";
import PortalLayout from "../layout/PortalLayout";

// Definimos la interfaz para los objetos 'Todo'
interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  idUser: string;
}

// Definimos el componente 'Dashboard'
export default function Dashboard() {
  // Definimos el estado para los 'todos' y el 'title' del nuevo 'todo'
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  // Obtenemos el objeto 'auth' del proveedor de autenticación
  const auth = useAuth();

  // Usamos 'useEffect' para cargar los 'todos' cuando el componente se monta
  useEffect(() => {
    loadTodos();
  }, []);

  // Definimos la función 'handleSubmit' para manejar el envío del formulario
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createTodo();
  }

  // Definimos la función 'createTodo' para crear un nuevo 'todo'
  async function createTodo() {
    try {
      // Hacemos una petición POST a la API para crear el 'todo'
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({
          title,
        }),
      });

      // Si la respuesta es exitosa, añadimos el nuevo 'todo' al estado
      if (response.ok) {
        const json = await response.json();
        setTodos([json, ...todos]);
      } else {
        //Mostrar error de conexion
      }
    } catch (error) {}
  }

  // Definimos la función 'loadTodos' para cargar los 'todos' de la API
  async function loadTodos() {
    try {
      // Hacemos una petición GET a la API para obtener los 'todos'
      const response = await fetch(`${API_URL}/todos`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });

      // Si la respuesta es exitosa, actualizamos el estado con los 'todos' obtenidos
      if (response.ok) {
        const json = await response.json();
        setTodos(json);
      } else {
        //Mostrar error de conexion
      }

      const data = await response.json();
      setTodos(data);
    } catch (error) {}
  }

  // Definimos la función 'deleteTodo' para eliminar un 'todo'
  async function deleteTodo(id: string) {
    try {
      // Hacemos una petición DELETE a la API para eliminar el 'todo'
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });

      // Si la respuesta es exitosa, eliminamos el 'todo' del estado
      if (response.ok) {
        setTodos(todos.filter((todo) => todo._id !== id));
        console.log("Tarea eliminada");
      } else {
        // Mostrar error de conexión
        console.error("Error al eliminar la tarea");
      }
    } catch (error) {}
  }

  // Renderizamos el componente
  return (
    <PortalLayout>
      <div>
        <h1>Dashboard de {auth.getUser()?.name || ""}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nuevo..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </form>
        {todos.map((todo) => (
          <div key={todo._id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo._id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </PortalLayout>
  );
}