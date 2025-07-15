import React, { useState, useEffect } from 'react';

function CellPhoneList() {
    //stato per lista cellulari
    const [cellPhones, setCellPhones] = useState([]);

    //stato per ricerca
    const [query, setQuery] = useState('');

    //stato per funzione con debounce per ricerca
    const [debouncedQuery, setDebouncedQuery] = useState('');

    //stato per gestione categoria selezionata
    const [selectedCategory, setSelectedCategory] = useState('')

    //recupero le categorie con reduce per rimuovere i duplicati
    const categories = cellPhones.reduce((acc, phone) => {
        if (!acc.includes(phone.category))
            acc.push(phone.category);
        return acc;
    }, []);

    //recupero dati dal backend
    useEffect(() => {
        fetch('http://localhost:3001/cellulars')
            .then((res) => res.json())
            .then((data) => setCellPhones(data))
            .catch((error) => console.error('Errore nel caricamento: ', error));
    }, []);

    //funzione debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query.trim());
            console.log('filtro aggiornato con:', query.trim())
        }, 1000);
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

            {/* record cellulari */}
            <div className="CellPhones-list">
                {filteredPhones.length > 0 ? (
                    <ul>
                        {filteredPhones.map((phone) => (
                            <li key={phone.id}>
                                <strong>{phone.title}</strong> - <em>{phone.category}</em>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nessun risultato corrisponde a {query}</p>
                )}
            </div>
        </div>
    );
}

export default CellPhoneList;