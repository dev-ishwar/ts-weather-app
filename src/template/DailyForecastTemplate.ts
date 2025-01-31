import { loggedMethod } from "../lib/decorators";
import { formateDate } from "../lib/helper";
import { DailyWeatherType } from "../lib/types";

interface DailyForecastUI {
    container: HTMLElement,
    render(forecast: DailyWeatherType[]): void,
    clear(): void,
}

export default class DailyForecastTemplate implements DailyForecastUI {
    static readonly instance = new DailyForecastTemplate();
    container: HTMLElement;
    private constructor() {
        this.container = document.getElementById('daily-forecast') as HTMLElement;
    }

    @loggedMethod
    render(forecast: DailyWeatherType[]): void {
        this.clear();
        console.log('forecast: ', forecast)
        forecast.forEach(day => {
            const forecastItem = document.createElement('article');

            const div = document.createElement('div');
            div.classList.add('daily');

            const h4 = document.createElement('h4');
            h4.classList.add('daily__date');
            h4.innerText = formateDate(day.date);
            

            // Image
            const imgDiv = document.createElement('div');
            imgDiv.classList.add('daily__condition')

            const img = document.createElement('img');
            img.src = day.condition.icon;
            img.alt = day.condition.text;
            
            const condition = document.createElement('p');
            condition.innerText = day.condition.text;
            imgDiv.append(img, condition);

            // Temp details
            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('daily__temp')

            // Max temp details
            const maxTempP = document.createElement('p');

            const maxLabel = document.createElement('span');
            maxLabel.appendChild(document.createTextNode('Max: '))
            const maxTemp = document.createElement('span');
            maxTemp.appendChild(document.createTextNode(`${day.maxtemp_c}°C`))
            maxTempP.append(maxLabel, maxTemp);

            // Min temp details
            const minTempP = document.createElement('p');

            const minLabel = document.createElement('span');
            minLabel.appendChild(document.createTextNode('Min: '))
            const minTemp = document.createElement('span');
            minTemp.appendChild(document.createTextNode(`${day.mintemp_c}°C`))
            minTempP.append(minLabel, minTemp);

            // Append temp details to temp container
            detailsDiv.append(maxTempP, minTempP)

            // Append img and details to container
            div.append(imgDiv, detailsDiv)

            forecastItem.append(h4, div)
            this.container.appendChild(forecastItem);
        })
    }

    clear(): void {
        this.container.innerHTML = '';
    }
}