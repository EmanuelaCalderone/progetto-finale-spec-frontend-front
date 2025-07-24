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

    //1.logica per aggiunzione/rimozione preferiti con useCallback (per evitare che si ricrei causando re-render nei dei componenti che la usano)
    const isPhoneInFavorites = useCallback((phoneId) => {
        return favorites.some((f) => f.id === phoneId);
    }, [favorites]);

    const toggleFavorite = (phone) => {
        const isInList = favorites.some((f) => f.id === phone.id);

        const updated = isInList
            //se è già nei preferiti, lo rimuovo
            ? favorites.filter((f) => f.id !== phone.id)
            //altrimenti lo aggiungo
            : [...favorites, phone];

        //aggiorno lo stato con l'array modificato
        setFavorites(updated);
    };

    //2 logica per aggiungzione/rimozione lista di confronto con useCallback 
    const isPhoneInCompareList = useCallback((phoneId) => {
        return compareList.some((p) => p.id === phoneId);
    }, [compareList]);

    //gestione interattiva dello stato
    const toggleCompare = (phone) => {
        const isInList = compareList.some((p) => p.id === phone.id);

        const updated = isInList
            //rimuovo il telefono cliccato
            ? compareList.filter((p) => p.id !== phone.id)
            : compareList.length < 3
                ? [...compareList, phone]
                : compareList;

        //aggiorno lo stato con l'array modificato
        setCompareList(updated);
    };

    //funzione per azzerare la lista
    const clearCompare = () => {
        setCompareList([]);
    };

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
                setFavorites,
                toggleFavorite,
                compareList,
                toggleCompare,
                clearCompare,
                sidebarOpen,
                toggleSidebar,
                setCompareList,
                isPhoneInCompareList,
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
