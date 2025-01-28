import { fetchCities, fetchCurrentWeather } from "./lib/data-service";
import { debounce } from "./lib/helper";
import SearchList from "./model/SearchList";
import { SearchItem } from "./model/SearchListItem";
import CurrentWeatherTemplate from "./template/CurrentWeatherTemplate";
import DailyForecastTemplate from "./template/DailyForecastTemplate";
import { Loader } from "./template/Loader";
import { NofificationTypeEnum, NotificationTemplate } from "./template/NotificationTemplate";
import SearchTemplate from "./template/SearchTemplate";

const searchList = SearchList.instance;
const searchTemplace = SearchTemplate.instance;
const loader = Loader.instance;
const notification = NotificationTemplate.instance;

const searchLocation = async (query: string) => {
  if (!query) {
    searchTemplace.clear();
    return;
  };

  loader.show();
  const cities = await fetchCities(query);
  searchList.load(cities);
  searchTemplace.render(searchList);
  loader.hide();
}

export const handleLocationClick = async (place: SearchItem) => {
  loader.show();

  const template = CurrentWeatherTemplate.instance;
  const dailyForecastTemplate = DailyForecastTemplate.instance;

  const q = `${place.lat},${place.lon}`;
  const res = await fetchCurrentWeather(q);

  console.log('error: ', res?.error);

  loader.hide();

  if (res?.error) {
    notification.show(res.error, NofificationTypeEnum.ERROR);
    return;
  }

  if (!res?.weather) {
    notification.show(`Weather data not available.`, NofificationTypeEnum.ERROR);
    return;
  };

  notification.show(`Weather for ${place.formatted}`);
  searchTemplace.clear();
  template.render(res.weather);
  dailyForecastTemplate.render(res.forecast);
}


// ?? How to handle async function in debounce.
const debounceSearch = debounce(searchLocation, 500);
const init = () => {
  const input = document.getElementById('search') as HTMLInputElement;
  input.addEventListener('input', function (this: HTMLInputElement) {
    debounceSearch(this.value);
  })
}

document.addEventListener("DOMContentLoaded", init);