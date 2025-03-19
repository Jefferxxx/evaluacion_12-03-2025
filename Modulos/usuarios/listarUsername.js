import {solicitud} from "../helpers/index.js";

export const getUsuariosYnombres = async (url,username) => {

    return await solicitud(`${url}/users?username=${username}`);

}