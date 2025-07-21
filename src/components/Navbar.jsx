import { NavLink } from 'react-router-dom';
import logo from '../assets/logo_big.png';
import { useGlobalContext } from '../context/GlobalContext';
//stile
import '../styles/Navbar.css';

function Navbar() {
    const { favorites, toggleSidebar, setQuery, setDebouncedQuery } = useGlobalContext();

    return (
        <nav className="navbar">
            <img src={logo} className="navbar-logo" alt="Cellulari Vintage" />

            <ul className="navbar-links">
                <li><NavLink //per resettare il campo della barra di ricerca quando si clicca su home
                    to="/"
                    onClick={() => {
                        setQuery(''); //svuoto l'input
                        setDebouncedQuery(''); //resetto la ricerca
                    }}
                >
                    Home

                </NavLink>
                </li>

                <li><NavLink to="/about">About</NavLink></li>
            </ul>

            {/*cuore in alto a destra */}
            <button className="favorite-toggle" onClick={toggleSidebar} aria-label="Preferiti">
                <i className="fas fa-heart filled-heart"></i>
                {favorites.length > 0 && (
                    <span className="favorite-badge">{favorites.length}</span>
                )}
            </button>
        </nav>
    );
}

export default Navbar;