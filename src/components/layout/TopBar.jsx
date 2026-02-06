import { useLocation } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';

const TopBar = () => {
    const { pathname } = useLocation();

    const getPageTitle = (path) => {
        switch (path) {
            case '/': return 'Dashboard Overview';
            case '/users': return 'User Management';
            case '/admin/users': return 'User Management';
            case '/threats': return 'Threat Log';
            case '/settings': return 'System Settings';
            default: return 'CyberPanel';
        }
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 backdrop-blur">
            <div className="flex items-center gap-4">
                {/* Placeholder for spacer if Sidebar pushes content */}
                <div className="hidden md:block w-px" />
                <h2 className="text-lg font-semibold text-slate-100">{getPageTitle(pathname)}</h2>
            </div>

            <div className="flex items-center gap-4">
                {/* Search Bar - Visual only */}
                <div className="hidden md:flex items-center rounded-full bg-slate-900 px-3 py-1.5 border border-slate-800 focus-within:border-cyan-500/50 transition-colors">
                    <Search size={16} className="text-slate-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent text-sm text-slate-300 placeholder-slate-500 focus:outline-none w-48"
                    />
                </div>

                {/* Notifications */}
                <button className="relative rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-cyan-400 transition-colors">
                    <Bell size={20} />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-950"></span>
                </button>
            </div>
        </header>
    );
};

export default TopBar;
