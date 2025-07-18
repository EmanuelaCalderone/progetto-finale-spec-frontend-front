import React from 'react';
//per accedere al metodo createPortal
import ReactDOM from 'react-dom';

import '../styles/RemoveFavoriteModal.css';

function RemoveFavoriteModal({ isOpen, phone, message, onConfirm, onCancel }) {
    const modalRoot = document.getElementById('modal-root');
    if (!isOpen || /* !phone || */ !modalRoot) return null;

    return ReactDOM.createPortal(
        <div className="modal-backdrop">
            <div className="modal-content">
                {/* testo modale */}
                <h3>Rimuovi dai preferiti</h3>
                <p>
                    {message || (
                        <>
                            Sei sicuro di voler rimuovere dai preferiti<br />
                            <strong>{phone.title}?</strong>
                        </>
                    )}

                </p>

                {/*bottoni conferma-annulla*/}
                <div className="modal-buttons">
                    <button className="confirm" onClick={onConfirm}>Conferma</button>
                    <button className="cancel" onClick={onCancel}>Annulla</button>
                </div>
            </div>
        </div>,
        modalRoot
    );
}


export default RemoveFavoriteModal;
