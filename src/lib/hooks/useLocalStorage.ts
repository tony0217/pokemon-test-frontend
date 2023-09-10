import { useState } from "react";

function useLocalStorage(key: string, initialValue: any): LocalStorageProps {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    function setValue(value: any) {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    function removeLocalStorage() {
        //   window.localStorage.clear();
        window.localStorage.removeItem('isAuthenticated');
    }

    return { storedValue, setValue, removeLocalStorage }
}

export interface LocalStorageProps {
    storedValue: any;
    setValue: React.Dispatch<React.SetStateAction<boolean>>
    removeLocalStorage: () => void
}


export default useLocalStorage;

