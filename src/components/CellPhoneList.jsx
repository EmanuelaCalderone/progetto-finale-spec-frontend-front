import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
//importo il contesto per i preferiti e il confronto
import { useGlobalContext } from '../context/GlobalContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Link } from 'react-router-dom'

//importo il debounce
import { debounce } from '../utils/utils';

//componenti
import Checkbox from './Checkbox';
import FavoriteIcon from '../components/FavoriteIcon';
import CompareButton from '../components/CompareButton';

//stile
import '../styles/CellPhoneList.css';

function CellPhoneList() {

    //stati e funzioni dal contesto
    const { favorites, toggleFavorite, compareList } = useGlobalContext();

    //stato per ricerca
    const [query, setQuery] = useState('');

    //stato per funzione con debounce per ricerca
    const [debouncedQuery, setDebouncedQuery] = useState('');

    //stato per caricamento
    const [loading, setLoading] = useState(false);
    //stato per errore
    const [error, setError] = useState(null);

    //stato per lista cellulari
    const [cellPhones, setCellPhones] = useLocalStorage('cellPhones', []);

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

    //funzione debounce memoizzata con useCallback per non ricrarla ad ogni render del componente e rendere stabile il delay
    const handleSearch = useCallback(
        debounce((newQuery) => {
            setDebouncedQuery(newQuery.trim());
            //console.log('Digitazione:', newQuery.trim());
        }, 300),
        []
    );

    //logica filtro per nome
    const filteredPhones = useMemo(() => {
        //console.log('calcolo filteredPhones');
        return cellPhones
            .filter((phone) =>
                phone.title.toLowerCase().startsWith(debouncedQuery.trim().toLowerCase()))
            //logica filtro per categoria
            .filter((phone) =>
                selectedCategory ? phone.category === selectedCategory : true //(true = tutti i tel passano il filtro)
            );
    }, [cellPhones, debouncedQuery, selectedCategory]);

    //useMemo (per non ripetere calcolo ad ogni render) per menu categoria (anche se non fondamentale perché no calcolo pesante)
    const categories = useMemo(() => {
        //console.log('Calcolo categorie');

        return cellPhones.reduce((acc, phone) => {
            if (!acc.includes(phone.category))
                acc.push(phone.category)
            return acc;
        }, [])
    }, [cellPhones]);

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

    //recupero dati dal backend
    useEffect(() => {
        //funzione eseguita al primo render
        const fetchPhonesWithDetails = async () => {
            setLoading(true);
            setError(null);

            try {

                //primo fetch: recupero la lista "base" (id, title, category)
                const res = await fetch('http://localhost:3001/cellulars');

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

                //altrimenti parso il risultato in json
                const basicPhones = await res.json();

                //per ogni telefono nella lista base, faccio un'altra fetch del dettaglio
                const fullPhones = await Promise.all(
                    basicPhones.map(async (phone) => {
                        //recupero dal backend il singolo telefono via id
                        const res = await fetch(`http://localhost:3001/cellulars/${phone.id}`);
                        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                        //parso risposta singola
                        const data = await res.json();

                        //recupero dal campo 'cellular' dall’oggetto restituito
                        return data.cellular;
                    })
                );

                //ottengo tutti i dati e aggiorno lo stato globale
                setCellPhones(fullPhones);
                setLoading(false);

            } catch (error) {
                //gestione errore nei fetch
                setError(error.message);
                console.error('Errore nel caricamento:', error);
            }
        };

        //se la lista è già caricata (non vuota), non fa di nuovo la fetch (fallback in caso di svuota catalogo futuro o problemi di backend)
        if (cellPhones.length === 0) {
            fetchPhonesWithDetails();
        } else {
            setLoading(false);
        }

    }, []);

    return (
        <div className="app-container">
            {/*barra di ricerca per nome*/}
            <input
                ref={inputRef}
                type="text"
                placeholder="Cerca per nome..."
                value={query} //aggiorno subito l'input visivamente
                onChange={(e) => {
                    setQuery(e.target.value);
                    //chiamo debounce
                    handleSearch(e.target.value); //ritardo il filtraggio
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
                {filteredPhones.length > 0 ? (
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
