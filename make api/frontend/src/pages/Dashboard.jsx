import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get('/api/dashboard/stats');
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div>Loading statistics...</div>;

    const statCards = [
        { label: 'Total Users', value: stats?.totalUsers, icon: <Users />, color: '#6366f1', bg: '#eef2ff' },
        { label: 'Total Products', value: stats?.totalProducts, icon: <Package />, color: '#f59e0b', bg: '#fffbeb' },
        { label: 'Total Orders', value: stats?.totalOrders, icon: <ShoppingCart />, color: '#10b981', bg: '#ecfdf5' },
        { label: 'Total Revenue', value: `$${stats?.totalRevenue?.toFixed(2)}`, icon: <DollarSign />, color: '#ef4444', bg: '#fef2f2' },
    ];

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Dashboard Overview</h1>

            <div className="stats-grid">
                {statCards.map((stat, index) => (
                    <div key={index} className="card stat-card">
                        <div className="stat-header">
                            <div className="stat-icon" style={{ backgroundColor: stat.bg, color: stat.color }}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="card">
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Recent Activity</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats?.recentOrders?.map((order) => (
                                <tr key={order._id}>
                                    <td>#{order._id.slice(-6).toUpperCase()}</td>
                                    <td>{order.user?.name || 'Guest'}</td>
                                    <td>${order.totalPrice.toFixed(2)}</td>
                                    <td>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            backgroundColor: order.status === 'delivered' ? '#dcfce7' : '#fef9c3',
                                            color: order.status === 'delivered' ? '#166534' : '#854d0e'
                                        }}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
