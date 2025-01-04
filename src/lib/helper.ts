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