import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function GAListener() {
    const location = useLocation(); // prendo l’URL attuale della pagina

    useEffect(() => {
        window.gtag('config', 'G-FCY82ELJ9D', {
            page_path: location.pathname, // segnala a GA il percorso della pagina
        });
    }, [location]); // ogni volta che cambia pagina, invia il nuovo percorso

    return null; // non renderizza nulla sul DOM
}

export default GAListener;
