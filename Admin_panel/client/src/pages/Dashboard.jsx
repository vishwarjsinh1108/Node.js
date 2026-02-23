import { useState, useEffect } from 'react';
import API from '../services/api';
import {
    Users,
    ShoppingBag,
    ShoppingCart,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, trend, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="card p-6"
    >
        <div className="flex items-start justify-between">
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold mt-1 dark:text-white uppercase">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-500`}>
                <Icon size={24} />
            </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
            {trend > 0 ? (
                <span className="flex items-center text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                    <ArrowUpRight size={14} className="mr-1" /> {trend}%
                </span>
            ) : (
                <span className="flex items-center text-xs font-medium text-rose-500 bg-rose-500/10 px-2 py-1 rounded-full">
                    <ArrowDownRight size={14} className="mr-1" /> {Math.abs(trend)}%
                </span>
            )}
            <span className="text-xs text-gray-400">vs last month</span>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await API.get('/dashboard/stats');
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;

    const cardData = [
        { title: 'Total Users', value: stats?.usersCount, icon: Users, trend: 12, color: 'blue' },
        { title: 'Total Products', value: stats?.productsCount, icon: ShoppingBag, trend: 5, color: 'purple' },
        { title: 'Total Orders', value: stats?.ordersCount, icon: ShoppingCart, trend: -2, color: 'orange' },
        { title: 'Revenue', value: `$${stats?.totalSales?.toLocaleString()}`, icon: TrendingUp, trend: 18, color: 'emerald' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold dark:text-white">Dashboard Overview</h1>
                <p className="text-gray-500 dark:text-gray-400">Welcome back to your administration panel.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cardData.map((stat, i) => (
                    <StatsCard key={i} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity / Orders */}
                <div className="lg:col-span-2 card">
                    <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
                        <h2 className="font-bold text-lg dark:text-white">Recent Orders</h2>
                        <button className="text-primary-600 hover:underline text-sm font-medium">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-slate-700/50">
                                    <th className="th">Order ID</th>
                                    <th className="th">Customer</th>
                                    <th className="th">Status</th>
                                    <th className="th">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                                {stats?.recentOrders?.map((order) => (
                                    <tr key={order._id} className="tr">
                                        <td className="td font-medium">#{order._id.slice(-6)}</td>
                                        <td className="td">{order.user?.name}</td>
                                        <td className="td">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                        ${order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                    order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                                                        'bg-gray-100 text-gray-700'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="td">${order.totalPrice.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <div className="card p-6">
                        <h2 className="font-bold text-lg mb-4 dark:text-white uppercase">System Info</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                        <Clock size={16} />
                                    </div>
                                    <span className="text-sm dark:text-gray-300">Server Status</span>
                                </div>
                                <span className="text-xs font-medium text-emerald-500">Online</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-primary-500 h-full w-[85%]"></div>
                            </div>
                            <p className="text-[10px] text-gray-400 text-right uppercase tracking-wider">CPU Usage: 85%</p>
                        </div>
                    </div>

                    <div className="card p-6 bg-primary-600 text-white border-none shadow-primary-500/20 shadow-xl">
                        <h2 className="text-lg font-bold mb-2 uppercase">Pro Tip</h2>
                        <p className="text-primary-100 text-sm mb-4">You can manage all your products and inventory from the Products tab.</p>
                        <button className="bg-white text-primary-600 px-4 py-2 rounded-lg text-sm font-bold w-full">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
