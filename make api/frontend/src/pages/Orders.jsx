import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Eye, Trash2 } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/api/orders');
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return { bg: '#dcfce7', text: '#166534' };
            case 'pending': return { bg: '#fef9c3', text: '#854d0e' };
            case 'cancelled': return { bg: '#fee2e2', text: '#b91c1c' };
            default: return { bg: '#f1f5f9', text: '#64748b' };
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Order Management</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ShoppingBag size={18} color="#6366f1" />
                        <span style={{ fontWeight: '600' }}>{orders.length} Total Orders</span>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Loading orders...</td></tr>
                            ) : orders.length === 0 ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No orders found</td></tr>
                            ) : orders.map((order) => {
                                const statusStyle = getStatusColor(order.status);
                                return (
                                    <tr key={order._id}>
                                        <td style={{ fontWeight: '600' }}>#{order._id.slice(-6).toUpperCase()}</td>
                                        <td>
                                            <div>
                                                <div style={{ fontWeight: '500' }}>{order.user?.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{order.user?.email}</div>
                                            </div>
                                        </td>
                                        <td>{order.orderItems?.length} items</td>
                                        <td style={{ fontWeight: '600' }}>${order.totalPrice.toFixed(2)}</td>
                                        <td>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                backgroundColor: statusStyle.bg,
                                                color: statusStyle.text
                                            }}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="btn" style={{ padding: '0.5rem', background: '#f1f5f9', color: '#6366f1' }}>
                                                <Eye size={16} />
                                            </button>
                                            <button className="btn" style={{ padding: '0.5rem', background: '#f1f5f9', color: '#ef4444' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
