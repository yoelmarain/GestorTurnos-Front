const API_URL = 'http://localhost:8000';


export const getProfesionales = async () => {
  try {
      const response = await fetch(`${API_URL}/profesionales/`);
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

