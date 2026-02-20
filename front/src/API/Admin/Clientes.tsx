const API_URL = 'http://localhost:8000';

export const getClientes = async () => {
    try {
        const response = await fetch(`${API_URL}/clientes/`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    } catch (error) {
        throw new Error('Network error: ' + error);
    }
};
