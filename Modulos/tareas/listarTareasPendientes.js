import {solicitud} from "../helpers/index.js";

export const getTareasPorUsuarioId = async (url, userId, status) => {

    try {
        if (!url || typeof userId !== "number") {
            throw new Error("Parámetros inválidos");
        }

        const respuesta = await 
        solicitud(`${url}/todos?userId=${userId}&completed=${status}`);
        return respuesta;
    } catch (error) {
        console.error(`Error al obtener las tareas pendientes: ${error}`);
    }
}