import {URL} from './Modulos/helpers/index.js';
import { getUsuarios, getUsuariosYnombres } from './Modulos/usuarios/index.js';
import { getPost, filtrarPostsPorTitulo, getPostsporUsuario_Id, } from './Modulos/posts/index.js';
import { getCommets } from './Modulos/comments/index.js';
import { getAlbums } from './Modulos/album/index.js';
import { getTareasPorUsuarioId } from './Modulos/fotos/index.js';
import { getPhotos } from './Modulos/fotos/index.js';

const solicitarParametro = (indicador) => {
    let respuesta;
    let regexParametro = /\D/i;
    do {
        respuesta = prompt(`Ingrese el ${indicador}:`);
    } while (!respuesta || !regexParametro.test(respuesta));
    return respuesta;
};

const listarTareasPendientes = async () => {
    const usuarios = await getUsuarios(URL);
    return await Promise.all(
        usuarios.map(async (usuario) => {
            const tareasPendientes = await getTareasPorUsuarioId (URL, usuario.id, false);
            return { ...usuario, tareasPendientes };
        })
    );
};

const usuariosPorUsername = async () => {
    let username = solicitarParametro("username");
    const usuarios = await getUsuariosYnombres(URL, username);
    return await Promise.all(
        usuarios.map(async (usuario) => {
            const albums = await getAlbums(URL, usuario.id);
            const albumsConFotos = await Promise.all(
                albums.map(async (album) => {
                    const fotos = await getPhotos(URL, album.id);
                    return { ...album, fotos };
                })
            );
            return { ...usuario, albumsConFotos };
        })
    );
};

const postPorTitulo = async () => {
    let titulo = solicitarParametro("título del post");
    const posts = await filtrarPostsPorTitulo(URL, titulo);
    return await Promise.all(
        posts.map(async (post) => {
            const comentarios = await getCommets(URL, post.id);
            return { ...post, comentarios };
        })
    );
};

const DataUser = async () => {
    const usuarios = await getUsuarios(URL);
    return await Promise.all(
        usuarios.map(async (usuario) => {
            const posts = await getPostsporUsuario_Id(URL, usuario.id);
            const postsConComentarios = await Promise.all(
                posts.map(async (post) => {
                    const comentarios = await getCommets(URL, post.id);
                    return { ...post, comentarios };
                })
            );
            const albums = await getAlbums(URL, usuario.id);
            const albumsConFotos = await Promise.all(
                albums.map(async (album) => {
                    const fotos = await getPhotos(URL, album.id);
                    return { ...album, fotos };
                })
            );
            return { ...usuario, postsConComentarios, albumsConFotos };
        })
    );
};

const telefono_usuario = async () => {
  const usuarios = await getUsuarios(URL);

  return await Promise.all(
    usuarios.map(async usuario => {
      return { 
          nombre: usuario.name, 
          telefono: usuario.phone 
      };
    })
  );

}

const OPCIONES = {
    LISTAR_TAREAS: 1,
    BUSCAR_USUARIO: 2,
    FILTRAR_POSTS: 3,
    telefono_usuario: 4,
    TODOS_DATOS: 5,
    SALIR: 0
};

while (true) {
    let opcion;
    do {
        opcion = parseInt(prompt("Seleccione una opción:\n1. Listar tareas pendientes\n2. Buscar usuario y sus álbumes\n3. Filtrar posts por título\n4. Obtener todos los datos\n0. Salir")) ?? "";
    } while (Number.isNaN(opcion) || !Object.values(OPCIONES).includes(opcion));

    if (opcion === OPCIONES.SALIR) {
        alert("Programa finalizado con éxito.");
        break;
    } else {
        console.log(`Opción ${opcion} seleccionada:`);
        switch (opcion) {
            case OPCIONES.LISTAR_TAREAS:
                await listarTareasPendientes().then(data => console.log(data));
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