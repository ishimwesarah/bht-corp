import React, { useState, useEffect } from 'react';
import { FaUsers, FaClipboardList, FaImages } from 'react-icons/fa';
import AdminHeader from '../../components/Admin/AdminHeader';
import StatCard from '../../components/Admin/StatCard';
import apiClient from '../../utils/apiClient';
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, commands: 0, portfolio: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real app, you'd create a dedicated /api/stats endpoint
        // For now, we'll fetch from each resource
        const [usersRes, commandsRes, portfolioRes] = await Promise.all([
          apiClient.get('/auth/users'), // You need to create this backend route
          apiClient.get('/commands/all'),
          apiClient.get('/portfolio')
        ]);
        setStats({
          users: usersRes.data.length,
          commands: commandsRes.data.length,
          portfolio: portfolioRes.data.length
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminHeader title="Admin Dashboard" subtitle="Welcome to the BHT Corporation control center." />
      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="stats-grid">
          <StatCard title="Total Users" value={stats.users} icon={<FaUsers />} />
          <StatCard title="Client Commands" value={stats.commands} icon={<FaClipboardList />} />
          <StatCard title="Portfolio Items" value={stats.portfolio} icon={<FaImages />} />
        </div>
      )}
      {/* Add more sections like recent activity here */}
    </div>
  );
};

export default AdminDashboard;