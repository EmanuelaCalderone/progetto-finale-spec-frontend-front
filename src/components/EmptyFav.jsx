import React, { useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext';
import RemoveFavoriteModal from './RemoveFavoriteModal';
import "../styles/EmptyFav.css"

function EmptyFav() {
    const { favorites, setFavorites } = useGlobalContext();

    //"modifica" modale già esistente
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function onConfirm() {
        setFavorites([]);
        closeModal();
    }

    return (
        <>
            <button onClick={openModal} className="empty-fav">Svuota la lista dei preferiti</button>

            <RemoveFavoriteModal
                isOpen={isModalOpen}
                message="Sei sicuro di voler svuotare la lista dei preferiti?"
                onConfirm={onConfirm}
                onCancel={closeModal}
            />
        </>
    )
}

export default EmptyFav;
