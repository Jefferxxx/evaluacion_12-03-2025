import {solicitud} from "../Modulos/helpers/solicitud.js";//importa el modulo solicitud para ver los usuarios
export  const getUsuarios=async(URL,id)=>{//exporta todo de una vez y no necesita usar expoert luego
    let ruta="";
    if (id) {// se usa el if para ver si se ingresa un id o no lo cual esto es una sentencia
     ruta=`${URL}/users?id=${id}`;//esto esta diseñado para encontrar un usuario en especifico
    }else{
        ruta=`${URL}/users`;
    }
  
    //la funcion solicitud se utiliza para obtener los usuarios de la api, si se ingresa un id
    //se mostrara solo el usuario con ese id, si no se ingresa nada se mostraran todos los usuarios
    const usuarios = await solicitud(ruta);
    return usuarios;
}