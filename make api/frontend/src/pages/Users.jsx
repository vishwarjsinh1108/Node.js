import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Search, Edit2, Trash2, X } from 'lucide-react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        status: 'active'
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('/api/users');
            setUsers(data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (user = null) => {
        if (user) {
            setIsEdit(true);
            setSelectedUser(user);
            setFormData({
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber || '',
                address: user.address || '',
                status: user.status
            });
        } else {
            setIsEdit(false);
            setSelectedUser(null);
            setFormData({
                name: '',
                email: '',
                phoneNumber: '',
                address: '',
                status: 'active'
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`/api/users/${selectedUser._id}`, formData);
            } else {
                await axios.post('/api/users', formData);
            }
            fetchUsers();
            handleCloseModal();
        } catch (error) {
            alert(error.response?.data?.message || 'Something went wrong');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`/api/users/${id}`);
                fetchUsers();
            } catch (error) {
                alert('Error deleting user');
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>User Management</h1>
                <button
                    className="btn btn-primary"
                    style={{ width: 'auto', padding: '0.75rem 1.5rem' }}
                    onClick={() => handleOpenModal()}
                >
                    <UserPlus size={18} />
                    <span>Add New User</span>
                </button>
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ position: 'relative', maxWidth: '400px' }}>
                    <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
                    <input
                        type="text"
                        className="form-input"
                        style={{ paddingLeft: '3rem' }}
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="card">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Loading users...</td></tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No users found</td></tr>
                            ) : filteredUsers.map((user) => (
                                <tr key={user._id}>
                                    <td style={{ fontWeight: '600' }}>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber || 'N/A'}</td>
                                    <td>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            backgroundColor: user.status === 'active' ? '#dcfce7' : '#f1f5f9',
                                            color: user.status === 'active' ? '#166534' : '#64748b'
                                        }}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            className="btn"
                                            style={{ padding: '0.5rem', background: '#f1f5f9', color: '#6366f1' }}
                                            onClick={() => handleOpenModal(user)}
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            className="btn"
                                            style={{ padding: '0.5rem', background: '#f1f5f9', color: '#ef4444' }}
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">{isEdit ? 'Edit User' : 'Add New User'}</h2>
                            <button className="modal-close" onClick={handleCloseModal}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    placeholder="Enter full name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="Enter email address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isEdit}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    className="form-input"
                                    placeholder="Enter phone number"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select
                                    name="status"
                                    className="form-input"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn" style={{ background: '#f1f5f9' }} onClick={handleCloseModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" style={{ width: 'auto', padding: '0.75rem 2rem' }}>
                                    {isEdit ? 'Update User' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
