import { useGlobalContext } from '../context/GlobalContext';
import React, { useState, useEffect } from 'react';
//stile
import '../styles/Checkbox.css';

function Checkbox({ phone }) {

    //prende dal contesot la lista con i telefoni selezinati per il confronto e la funzione per gestirle
    const { compareList, setCompareList } = useGlobalContext();

    //stato per telefoni selezionati
    const [isSelected, setIsSelected] = useState(false);

    //stato per tooltip 'massimo tre telefoni'
    const [status, setStatus] = useState('');

    //controlla se i ltelefono è già presnete nella lista dei tel da confrontare
    useEffect(() => {
        setIsSelected(compareList.some((p) => p.id === phone.id));
    }, [compareList, phone.id]);

    //logica per la checkbox
    const handleChange = (e) => {
        if (e.target.checked) {
            if (compareList.length >= 3 && !isSelected) {
                setStatus('Puoi confrontare al massimo 3 telefoni');
                setTimeout(() => setStatus(''), 2000);
                return;
            }
            setCompareList([...compareList, phone]);
        } else {
            setCompareList(compareList.filter((p) => p.id !== phone.id));
        }
    };

    return (
        <div className="checkbox-container">
            {status && <div className="checkbox-status">{status}</div>}

            <label className="checkbox-label">
                <input
                    type="checkbox"
                    aria-checked={isSelected}
                    onChange={handleChange}
                />
            </label>
            <span>{isSelected ? 'Rimuovi dal confronto' : 'Seleziona per il confronto'}</span>
        </div>
    );
}

export default React.memo(Checkbox);
