import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
//stile
import '../styles/CompareButton.css';

function CompareButton() {
    const { compareList } = useGlobalContext();

    const isEnabled = compareList.length >= 2;

    return (
        <div className="select-button-wrapper">
            {isEnabled ? (
                <Link to="/compare">
                    <button className="button-fixed">Confronta</button>
                </Link>
            ) : (
                <button className="button-fixed button-disabled" disabled>
                    Seleziona massimo tre telefoni
                </button>
            )}
        </div>
    );
}

export default CompareButton;
