import { solicitud } from "../solicitudes/index.js"; // Importa la función 'solicitud' del módulo de solicitudes

export const getTareasPorUsuarioId = async (url, userId, status) => { // Declara y exporta una función asincrónica que obtiene tareas por ID de usuario y estado

    try {
        if (!url || typeof userId !== "number") { // Verifica si el 'url' es válido y si 'userId' es un número
            throw new Error("Parámetros inválidos"); // Lanza un error si los parámetros son inválidos
        }

        const respuesta = await // Declara una variable 'respuesta' y espera el resultado de la solicitud
        solicitud(`${url}/todos?userId=${userId}&completed=${status}`); // Realiza una solicitud HTTP a la URL con los parámetros proporcionados
        return respuesta; // Devuelve la respuesta de la solicitud
    } catch (error) { // Captura cualquier error que ocurra durante el proceso
        console.error(`Error al obtener las tareas pendientes: ${error}`); // Imprime el error en la consola
    }
}
