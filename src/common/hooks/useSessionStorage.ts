import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { parseJSON } from "utils/parse";
import useEventListener from "./useEventListener";

type SetValue<T> = Dispatch<SetStateAction<T>>;

const useSessionStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
  // Get from session storage then parse stored json or return initialValue
  const readValue = (): T => {
    // Prevent build error "window is undefined"
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key ${key} :`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const setValue: SetValue<T> = (value) => {
    // Prevent build error "window is undefined"
    if (typeof window == "undefined") {
      console.warn(
        `Tried setting sessionStorage ${key} even though environment is not a client`
      );
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;

      window.sessionStorage.setItem(key, JSON.stringify(newValue));

      setStoredValue(newValue);

      window.dispatchEvent(new Event("session-storage"));
    } catch (error) {
      console.warn(`Error setting sessionStorage key ${key} :`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = () => {
    setStoredValue(readValue());
  };

  useEventListener("storage", handleStorageChange);

  useEventListener("session-storage", handleStorageChange);

  return [storedValue, setValue];
};

export default useSessionStorage;
