import { useGlobalContext } from '../context/GlobalContext';
import React, { useState, useEffect } from 'react';
//stile
import '../styles/Checkbox.css';

function Checkbox({ phone }) {

    //prende dal contesot la lista con i telefoni selezinati per il confronto e la funzione per gestirle, e la funzione per vedere se il tel è già nlla lista
    const { compareList, setCompareList, isPhoneInCompareList, toggleCompare } = useGlobalContext();

    //stato per telefoni selezionati
    const [isSelected, setIsSelected] = useState(false);

    //stato per tooltip 'massimo tre telefoni'
    const [status, setStatus] = useState('');

    //sincronizzo lo stato della checkbox in base alla presenza del tel nella lista di confronto
    useEffect(() => {
        setIsSelected(isPhoneInCompareList(phone.id)); //passo il risultato dlela funzione(la eseguo subito)
    }, [compareList, phone.id, isPhoneInCompareList]);

    //logica per la checkbox al click
    const handleChange = (e) => {
        if (e.target.checked && compareList.length >= 3 && !isSelected) {
            setStatus('Puoi confrontare al massimo 3 telefoni');
            setTimeout(() => setStatus(''), 2000);
            return;
        }
        toggleCompare(phone);
    };

    return (
        <div className="checkbox-container">
            {status && <div className="checkbox-status">{status}</div>}

            <label className="checkbox-label">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleChange}
                />
            </label>
            <span>{isSelected ? 'Rimuovi dal confronto' : 'Seleziona per il confronto'}</span>
        </div>
    );
}

export default React.memo(Checkbox);
