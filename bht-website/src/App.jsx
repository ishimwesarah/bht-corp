import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import Layouts and Global Components
import TopBar from './components/TopBar/TopBar';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import FloatingActionButtons from './components/FloatingActionButtons/FloatingActionButtons';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import PrivateRoute, { AdminRoute } from './components/PrivateRoute';

// Import Public Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';

import Portfolio from './pages/Portfolio/Portfolio';
import Careers from './pages/Careers/Careers';
import FAQ from './pages/FAQ/FAQ';
import Contact from './pages/Contact/Contact';

// Import Client Dashboard Pages
import ClientDashboard from './pages/ClientDashboard/ClientDashboard';
import MyCommandsPage from './pages/ClientDashboard/MyCommandsPage';

// Import Admin Dashboard Pages
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ManageCommandsPage from './pages/AdminDashboard/ManageCommandsPage';
import ManageUsersPage from './pages/AdminDashboard/ManageUsersPage';
import ManagePortfolioPage from './pages/AdminDashboard/ManagePortfolioPage';

// Helper component to conditionally render layouts
const LayoutManager = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/client') || location.pathname.startsWith('/admin');

  if (isDashboardRoute) {
    return (
      <Routes>
        <Route path="/client/*" element={<ClientDashboardRoutes />} />
        <Route path="/admin/*" element={<AdminDashboardRoutes />} />
      </Routes>
    );
  } else {
    return <PublicLayout />;
  }
};

// Layout for public-facing pages
const PublicLayout = () => (
  <>
   
    <Navbar />
    <main >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} /> 
      </Routes>
    </main>
    <Footer />
    <FloatingActionButtons />
  </>
);

// Router for CLIENT dashboard pages
const ClientDashboardRoutes = () => (
  <Routes>
    <Route element={<PrivateRoute />}>
      <Route element={<DashboardLayout />}>
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="commands" element={<MyCommandsPage />} />
      </Route>
    </Route>
  </Routes>
);

// Router for ADMIN dashboard pages
const AdminDashboardRoutes = () => (
  <Routes>
    <Route element={<AdminRoute />}>
      <Route element={<DashboardLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="commands" element={<ManageCommandsPage />} />
        <Route path="users" element={<ManageUsersPage />} />
        <Route path="portfolio" element={<ManagePortfolioPage />} />
      </Route>
    </Route>
  </Routes>
);

// The Main App Component
function App() {
  return (
    // --- THIS IS THE FIX ---
    // The Router must be the PARENT of the AuthProvider.
    <Router>
      <AuthProvider>
        <LayoutManager />
      </AuthProvider>
    </Router>
  );
}

export default App;