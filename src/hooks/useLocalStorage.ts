import { useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const isFirst = useRef(true);
  const skipNextWrite = useRef(false);

  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch (error) {
      console.error("Error getting localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    try {
      // Don't save if value is null or an empty array
      if (value === null || (Array.isArray(value) && value.length === 0)) {
        return;
      }
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  }, [key, value]);

  const clearData = () => {
    try {
      window.localStorage.removeItem(key);
      skipNextWrite.current = true;
      setValue(initialValue);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  return [value, setValue, clearData] as const;
}
