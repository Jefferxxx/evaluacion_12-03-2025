import {solicitud} from "../solicitudes/solicitud.js";//accede al modulo solicitud
export const getPost = async URL => {//se crea la promesa getpost el cual obtiene
  return await solicitud(`${URL}/posts?userId=$/post`)
  // obtiene todos los post del usuario, y necesita el usuario porque necesita acceder a su id para sacar los comentarios Y ALBUMS
}

