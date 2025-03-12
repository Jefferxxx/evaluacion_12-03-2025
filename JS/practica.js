// Función asíncrona llamada 'llamado' que realiza una petición a una URL dada y devuelve los datos en formato JSON.
async function llamado(link) {
    try {
      // Intenta ejecutar el siguiente bloque de código.
      const llamar = await fetch(link);
      // Realiza una petición a la URL especificada en 'link' usando la función 'fetch'.
      // 'await' espera a que la promesa 'fetch' se resuelva antes de continuar.
      // El resultado de la petición (la respuesta del servidor) se guarda en la variable 'llamar'.
  
      if (!llamar.ok) {
        // Comprueba si la respuesta del servidor indica un error.
        // 'llamar.ok' es 'true' si el código de estado HTTP está en el rango 200-299 (éxito), y 'false' en caso contrario.
        throw new Error(`HTTP error! status: ${llamar.status}`);
        // Si la respuesta no es exitosa, lanza un error con el código de estado HTTP.
        // Esto interrumpe la ejecución del bloque 'try' y pasa el control al bloque 'catch'.
      }
  
      const data = await llamar.json();
      // Convierte el cuerpo de la respuesta (que está en formato JSON) a un objeto JavaScript.
      // 'await' espera a que la promesa 'llamar.json()' se resuelva antes de continuar.
      // El objeto JavaScript resultante se guarda en la variable 'data'.
  
      return data;
      // Devuelve los datos obtenidos de la API.
    } catch (error) {
      // Captura cualquier error que ocurra en el bloque 'try'.
      console.error("Error en la función llamado:", error);
      // Imprime el error en la consola para facilitar la depuración.
      throw error;
      // Vuelve a lanzar el error para que pueda ser manejado por la función que llamó a 'llamado'.
    }
  }
  
  // Función asíncrona llamada 'obtener_datos' que obtiene datos de usuarios, sus posts y los comentarios de cada post desde una API.
  async function obtener_datos() {
    try {
      // Intenta ejecutar el siguiente bloque de código.
      const info_usuario = await llamado("https://jsonplaceholder.typicode.com/users");
      // Llama a la función 'llamado' para obtener la lista de usuarios de la API.
      // 'await' espera a que la promesa 'llamado' se resuelva antes de continuar.
      // Los datos de los usuarios se guardan en la variable 'info_usuario'.
  
      const nombres = await Promise.all(
        // Utiliza 'Promise.all' para esperar a que todas las promesas dentro del 'map' se resuelvan.
        // Esto permite realizar todas las peticiones de forma concurrente, mejorando el rendimiento.
        info_usuario.map(async (user) => {
          // Itera sobre cada usuario en la lista 'info_usuario'.
          // 'map' crea un nuevo array con los resultados de llamar a la función proporcionada en cada elemento del array original.
          const info_posts = await llamado(
            `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
          );
          // Llama a la función 'llamado' para obtener la lista de posts del usuario actual.
          // 'await' espera a que la promesa 'llamado' se resuelva antes de continuar.
          // Los datos de los posts se guardan en la variable 'info_posts'.
  
          const posts = await Promise.all(
            // Utiliza 'Promise.all' para esperar a que todas las promesas dentro del 'map' se resuelvan.
            info_posts.map(async (post) => {
              // Itera sobre cada post en la lista 'info_posts'.
              const info_comentarios = await llamado(
                `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
              );
              // Llama a la función 'llamado' para obtener la lista de comentarios del post actual.
              // 'await' espera a que la promesa 'llamado' se resuelva antes de continuar.
              // Los datos de los comentarios se guardan en la variable 'info_comentarios'.
  
              const comentarios = info_comentarios.map((coment) => ({
                // Itera sobre cada comentario en la lista 'info_comentarios'.
                post: post.title,
                // Guarda el título del post asociado al comentario.
                comentario: coment.name,
                // Guarda el nombre del comentario.
              }));
  
              return {
                // Devuelve un objeto con la información del post y sus comentarios.
                name: user.name,
                // Guarda el nombre del usuario que hizo el post.
                post: post.title,
                // Guarda el título del post.
                comentarios: comentarios,
                // Guarda la lista de comentarios del post.
              };
            })
          );
  
          return {
            // Devuelve un objeto con la información del usuario y sus posts.
            name: user.name,
            // Guarda el nombre del usuario.
            posts: posts,
            // Guarda la lista de posts del usuario.
          };
        })
      );
      return nombres;
      // Devuelve la lista de usuarios con sus posts y comentarios.
    } catch (error) {
      // Captura cualquier error que ocurra en el bloque 'try'.
      console.error("Error en la función obtener_datos:", error);
      // Imprime el error en la consola para facilitar la depuración.
      throw error;
      // Vuelve a lanzar el error para que pueda ser manejado por el código que llamó a 'obtener_datos'.
    }
  }
  
  obtener_datos().then(console.log);
  // Llama a la función 'obtener_datos' para obtener los datos de la API.
  // '.then' se ejecuta cuando la promesa 'obtener_datos' se resuelve.
  // 'console.log' imprime los datos obtenidos en la consola.
  