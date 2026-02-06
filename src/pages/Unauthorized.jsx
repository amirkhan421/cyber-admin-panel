import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Unauthorized = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-slate-950 text-slate-100">
            <ShieldAlert size={64} className="text-red-500 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
            <p className="text-slate-400 mb-6">You do not have permission to view this page.</p>
            <Link
                to="/"
                className="px-6 py-2 bg-slate-800 text-cyan-400 rounded hover:bg-slate-700 transition"
            >
                Return to Dashboard
            </Link>
        </div>
    );
};

export default Unauthorized;
