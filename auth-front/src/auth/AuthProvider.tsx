import { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse, AccesTokenResponse, User } from "../types/types";
import { API_URL } from "../auth/constants";

interface AuthProviderProps {
    children: React.ReactNode;
}

// Creación del contexto de autenticación
const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => {},
    saveUser: (userData: AuthResponse) => {},
    getRefreshToken: () => {},
    getUser: () => ({}) as User | undefined,
    signOut: () => {},
});

export function AuthProvider({children}: AuthProviderProps){
    // Estados para la autenticación, el token de acceso, el usuario y el estado de carga
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [user, setUser] = useState<User>();
    const [isLoading, setIsloading] = useState(true);

    // Verificar la autenticación al montar el componente
    useEffect(() => {
        checkAuth();
    }, []);

    // Función para solicitar un nuevo token de acceso
    async function requestNewAccessToken(refreshToken:string){
        try {
            const response = await fetch(`${API_URL}/refresh-token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

            if(response.ok){
                const json = await response.json() as AccesTokenResponse;

                if(json.error){
                    throw new Error(json.error);
                }
                return json.body.accessToken;
            }else{
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    // Función para solicitar un nuevo token de acceso
    async function getUserInfo(accessToken: string){
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if(response.ok){
                const json = await response.json();

                if(json.error){
                    throw new Error(json.error);
                }
                return json.body;
            }else{
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    // Función para verificar la autenticación
    async function checkAuth(){
        if(accessToken){
            //esta auth
            const userInfo = await getUserInfo(accessToken);
            if(userInfo){
                saveSessionInfo(userInfo, accessToken, getRefreshToken()!);
                setIsloading(false);
                return;
            }
        }else{
            //no esta auth
            const token = getRefreshToken();
            if(token){
                const newAccessToken = await requestNewAccessToken(token);
                if(newAccessToken){
                    const userInfo = await getUserInfo(newAccessToken);
                    if(userInfo){
                        saveSessionInfo(userInfo, newAccessToken, token);
                        setIsloading(false);
                        return;
                    }
                }
            }
        }
        setIsloading(false);
    }

    // Función para cerrar la sesión
    function signOut(){
        setIsAuthenticated(false);
        setAccessToken("");
        setUser(undefined);
        localStorage.removeItem("token"); 
    }

    // Función para guardar la información de la sesión
    function saveSessionInfo(userInfo:User, accessToken:string, refreshToken:string){
        setAccessToken(accessToken);
        localStorage.setItem("token", JSON.stringify(refreshToken));
        setIsAuthenticated(true);
        setUser(userInfo);
    }

    // Función para obtener el token de acceso
    function getAccessToken(){
        return accessToken;
    }

    // Función para obtener el token de actualización
    function getRefreshToken():string|null{
        const tokenData= localStorage.getItem("token");
        if(tokenData){
            const token = JSON.parse(tokenData);
            return token;
        }
        return null;
    }

    // Función para guardar el usuario
    function saveUser(userData:AuthResponse){
        saveSessionInfo(userData.body.user, userData.body.accessToken, userData.body.refreshToken);
    }

    // Función para obtener el usuario
    function getUser(){
        return user;
    }

    // Proveedor de contexto de autenticación
    return (
        <AuthContext.Provider value={{isAuthenticated, getAccessToken, saveUser, getRefreshToken, getUser, signOut}}>
            {isLoading ? <div>Loading...</div> :children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);