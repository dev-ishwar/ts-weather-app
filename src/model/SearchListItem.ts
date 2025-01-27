export interface SearchItem {
    id: string;
    city: string;
    state: string;
    country: string;
    placeId?: string;
    formatted: string;
    lat?: number;
    lon?: number;
    county: string;
}

export default class SearchListItem implements SearchItem {
    constructor(
        private _id: string = "",
        private _city: string = "",
        private _state: string = "",
        private _country: string = "",
        private _formatted: string = "",
        private _county: string = "",
    ) { }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get city(): string {
        return this._city;
    }

    set city(city: string) {
        this._city = city;
    }

    get state(): string {
        return this._state;
    }

    set state(state: string) {
        this._state = state;
    }

    get country(): string {
        return this._country;
    }

    set country(country: string) {
        this._country = country;
    }

    get formatted(): string {
        return this._formatted;
    }

    set formatted(formatted: string) {
        this._formatted = formatted;
    }

    get county(): string {
        return this._county;
    }

    set county(county: string) {
        this._county = county;
    }
}
