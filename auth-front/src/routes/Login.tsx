import DefaultLayout from "../layout/DefaultLayout";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";
import type { AuthResponse, AuthResponseError } from "../types/types";

// Renderizamos el componente
export default function Login() {
    // Definimos el estado para el 'username', 'password' y 'errorResponse'
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
            // Hacemos una petición POST a la API para iniciar sesión
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            // Si la respuesta es exitosa, guardamos el usuario y redirigimos al 'dashboard'
            if (response.ok) {
                console.log("Login successful");
                setErrorResponse("");
                const json = await response.json() as AuthResponse;

                if (json.body.accessToken && json.body.refreshToken) {
                    auth.saveUser(json);
                    goTo("/dashboard")
                }

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

    // Renderizamos el formulario de inicio de sesión
    return (
        <DefaultLayout>
            <form className="form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button>Login</button>
            </form>
        </DefaultLayout>

    );
}