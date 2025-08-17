import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Import reusable Admin UI components (we reuse them for a consistent look)
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminModal from '../../components/Admin/AdminModal';
import Button from '../../components/Button/Button';

// Import the secure API client
import apiClient from '../../utils/apiClient';

const MyCommandsPage = () => {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCommand, setEditingCommand] = useState(null); // To hold the command being edited
  const { register, handleSubmit, setValue, reset } = useForm();

  // Function to fetch only the logged-in user's commands
  const fetchMyCommands = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get('/commands/mycommands');
      // Sort commands by the newest first
      setCommands(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) { 
      console.error("Failed to fetch commands", error);
    }
    finally { 
      setLoading(false); 
    }
  };

  // Fetch commands when the component first loads
  useEffect(() => { 
    fetchMyCommands(); 
  }, []);

  // Function to open the edit modal and pre-fill the form
  const openEditModal = (command) => {
    setEditingCommand(command);
    setValue('message', command.message);
  };

  // Function to handle submitting the updated command message
  const handleUpdateCommand = async (data) => {
    if (!editingCommand) return;
    try {
      await apiClient.put(`/commands/${editingCommand._id}`, { message: data.message });
      setEditingCommand(null); // Close the modal
      reset();
      fetchMyCommands(); // Refresh the list to show the update
    } catch (error) {
      console.error("Failed to update command", error);
      alert("Failed to update command.");
    }
  };

  // Function to handle deleting a pending command
  const handleDeleteCommand = async (commandId) => {
    if (window.confirm('Are you sure you want to permanently delete this command?')) {
      try {
        await apiClient.delete(`/commands/${commandId}`);
        // Refresh the list by filtering out the deleted command instantly
        setCommands(prev => prev.filter(cmd => cmd._id !== commandId));
      } catch (error) {
        console.error("Failed to delete command", error);
        alert(error.response?.data?.message || "Failed to delete command.");
      }
    }
  };

  return (
    <div>
      <AdminHeader title="My Command History" subtitle="View and manage your pending requests." />
      
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Message</th>
              <th>Status</th>
              <th>Date Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ textAlign: 'center' }}>Loading your commands...</td></tr>
            ) : commands.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center' }}>You have not submitted any commands yet.</td></tr>
            ) : (
              commands.map(cmd => (
                <tr key={cmd._id}>
                  <td style={{ whiteSpace: 'pre-wrap', maxWidth: '500px' }}>{cmd.message}</td>
                  <td><span className={`role-pill ${cmd.status}`}>{cmd.status}</span></td>
                  <td>{new Date(cmd.createdAt).toLocaleDateString()}</td>
                  <td>
                    {/* Only show action buttons if the command is still pending */}
                    {cmd.status === 'pending' && (
                      <div className="action-buttons-group">
                        <button className="action-btn" onClick={() => openEditModal(cmd)} title="Edit Command">
                          <FaEdit />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDeleteCommand(cmd._id)} title="Delete Command">
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AdminModal title="Edit Your Command" isOpen={!!editingCommand} onClose={() => setEditingCommand(null)}>
        <form onSubmit={handleSubmit(handleUpdateCommand)}>
          <div className="form-group">
            <label>Your Message</label>
            <textarea rows="5" {...register('message', { required: true })}></textarea>
          </div>
          <Button type="submit">Update Command</Button>
        </form>
      </AdminModal>
    </div>
  );
};

export default MyCommandsPage;