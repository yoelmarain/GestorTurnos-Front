import Cookies from 'js-cookie';
const API_URL = 'http://localhost:8000';


export const FetchLogin = async ( email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/api/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const data = await response.json();

            Cookies.set('token', data.access, { expires: 7 }); // Guarda el token en una cookie por 7 días
            Cookies.set('refreshToken', data.refresh, { expires: 7 }); // Guarda el refresh token en una cookie por 7 días
            Cookies.set('userId', data.user.id, { expires: 7 }); // Guarda el user ID en una cookie por 7 días

            return data;
        } else {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Error al iniciar sesión'}`);
        }
    } catch (error) {
        throw new Error('Network error: ' + error);
    }
}