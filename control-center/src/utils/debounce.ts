function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...funcArgs: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
    return function (this:any,...args: Parameters<T>): void {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
  
      timeoutId = setTimeout(() => func.apply(this, args), wait);
    };
  }
  
  export default debounce;