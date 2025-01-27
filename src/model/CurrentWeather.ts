export interface Weather {
    location: string
    region: string
    country: string
    last_updated: string
    temp_c: number
    wind_kph: number
    pressure_mb: number
    precip_mm: number
    condition_text: string
    condition_icon: string
}

export class CurrentWeather implements Weather {
    constructor(
        private _location: string,
        private _region: string,
        private _country: string,
        private _last_updated: string,
        private _temp_c: number,
        private _wind_kph: number,
        private _pressure_mb: number,
        private _precip_mm: number,
        private _condition_text: string,
        private _condition_icon: string
    ) {}

    get location(): string {
        return this._location;
    }

    set location(value: string) {
        this._location = value;
    }

    get region(): string {
        return this._region;
    }

    set region(value: string) {
        this._region = value;
    }

    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }

    get last_updated(): string {
        return this._last_updated;
    }

    set last_updated(value: string) {
        this._last_updated = value;
    }

    get temp_c(): number {
        return this._temp_c;
    }

    set temp_c(value: number) {
        this._temp_c = value;
    }

    get wind_kph(): number {
        return this._wind_kph;
    }

    set wind_kph(value: number) {
        this._wind_kph = value;
    }

    get pressure_mb(): number {
        return this._pressure_mb;
    }

    set pressure_mb(value: number) {
        this._pressure_mb = value;
    }

    get precip_mm(): number {
        return this._precip_mm;
    }

    set precip_mm(value: number) {
        this._precip_mm = value;
    }

    get condition_text(): string {
        return this._condition_text;
    }

    set condition_text(value: string) {
        this._condition_text = value;
    }

    get condition_icon(): string {
        return this._condition_icon;
    }

    set condition_icon(value: string) {
        this._condition_icon = value;
    }
}