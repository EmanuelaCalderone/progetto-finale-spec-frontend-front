import React, { useState, useEffect, useCallback } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
//stile
import '../styles/FavoriteIcon.css';

function FavoriteIcon({ phone }) {
    //console.log('Render FavoriteIcon:', phone.title);


    const { favorites, toggleFavorite } = useGlobalContext();

    const [isFavorite, setIsFavorite] = useState(false);

    //stato per il tooltip
    const [status, setStatus] = useState('');

    //controllo se phone è già tra i pref
    useEffect(() => {
        setIsFavorite(favorites.some((fav) => fav.id === phone.id));
    }, [favorites, phone.id]);

    //funzione per aggiunzione/rimozione + tooltip
    const handleClick = useCallback(() => {
        toggleFavorite(phone); //dal global context
        setStatus(isFavorite ? 'Rimosso dai preferiti' : 'Aggiunto ai preferiti');
        setTimeout(() => setStatus(''), 2000);
    }, [toggleFavorite, phone, isFavorite]);

    const heartClass = isFavorite ? 'heart-icon active' : 'heart-icon';

    const tooltipClass = status === 'Rimosso dai preferiti'
        ? 'favorite-status removed'
        : 'favorite-status';

    return (
        <div className="favorite-container">
            {status && <div className={tooltipClass}>{status}</div>}

            <button
                className={heartClass}
                onClick={handleClick}
                aria-label="Toggle preferito"
                title="Preferiti"
            >
                <span><i className="fas fa-heart"></i></span>
            </button>
        </div >
    );
}

export default React.memo(FavoriteIcon);
