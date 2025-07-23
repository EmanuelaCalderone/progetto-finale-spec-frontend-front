import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

//importo hook per localStorage
import { useLocalStorage } from '../hooks/useLocalStorage';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {

    //1.inizializzo stato dei PREFERITI salvati su LOCALSTORAGE (dati persistenti)
    const [favorites, setFavorites] = useLocalStorage('favorites', []);

    //2.inizializzo stato per lista CONFRONTO salvata su LOCALSTORAGE
    const [compareList, setCompareList] = useLocalStorage('compareList', []);

    //3.inizializzo stato per apertura/chiusura SIDEBAR
    const [sidebarOpen, setSidebarOpen] = useState(false);

    //1.1toggleFavorite con useCallback (per evitare che si ricrei causando re-render nei dei componenti che la usano)
    const toggleFavorite = useCallback((phone) => {
        setFavorites((fav) => {
            //controllo se il tel è nei preferiti
            const isFavorite = fav.some((f) => f.id === phone.id);
            return isFavorite
                //se è già nei preferiti, lo rimuovo e restituisco un array con i tel con id diverso da quello cliccato
                ? fav.filter((f) => f.id !== phone.id)
                //altrimenti lo aggiungo
                : [...fav, phone];
        });
    }, []);

    //2.1 funzione con useCallback per verificare se un telefono è già nella lista confronto
    const isPhoneInCompareList = useCallback((phoneId) => {
        return compareList.some((p) => p.id === phoneId);
    }, [compareList]);

    //2.2gestione interattiva dello stato
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

    //3.1 logica per apertura/chiusura sidebar
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
