import { fetchCities, fetchCurrentWeather } from "./lib/data-service";
import { debounce } from "./lib/helper";
import SearchList from "./model/SearchList";
import { SearchItem } from "./model/SearchListItem";
import CurrentWeatherTemplate from "./template/CurrentWeatherTemplate";
import SearchTemplate from "./template/SearchTemplate";

const searchList = SearchList.instance;
const searchTemplace = SearchTemplate.instance;

const searchLocation = async (query: string) => {
  if (!query) {
    searchTemplace.clear();
    return;
  };

  const cities = await fetchCities(query);

  searchList.load(cities);
  searchTemplace.render(searchList);
}

export const handleLocationClick = async (place: SearchItem) => {
  console.log('place: ', place, place.county)
  const template = CurrentWeatherTemplate.instance;
  const res = await fetchCurrentWeather(place.county ?? place.city);

  console.log('error: ', res?.error);
  if (res?.weather) {
    searchTemplace.clear();
    template.render(res.weather);
  }
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