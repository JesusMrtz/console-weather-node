import 'colors'

export const menuChoices = [
    {
        value: '1',
        name: `${ '1.'.green } Buscar ciudad`
    },
    {
        value: '2',
        name: `${ '2.'.green } Historial de búsquedas`
    },
    {
        value: '0',
        name: `${ '0.'.green } Salir`
    }
]

export function menuCitiesChoices(cities) {
    const choices = cities.map((city, index) => ({ value: city.id, name: `${String(index + 1).green}. ${ city.name }`}));
    choices.unshift({ value: '0', name: `${'0.'.green} Cancelar` });
    return choices;
}