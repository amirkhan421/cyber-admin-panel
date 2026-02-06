import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// New (correct)
import useAuth from '../hooks/useAuth';
import { Shield, Lock, User, AlertCircle } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await login(username, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError('Invalid credentials. Try admin/password or user/password');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>

            <div className="z-10 w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl backdrop-blur-sm ring-1 ring-white/10">
                <div className="mb-8 flex flex-col items-center">
                    <div className="rounded-full bg-slate-800 p-4 ring-2 ring-cyan-500/50">
                        <Shield className="h-10 w-10 text-cyan-400" />
                    </div>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                        Cyber<span className="text-cyan-500">Panel</span>
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">Secure Access Portal</p>
                </div>

                {error && (
                    <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-300">
                            Username
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <User className="h-5 w-5 text-slate-500" />
                            </div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-2.5 pl-10 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                                placeholder="Enter username"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-300">
                            Password
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Lock className="h-5 w-5 text-slate-500" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-2.5 pl-10 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isSubmitting ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
                    <p>Restricted Access - Authorized Personnel Only</p>
                    <p className="mt-1">System ID: CYP-8842-X</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
