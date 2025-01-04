import { fetchCities, fetchUsers } from "./lib/data-service";
import { debounce } from "./lib/helper";

const print = async (query: string) => {
  console.log('s: ', query)
  const cities = await fetchCities(query);
  console.log('cities', cities);
}


// ?? How to handle async function in debounce.
const debounceSearch = debounce(print, 500);
const init = () => {
  console.log(import.meta.env)
  const input = document.getElementById('search') as HTMLInputElement;
  input.addEventListener('input', function (this: HTMLInputElement) {
    // console.log('ece: ', this.value)
    debounceSearch(this.value);
  })
}

document.addEventListener("DOMContentLoaded", init);