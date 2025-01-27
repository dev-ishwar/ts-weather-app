import { SearchItem } from "./SearchListItem";

interface List {
    list: SearchItem[],
    load(items: SearchItem[]): void,
    clearList(): void
}

export default class SearchList implements List {
    static readonly instance: SearchList = new SearchList();
    private constructor(private _list: SearchItem[] = []) { }

    get list(): SearchItem[] {
        return this._list;
    }

    set list(list: SearchItem[]) {
        this._list = list;
    }

    clearList(): void {
        this._list = [];
    }

    load(items: SearchItem[]): void {
        this._list = items;
    }
}