import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Crud = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '', price: '', stock: '' });
    const [editItem, setEditItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems(response.data);
        } catch (error) {
            console.error('Failed to fetch items:', error);
        }
    };

    const validateFields = () => {
        const errors = {};
        if (!newItem.name) errors.name = 'Name is required';
        if (!newItem.description) errors.description = 'Description is required';
        if (!newItem.price) {
            errors.price = 'Price is required';
        } else if (isNaN(newItem.price)) {
            errors.price = 'Price must be a number';
        }
        if (!newItem.stock) {
            errors.stock = 'Stock is required';
        } else if (!Number.isInteger(Number(newItem.stock)) || newItem.stock < 0) {
            errors.stock = 'Stock must be a positive integer';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddOrEdit = async () => {
        if (!validateFields()) return;

        try {
            if (isEditing) {
                if (editItem) {
                    await axios.put(`http://localhost:8000/api/products/${editItem.id}`, newItem, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setEditItem(null);
                }
            } else {
                await axios.post('http://localhost:8000/api/products', newItem, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchItems();
            setNewItem({ name: '', description: '', price: '', stock: '' });
            setShowModal(false);
            setIsEditing(false); // Reset the editing flag
        } catch (error) {
            console.error('Failed to save item:', error);
        }
    };

    const handleEditClick = (item) => {
        setEditItem(item);
        setNewItem(item); // Populate fields with the item data
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchItems();
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="container mt-4">
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">MSI Inventory</a>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            <button className="btn btn-primary mb-3" onClick={() => { setIsEditing(false); setShowModal(true); }}>Add Product</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>${item.price}</td>
                            <td>{item.stock}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEditClick(item)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{isEditing ? 'Edit Product' : 'Add Product'}</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name:</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="form-control"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    required
                                />
                                {errors.name && <div className="text-danger">{errors.name}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description:</label>
                                <input
                                    id="description"
                                    type="text"
                                    className="form-control"
                                    value={newItem.description}
                                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                    required
                                />
                                {errors.description && <div className="text-danger">{errors.description}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price:</label>
                                <input
                                    id="price"
                                    type="number"
                                    className="form-control"
                                    value={newItem.price}
                                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                    required
                                />
                                {errors.price && <div className="text-danger">{errors.price}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stock" className="form-label">Stock:</label>
                                <input
                                    id="stock"
                                    type="number"
                                    className="form-control"
                                    value={newItem.stock}
                                    onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                                    required
                                />
                                {errors.stock && <div className="text-danger">{errors.stock}</div>}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleAddOrEdit}>
                                {isEditing ? 'Save Changes' : 'Add Product'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Crud;
