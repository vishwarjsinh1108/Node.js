import { Bell, Search, Sun, Moon, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleSidebar }) => {
    const { darkMode, toggleDarkMode } = useTheme();
    const { user } = useAuth();

    return (
        <header className="h-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 sticky top-0 z-30 flex items-center justify-between px-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg lg:hidden"
                >
                    <Menu size={24} className="dark:text-white" />
                </button>

                <div className="hidden md:flex items-center bg-gray-100 dark:bg-slate-700/50 px-4 py-2 rounded-xl border border-transparent focus-within:border-primary-500 transition-all">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="bg-transparent border-none outline-none ml-3 text-sm w-64 dark:text-white"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleDarkMode}
                    className="p-2.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all"
                >
                    {darkMode ? (
                        <Sun size={20} className="text-yellow-400" />
                    ) : (
                        <Moon size={20} className="text-gray-600" />
                    )}
                </button>

                <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all relative">
                    <Bell size={20} className="text-gray-600 dark:text-gray-400" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                </button>

                <div className="h-8 w-[1px] bg-gray-200 dark:bg-slate-700 mx-2"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <h4 className="text-sm font-semibold dark:text-white">{user?.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 border border-primary-200 dark:border-primary-800 shadow-sm">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

import { Menu } from 'lucide-react';
export default Navbar;
