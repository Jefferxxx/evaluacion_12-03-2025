
import solicitud from "../Modulos/helpers/solicitud.js";

export const filtrarPostPorTitulo = async (titulo) => {// esta funcion es asincrona que se encarga de filtrar los posts por titulo y obtener sus comentarios
  try {
    const response = await solicitud(`${URL}/posts`);// use const response = await fetch(`${URL}/posts`); para obtener todos los posts de la API y guardarlos en la variable response
    const posts = await response.json();// usamos json para que nos devuelva un objeto que contenga los posts
    const postFiltrado = posts.find(post => post.title.toLowerCase().includes(titulo.toLowerCase()));// usamos find para buscar el post que tenga el titulo que se quiere filtrar y lo guardamos en la variable postFiltrado
    
    if (!postFiltrado) {// realizamos una sentencia if para que si no se encuentra el post se imprima en la consola y le sgregamos ! para que se cumpla la sentencia ya que si no se encuentra el post se imprime en la consola
      console.log("No se encontraron posts con ese título.");// se imprime en la consola este mensaje para que el usuario sepa que no se encontraron posts
      return;// se retorna para que se ejecute el menu de opciones de nuevo y asi el usuario pueda ingresar otra opcion
    }
    
    const comentariosResponse = await solicitud(`${URL}/comments?postId=${postFiltrado.id}`);// aqui usamos await para que se espere a que se cumpla la promesa de listarTareasPendientes y asi se imprime en la consola acompañado de fetch para obtener los comentarios del post
    postFiltrado.comentarios = await comentariosResponse.json();// usamos json para que nos devuelva un objeto que contenga los comentarios
    
    console.log("Post encontrado:", postFiltrado);// se imprime en la consola el post encontrado con sus comentarios 
  } catch (error) {// este catch es para manejar los errores y
    console.error("Error al filtrar posts:" + error);// se imprime en la consola el error ya que se utiliza await para que se espere a que se cumpla la promesa de listarTareasPendientes y asi se imprime en la consola
  }
};