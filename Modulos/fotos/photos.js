import solicitud from "./helpers/solicitud.js";//accede ala solicitud para usarla para sacar las fotos
export const getPhotos = async (URL, album) => {//necesita el album ya que necesita el id del mismo
  //asi puede imprimir todas las fotos de un mismo album
  return await solicitud(`${URL}/photos?albumId=${album.id}`)
}