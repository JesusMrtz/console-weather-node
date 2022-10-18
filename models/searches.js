import { writeFileSync, readFileSync } from 'fs';
import { getCities as getCitiesAPI } from '../API/mapbox.js';
import { getWeather } from '../API/openwheater.js';


export class Searches {
    history = new Set();

    constructor() {
        this.history = this.readDatabase();
    }

    async getCities(city) {
        return await getCitiesAPI(city);
    }

    async getWeatherOfTheCity(city) {
        return await getWeather(city);
    }

    addHistory(city) {
        const historyArray = Array.from(this.history);
        historyArray.unshift(city.toLowerCase());

        if ( historyArray.length > 5 ) historyArray.pop();

        this.history = new Set(historyArray);
        this.saveDatabase();

        return this.history;    
    }

    async saveDatabase() {
        const payload = { history: Array.from(this.history) };
        await writeFileSync('./db/cities.json', JSON.stringify(payload));
    }

    readDatabase() {
        try {
            let file = readFileSync('./db/cities.json', { encoding: 'utf-8' });
            file = JSON.parse(file);

            return new Set(file.history);  
        } catch (error) {
            return new Set();
        }
    }


    showCityInformation(city) {
        return `
        \n${'Información de la ciudad\n'.green}
        Ciudad: ${ city.name }
        Lat: ${ city.lat }
        Lng: ${ city.lng }
        Temperatura: ${ city.weather.temp }°C
        Mínima: ${ city.weather.temp_min }°C
        Máxima: ${ city.weather.temp_max }°C
        ¿Cómo está el clima?: ${ city.weather.temp_description }
        `;
    }

    showHistoryOfCities() {
        let result = '\n';
        let index = 1;

        this.history.forEach((city) => {
            result+= `${ String(index).green }. ${ city.charAt(0).toUpperCase() + city.slice(1) }\n`;
            index++;
        });
        return result;
    }
}