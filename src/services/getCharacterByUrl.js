import axios from "axios"

export const getCharacterByUrl = async (url) => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error(error)
    }
}