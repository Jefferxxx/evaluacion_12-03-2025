// Este archivo actúa como un "barril" que organiza y exporta de manera ordenada
// las funciones utilizadas para realizar solicitudes de datos. 
// Cada exportación permite acceder fácilmente a las funciones sin importar la ubicación de los módulos.
export { getUsuarios } from "./usuarios.js";
export { getPost } from "./posts.js";
export { getCommets } from "./commets.js";
export { getAlbums } from "./albums.js";
export { getPhotos } from "./photos.js";