import React, { useState, useEffect } from 'react';

function CellPhoneList() {
    //stato per lista cellulari
    const [cellPhones, setCellPhones] = useState([]);

    //stato per ricerca
    const [query, setQuery] = useState('');

    //recupero dati
    useEffect(() => {
        fetch('http://localhost:3001/cellulars')
            .then((res) => res.json())
            .then((data) => setCellPhones(data))
            .catch((error) => console.error('Errore nel caricamento: ', error));
    }, []);

    return (
        <div className="app-container">
            <h2 className="app-title">I cellulari che hanno fatto la storia</h2>

            {/* barra di ricerca per nome */}
            <input type="text"
                placeholder="Cerca per nome..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {/* record cellulari */}
            <div className="CellPhones-list">
                {cellPhones.length > 0 ? (
                    <ul>
                        {cellPhones.map((phone) => (
                            <li key={phone.id}>
                                <strong>{phone.title}</strong> - <em>{phone.category}</em>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nessun cellulare disponibile</p>
                )}
            </div>
        </div>
    );
}

export default CellPhoneList;