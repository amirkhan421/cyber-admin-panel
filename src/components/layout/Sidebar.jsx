import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {
    Shield,
    LayoutDashboard,
    Users,
    Activity,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const NAV_ITEMS = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard, roles: ['admin', 'user'] },
        { name: 'Threat Logs', path: '/threats', icon: Activity, roles: ['admin', 'user'] },
        { name: 'User Management', path: '/users', icon: Users, roles: ['admin'] },
        { name: 'Settings', path: '/settings', icon: Settings, roles: ['admin', 'user'] },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="fixed left-4 top-4 z-50 rounded-md bg-slate-800 p-2 text-cyan-400 md:hidden"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={clsx(
                "fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex items-center gap-3 px-6 py-8">
                        <Shield className="h-8 w-8 text-cyan-500" />
                        <h1 className="text-xl font-bold tracking-wider text-slate-100">
                            CYBER<span className="text-cyan-500">PANEL</span>
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-3">
                        {NAV_ITEMS.map((item) => {
                            if (item.roles && !item.roles.includes(user?.role)) return null;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => clsx(
                                        "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-cyan-500/10 text-cyan-400"
                                            : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                                    )}
                                >
                                    <item.icon size={20} />
                                    {item.name}
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* User Profile & Logout */}
                    <div className="border-t border-slate-800 p-4">
                        <div className="flex items-center gap-3 px-2 mb-4">
                            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="truncate text-sm font-medium text-slate-200">{user?.name}</p>
                                <p className="truncate text-xs text-slate-500">{user?.role?.toUpperCase()}</p>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
