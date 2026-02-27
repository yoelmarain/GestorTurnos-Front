import Cookies from "js-cookie";
const API_URL = 'http://localhost:8000';


export const getProfesionales = async () => {
  try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_URL}/api/profesionales/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error('Error en la respuesta del servidor');
        }
  } catch (error) {
        throw new Error('Network error: ' + error);
  }
};

