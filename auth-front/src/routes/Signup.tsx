import DefaultLayout from "../layout/DefaultLayout";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { ErrorResponse, Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";
import { AuthResponseError } from "../types/types";

// Definimos el componente 'Signup'
export default function Signup() {
    // Definimos el estado para el 'name', 'username', 'password' y 'errorResponse'
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");

    // Obtenemos el objeto 'auth' del proveedor de autenticación y la función 'goTo' de 'useNavigate'
    const auth = useAuth();
    const goTo = useNavigate();

    // Definimos la función 'handleSubmit' para manejar el envío del formulario
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            // Hacemos una petición POST a la API para crear el usuario
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, username, password }),
            });

            // Si la respuesta es exitosa, redirigimos al usuario a la página de inicio
            if (response.ok) {
                console.log("User created successfully");
                setErrorResponse("");

                goTo("/")
            } else {
                // Si la respuesta no es exitosa, mostramos el error
                console.log("Something went wrong");
                const json = (await response.json()) as AuthResponseError;
                setErrorResponse(json.body.error);
            }

        } catch (error) {
            console.log(error);
        }
    }

    // Si el usuario ya está autenticado, redirigimos al 'dashboard'
    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    // Renderizamos el formulario de registro
    return (
        <DefaultLayout>
            <form className="form" onSubmit={handleSubmit}>
                <h1>Signup</h1>
                {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button>Create user</button>
            </form>
        </DefaultLayout>

    );
}