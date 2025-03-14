
import solicitud from "./solicitud.js";
const URL = "https://jsonplaceholder.typicode.com";


export const buscarUsuarioYAlbums = async (nombreUsuario) => {// exportamos la funcion buscarUsuarioYAlbums para que se pueda usar en otros archivos y asi se pueda usar en el menu
  try {
    // Se busca el usuario en la API.
    const response = await solicitud(`${URL}/users`);// se utiliza await para que se espere a que se cumpla la promesa de listarTareasPendientes y asi se imprime en la consola
    const usuarios = await response.json();//  usamos json para que nos devuelva un objeto que contenga los usuarios
    const usuario = usuarios.find(user => user.username.toLowerCase() === nombreUsuario.toLowerCase());// USAMOS FIND PARA BUSCAR EL USUARIO EN LA API Y SI LO ENCONTRAMOS LO GUARDAMOS EN LA VARIABLE USUARIO Y TAMBIEN AGREGAMOS EL LOWERCASE PARA QUE NO TENGA EN CUENTA MAYUSCULAS
    
    if (!usuario) {// realizamos una sentencia if para que si no se encuentra el usuario se imprima en la consola
      console.log("Usuario no encontrado.");// se imprime en la consola 
      return;// se utiliza return para que se ejecute el menu de opciones de nuevo y asi el usuario pueda ingresar otra opcion
    }
    
    // Se obtienen los álbumes del usuario.
    const albumsResponse = await solicitud(`${URL}/albums?userId=${usuario.id}`);// se utiliza await para que se espere a que se cumpla la promesa de listarTareasPendientes y asi se imprime en la consola y usamos json para que nos devuelva un objeto que contenga los albumes del usuario 
    const albums = await albumsResponse.json();
    
  
    for (const album of albums) {// se itera sobre cada album y se utiliza await para que se espere a que se cumpla la promesa de listarTareasPendientes y asi se imprime en la consola 
      const fotosResponse = await solicitud(`${URL}/photos?albumId=${album.id}`);// utilizamos await para que se espere a que se cumpla la promesa de listarTareasPendientes y asi se imprime en la consola
      album.photos = await fotosResponse.json();// .photos es un array que contiene las fotos del album y fotosResponse.json() es una promesa que se resuelve con un array de fotos
    }
    
    // Se imprimen los resultados en la consola.
    console.log("Datos del usuario:", usuario);
    console.log("Álbumes y fotos:", albums);
  } catch (error) {
    console.error("Error al buscar usuario y álbumes:", error);
  }
};