import { useAuth } from "../auth/AuthProvider";
import { useState, useEffect } from "react";
import { API_URL } from "../auth/constants";
import PortalLayout from "../layout/PortalLayout";


interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  idUser: string;
}

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const auth = useAuth();

  useEffect(() => {
    loadTodos();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createTodo();
  }

  async function createTodo() {
    try {
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

      if (response.ok) {
        const json = await response.json();
        setTodos([json, ...todos]);
      } else {
        //Mostrar error de conexion
      }
    } catch (error) {}
  }

  async function loadTodos() {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });

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

  async function deleteTodo(id: string) {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });

      if (response.ok) {
        // Elimina la tarea de la lista de tareas en el estado
        setTodos(todos.filter((todo) => todo._id !== id));
        console.log("Tarea eliminada");
      } else {
        // Mostrar error de conexión
        console.error("Error al eliminar la tarea");
      }
    } catch (error) {}
  }

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