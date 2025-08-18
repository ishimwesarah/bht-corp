import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import Layouts and Global Components
import Preloader from './components/Preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import FloatingActionButtons from './components/FloatingActionButtons/FloatingActionButtons';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import PrivateRoute, { AdminRoute } from './components/PrivateRoute';

// Import All Public Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Portfolio from './pages/Portfolio/Portfolio';
import Careers from './pages/Careers/Careers';
import FAQ from './pages/FAQ/FAQ';
import Contact from './pages/Contact/Contact';

// Import All Client Dashboard Pages
import ClientDashboard from './pages/ClientDashboard/ClientDashboard';
import MyCommandsPage from './pages/ClientDashboard/MyCommandsPage';

// Import All Admin Dashboard Pages
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ManageCommandsPage from './pages/AdminDashboard/ManageCommandsPage';
import ManageUsersPage from './pages/AdminDashboard/ManageUsersPage';
import ManagePortfolioPage from './pages/AdminDashboard/ManagePortfolioPage';
import StudyAbroad from './pages/StudyAbroad/StudyAbroad';

// --- A Reusable Layout Component for the Public-Facing Website ---
const PublicLayout = () => (
  <React.Fragment>
    <Navbar />
    {/* This padding prevents content from being hidden behind the fixed navbar */}
    <main style={{ paddingTop: '30px' }}>
      <Outlet />
    </main>
    <Footer />
    <FloatingActionButtons />
  </React.Fragment>
);

// --- The Main Application Component ---
function App() {
  // State to manage the visibility of the preloader - START WITH TRUE
  const [loading, setLoading] = useState(true);

  // Effect to hide the preloader after a set time
  useEffect(() => {
    // This timer simulates the loading of assets and ensures a smooth visual experience.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds

    // Cleanup function: clears the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // The empty dependency array ensures this effect runs only once on initial load

  // The main return statement for the App
  return (
    <AuthProvider>
      <div 
        className="app-container"
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#F5F5F5',
          minHeight: '100vh',
          width: '100%'
        }}
      >
        {loading ? (
          // If the app is "loading", show the Preloader component
          <Preloader />
        ) : (
          // Once loading is false, render the main application with its router
          <Router>
            <Routes>
              {/* --- ROUTE GROUP 1: PUBLIC PAGES --- */}
              {/* All routes inside here will be wrapped by the PublicLayout component */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/study-abroad" element={<StudyAbroad />} />
                <Route path="/contact" element={<Contact />} />
              </Route>

              {/* --- ROUTE GROUP 2: SECURE CLIENT PAGES --- */}
              {/* These routes are protected by PrivateRoute and use the DashboardLayout */}
              <Route element={<PrivateRoute />}>
                <Route path="/client" element={<DashboardLayout />}>
                  <Route path="dashboard" element={<ClientDashboard />} />
                  <Route path="commands" element={<MyCommandsPage />} />
                </Route>
              </Route>
              
              {/* --- ROUTE GROUP 3: SECURE ADMIN PAGES --- */}
              {/* These routes are protected by AdminRoute and use the DashboardLayout */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<DashboardLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="users" element={<ManageUsersPage />} />
                  <Route path="portfolio" element={<ManagePortfolioPage />} />
                  <Route path="commands" element={<ManageCommandsPage />} />
                </Route>
              </Route>

              {/* A catch-all for any unknown routes, redirects to the Home page */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;