import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

function CellPhoneList() {
    //stato per lista cellulari
    const [cellPhones, setCellPhones] = useState([]);

    //stato per ricerca
    const [query, setQuery] = useState('');

    //stato per funzione con debounce per ricerca
    const [debouncedQuery, setDebouncedQuery] = useState('');

    //stato per gestione categoria selezionata
    const [selectedCategory, setSelectedCategory] = useState('')

    //stato per campo da ordinare
    const [sortField, setSortField] = useState('title')
    //stato per ordine alfabetico
    const [sortOrder, setSortOrder] = useState('asc')

    //stato per caricamento
    const [isLoading, setIsLoading] = useState(true);

    //recupero le categorie con reduce per rimuovere i duplicati
    const categories = cellPhones.reduce((acc, phone) => {
        if (!acc.includes(phone.category))
            acc.push(phone.category);
        return acc;
    }, []);

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



    //funzione debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query.trim());
/*             console.log('filtro aggiornato con:', query.trim())
 */        }, 1000);
        return () => clearTimeout(timer);
    }, [query]);

    //logica filtro per nome
    const filteredPhones = cellPhones
        .filter((phone) =>
            phone.title.toLowerCase().includes(debouncedQuery.trim().toLowerCase()))
        //logica filtro per categoria
        .filter((phone) =>
            selectedCategory ? phone.category === selectedCategory : true
        );

    //ordine alfabetico
    const sortedPhones = [...filteredPhones].sort((a, b) => {
        const first = a[sortField].toLowerCase();
        const second = b[sortField].toLowerCase();

        return sortOrder === 'asc'
            ? first.localeCompare(second)
            : second.localeCompare(first);
    })

    return (
        <div className="app-container">
            <h2 className="app-title">I cellulari che hanno fatto la storia</h2>

            {/* barra di ricerca per nome */}
            <input type="text"
                placeholder="Cerca per nome..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {/* menu a tendina per categoria */}
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

            {/*"ordina per" in ordine alfabetico*/}
            <div className="order">
                <select
                    value={sortField}
                    onChange={(e) => {
                        const selected = e.target.value;
                        if (selected === sortField) {
                            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                        } else {
                            setSortField(selected);
                            setSortOrder('asc');
                        }
                    }}>
                    <option value="title">Ordina per: nome</option>
                    <option value="category">Ordina per: categoria</option>
                </select>
            </div>

            {/* record cellulari */}
            <div className="CellPhones-list">
                {filteredPhones.length > 0 ? (
                    <ul>
                        {sortedPhones.map((phone) => (
                            <li key={phone.id} className="single-phone">
                                <img src={phone.image} alt={phone.title} style={{ maxWidth: '100px', display: 'block' }} />

                                <Link to={`/cellulars/${phone.id}`}>
                                    <strong>{phone.title}</strong> - <em>{phone.category}</em>
                                </Link>
                            </li>

                        ))}
                    </ul>

                ) : (
                    <p>Nessun risultato corrisponde a {query}</p>
                )}
            </div>
        </div >
    );
}

export default CellPhoneList;