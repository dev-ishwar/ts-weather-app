import { loggedMethod } from "../lib/decorators";
import { formateDateTime } from "../lib/helper";
import { Weather } from "../model/CurrentWeather";

interface CurrentWeatherUI {
    container: HTMLElement
    render(weather: Weather): void
    clear(): void
}

export default class CurrentWeatherTemplate implements CurrentWeatherUI {
    static readonly instance = new CurrentWeatherTemplate();
    container: HTMLElement;

    private constructor() {
        this.container = document.getElementById('weather') as HTMLElement;
    }

    clear(): void {
        this.container.innerHTML = '';
    }

    @loggedMethod
    render(weather: Weather): void {
        this.clear();
        const template = createWeatherTemplate(weather);
        this.container?.appendChild(template);
        this.container.classList.remove('hide');
    }
}

function createWeatherTemplate(weather: Weather) {
    // Create the current weather container
    const currentWeather = document.createElement('div');
    currentWeather.classList.add('current');

    // Create and append the location div
    const locationDiv = document.createElement('div');
    locationDiv.classList.add('location');

    const citySpan = document.createElement('span');
    citySpan.classList.add('city');
    citySpan.innerText = weather.location;

    const stateSpan = document.createElement('span');
    stateSpan.classList.add('state');
    stateSpan.innerText = `${weather.region} ${weather.country}`;

    locationDiv.appendChild(citySpan);
    locationDiv.appendChild(stateSpan);

    // Create and append the updated div
    const updatedDiv = document.createElement('div');
    updatedDiv.classList.add('updated');

    const atSpan = document.createElement('span');
    atSpan.classList.add('at');
    atSpan.textContent = 'Updated at: ';

    const updateAtSpan = document.createElement('span');
    updateAtSpan.classList.add('update_at');
    updateAtSpan.innerText = formateDateTime(weather.last_updated, false);

    updatedDiv.appendChild(atSpan);
    updatedDiv.appendChild(updateAtSpan);

    // Create and append the icon div
    const iconDiv = document.createElement('div');
    iconDiv.classList.add('icon');

    const conditionImg = document.createElement('img');
    conditionImg.classList.add('condition_icon');
    conditionImg.setAttribute('alt', weather.condition_text);
    conditionImg.setAttribute('src', weather.condition_icon); // Add the appropriate src URL dynamically later

    const conditionText = document.createElement('span');
    conditionText.classList.add('condition_text');
    conditionText.innerText = weather.condition_text;

    iconDiv.appendChild(conditionImg);
    iconDiv.appendChild(conditionText);

    // Create and append the details div
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');

    const tempSpan = document.createElement('span');
    tempSpan.classList.add('temp');
    tempSpan.innerText = weather.temp_c?.toString();
    tempSpan.appendChild(document.createTextNode('°C'))

    const windP = document.createElement('p');
    windP.classList.add('extra');
    windP.textContent = 'wind: ';

    const windSpan = document.createElement('span');
    windSpan.classList.add('wind');
    windSpan.innerText = weather.wind_kph.toString()
    windP.appendChild(windSpan);
    windP.appendChild(document.createTextNode('kmph'));

    const precipP = document.createElement('p');
    precipP.classList.add('extra');
    precipP.textContent = 'precip: ';

    const precipSpan = document.createElement('span');
    precipSpan.classList.add('precip');
    precipSpan.innerText = weather.precip_mm.toString();
    precipP.appendChild(precipSpan);
    precipP.appendChild(document.createTextNode('mb'));

    const pressureP = document.createElement('p');
    pressureP.classList.add('extra');
    pressureP.textContent = 'pressure: ';

    const pressureSpan = document.createElement('span');
    pressureSpan.classList.add('pressure');
    pressureSpan.innerText = weather.pressure_mb.toString();
    pressureP.appendChild(pressureSpan);
    pressureP.appendChild(document.createTextNode('bp'));

    detailsDiv.appendChild(tempSpan);
    detailsDiv.appendChild(windP);
    detailsDiv.appendChild(precipP);
    detailsDiv.appendChild(pressureP);

    // Append all elements to the currentWeather div
    currentWeather.appendChild(locationDiv);
    currentWeather.appendChild(updatedDiv);
    currentWeather.appendChild(iconDiv);
    currentWeather.appendChild(detailsDiv);

    return currentWeather;
}