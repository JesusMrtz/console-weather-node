import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();


const instance = axios.create({
    baseURL: process.env.BASE_OPENWEATHER_URL,
    params: {
        appid: process.env.OPENWEATHER_TOKEN ,
        units: 'metric',
        lang: 'es'
    }
});


export async function getWeather({lat, lng}) {
    try {
        const getResponse = await instance.get(`/weather`, {
            params: {
                lat: lat,
                lon: lng 
            }
        });
        
        const { data } = await getResponse;

        return { 
            ok: true,
            temp_description: data.weather[0].description,
            temp_min: data.main.temp_min,
            temp: data.main.temp,
            temp_max: data.main.temp_max
        }
    } catch (error) {
        return {
            ok: false,
            error
        }
    }
}