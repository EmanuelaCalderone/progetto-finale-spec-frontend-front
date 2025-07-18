import { useNavigate } from 'react-router-dom';
import '../styles/GoBack.css';

function GoBack() {
    const navigate = useNavigate();

    return (
        <button className="go-back-button" onClick={() => navigate(-1)}>
            🔙 Torna indietro
        </button>
    );
}

export default GoBack;
