import { useState, useEffect } from "react";


function useLocalStorage<T>(key: string, initialValue: T) {
  
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
     
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [key, storedValue]);

 
  const clearStorage = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  return [storedValue, setStoredValue, clearStorage] as const;
}

export default useLocalStorage;
