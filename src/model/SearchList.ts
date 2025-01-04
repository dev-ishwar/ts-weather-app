import { SearchItem } from "./SearchListItem";

interface List {
    list: SearchItem[],
    load(): void,
    clearList(): void
}

export default class SearchList implements List {
    private constructor(private _list: SearchItem[]) { }

    get list(): SearchItem[] {
        return this._list;
    }

    set list(list: SearchItem[]) {
        this._list = list;
    }

    clearList(): void {
        this._list = [];
    }

    load(): void {
        
    }
}