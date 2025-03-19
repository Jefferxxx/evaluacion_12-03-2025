import {getPost} from "./index.js"; // importa la funcion getPosts que se encarga de obtener todos los posts de la api

export const getPostsporUsuario_Id = async (url, title) => { //exporta una funcion asincrona que se encarga de buscar los posts por titulo

    const allPosts = await getPost(url); // llama a la funcion getPosts para obtener todos los posts de la api

    let regexTitle = new RegExp(title); // crea un objeto RegExp que se encarga de buscar el titulo en los posts

    const coincidencesPost = allPosts.filter(post => regexTitle.test(post.title)); //utiliza el metodo filter para buscar los posts que coinciden con el titulo

    return coincidencesPost; // devuelve los posts que coinciden con el titulo
}
