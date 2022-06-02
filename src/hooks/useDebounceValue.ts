import { useEffect, useState } from "react";
export function useDebounceValue<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    return () => clearInterval(timer);
  }, [value, delay]);
  return debounceValue;
}
