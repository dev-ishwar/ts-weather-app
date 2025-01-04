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
    if(!query) return [];
    try {
        const key = import.meta.env.VITE_GEOAPIFY_API_KEY;
        const url =  `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&type=city&format=json&apiKey=${key}`
        const res = await fetch(url);
        const data = res.json();
        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to fetch users.");
    }
}