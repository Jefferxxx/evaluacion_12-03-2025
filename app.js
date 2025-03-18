import { 
  getUsuarios,
  getPost,
  getCommets,
  getAlbums,
  getPhotos,
  listarTareasPendientes,
  buscarUsuarioYAlbums,
  filtrarPostsPorTitulo 
} from "./Modulos/index.js";

const URL = "https://jsonplaceholder.typicode.com";

async function manejardatos() {
  try {
    const usuarios = await getUsuarios(URL);
    return await Promise.all(
      usuarios.map(async (usuario) => {
        const posts = await getPost(URL, usuario);
        const comentPost = await Promise.all(
          posts.map(async (post) => {
            const coments = await getCommets(URL, post);
            return { ...post, coments };
          })
        );

        const albums = await getAlbums(URL, usuario);
        const photoAlbum = await Promise.all(
          albums.map(async (album) => {
            const photos = await getPhotos(URL, album);
            return { ...album, photos };
          })
        );

        return { ...usuario, photoAlbum, comentPost };
      })
    );
  } catch (error) {
    console.error("Error al manejar datos:", error);
  }
}

manejardatos().then((data) => {
  console.log("Datos cargados exitosamente.");
});

const OPCIONES = {
  LISTAR_TAREAS: "1",
  BUSCAR_USUARIO: "2",
  FILTRAR_POSTS: "3",
  SALIR: "4"
};

function mostrarMenu() {
  console.log("\nSeleccione una opción:");
  console.log("1. Listar todas las tareas pendientes por usuario");
  console.log("2. Buscar usuario y listar sus álbumes y fotos");
  console.log("3. Filtrar posts por título e incluir comentarios");
  console.log("4. Salir\n");
}

async function leerEntrada(mensaje) {
  const respuesta = prompt(mensaje);
  return respuesta ? respuesta.trim() : "";
}

async function main() {
  while (true) {
    mostrarMenu();
    const opcion = await leerEntrada("Ingrese el número de la opción: ");

    switch (opcion) {
      case OPCIONES.LISTAR_TAREAS:
        await listarTareasPendientes();
        break;
      case OPCIONES.BUSCAR_USUARIO:
        const nombre = await leerEntrada("Ingrese el nombre de usuario: ");
        if (nombre) await buscarUsuarioYAlbums(nombre);
        else console.log("Debe ingresar un nombre de usuario válido.");
        break;
      case OPCIONES.FILTRAR_POSTS:
        const titulo = await leerEntrada("Ingrese el título del post a filtrar: ");
        if (titulo) await filtrarPostsPorTitulo(titulo);
        else console.log("Debe ingresar un título válido.");
        break;
      case OPCIONES.SALIR:
        console.log("Saliendo...");
        return;
      default:
        console.log("Opción inválida. Intente de nuevo.");
    }
  }
}

main();
