import axios from "axios";

// Guardamos la url base en una constante
const baseUrl = "https://rickandmortyapi.com/api";

export const getLocationById = async (locationId) => {
    try {
        // Peticion a la api
        const res = await axios.get(`${baseUrl}/location/${locationId}`);
        // Retornamos la respuesta de la api
        return res.data;
    } catch (error) {
        console.error(error);
    }
};