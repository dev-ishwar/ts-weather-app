
interface INofication {
    show(msg: string, type?: string): void;
    hide(): void;
    showBar(): void;
}

export enum NofificationTypeEnum {
    ERROR = "ERROR",
    SUCCESS = 'SUCCESS',
}

export class NotificationTemplate implements INofication {
    static readonly instance = new NotificationTemplate();
    container: HTMLDivElement;
    message: HTMLParagraphElement;
    bar: HTMLDivElement;
    timeout?: number;
    private constructor() {
        this.container = document.getElementById('notification') as HTMLDivElement;
        this.message = document.getElementById('notification__message') as HTMLParagraphElement;
        this.bar = document.querySelector('.notification__bar') as HTMLDivElement;

        const button = document.getElementById('close-notification') as HTMLButtonElement;

        button.addEventListener('click', () => {
            this.hide();
        })
    }

    showBar(): void {
        if (this.timeout) clearInterval(this.timeout);
        let w = 100;
        this.timeout = setInterval(() => {
            if (w <= 0) {
                clearInterval(this.timeout);
                this.hide();
            }
            w -= 1;
            if (this.bar.style) this.bar.style.width = `${w}%`;
        }, 50)
    }


    show(msg: string, type?: string): void {
        this.message.innerText = msg;

        if (type === NofificationTypeEnum.ERROR) {
            this.container.style.color = 'red';
        }

        this.container.classList.remove('hide');
        this.container.classList.add('show');
        this.showBar();
    }

    hide(): void {
        this.container.classList.add('hide');
        this.container.classList.remove('show');

    }
}
