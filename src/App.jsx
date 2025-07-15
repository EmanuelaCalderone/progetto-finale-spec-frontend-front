import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CellPhoneList from './components/CellPhoneList';
import CellPhoneDetails from './pages/CellPhoneDetails';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="main-container">
            <h1>Cellulari Vintage</h1>
            <CellPhoneList />
          </div>
        }
        />
        <Route path="/cellulars/:id"
          element={<CellPhoneDetails />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
