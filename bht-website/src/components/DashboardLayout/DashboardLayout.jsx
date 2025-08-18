import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaClipboardList, FaUsers, FaImages, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './DashboardLayout.css';
import bhtLogo from '../../assets/bht-logo.png';

const DashboardLayout = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  // Determine which links to show based on user role
  const isAdmin = userInfo?.role === 'admin';

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <img src={bhtLogo} alt="BHT Corp Logo" className="sidebar-logo" />
        </div>
        <nav className="sidebar-nav">
          {isAdmin ? (
            <>
              <NavLink to="/admin/dashboard" end><FaTachometerAlt /> Overview</NavLink>
              <NavLink to="/admin/commands"><FaClipboardList /> Client Commands</NavLink>
              <NavLink to="/admin/users"><FaUsers /> Manage Users</NavLink>
              <NavLink to="/admin/portfolio"><FaImages /> Manage Portfolio</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/client/dashboard" end><FaTachometerAlt /> Dashboard</NavLink>
              <NavLink to="/client/commands"><FaClipboardList /> My Commands</NavLink>
            </>
          )}
        </nav>
        <div className="sidebar-footer">
            <div className="user-info">
                <span>{userInfo?.name}</span>
                <small>{userInfo?.email}</small>
            </div>
            <button onClick={handleLogout} className="logout-btn"><FaSignOutAlt /></button>
        </div>
      </aside>
      <main className="dashboard-main-content">
        <Outlet /> {/* This is where the specific page content will be rendered */}
      </main>
    </div>
  );
};

export default DashboardLayout;