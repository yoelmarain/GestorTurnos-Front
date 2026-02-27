import Cookies from "js-cookie";
const API_URL = 'http://localhost:8000';


export const getSlots = async (idProfesional: number, idServicio: number) => {
  try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_URL}/api/profesionales/${idProfesional}/turnosLibres/${idServicio}/`, {
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

export const reservarTurno = async (
  fecha_turno: string,
  profesional: number,
  servicio: number
) => {
  try {
    const token = Cookies.get('token');
      const response = await fetch(`${API_URL}/api/turnos/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
              fecha_turno,
              estado: 'Reservado',
              cliente: 1, // Reemplazar con el ID del cliente autenticado
              profesional,
              servicio
          }),
      });
      if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          const errorData = await response.json();
          throw new Error(
            `Error en la respuesta del servidor: ${errorData.message}`
          );
    }
  } catch (error) {
        throw new Error('Network error: ' + error);
  }
};  


