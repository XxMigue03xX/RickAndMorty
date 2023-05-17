export const getRandomNumber = (min, max) => {
    // Obtenemos la distancia entre los numeros
    const amplitud = Math.abs(max-min);
    // Generamos un numero aleatorio entre 0 y esa distancia
    const randomAmplitud = Math.round(Math.random()*amplitud);
    // Retornamos la distancia aleatoria mas el minimo dado
    return min + randomAmplitud;
}