import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();


const instance = axios.create({
    baseURL: process.env.BASE_MAPBOX_URL,
    params: {
        access_token: process.env.MAPBOX_TOKEN ,
        limit: 5,
        language: 'es'
    }
});



export async function getCities(city) {
    try {
        const getResponse = await instance.get(`/${city}.json`);
        const data = await getResponse.data;

        return data.features.map(({id, place_name, center}) => ({ 
            ok: true, 
            id: id, 
            name: place_name, 
            lng: center[0], 
            lat: center[1] }
        ));
    } catch (error) {
        return {
            ok: false,
            error
        }
    }
}