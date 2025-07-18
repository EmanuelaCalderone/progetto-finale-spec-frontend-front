//contesto
import { useGlobalContext } from '../context/GlobalContext';
//per stato locale dei preferiti selezionati e della modale
import { useState } from 'react';
//da card dei preferiti alla pag di dettaglio (senza ricaricare)
import { Link } from 'react-router-dom';
//componenti
import RemoveFavoriteModal from '../components/RemoveFavoriteModal';
import GoBack from '../components/GoBack';
import EmptyFav from '../components/EmptyFav';
//stili
import '../styles/Favorites.css';

//definisco/inizializzo pagina
function Favorites() {
    //recupero lista preferiti e funzoione dal contesto
    const { favorites, toggleFavorite } = useGlobalContext();

    //gestione stato locale per telefono selezionato da rimuovere
    const [selectedPhone, setSelectedPhone] = useState(null);

    //gestione stato per modale
    const [modalOpen, setModalOpen] = useState(false);

    //funzioni di supporto (gestiscono l'interazione/non renderizzano direttamente)

    //1. apertura modale
    const openModal = (phone) => {
        setSelectedPhone(phone);
        setModalOpen(true);
    };

    //2. tasto conferma
    const handleConfirm = () => {
        //funzione per rimuovere dai pref prsa dal contesto
        toggleFavorite(selectedPhone);
        setModalOpen(false);
        //azzero lo stato del tel selezionato
        setSelectedPhone(null);
    };

    //3. tasto annulla
    const handleCancel = () => {
        setModalOpen(false);
        setSelectedPhone(null);
    };

    if (favorites.length === 0) {
        return (
            <div className="empty-fav-container">
                <div className="favorites-empty">
                    <p>Non hai ancora aggiunto telefoni ai preferiti</p>
                    <GoBack />
                </div>

            </div>
        );
    }

    return (
        <div className="favorites-container">
            <h2>I tuoi telefoni preferiti</h2>

            <ul className="favorites-list">
                {favorites.map((phone) => (
                    <li key={phone.id} className="favorite-card">
                        <Link to={`/cellulars/${phone.id}`} className="card-link">
                            <div className="favorite-visual">
                                <img src={phone.image} alt={phone.title} className="favorite-image" />
                                <div className="favorite-info">
                                    <strong>{phone.title}</strong>
                                    <p><em>{phone.category}</em></p>
                                </div>
                            </div>
                        </Link>

                        <div className="favorite-actions">
                            <button className="remove-btn" onClick={() => openModal(phone)}>
                                Rimuovi dai preferiti
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="empty-fav-list">
                <EmptyFav />
            </div>

            <RemoveFavoriteModal
                isOpen={modalOpen}
                phone={selectedPhone}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

            <div className="go-back-wrapper">
                <GoBack />
            </div>

        </div>
    );
}

export default Favorites;
