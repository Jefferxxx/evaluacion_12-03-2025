import {getUsuarios,getPost,getCommets,getAlbums,getPhotos} from "./Modulos/index.js";
//este barril es para acceder a todos los modulos y acceder a todos los metodos
const URL = "https://jsonplaceholder.typicode.com";//esta variable URL es la base de datos que se utiliza para realizar
//las solicitudes y obtener los datos

const manejardatos = async () => {//la promesa manejardatos es para acceder y manejar todos los datos
  const usuarios = await getUsuarios(URL);//se accede al metodo getusuarios que nos devuelve un
  //objeto que contiene todos los usuarios y se utiliza await para que devuelva una promesa cumplida
  //ademas de darle el argumento URL que necesita
    return await Promise.all(usuarios.map(async(usuario)=>{
      //se utiliza Promise.all para que se cumplan todas las promesas contenidas en el array
      //se itera sobre cada usuario y se devuelve una promesa que contiene el usuario y sus posts
      //se utiliza await para que se espere a que se cumplan todas las promesas antes de retornar
      //el objetivo es que se imprima el usuario con sus posts y comentarios en orden

      const posts = await getPost(URL, usuario);//accede al metodo post que nececsita url y usuario
      //se utiliza el await para que se espere a que se cumpla la promesa de getPost
      //y se pasa el URL y el usuario como argumentos porque getPost los necesita
      //para obtener los posts de cada usuario
        const comentPost = await Promise.all( posts.map(async(post)=>{
          // 'comentPost' es una promesa que se resuelve cuando todas las promesas en el array se cumplen.
          // Utiliza Promise.all para obtener comentarios para cada post usando el ID del post.
          // Esto asegura que cada post se devuelva junto con sus comentarios asociados.

            const coments = await getCommets(URL,post);//los comentarios que son accedidos con el metodo
          //requieren en este caso el argumento post ya que ahora necesitan el id del post
          
          return { ...post, coments };//en el orden en el cual se pueden encontrar por ejemplo postId y sus comentarios
          //y es ingresado en un objeto porque usa {} y no []
        }));
      
      // Accede a los albums del usuario actual y los almacena en una variable 'albums'.
      // Para obtener los albums, se utiliza el metodo 'getAlbums' y se le pasa como argumentos
      // la URL base de la API y el objeto 'usuario' actual.
      // El resultado es un array de albums que se utiliza para imprimir las fotos de cada album.
        const albums = await getAlbums(URL,usuario);
        const photoAlbum = await Promise.all( albums.map(async(albums)=>{
            const photos = await getPhotos(URL,albums);
          return { ...albums, photos };// Devuelve un objeto que contiene al usuario actual, sus albums con sus respectivas fotos
          // y sus posts con sus comentarios. Se utiliza el spread operator (...) para combinar los objetos
          // y crear uno nuevo que contenga toda la informacion.
        }));
        return {...usuario,photoAlbum,comentPost};//este es el mas importante y el que imprime
        
        //y post con sus comentarios
    }));
};
manejardatos().then((data) => {// 'manejardatos' es una funcion asincrona que se encarga de obtener los datos de los usuarios
  // y sus respectivos posts, comentarios y albums. El resultado de esta funcion es una promesa
  // que se resuelve con un array de objetos, cada objeto contiene la informacion de un usuario
  // con sus respectivos posts, comentarios y albums. Para obtener esta informacion, se utilizan
  // las funciones 'getUsuarios', 'getPost', 'getCommets', 'getAlbums' y 'getPhotos' que se encuentran
  // en los archivos 'usuarios.js', 'posts.js', 'commets.js', 'albums.js' y 'photos.js' respectivamente.
  // La promesa se resuelve con un array de objetos que se imprime en la consola con 'console.log'.
    console.log(data);
});