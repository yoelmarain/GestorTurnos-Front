


const profesionales = [
    {
        id: 1,
        nombre: "Juan Pérez",
        foto: "https://i.pravatar.cc/300?img=8",
    } ,
    {
        id: 2,
        nombre: "María Gómez",
        foto: "https://i.pravatar.cc/300?img=5",
    } ,
    {
        id: 3,
        nombre: "Carlos Rodríguez",
        foto: "https://i.pravatar.cc/300?img=12",
    } ,
    {
        id: 4,
        nombre: "Ana Martínez",
        foto: "https://i.pravatar.cc/300?img=10",
    } ,
    {
        "id": 1,
        "nombre_profesional": "Yoel",
        "especialidad": [
        1,
        2
        ]
  },
]

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

