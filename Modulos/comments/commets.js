import solicitud from "../Modulos/helpers/solicitud.js";//accede al modulo solicitud
export const getCommets = async (URL, post) => { // utiliza el getcomment para obtener los comentarios
  // de un post en especifico, pasando el id del post y retorna el objeto comentario
  return await solicitud(`${URL}/comments?postId=${post.id}`)
} 