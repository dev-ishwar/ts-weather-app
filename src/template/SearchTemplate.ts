import { handleLocationClick } from "../main";
import SearchList from "../model/SearchList";

interface DOMList {
    ul: HTMLUListElement;
    clear(): void;
    render(searchList: SearchList): void
}

export default class SearchTemplate implements DOMList {
    ul: HTMLUListElement;
    static readonly instance = new SearchTemplate();

    private constructor() {
        this.ul = document.getElementById('searchResults') as HTMLUListElement;
    }

    clear(): void {
        this.ul.innerHTML = "";
        this.ul.classList.add('hide');
    }

    render(searchList: SearchList): void {
        this.clear();
        searchList.list.forEach(item => {
            const li = document.createElement("li");
            li.className = 'item';

            const span = document.createElement("span");
            span.innerText = item.formatted
            li.append(span);

            li.addEventListener("click", () => {
                handleLocationClick(item);
            })

            this.ul.append(li);
        })

        if (!searchList.list.length) {
            const li = document.createElement("li");
            li.className = 'item';

            const span = document.createElement("span");
            span.innerText = `No records found.`
            li.append(span);
            this.ul.append(li);
        }
    }
}