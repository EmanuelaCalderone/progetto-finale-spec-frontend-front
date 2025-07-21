import { NavLink } from 'react-router-dom';
import logo from '../assets/logo_big.png';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

//stile
import '../styles/Navbar.css';

function Navbar() {
    const { favorites, toggleSidebar, setQuery, setDebouncedQuery } = useGlobalContext();

    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <img src={logo} className="navbar-logo" alt="Cellulari Vintage" />

            <ul className="navbar-links">
                <li>
                    <NavLink
                        to="/"
                        className="navbar-link-btn"
                        onClick={() => {
                            setQuery('');//svuoto barra ricerca
                            setDebouncedQuery('');
                        }}
                    >
                        Home
                    </NavLink>

                </li>

                <li>
                    <NavLink to="/about" className="navbar-link-btn">
                        About
                    </NavLink>
                </li>
            </ul>

            {/*cuore in alto a destra */}
            <button className="favorite-toggle" onClick={toggleSidebar} label="Preferiti">
                <i className="fas fa-heart filled-heart"></i>
                {favorites.length > 0 && (
                    <span className="favorite-badge">{favorites.length}</span>
                )}
            </button>
        </nav >
    );
}

export default Navbar;