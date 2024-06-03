// Importación de las dependencias necesarias
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/Login.tsx';
import Signup from './routes/Signup.tsx';
import Dashboard from './routes/Dashboard.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import { AuthProvider } from './auth/AuthProvider.tsx';

// Creación del router con las rutas de la aplicación
const router = createBrowserRouter([
  {
    // Ruta para la página de inicio de sesión
    path: "/",
    element: <Login />,
  },
  {
    // Ruta para la página de registro
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        // Ruta para el dashboard dentro de la ruta protegida
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
  
// Renderizado de la aplicación en el elemento root del DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
