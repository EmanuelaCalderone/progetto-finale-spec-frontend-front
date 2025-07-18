import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
//importo il debounce
import { debounce } from '../utils/utils';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {

    //1.1stato per ricerca
    const [query, setQuery] = useState('');

    //1.2stato per funzione con debounce per ricerca
    const [debouncedQuery, setDebouncedQuery] = useState('');

    //1.3funzione debounce per non aggiornare lo stato ad ogni battitura
    const handleSearch = useCallback(
        debounce((newQuery) => {
            setDebouncedQuery(newQuery.trim());
            //console.log('Digitazione:', newQuery.trim());
        }, 300),
        []
    );

    //2.1inizializzo stato dei PREFERITI salvati su LOCALSTORAGE (dati persistenti)
    const [favorites, setFavorites] = useState(() => { //così la chiamata avviene solo al primo render (funzione 'lazy inizialiter)
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    });

    //2.2gestione interattiva dello stato
    /* const toggleFavorite = (phone) => {
        const isFavorite = favorites.some((f) => f.id === phone.id);
        const updated = isFavorite
            ? favorites.filter((f) => f.id !== phone.id)
            : [...favorites, phone];
        setFavorites(updated);
    }; */

    //2.2toggleFavorite con useCallback (per evitare che si ri-creata causando re-render nei dei componenti che la usano)
    const toggleFavorite = useCallback((phone) => {
        setFavorites((fav) => {
            const isFavorite = fav.some((f) => f.id === phone.id);
            return isFavorite
                ? fav.filter((f) => f.id !== phone.id)
                : [...fav, phone];
        });
    }, []);

    //2.3effetto all'aggiunta/rimozione di favorites
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);


    //3.1inizializzo stato per lista CONFRONTO salvata su LOCALSTORAGE
    const [compareList, setCompareList] = useState(() => {
        const stored = localStorage.getItem('compareList');
        return stored ? JSON.parse(stored) : [];
    });

    //3.2gestione interattiva dello stato
    const toggleCompare = (phone) => {
        const isInList = compareList.some((p) => p.id === phone.id);

        const updated = isInList
            ? compareList.filter((p) => p.id !== phone.id)
            : compareList.length <= 3
                ? [...compareList, phone]
                : compareList;

        setCompareList(updated);
    };

    //funzione per azzerare la lista
    const clearCompare = () => {
        setCompareList([]);
    };

    //3.3 effetto che viene eseguito ogni volta che viene aggiunto/rimosso un tel alla lista di confronto
    useEffect(() => {
        localStorage.setItem('compareList', JSON.stringify(compareList));
    }, [compareList]);

    //4.stato per apertura/chiusura SIDEBAR
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    //export dal context
    return (
        <GlobalContext.Provider
            value={{
                favorites,
                toggleFavorite,
                compareList,
                toggleCompare,
                clearCompare,
                sidebarOpen,
                toggleSidebar,
                setCompareList,
                query,
                setQuery,
                debouncedQuery,
                setDebouncedQuery,
                handleSearch,
                setFavorites
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
