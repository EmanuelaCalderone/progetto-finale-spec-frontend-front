//hook per estrarre l'id dall'URL
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

//componenti
import Checkbox from '../components/Checkbox';
import CompareButton from '../components/CompareButton';
import FavoriteIcon from '../components/FavoriteIcon';
import GoBack from '../components/GoBack';
import PhoneSpecs from '../components/PhoneSpecs';

//stile
import '../styles/CellPhoneDetails.css';

function CellPhoneDetails() {
    const { id } = useParams();

    //gestione stato per dati completi tel
    const [phone, setPhone] = useState(null);
    //gestione stato caricamento
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPhone = async () => {
            try {
                const res = await fetch(`http://localhost:3001/cellulars/${id}`)
                if (!res.ok) {
                    throw new Error(`Errore: Status: ${res.status}`)
                }
                const data = await res.json();
                setPhone(data.cellular);
            }
            //problemi network/backend/ecc
            catch (error) {
                console.log('Errore nel caricamento delle specifiche: ', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPhone();
    }, [id]);

    if (isLoading) return <p>Caricamento in corso...</p>;
    if (!phone) return <p>Cellulare non trovato</p>;

    return (

        <div className="detail-container">

            <div className="go-back-wrapper">
                <GoBack />
            </div>

            <h2>{phone.title}</h2>

            <div className="detail-card">
                <div className="detail-image">
                    <img src={phone.image} alt={phone.title} />
                    <div className="image-actions">
                        <div className="checkbox-wrapper">
                            <Checkbox phone={phone} />
                        </div>
                        <div className="favorite-wrapper">
                            <FavoriteIcon phone={phone} />
                        </div>
                        <a
                            href={phone.purchase_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="purchase-link"
                        >
                            Acquista online
                        </a>
                    </div>
                </div>

                <div className="detail-specs">
                    <PhoneSpecs phone={phone} />

                    <ul className="spec-price">
                        {/*rendering condition*/}
                        {phone.priceLira && !isNaN(Number(phone.priceLira)) && (
                            <li>
                                <strong>Prezzo di lancio:</strong> circa{" "}
                                {Number(phone.priceLira).toLocaleString()} lire
                            </li>
                        )}

                        {phone.priceEuroEquivalent && !isNaN(Number(phone.priceEuroEquivalent)) && (
                            <li>
                                <strong>Equivalente attuale:</strong> circa{" "}
                                {Number(phone.priceEuroEquivalent).toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "EUR",
                                })}
                            </li>
                        )}

                        {phone.priceLaunchEuro &&
                            !phone.priceLira &&
                            !phone.priceEuroEquivalent &&
                            !isNaN(Number(phone.priceLaunchEuro)) && (
                                <li>
                                    <strong>Prezzo di lancio:</strong>{" "}
                                    {Number(phone.priceLaunchEuro).toLocaleString("it-IT", {
                                        style: "currency",
                                        currency: "EUR",
                                    })}
                                </li>
                            )}

                        {!phone.priceLira && !phone.priceEuroEquivalent && !phone.priceLaunchEuro && (
                            <li>
                                <em>Prezzo non disponibile</em>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <CompareButton />
        </div>
    );
}

export default CellPhoneDetails;
