import { useState, useEffect } from 'react';
import API from '../services/api';
import { Search, Eye, MoreVertical, CheckCircle, Truck, Clock, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await API.get('/orders');
            setOrders(data);
        } catch (error) {
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await API.put(`/orders/${id}/status`, { status });
            toast.success('Order status updated');
            fetchOrders();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Processing': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Shipped': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'Delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Cancelled': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold dark:text-white uppercase tracking-tight">Order Management</h1>
                <p className="text-gray-500 dark:text-gray-400">Total {orders.length} orders found</p>
            </div>

            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-slate-800">
                                <th className="th">Order ID</th>
                                <th className="th">Customer</th>
                                <th className="th">Status</th>
                                <th className="th">Total</th>
                                <th className="th">Date</th>
                                <th className="th">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                            {loading ? (
                                <tr><td colSpan="6" className="p-8 text-center text-gray-500">Retrieving orders...</td></tr>
                            ) : orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order._id} className="tr">
                                        <td className="td font-bold text-xs uppercase tracking-tighter">#{order._id.slice(-8)}</td>
                                        <td className="td">
                                            <div className="flex flex-col">
                                                <span className="font-bold uppercase tracking-tight text-xs dark:text-white">{order.user?.name}</span>
                                                <span className="text-[10px] text-gray-400 font-medium tracking-tight uppercase">{order.user?._id?.slice(-8)}</span>
                                            </div>
                                        </td>
                                        <td className="td">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="td font-bold dark:text-white">${order.totalPrice.toFixed(2)}</td>
                                        <td className="td text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="td">
                                            <div className="flex items-center gap-2">
                                                <select
                                                    className="text-[10px] font-bold uppercase tracking-widest bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded p-1 dark:text-gray-200"
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                                <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6" className="p-8 text-center text-gray-500">No orders found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
