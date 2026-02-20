const API_URL = 'http://localhost:8000';

interface TurnosFiltros {
    profesional?: number;
    estado?: string;
    fecha?: string;
}

export const getAllTurnos = async (params?: TurnosFiltros) => {
    try {
        const query = new URLSearchParams();
        if (params?.profesional) query.set('profesional', String(params.profesional));
        if (params?.estado) query.set('estado', params.estado);
        if (params?.fecha) query.set('fecha', params.fecha);

        const url = `${API_URL}/turnos/${query.toString() ? `?${query.toString()}` : ''}`;
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    } catch (error) {
        throw new Error('Network error: ' + error);
    }
};

export const updateEstadoTurno = async (id: number, estado: string) => {
    try {
        const response = await fetch(`${API_URL}/turnos/${id}/`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado }),
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Error al actualizar el turno'}`);
        }
    } catch (error) {
        throw new Error('Network error: ' + error);
    }
};
