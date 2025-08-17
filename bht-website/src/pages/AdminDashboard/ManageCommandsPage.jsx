import React, { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';

// Import reusable Admin UI components
import AdminHeader from '../../components/Admin/AdminHeader';

// Import the secure API client
import apiClient from '../../utils/apiClient';

const ManageCommandsPage = () => {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch all commands from the backend
  const fetchCommands = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get('/commands/all');
      // Sort commands by newest first for better admin workflow
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCommands(sortedData);
    } catch (error) { 
      console.error("Failed to fetch commands", error);
      // You could add a state here to show an error message to the user
    }
    finally { 
      setLoading(false); 
    }
  };

  // Fetch commands when the component first loads
  useEffect(() => {
    fetchCommands();
  }, []);

  // Function to handle status updates and send them to the backend
  const handleStatusChange = async (commandId, newStatus) => {
    try {
      // Send the update request to the backend API
      await apiClient.put(`/commands/${commandId}/status`, { status: newStatus });

      // Update the state locally for an instant UI change without a full refetch
      setCommands(prevCommands => 
        prevCommands.map(cmd => 
          cmd._id === commandId ? { ...cmd, status: newStatus } : cmd
        )
      );
    } catch (error) {
      console.error("Failed to update command status", error);
      alert("Failed to update the command status. Please try again.");
    }
  };

  return (
    <div>
      <AdminHeader title="Client Commands" subtitle="Review and manage all incoming client requests." />
      
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Email</th>
              <th>Message</th>
              <th>Attachment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center' }}>Loading commands...</td></tr>
            ) : commands.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center' }}>No client commands found.</td></tr>
            ) : (
              commands.map(cmd => (
                <tr key={cmd._id}>
                  <td>{cmd.user?.name || 'N/A'}</td>
                  <td>{cmd.user?.email || 'N/A'}</td>
                  <td style={{ whiteSpace: 'pre-wrap', maxWidth: '400px' }}>{cmd.message}</td>
                  <td>
                    {cmd.fileUrl ? (
                      <a 
                        href={cmd.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="download-link"
                        title={cmd.fileName}
                      >
                        <FaDownload /> {cmd.fileName ? (cmd.fileName.length > 15 ? cmd.fileName.substring(0, 12) + '...' : cmd.fileName) : 'Download'}
                      </a>
                    ) : (
                      'None'
                    )}
                  </td>
                  <td>
                    <select 
                      value={cmd.status} 
                      onChange={(e) => handleStatusChange(cmd._id, e.target.value)}
                      className={`status-select ${cmd.status}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td>{new Date(cmd.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCommandsPage;