import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/App.css';
import App from './App.jsx';
//condivisione dati globali tra tutti i componenti
import { GlobalProvider } from './context/GlobalContext';

//import analytics
import { initGA } from './analytics';

initGA();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
);
