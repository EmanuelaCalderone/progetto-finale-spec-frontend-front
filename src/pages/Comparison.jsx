import React from 'react';

//importo il contesto per leggere la lista dei tel da confrontare
import { useGlobalContext } from '../context/GlobalContext';
//per navigare tra le pag senza ricaricare
import { Link } from 'react-router-dom';
//componenti
import GoBack from '../components/GoBack';
import FavoriteIcon from '../components/FavoriteIcon';
import PhoneSpecs from '../components/PhoneSpecs';
import Checkbox from '../components/Checkbox';

import '../styles/Comparison.css';

function Comparison() {
    const { compareList } = useGlobalContext();

    if (compareList.length < 2 || compareList.length > 3) {
        return (
            <div className="comparison-table-container">
                <h2 className="comparison-title">Telefonini vintage a confronto</h2>
                <h3>Seleziona almeno due telefoni per il confronto</h3>
                <div className="select-button-wrapper">
                    <Link to="/" className="home-link">
                        <button className="select-button-fixed">
                            Seleziona almeno due telefoni per avviare il confronto
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    const [first, second, third] = compareList;

    return (
        <>
            <div className="comparison-table-container">
                <h2>Telefonini vintage a confronto</h2>

                <div className="comparison-columns-wrapper">
                    {compareList.map((phone, index) => (
                        <React.Fragment key={phone.id}>
                            <div className="comparison-column">
                                <div className="phone-column">
                                    <Link to={`/cellulars/${phone.id}`} className="phone-link">

                                        <div className="phone-wrapper">
                                            {/* immagine */}
                                            <img src={phone.image} alt={phone.title} className="phone-image" />
                                        </div>

                                        {/* nome */}
                                        <p className="phone-title">{phone.title}</p>
                                    </Link>

                                    {/*checkbox*/}
                                    <div className="checkbox-wrapper">
                                        <div className="checkbox">
                                            <Checkbox phone={phone} />
                                        </div>
                                    </div>

                                    {/* cuore */}
                                    <div className="favorite-wrapper">
                                        <FavoriteIcon phone={phone} />
                                    </div>
                                </div>
                            </div>

                            {/*immagne spade*/}
                            {index < compareList.length - 1 && (
                                <div className="vs-symbols-wrapper">
                                    <img
                                        src="https://img.icons8.com/?size=100&id=dXtQlriJL4g1&format=png&color=000000"
                                        alt="VS Icon"
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                {/*tabella con specifiche*/}
                <PhoneSpecs phone={first} otherPhone={second} lastPhone={third} mode="table" />
            </div>
            {/*contenitore con tasto per tornare indietro*/}
            <div className="go-back-wrapper">
                <GoBack />
            </div>
        </>
    );

}

export default Comparison;
