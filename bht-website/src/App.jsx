import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layout Components
import TopBar from './components/TopBar/TopBar';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton'; // <-- IMPORT IT

// Import Page Components
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Portfolio from './pages/Portfolio/Portfolio';
import FAQ from './pages/FAQ/FAQ';

function App() {
  return (
    <Router>
      <TopBar />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />

      {/* --- ADD THE SCROLL TO TOP BUTTON HERE --- */}
      {/* It sits outside the main content but inside the Router */}
      <ScrollToTopButton />
    </Router>
  );
}

export default App;