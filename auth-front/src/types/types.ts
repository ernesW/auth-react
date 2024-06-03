// La interfaz 'AuthResponse' representa la respuesta de la API cuando la autenticación es exitosa.
// Contiene un objeto 'body' que a su vez contiene un objeto 'user' (que sigue la interfaz 'User'), 
// un 'accessToken' y un 'refreshToken'.
export interface AuthResponse {
    body: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };
}

// La interfaz 'AuthResponseError' representa la respuesta de la API cuando ocurre un error durante la autenticación.
// Contiene un objeto 'body' que a su vez contiene un mensaje de error.
export interface AuthResponseError {
    body: {
        error: string;
    };
}

// La interfaz 'User' representa un usuario en el sistema. Contiene un '_id', un 'name' y un 'username'.
export interface User {
    _id: string;
    name: string;
    username: string;
}

// La interfaz 'AccesTokenResponse' representa la respuesta de la API cuando se solicita un nuevo token de acceso.
// Contiene un 'statusCode', un objeto 'body' que a su vez contiene un 'accessToken', y un 'error' opcional.
export interface AccesTokenResponse {
    statusCode: number;
    body: {
        accessToken: string;
    };
    error?: string;
}