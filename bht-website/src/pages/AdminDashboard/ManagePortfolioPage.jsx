import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminModal from '../../components/Admin/AdminModal';
import Button from '../../components/Button/Button';
import apiClient from '../../utils/apiClient';

// Zod schema for the portfolio item form validation
const portfolioSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  category: z.string().min(3, { message: 'Category is required.' }),
  image: z.any().refine(files => files?.length === 1, 'Image file is required.'),
  description: z.string().min(20, { message: 'Description must be at least 20 characters.' }),
});

const ManagePortfolioPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(portfolioSchema),
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get('/portfolio');
      setItems(data);
    } catch (error) { console.error("Failed to fetch portfolio items", error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);
  
  const handleCreateItem = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('category', data.category);
    formData.append('description', data.description);
    formData.append('image', data.image[0]);

    try {
      await apiClient.post('/portfolio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setIsModalOpen(false);
      reset();
      fetchItems();
    } catch (error) {
      console.error("Failed to create portfolio item", error);
      alert('Error: Could not create portfolio item.');
    }
  };
  
  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this portfolio item?')) {
      alert(`(Development) Deleting item with ID: ${itemId}. Backend endpoint required.`);
    }
  };

  return (
    <div>
      <AdminHeader title="Manage Portfolio" subtitle="Add or remove items from your public gallery.">
        <Button onClick={() => setIsModalOpen(true)}>
          <FaPlus style={{ marginRight: '0.5rem' }} /> Add Item
        </Button>
      </AdminHeader>
      
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ textAlign: 'center' }}>Loading portfolio...</td></tr>
            ) : items.length === 0 ? (
                <tr><td colSpan="4" style={{ textAlign: 'center' }}>No portfolio items found.</td></tr>
            ) : (
              items.map(item => (
                <tr key={item._id}>
                  <td><img src={item.imageUrl} alt={item.title} style={{ width: '100px', height: 'auto', borderRadius: '4px' }} /></td>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>
                    <button className="action-btn delete" onClick={() => handleDeleteItem(item._id)} title="Delete Item">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AdminModal title="Add New Portfolio Item" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit(handleCreateItem)}>
          <div className="form-group">
            <label>Title</label>
            <input {...register('title')} />
            {errors.title && <p className="error-message">{errors.title.message}</p>}
          </div>
          <div className="form-group">
            <label>Category</label>
            <input {...register('category')} />
            {errors.category && <p className="error-message">{errors.category.message}</p>}
          </div>
          <div className="form-group">
            <label>Image File</label>
            <input type="file" {...register('image')} />
            {errors.image && <p className="error-message">{errors.image.message}</p>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows="4" {...register('description')}></textarea>
            {errors.description && <p className="error-message">{errors.description.message}</p>}
          </div>
          <Button type="submit">Upload & Add to Portfolio</Button>
        </form>
      </AdminModal>
    </div>
  );
};

export default ManagePortfolioPage;