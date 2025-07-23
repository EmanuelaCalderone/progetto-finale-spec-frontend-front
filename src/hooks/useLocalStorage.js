import { useState, useEffect } from 'react';

// inizializzo lo stato leggendo il valore dal localStorage (se esiste), altrimenti uso il valore iniziale
export function useLocalStorage(key, initialValue) {
    //value= stato che rappresenta i dati salvati(lista confronto e pref)
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initialValue;
    });

    //sincronizzo lo stato con il localStorage ogni volta che cambia key o value
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
