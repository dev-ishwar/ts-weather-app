export function debounce<T extends (...args: any[]) => void>(cb: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>): void => {
        const later = () => {
            clearTimeout(timeout);
            cb(...args);
        }
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }
}

export function formateDate(date: Date | string) {
    const d = new Date(date);
    const formatter = new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    return formatter.format(d);
}

export function formateDateTime(date: Date | string, withDate: boolean = false) {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = withDate
        ? {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        } : {
            hour: 'numeric',
            minute: 'numeric',
        }

    const formatter = new Intl.DateTimeFormat('en-IN', options);
    return formatter.format(d);
}