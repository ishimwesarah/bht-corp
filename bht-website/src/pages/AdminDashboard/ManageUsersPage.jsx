import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Import reusable Admin UI components
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminModal from '../../components/Admin/AdminModal';
import Button from '../../components/Button/Button';

// Import the secure API client
import apiClient from '../../utils/apiClient';

// Zod schema for the create user form validation
const userSchema = z.object({
  name: z.string().min(3, { message: 'Full name is required.' }),
  email: z.string().email({ message: 'A valid email is required.' }),
  role: z.string().refine(val => val === 'client' || val === 'admin', { message: 'Please select a valid role.' }),
});

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(userSchema),
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get('/auth/users');
      setUsers(data);
    } catch (error) { 
      console.error("Failed to fetch users", error);
      // You could add a state here to show an error message to the user
    }
    finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { 
    fetchUsers(); 
  }, []);
  
  const handleCreateUser = async (formData) => {
    try {
      await apiClient.post('/auth/users', formData);
      setIsModalOpen(false);
      reset();
      fetchUsers(); // Refresh the user list after creation
    } catch (error) {
      console.error("Failed to create user", error);
      // Provide user-friendly feedback
      alert('Error: ' + (error.response?.data?.message || 'Could not create user. The email might already exist.'));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) {
        try {
            await apiClient.delete(`/auth/users/${userId}`);
            fetchUsers(); // Refresh the user list after deletion
        } catch (error) {
            console.error("Failed to delete user", error);
            alert('Failed to delete user.');
        }
    }
  };

  return (
    <div>
      <AdminHeader title="Manage Users" subtitle="Create, view, and delete user accounts.">
        <Button onClick={() => setIsModalOpen(true)}>
          <FaPlus style={{ marginRight: '0.5rem' }} /> Create User
        </Button>
      </AdminHeader>
      
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center' }}>Loading users...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center' }}>No users found. Create one!</td></tr>
            ) : (
              users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-pill ${user.role}`}>{user.role}</span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="action-btn delete" onClick={() => handleDeleteUser(user._id)} title="Delete User">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AdminModal title="Create New User" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit(handleCreateUser)}>
          <div className="form-group">
            <label>Full Name</label>
            <input {...register('name')} />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" {...register('email')} />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label>Role</label>
            <select defaultValue="client" {...register('role')}>
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="error-message">{errors.role.message}</p>}
          </div>
          <Button type="submit">Create User & Send Credentials</Button>
        </form>
      </AdminModal>
    </div>
  );
};

export default ManageUsersPage;