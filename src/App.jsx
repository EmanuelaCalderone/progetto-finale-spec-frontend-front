import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FavoriteSidebar from './components/FavoriteSidebar';

import Home from './pages/Home';
import About from './pages/About';
import CellPhoneDetails from './pages/CellPhoneDetails';
import Comparison from './pages/Comparison';
import Favorites from './pages/Favorites';

import './styles/App.css';

function App() {

  //routing
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />
        <FavoriteSidebar />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<Comparison />} />
            <Route path="/cellulars/:id" element={<CellPhoneDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
