import  solicitud  from "./solicitud.js";
const URL = "https://jsonplaceholder.typicode.com";

export const listarTareasPendientes = async () => {
  try {
    const response = await solicitud(`${URL}/todos`);
    const tareas = await response.json();
    const tareasPendientes = tareas.filter(tarea => !tarea.completed);
    
    const tareasPorUsuario = {};
    tareasPendientes.forEach(tarea => {
      if (!tareasPorUsuario[tarea.userId]) {
        tareasPorUsuario[tarea.userId] = [];
      }
      tareasPorUsuario[tarea.userId].push(tarea.title);
    });
    
    console.log("Tareas pendientes por usuario:", tareasPorUsuario);
  } catch (error) {
    console.error("Error al obtener tareas pendientes:", error);
  }
};
