const API_URL = 'http://localhost:8000';


export const getSlots = async (idProfesional: number, idServicio: number) => {
  try {
      const response = await fetch(`${API_URL}/profesionales/${idProfesional}/turnosLibres/${idServicio}/`);
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
      const response = await fetch(`${API_URL}/turnos/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
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


