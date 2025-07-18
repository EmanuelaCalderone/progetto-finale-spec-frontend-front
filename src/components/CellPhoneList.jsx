import React, { useState, useEffect, useMemo, useRef } from 'react';
//importo il contesto per i preferiti e il confronto
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom'

//componenti
import Checkbox from './Checkbox';
import FavoriteIcon from '../components/FavoriteIcon';
import CompareButton from '../components/CompareButton';


//stile
import '../styles/CellPhoneList.css';

function CellPhoneList() {

    //stati e funzioni dal contesto
    const { favorites, toggleFavorite, compareList, setCompareList, query, setQuery, debouncedQuery, handleSearch } = useGlobalContext();

    //stato per caricamento
    const [isLoading, setIsLoading] = useState(true);

    //stato per lista cellulari
    const [cellPhones, setCellPhones] = useState([]);

    //stato per gestione categoria selezionata
    const [selectedCategory, setSelectedCategory] = useState('')

    //stato per campo da ordinare
    const [sortField, setSortField] = useState('title')

    //stato per ordine alfabetico
    const [sortOrder, setSortOrder] = useState('asc')

    //useRef per barra di ricerca subito attiva
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus()
    }, []);

    //recupero le categorie con reduce per rimuovere i duplicati
    /* const categories = cellPhones.reduce((acc, phone) => {
        if (!acc.includes(phone.category))
            acc.push(phone.category);
        return acc;
    }, []); */

    //useMemo per menu categoria (anche se non fondamentale perché no calcolo pesante)
    const categories = useMemo(() => {
        //console.log('Calcolo categorie');

        return cellPhones.reduce((acc, phone) => {
            if (!acc.includes(phone.category))
                acc.push(phone.category)
            return acc;
        }, [])
    }, [cellPhones]);

    //recupero dati dal backend
    useEffect(() => {
        //funzione eseguita al primo render
        const fetchPhonesWithDetails = async () => {
            try {
                //primo fetch: recupero la lista "base" (id, title, category)
                const res = await fetch('http://localhost:3001/cellulars');

                //parso il risultato in json
                const basicPhones = await res.json();

                //per ogni telefono nella lista base, faccio un'altra fetch del dettaglio
                const fullPhones = await Promise.all(
                    basicPhones.map(async (phone) => {
                        //recupero dal backend il singolo telefono via id
                        const res = await fetch(`http://localhost:3001/cellulars/${phone.id}`);

                        //parso risposta singola
                        const data = await res.json();

                        //recupero dal campo 'cellular' dall’oggetto restituito
                        return data.cellular;
                    })
                );

                //ottengo tutti i dati e aggiorno lo stato globale
                setCellPhones(fullPhones);

                //imposto stato di caricamento come terminato
                setIsLoading(false);
            } catch (error) {
                //gestione errore nei fetch
                console.error('Errore nel caricamento:', error);

                //imposto stato di caricamento come terminato
                setIsLoading(false);
            }
        };

        //esecuzione effettiva della funzione asincrona al montaggio del componente
        fetchPhonesWithDetails();
    }, []);

    //logica filtro per nome
    const filteredPhones = useMemo(() => {
        //console.log('calcolo filteredPhones');

        return cellPhones
            .filter((phone) =>
                phone.title.toLowerCase().startsWith(debouncedQuery.trim().toLowerCase()))
            //logica filtro per categoria
            .filter((phone) =>
                selectedCategory ? phone.category === selectedCategory : true
            );
    }, [cellPhones, debouncedQuery, selectedCategory]);

    //ordine alfabetico nome e categoria + anno (scelta personale)
    const sortedPhones = useMemo(() => {
        //console.log('calcolo sortedPhones');

        return [...filteredPhones].sort((a, b) => {
            const first = a[sortField];
            const second = b[sortField];

            if (typeof first === 'string' && typeof second === 'string') {
                return sortOrder === 'asc'
                    ? first.toLowerCase().localeCompare(second.toLowerCase())
                    : second.toLowerCase().localeCompare(first.toLowerCase());
            }

            if (typeof first === 'number' && typeof second === 'number') {
                return sortOrder === 'asc' ? first - second : second - first;
            }

            return 0; // fallback neutro
        });
    }, [filteredPhones, sortField, sortOrder]);

    return (
        <div className="app-container">
            {/*barra di ricerca per nome*/}
            <input
                ref={inputRef}
                type="text"
                placeholder="Cerca per nome..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    //chiamo debounce
                    handleSearch(e.target.value);
                }}
            />

            {/*menu a tendina per categoria*/}
            <div className="selects">
                <div className="select-category">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Tutte le categorie</option>
                        {categories.map((category) => (
                            <option key={category} value={category} >
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/*"ordina per" in ordine alfabetico*/}
                <div className="order">
                    <select
                        value={`${sortField}_${sortOrder}`}
                        onChange={(e) => {
                            const [field, order] = e.target.value.split("_");
                            setSortField(field);
                            setSortOrder(order);
                        }}
                    >
                        <option value="title_asc">Ordina per: Nome (A → Z)</option>
                        <option value="title_desc">Ordina per: Nome (Z → A)</option>

                        <option value="category_asc">Ordina per: Categoria (A → Z)</option>
                        <option value="category_desc">Ordina per: Categoria (Z → A)</option>

                        <option value="year_desc">Ordina per: Anno (dal più recente)</option>
                        <option value="year_asc">Ordina per: Anno (dal meno recente)</option>
                    </select>
                </div>
            </div>

            {/*record cellulari*/}
            <div className="CellPhones-list">
                {isLoading ? (
                    <p>Caricamento...</p>
                ) : filteredPhones.length > 0 ? (
                    <ul>
                        {sortedPhones.map((phone) => (
                            <li key={phone.id} className="single-phone">
                                <Link to={`/cellulars/${phone.id}`} className="card-link">
                                    <div className="phone-card">
                                        <img src={phone.image} alt={phone.title} />
                                        <div className="phone-info">
                                            <strong>{phone.title}</strong>
                                            <p><em>{phone.category}</em></p>
                                        </div>
                                    </div>
                                </Link>

                                {/*azioni fuori dal link*/}
                                <div className="card-actions">
                                    <div className="actions-inner">
                                        <div className="checkbox-wrapper">
                                            <Checkbox phone={phone} />
                                        </div>

                                        <div className="favorite-wrapper">
                                            <FavoriteIcon phone={phone} />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nessun risultato trovato per "{debouncedQuery}"</p>
                )}
            </div>
            <CompareButton />
        </div >
    );
}

export default CellPhoneList;
