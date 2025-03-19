import {solicitud} from "../solicitudes/solicitud.js";
export const getAlbums = async (URL, usuario) => {//accede al modulo solicitud y usa el argumento usuario para acceder al id del mismo y asi acceder a los albumnes, usando URL para acceder de manera mas practica
  return await solicitud(`${URL}/albums?userId=${usuario.id}`)//retorna el objeto albumnes que contiene todos los albumnes de un mismo usuario
}