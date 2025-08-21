// src/analytics.js
export const initGA = () => {
    if (!window.gtag) {
        // crea un listener quando lo script viene caricato
        const script = document.createElement("script");
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-FCY82ELJ9D";
        script.async = true;
        script.onload = () => {
            window.dataLayer = window.dataLayer || [];
            function gtag() { window.dataLayer.push(arguments); }
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-FCY82ELJ9D');
        };
        document.head.appendChild(script);
    } else {
        // se gtag esiste già
        window.gtag('config', 'G-FCY82ELJ9D');
    }
};
