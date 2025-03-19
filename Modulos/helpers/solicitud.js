export const solicitud = async url => {
  
  // Realiza una solicitud a la URL especificada en 'url' usando la función 'fetch'.
  // La función 'await' espera a que la promesa 'fetch' se resuelva antes de continuar.
  // El resultado de la solicitud (la respuesta del servidor) se guarda en la variable 'peticion'.
  const peticion = await fetch(url);
  
  // Convierte el cuerpo de la respuesta (que está en formato JSON) a un objeto JavaScript.
  // 'await' espera a que la promesa 'peticion.json()' se resuelva antes de continuar.
  // El objeto JavaScript resultante se guarda en la variable 'data'.
  const data = await peticion.json();
  //que sea un objeto
  return data//retorna data que es el objeto con los valoers
}