

// utils.ts
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
    let timeoutId: number | null = null;

    return function(this: any, ...args: any[]) {
        clearTimeout(timeoutId!);
        timeoutId = setTimeout(() => func.apply(this, args), delay) as unknown as number;
    } as T;
}
