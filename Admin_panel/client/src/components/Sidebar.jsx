import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    ShoppingCart,
    UserCircle,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu,
    X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, toggle }) => {
    const { logout } = useAuth();
    const location = useLocation();

    const menuItems = [
        { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { title: 'Users', icon: Users, path: '/users' },
        { title: 'Products', icon: ShoppingBag, path: '/products' },
        { title: 'Orders', icon: ShoppingCart, path: '/orders' },
        { title: 'Profile', icon: UserCircle, path: '/profile' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggle}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isOpen ? 260 : 0 }}
                className={`fixed left-0 top-0 h-screen bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 z-50 overflow-hidden transition-all duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:w-20'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                            S
                        </div>
                        {isOpen && (
                            <span className="font-bold text-xl tracking-tight dark:text-white">SmartAdmin</span>
                        )}
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 px-4 space-y-2 mt-4">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive
                                            ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                                            : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    <item.icon size={22} />
                                    {isOpen && <span className="font-medium">{item.title}</span>}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-gray-100 dark:border-slate-700">
                        <button
                            onClick={logout}
                            className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-medium"
                        >
                            <LogOut size={22} />
                            {isOpen && <span>Logout</span>}
                        </button>
                    </div>
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
