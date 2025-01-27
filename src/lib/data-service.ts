import { Weather } from "../model/CurrentWeather";
import { SearchItem } from "../model/SearchListItem";
import DummyWeather from ".//dummy.json";

type WeatherResponse = typeof DummyWeather;
const API_URL = `https://jsonplaceholder.typicode.com/users`;

export const fetchUsers = async () => {
    try {
        const res = await fetch(API_URL);
        const data = res.json();
        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to fetch users.");
    }
}

export const fetchCities = async (query: string) => {
    if (!query) return [];
    try {
        const key = import.meta.env.VITE_GEOAPIFY_API_KEY;
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&type=city&format=json&apiKey=${key}`
        const res = await fetch(url);
        const data = await res.json();
        const options: SearchItem[] = data?.results?.map((option: Record<string, any>) => ({
            id: option.place_id,
            city: option.city,
            state: option.state,
            country: option.country,
            formatted: option.formatted,
            lat: option.lat,
            lon: option.lon,
            county: option.county,
        }))
        return options;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to fetch users.");
    }
}

export const fetchCurrentWeather = async (query: string) => {
    if (!query) return null;
    try {
        const key = import.meta.env.VITE_WEATHER_API_KEY;
        const url = `https://api.weatherapi.com/v1/forecast.json?q=${query}&days=5&key=${key}`
        const res = await fetch(url);
        const data: WeatherResponse = await res.json();

        if (data?.error) {
            return {
                error: data.error.message
            }
        }

        const weather = data.current;
        const location = data.location;
        const result: Weather = {
            location: location.name,
            region: location.region,
            country: location.country,
            last_updated: weather.last_updated,
            temp_c: weather.temp_c,
            wind_kph: weather.wind_kph,
            pressure_mb: weather.pressure_mb,
            precip_mm: weather.precip_mm,
            condition_text: weather.condition.text,
            condition_icon: weather.condition.icon,
        };
        return {
            weather: result
        };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to fetch weather.");
    }
}