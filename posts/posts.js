import solicitud from "../Modulos/helpers/solicitud.js";//accede al modulo solicitud
export const getPost = async (URL, usuario) => {//se crea la promesa getpost el cual obtiene
  return await solicitud(`${URL}/posts?userId=${usuario.id}`)
  // obtiene todos los post del usuario, y necesita el usuario porque necesita acceder a su id para sacar los comentarios Y ALBUMS
}