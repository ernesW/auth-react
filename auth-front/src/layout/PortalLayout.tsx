import { Link } from "react-router-dom";
import React, { MouseEvent } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";

interface PortalLayoutProps {
  children?: React.ReactNode;
}
export default function PortalLayout({ children }: PortalLayoutProps) {
  const auth = useAuth();

  // Función para manejar el cierre de sesión
  async function handleSignOut(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    try {
      // Realizar una petición DELETE a la API para cerrar la sesión
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
           // Enviar el token de refresco en la cabecera de autorización
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });
      // Si la respuesta es OK, cerrar la sesión en el cliente
      if (response.ok) {
        auth.signOut();
      }
    } catch (error) {
      // En caso de error, mostrarlo en la consola
      console.log(error);
    }
  }
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/me">Profile</Link>
            </li>
            <li>
              <Link to="/me">{auth.getUser()?.username ?? ""}</Link>
            </li>
            <li>
              <a href="#" onClick={handleSignOut}>
                Sign out
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="dashboard">{children}</main>
    </>
  );
}