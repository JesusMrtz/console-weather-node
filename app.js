import { Searches } from "./models/searches.js";
import { inquirerCheckListTask, inquirerListPlaces, inquirerMenu, inquirerPause, inquirerReadInput } from "./helpers/inquirer.js";

 
async function main() {
    const searches = new Searches();
    let option = '';

    do {
        console.clear();
        option = await inquirerMenu();

        switch (option) {
            case '1': // Buscar ciudad
                const searchCity = await inquirerReadInput('Escriba la ciudad');
                const getCities = await searches.getCities(searchCity);

                if ( !Array.isArray(getCities) ) {
                    console.log('Hubo un error con la petición'.red);
                    console.log(getCities.error);
                    break;
                }

                const id = await inquirerListPlaces(getCities);
                const selectedCity = getCities.find(city => city.id === id);

                if ( selectedCity === undefined ) break;
                
                const getWeather = await searches.getWeatherOfTheCity(selectedCity);

                if (  !getWeather.ok ) {
                    console.log('Hubo un error con la petición del clima'.red);
                    console.log(getWeather.error);
                    break;
                }

                selectedCity.weather = getWeather;
                searches.addHistory(searchCity);

                console.log(searches.showCityInformation( selectedCity ));
                break;
            case '2':
                console.log(searches.showHistoryOfCities());
                break;
            default:
                break;
        }

        if ( option !== '0' ) await inquirerPause();
        console.clear();
    } while (option !== '0');
}

main();