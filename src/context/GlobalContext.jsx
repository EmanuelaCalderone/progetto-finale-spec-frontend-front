import React, { createContext, useContext, useState, useCallback } from 'react';

//importo hook per localStorage
import { useLocalStorage } from '../hooks/useLocalStorage';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {

    //STATI 

    //1.inizializzo stato dei PREFERITI salvati su LOCALSTORAGE (dati persistenti)
    const [favorites, setFavorites] = useLocalStorage('favorites', []);

    //2.inizializzo stato per lista CONFRONTO salvata su LOCALSTORAGE
    const [compareList, setCompareList] = useLocalStorage('compareList', []);

    //3.inizializzo stato per apertura/chiusura SIDEBAR
    const [sidebarOpen, setSidebarOpen] = useState(false);

    //LOGICHE 

    //1.logica per lettura + aggiunzione/rimozione preferiti con useCallback (per evitare che si ricrei causando re-render nei dei componenti che la usano)
    const toggleFavorite = useCallback((phone) => {
        const isInList = favorites.some((f) => f.id === phone.id);

        const updated = isInList
            ? favorites.filter((f) => f.id !== phone.id)
            : [...favorites, phone];

        setFavorites(updated);
    }, [favorites]);

    //1.1 per evuotare la lista
    const clearFavorites = () => {
        setFavorites([]);
    };

    //2 logica per lettura e aggiungzione/rimozione lista di confronto con useCallback 
    const toggleCompare = useCallback((phone) => {
        const isInList = compareList.some((p) => p.id === phone.id);

        const updated = isInList
            //se il telefono è già nella lista, lo rimuovo
            ? compareList.filter((p) => p.id !== phone.id)
            //altrimenti lo aggiungo (se la lista ha meno di 3 elementi)
            : compareList.length < 3
                ? [...compareList, phone]
                : compareList;

        setCompareList(updated);
    }, [compareList]);

    //3.logica per apertura/chiusura sidebar
    const toggleSidebar = () => {
        //inverto il valore attuale
        setSidebarOpen((prev) => !prev);
    };

    //export dal context
    return (
        <GlobalContext.Provider
            value={{
                favorites,
                toggleFavorite,
                clearFavorites,
                compareList,
                toggleCompare,
                sidebarOpen,
                toggleSidebar,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

//custom hook per usare il context
export function useGlobalContext() {
    return useContext(GlobalContext);
}
