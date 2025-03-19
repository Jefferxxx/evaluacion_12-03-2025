// Importación de módulos necesarios desde diferentes archivos
// Cada uno de estos módulos contiene funciones para manejar diferentes tipos de datos
// Se extraen las funciones requeridas de cada módulo para usarlas en este script
import { URL } from './Modulos/solicitudes/index.js';
import { getUsuarios, getUsuariosYnombres } from './Modulos/usuarios/index.js';
import { getPost, filtrarPostsPorTitulo, getPostsporUsuario_Id } from './Modulos/posts/index.js';
import { getCommets } from './Modulos/comments/index.js';
import { getAlbums } from './Modulos/album/index.js';
import { getTareasPorUsuarioId } from './Modulos/fotos/index.js';
import { getPhotos } from './Modulos/fotos/index.js';

// Función para solicitar un parámetro al usuario y validarlo antes de devolverlo
const solicitarParametro = (indicador) => {
    let respuesta;
    let regexParametro = /\D/i; // Expresión regular que verifica que la entrada contenga al menos un carácter no numérico
    do {
        respuesta = prompt(`Ingrese el ${indicador}:`); // Solicita el parámetro al usuario mediante un mensaje emergente
    } while (!respuesta || !regexParametro.test(respuesta)); // Se repite hasta que el usuario ingrese una entrada válida
    return respuesta; // Devuelve la respuesta válida ingresada por el usuario
};

// Función asincrónica que obtiene una lista de usuarios y sus tareas pendientes
const listarTareasPendientes = async () => {
    const usuarios = await getUsuarios(URL); // Obtiene la lista completa de usuarios desde la API
    return await Promise.all(
        usuarios.map(async (usuario) => {
            const tareasPendientes = await getTareasPorUsuarioId(URL, usuario.id, false); // Obtiene las tareas pendientes del usuario filtradas por ID
            return { ...usuario, tareasPendientes }; // Devuelve el objeto usuario incluyendo sus tareas pendientes
        })
    );
};

// Función asincrónica para buscar usuarios por su username y obtener sus álbumes con fotos
const usuariosPorUsername = async () => {
    let username = solicitarParametro("username"); // Solicita al usuario un username válido
    const usuarios = await getUsuariosYnombres(URL, username); // Obtiene los usuarios que coincidan con el username ingresado
    return await Promise.all(
        usuarios.map(async (usuario) => {
            const albums = await getAlbums(URL, usuario.id); // Obtiene los álbumes del usuario
            const albumsConFotos = await Promise.all(
                albums.map(async (album) => {
                    const fotos = await getPhotos(URL, album.id); // Obtiene las fotos asociadas a cada álbum
                    return { ...album, fotos }; // Devuelve el álbum con sus respectivas fotos
                })
            );
            return { ...usuario, albumsConFotos }; // Devuelve el usuario con sus álbumes y fotos asociadas
        })
    );
};

// Función asincrónica para buscar posts por título e incluir sus comentarios
const postPorTitulo = async () => {
    let titulo = solicitarParametro("título del post"); // Solicita un título al usuario
    const posts = await filtrarPostsPorTitulo(URL, titulo); // Obtiene los posts que coincidan con el título ingresado
    return await Promise.all(
        posts.map(async (post) => {
            const comentarios = await getCommets(URL, post.id); // Obtiene los comentarios de cada post encontrado
            return { ...post, comentarios }; // Devuelve el post junto con sus comentarios
        })
    );
};

// Función asincrónica para obtener información completa de cada usuario (posts y álbumes con fotos)
const DataUser = async () => {
    const usuarios = await getUsuarios(URL); // Obtiene la lista de todos los usuarios
    return await Promise.all(
        usuarios.map(async (usuario) => {
            const posts = await getPostsporUsuario_Id(URL, usuario.id); // Obtiene los posts creados por el usuario
            const postsConComentarios = await Promise.all(
                posts.map(async (post) => {
                    const comentarios = await getCommets(URL, post.id); // Obtiene los comentarios de cada post
                    return { ...post, comentarios }; // Devuelve el post con sus comentarios incluidos
                })
            );
            const albums = await getAlbums(URL, usuario.id); // Obtiene los álbumes del usuario
            const albumsConFotos = await Promise.all(
                albums.map(async (album) => {
                    const fotos = await getPhotos(URL, album.id); // Obtiene las fotos de cada álbum
                    return { ...album, fotos }; // Devuelve el álbum con sus fotos
                })
            );
            return { ...usuario, postsConComentarios, albumsConFotos }; // Devuelve el usuario con todos sus datos completos
        })
    );
};

// Función asincrónica para obtener el nombre y teléfono de cada usuario
const telefono_usuario = async () => {
    const usuarios = await getUsuarios(URL); // Obtiene la lista completa de usuarios
    return await Promise.all(
        usuarios.map(async (usuario) => {
            return {
                nombre: usuario.name, // Retorna el nombre del usuario
                telefono: usuario.phone // Retorna el número de teléfono del usuario
            };
        })
    );
};

// Definición de las opciones del menú en un objeto constante para facilitar su manejo
const OPCIONES = {
    LISTAR_TAREAS: 1,
    BUSCAR_USUARIO: 2,
    FILTRAR_POSTS: 3,
    telefono_usuario: 4,
    TODOS_DATOS: 5,
    SALIR: 0
};

// Bucle infinito para el menú de opciones hasta que el usuario seleccione salir
while (true) {
    let opcion;
    do {
        opcion = parseInt(prompt("Seleccione una opción:\n1. Listar tareas pendientes\n2. Buscar usuario y sus álbumes\n3. Filtrar posts por título\n4. Obtener todos los datos\n0. Salir")) ?? ""; // Solicita al usuario que seleccione una opción válida
    } while (Number.isNaN(opcion) || !Object.values(OPCIONES).includes(opcion)); // Se repite hasta que la entrada sea un número válido

    if (opcion === OPCIONES.SALIR) {
        alert("Programa finalizado con éxito."); // Mensaje de finalización del programa
        break;
    } else {
        console.log(`Opción ${opcion} seleccionada:`); // Muestra la opción seleccionada por el usuario
        switch (opcion) {
            case OPCIONES.LISTAR_TAREAS:
                await listarTareasPendientes().then(data => console.log(data)); // Llama a la función para listar tareas pendientes
                break;
            case OPCIONES.BUSCAR_USUARIO:
                await usuariosPorUsername().then(data => data.length !== 0 ? console.log(data) : console.log("No hay información relacionada"));
                break;
            case OPCIONES.FILTRAR_POSTS:
                await postPorTitulo().then(data => data.length !== 0 ? console.log(data) : console.log("No hay información relacionada"));
                break;
            case OPCIONES.telefono_usuario:
                await telefono_usuario().then(data => data.length !== 0 ? console.log(data) : console.log("No hay información relacionada"));
                break;
            case OPCIONES.TODOS_DATOS:
                await DataUser().then(data => console.log(data));
                break;
        }
    }
}
