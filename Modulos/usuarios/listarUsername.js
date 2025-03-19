// importa la funcion solicitud que se encarga de realizar una solicitud a una url
import {solicitud} from "../Modulos/solicitudes/index.js";

// exporta la funcion getUsuariosYnombres que se encarga de obtener los usuarios de la api
// recibe como parametro la url de la api y el username del usuario que se quiere buscar
export const getUsuariosYnombres = async (url,username) => {

    // utiliza la funcion solicitud para realizar una solicitud a la url con los parámetros proporcionados
    // el parámetro username se utiliza para buscar un usuario en especifico en la api
    // se devuelve el resultado de la solicitud
    return await solicitud(`${url}/users?username=${username}`);

}
