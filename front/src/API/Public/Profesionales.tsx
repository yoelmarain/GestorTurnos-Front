const API_URL = 'http://localhost:8000';

interface ProfesionalPayload {
  nombre_profesional: string;
}

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

export const createProfesional = async (profesional: ProfesionalPayload) => {
  try {
    const response = await fetch(`${API_URL}/profesionales/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profesional),
    });
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || 'Error al crear el profesional'}`);
    }
  } catch (error) {
    throw new Error('Network error: ' + error);
  }
};

export const updateProfesional = async (id: number, profesional: ProfesionalPayload) => {
  try {
    const response = await fetch(`${API_URL}/profesionales/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profesional),
    });
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || 'Error al actualizar el profesional'}`);
    }
  } catch (error) {
    throw new Error('Network error: ' + error);
  }
};

export const deleteProfesional = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/profesionales/${id}/`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return true;
    } else {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || 'Error al eliminar el profesional'}`);
    }
  } catch (error) {
    throw new Error('Network error: ' + error);
  }
};
