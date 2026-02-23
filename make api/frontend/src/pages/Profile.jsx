import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Save, CheckCircle } from 'lucide-react';

const Profile = () => {
    const { admin } = useAuth();
    const [formData, setFormData] = useState({
        name: admin?.name || '',
        email: admin?.email || '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('Profile updated successfully! (Demo mode)');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '2rem' }}>Admin Profile</h1>

            {message && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    borderRadius: '12px',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <CheckCircle size={20} />
                    {message}
                </div>
            )}

            <div className="grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                <div className="card" style={{ textAlign: 'center', height: 'fit-content' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: '#f1f5f9',
                        margin: '0 auto 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#6366f1',
                        border: '4px solid white',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}>
                        <User size={48} />
                    </div>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{admin?.name}</h2>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{admin?.email}</p>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#eef2ff',
                        color: '#6366f1',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                    }}>
                        <Shield size={14} />
                        {admin?.role?.toUpperCase()}
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Account Settings</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#94a3b8' }} size={18} />
                                <input
                                    type="text"
                                    className="form-input"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#94a3b8' }} size={18} />
                                <input
                                    type="email"
                                    className="form-input"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <hr style={{ margin: '2rem 0', border: '0', borderTop: '1px solid #e2e8f0' }} />
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Change Password</h3>

                        <div className="form-group">
                            <label className="form-label">New Password</label>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Leave blank to keep current"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label className="form-label">Confirm New Password</label>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Confirm your new password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: 'auto', padding: '0.75rem 2rem' }}>
                            <Save size={18} />
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
