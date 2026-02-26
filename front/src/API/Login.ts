import Cookies from 'js-cookie';
const API_URL = 'http://localhost:8000';


export const FetchLogin = async ( email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const data = await response.json();

            // dsp ver si se puede usar una cookie httpOnly para mayor seguridad, pero por ahora se guardan en cookies normales
            Cookies.set('token', data.access, { expires: 7 });
            Cookies.set('refreshToken', data.refresh, { expires: 7 });

            return data;
        } else {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Error al iniciar sesión'}`);
        }
    } catch (error) {
        throw new Error('Network error: ' + error);
    }
}