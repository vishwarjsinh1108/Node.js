import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Mail, Save, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user, updateProfile, loading } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        const res = await updateProfile({ name, email, password });
        if (res.success) {
            toast.success('Profile updated successfully!');
            setPassword('');
            setConfirmPassword('');
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold dark:text-white uppercase tracking-tight">Admin Profile</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your account settings and security</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="card p-8 h-fit text-center space-y-4">
                    <div className="relative inline-block mx-auto">
                        <div className="w-32 h-32 rounded-3xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-4xl font-bold border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden">
                            {user?.name.charAt(0)}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold dark:text-white uppercase tracking-tight">{user?.name}</h2>
                        <p className="text-gray-500 text-xs font-black uppercase tracking-widest mt-1">{user?.role}</p>
                    </div>
                    <div className="pt-4 space-y-2 border-t border-gray-100 dark:border-slate-700">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 font-bold uppercase tracking-tighter text-xs">Joined</span>
                            <span className="dark:text-gray-300 font-bold text-xs uppercase tracking-tighter">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="lg:col-span-2 card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        className="input-field pl-10"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        className="input-field pl-10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 dark:border-slate-700 pt-6">
                            <h3 className="text-sm font-bold dark:text-white mb-4 uppercase tracking-widest">Security Settings</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="password"
                                            className="input-field pl-10"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="password"
                                            className="input-field pl-10"
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                disabled={loading}
                                type="submit"
                                className="btn btn-primary px-8 h-12 text-sm font-bold uppercase tracking-widest disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : (
                                    <>
                                        <Save size={18} /> Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
