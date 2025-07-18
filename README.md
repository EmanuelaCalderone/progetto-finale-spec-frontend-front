# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


________________________ NOTE DELL'AUTORE _________________

Questa applicazione nasce per scopi didattici, come parte di un percorso formativo in sviluppo front-end. Il progetto è però in costante evoluzione, alimentato da un interesse personale verso l’argomento e come esercizio pratico continuo per consolidare competenze in React, JavaScript, design responsive e gestione dei dati.

I contenuti presenti, come informazioni tecniche e storiche sui dispositivi, vengono raccolti e organizzati con cura, ma non si garantisce l’assoluta attendibilità o aggiornamento al 100% dei dati visualizzati. L'app va quindi intesa come una piattaforma dimostrativa, con obiettivo educativo ed esplorativo.

________________________ ISTRUZIONI ________________________

🥉 Requisiti Minimi

Per considerare il progetto completo, devono essere implementate almeno queste funzionalità:

Gestione di una risorsa definita in types.ts

Lista dei record, che mostra solo le proprietà principali title e category, e include:

Barra di ricerca per cercare nei titoli (title)
Filtro per categoria (category)
Ordinamento alfabetico per title o category (A-Z e Z-A)
Pagina di dettaglio per ogni record, con visualizzazione estesa delle sue proprietà (es. price, description, brand, ecc.)

Comparatore di 2 record, visualizzati affiancati per confrontarne le caratteristiche.

È libera la modalità di selezione: puoi permettere all’utente di aggiungere record al comparatore direttamente dalla lista, dalla pagina di dettaglio, oppure usare un menu a tendina, checkbox o qualsiasi altro sistema.

L’importante è che l’utente possa scegliere 2 record qualsiasi e confrontarli in modo chiaro.

Sistema di preferiti, sempre accessibile e aggiornabile:

L’utente può aggiungere o rimuovere record dai preferiti in qualsiasi momento
I preferiti devono essere consultabili in ogni sezione dell’app (es. tramite una sezione dedicata, un’icona fissa, o una sidebar)

🥈 Requisiti Consigliati (Facoltativi)

Da affrontare solo dopo aver completato i Requisiti Minimi:

Comparatore di 2 o più record: il layout si adatta per confrontare più elementi affiancati
Debounce sulla ricerca, per migliorare la UX ed evitare chiamate API inutili
Persistenza dei preferiti (es. salvataggio in localStorage), così che rimangano anche dopo il refresh della pagina
Gestione degli stati vuoti, come:
Nessun risultato trovato
Lista preferiti vuota
Nessun elemento selezionato nel comparatore

🥇 Requisiti Aggiuntivi (Facoltativi)

Da affrontare solo dopo i Requisiti Consigliati:

Gestione di più risorse nella stessa SPA (es. products e courses), con interfacce distinte o integrate
CRUD completo dal frontend:
Creazione di nuovi record
Modifica di record esistenti
Eliminazione di record
Validazione dei campi in input

🎯 BONUS (Facoltativo)

Da affrontare solo dopo i Requisiti Aggiuntivi:

Creazione di una seconda versione del progetto in TypeScript.Se hai completato tutti i requisiti minimi, consigliati e aggiuntivi, puoi realizzare una nuova versione parallela del progetto usando TypeScript.
⚠️La versione principale deve comunque rimanere in JavaScript, come richiesto dal progetto.
