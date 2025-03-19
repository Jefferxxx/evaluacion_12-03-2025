import {solicitud} from "../helpers/index.js";

export const getPostsporUsuario_Id = async (url, userId) => {

    try {
        if (!url || typeof userId !== "number") {
            throw new Error("Parámetros inválidos");
        }

        const respuesta = await solicitud(`${url}/posts?userId=${userId}`);
        return respuesta;
    } catch (error) {
        console.error(`Error al obtener los posts: ${error}`);
    }
}