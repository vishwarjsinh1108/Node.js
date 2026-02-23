import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Package,
    ShoppingCart,
    UserCircle,
    LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout, admin } = useAuth();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
        { name: 'Users', path: '/users', icon: <Users size={20} /> },
        { name: 'Products', path: '/products', icon: <Package size={20} /> },
        { name: 'Orders', path: '/orders', icon: <ShoppingCart size={20} /> },
        { name: 'Profile', path: '/profile', icon: <UserCircle size={20} /> },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                Admin Panel
            </div>
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
            <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button className="nav-item" style={{ width: '100%', background: 'none' }} onClick={logout}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
