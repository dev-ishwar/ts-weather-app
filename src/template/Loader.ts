interface ILoader {
    show(): void,
    hide(): void,
}

export class Loader implements ILoader {
    static readonly instance = new Loader();
    loader: HTMLDivElement;
    constructor() {
        this.loader = document.getElementById('loader') as HTMLDivElement;
    }

    show() {
        this.loader.classList.remove('hide');
    }

    hide() {
        this.loader.classList.add('hide');
    }
}