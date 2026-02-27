
import Cookies from "js-cookie";
const API_URL = 'http://localhost:8000';

interface Servicio {
  nombre_servicio: string;
  duracion_minutos: number;
  precio: string;
}

export const getServicios = async () => {
  try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_URL}/api/servicios/`, {
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

export const createServicio = async (servicio: Servicio) => {
  try {
    const token = Cookies.get('token');
    const response = await fetch(`${API_URL}/api/servicios/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(servicio),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || 'Error al crear el servicio'}`);
    }
  } catch (error) {
    throw new Error('Network error: ' + error);
  }
};

export const updateServicio = async (id: number, servicio: Servicio) => {
  try {
    const token = Cookies.get('token');
    const response = await fetch(`${API_URL}/api/servicios/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(servicio),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || 'Error al actualizar el servicio'}`);
    }
  } catch (error) {
    throw new Error('Network error: ' + error);
  }
};

export const deleteServicio = async (id: number) => {
  try {
    const token = Cookies.get('token');
    const response = await fetch(`${API_URL}/api/servicios/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return true;
    } else {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || 'Error al eliminar el servicio'}`);
    }
  } catch (error) {
    throw new Error('Network error: ' + error);
  }
};
