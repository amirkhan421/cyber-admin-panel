import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-slate-950 text-slate-100">
            <h1 className="text-4xl font-bold mb-2 text-cyan-500">404</h1>
            <p className="text-slate-400 mb-6">Page not found.</p>
            <Link to="/" className="text-cyan-400 hover:underline">Go Home</Link>
        </div>
    );
};
export default NotFound;
