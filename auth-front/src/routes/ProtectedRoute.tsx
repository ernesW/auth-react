import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

// Definimos el componente 'ProtectedRoute'
export default function ProtectedRoute() {
    // Obtenemos el objeto 'auth' del proveedor de autenticación
    const auth = useAuth();

    // Si el usuario está autenticado, renderizamos el componente hijo ('Outlet')
    // Si el usuario no está autenticado, redirigimos al usuario a la página de inicio ('/')
    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
