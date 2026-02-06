import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';

const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
                <TopBar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-950/50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
