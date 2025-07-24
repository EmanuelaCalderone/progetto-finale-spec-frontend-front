import React, { useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext';
import RemoveFavoriteModal from './RemoveFavoriteModal';
import "../styles/EmptyFav.css"

function EmptyFav() {
    const { favorites, clearFavorites } = useGlobalContext();

    //"modifica" modale già esistente
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function onConfirm() {
        clearFavorites();
        closeModal();
    }

    const isDisabled = favorites.length === 0;

    return (
        <>
            <button
                onClick={openModal}
                className="empty-fav"
                disabled={isDisabled}
            >
                Svuota la lista dei preferiti
            </button>

            <RemoveFavoriteModal
                isOpen={isModalOpen}
                message="Sei sicuro di voler svuotare la lista dei preferiti?"
                onConfirm={onConfirm}
                onCancel={closeModal}
                hideTitle={true}
            />
        </>
    )
}

export default EmptyFav;
