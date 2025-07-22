import "../styles/PhoneSpecs.css"

//costante con le specifiche da mostrare
const DEFAULT_FIELDS = [
    { key: 'brand', label: 'Marca' },
    { key: 'model', label: 'Modello' },
    { key: 'category', label: 'Categoria' },
    { key: 'year', label: 'Anno' },
    { key: 'battery_capacity', label: 'Batteria' },
    { key: 'memory', label: 'Memoria' },
    { key: 'ram', label: 'RAM' },
    { key: 'processor', label: 'Processore' },
    { key: 'camera', label: 'Fotocamera' },
    { key: 'screen_resolution', label: 'Risoluzione Schermo' },
    { key: 'display_type', label: 'Tipo Display' },
    { key: 'operating_system', label: 'Sistema operativo' },
    { key: 'dimensions', label: 'Dimensioni' },
    { key: 'weight', label: 'Peso' },
    { key: 'bluetooth', label: 'Bluetooth' },
    { key: 'wifi', label: 'Wi-Fi' },
    { key: 'expandable_memory', label: 'Memoria espandibile' },
    { key: 'replaceable_cover', label: 'Cover intercambiabile' },
    { key: 'polyphonic_ringtones', label: 'Suonerie polifoniche' },
    { key: 'vibration_mode', label: 'Vibrazione' },
    { key: 'network_support', label: 'Reti supportate' },
    { key: 'sim_type', label: 'Tipo SIM' },
    { key: 'colors', label: 'Colori' },
    { key: 'special_features', label: 'Funzionalità speciali' },
    { key: 'games', label: 'Giochi' }
];

//funzione gneerica formattazione
function formatValue(value, mode) {
    if (Array.isArray(value)) {
        return value.join(', ');
    } else if (typeof value === 'boolean') {
        return mode === 'table' ? (value ? '✅' : '❌') : (value ? 'Sì' : 'No');
    } else if (value === 'N/D') {
        return 'N/D';
        //tutti gli altri valori ritornali in stringa
    } else if (value !== null && value !== undefined && value !== '') {
        return String(value); //value.toSring() no sicuro con null/undefined perché non sono oggetti => non hanno metodi (type casting)
    } else {
        //fallback generica
        return 'N/D';
    }
}

//render generico componente (phone passato dal genitore CellPhoneDetails)
//oggetto di props destrututrato direttamente nei parametri
function PhoneSpecs({ phone, fields = DEFAULT_FIELDS, mode = 'list', otherPhone = null, lastPhone = null }) {

    //1.1 tabella
    if (mode === 'table' && otherPhone) {
        return (
            <table className="comparison-table">
                <thead>
                    <tr>
                        <th>Info</th>
                        <th>{phone.title}</th>
                        <th>{otherPhone.title}</th>
                        {lastPhone && <th>{lastPhone.title}</th>}
                    </tr>
                </thead>
                <tbody>
                    {fields.map(({ key, label }) => (
                        <tr key={key}>
                            <td>{label}</td>
                            {/* formatValue: funzione per formattare i dati in modo leggibile, ad es. array unito con virgole */}
                            <td>{formatValue(phone[key], mode)}</td>
                            <td>{formatValue(otherPhone[key], mode)}</td>
                            {lastPhone && <td>{formatValue(lastPhone[key], mode)}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    //1.2 lista
    return (
        <div className="spec-columns">
            <ul className="spec-grid-two-columns">
                {fields.map(({ key, label }) => (
                    <li key={key}>
                        <strong>{label}:</strong> {formatValue(phone[key], mode)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PhoneSpecs;
