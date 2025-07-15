import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CellPhoneDetails() {

    //recupero dati singolo id
    const { id } = useParams();

    const [phone, setPhone] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3001/cellulars/${id}`)
            .then((res) => res.json())
            .then((data) => {

                setPhone(data.cellular);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log('Errore nel caricamento delle specifiche: ', error)
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) return <p>Caricamento in corso...</p>
    if (!phone) return <p>Cellulare non trovato</p>

    return (
        <div className="detail-container">
            <h2>{phone.title}</h2>
            <ul className="detail-list">
                <li>
                    <img src={phone.image} alt={phone.title} style={{ maxWidth: '100%', borderRadius: '8px' }} />
                </li>
                <li><strong>Categoria:</strong> {phone.category}</li>
                <li><strong>Marca:</strong> {phone.brand}</li>
                <li><strong>Modello:</strong> {phone.model}</li>
                <li><strong>Anno:</strong> {phone.year}</li>
                <li><strong>Display:</strong> {phone.display_type}</li>
                <li><strong>Risoluzione schermo:</strong> {phone.screen_resolution}</li>
                <li><strong>Sistema operativo:</strong> {phone.operating_system}</li>
                <li><strong>Fotocamera:</strong> {phone.camera}</li>
                <li><strong>RAM:</strong> {phone.ram}</li>
                <li><strong>Memoria interna:</strong> {phone.memory}</li>
                <li><strong>Processore:</strong> {phone.processor}</li>
                <li><strong>Scheda video:</strong> {phone.video_card}</li>
                <li><strong>Tipo SIM:</strong> {phone.sim_type}</li>
                <li><strong>Capacità batteria:</strong> {phone.battery_capacity}</li>
                <li><strong>Peso:</strong> {phone.weight}</li>
                <li><strong>Dimensioni:</strong> {phone.dimensions}</li>
                <li><strong>Suonerie polifoniche:</strong> {phone.polyphonic_ringtones ? 'Sì' : 'No'}</li>
                <li><strong>Bluetooth:</strong> {phone.bluetooth ? 'Sì' : 'No'}</li>
                <li><strong>Wi-Fi:</strong> {phone.wifi ? 'Sì' : 'No'}</li>
                <li><strong>Memoria espandibile:</strong> {phone.expandable_memory ? 'Sì' : 'No'}</li>
                <li><strong>Cover sostituibile:</strong> {phone.replaceable_cover ? 'Sì' : 'No'}</li>

                {/* proprietà con array */}
                <li>
                    <strong>Colori disponibili:</strong> {phone.colors?.map((c) => c).join(', ') || 'N/A'}
                </li>
                <li>
                    <strong>Reti supportate:</strong> {phone.network_support?.map((r) => r).join(', ') || 'N/A'}
                </li>
                <li>
                    <strong>Caratteristiche speciali:</strong> {phone.special_features?.map((f) => f).join(', ') || 'Nessuna'}
                </li>
                <li>
                    <strong>Giochi:</strong> {phone.games?.map((g) => g).join(', ') || 'Nessuno'}
                </li>

                {/* link per acquistare */}

                <li>
                    <strong>Acquista:</strong>{' '}
                    <a href={phone.purchase_link} target="_blank">
                        Vai al link
                    </a>
                </li>
            </ul>
        </div>
    )

}

export default CellPhoneDetails;