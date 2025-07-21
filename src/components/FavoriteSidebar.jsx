import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
//stile
import '../styles/FavoriteSidebar.css';
import EmptyFav from './EmptyFav';

function FavoriteSidebar() {
    const { sidebarOpen, toggleSidebar, favorites, toggleFavorite } = useGlobalContext();

    const sidebarClass = sidebarOpen ? 'favorite-sidebar open' : 'favorite-sidebar';
    return (
        <>
            {/*sidebar preferiti*/}
            <aside className={sidebarClass}>
                <div className="sidebar-content">
                    <div className="favorites-header">
                        {/*link alla pagina dei preferiti*/}
                        <Link to="/favorites" onClick={toggleSidebar} className="favorites-link">
                            Vai ai tuoi preferiti
                        </Link>
                        {/*preferiti presenti?*/}
                        <p className="no-favorites-label">
                            {favorites.length === 0 ? 'Ancora nessun preferito' : 'I tuoi preferiti'}
                        </p>
                    </div>

                    {/*elenco preferiti*/}
                    {favorites.length > 0 && (
                        <ul className="favorite-list">
                            {favorites.map((phone) => (
                                <li key={phone.id} className="favorite-item">
                                    <Link to={`/cellulars/${phone.id}`} onClick={toggleSidebar}>
                                        {phone.title}
                                    </Link>
                                    {/*bottone per rimuovere i pref*/}
                                    <button
                                        className="remove-btn-sb"
                                        onClick={() => toggleFavorite(phone)}
                                        label="Rimuovi dai preferiti"
                                    >
                                        ❌
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="empty-fav-sb">
                    <EmptyFav />
                </div>
            </aside>
        </>
    );
}

export default FavoriteSidebar;
