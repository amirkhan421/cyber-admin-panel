import { useEffect, useState } from 'react';
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import { dataService } from '../services/data.service';
import { RefreshCw } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [threats, setThreats] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsData, threatsData] = await Promise.all([
                dataService.getStats(),
                dataService.getThreats()
            ]);
            setStats(statsData);
            setThreats(threatsData.slice(0, 5)); // Show only latest 5
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex bg-slate-900/0 items-center justify-center p-12">
                <RefreshCw className="animate-spin text-cyan-500" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">System Overview</h2>
                    <p className="text-slate-400">Monitoring status and recent incidents</p>
                </div>
                <button
                    onClick={fetchData}
                    className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
                >
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        status={stat.status}
                        iconName={stat.icon}
                    />
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="h-[400px] rounded-xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col items-center justify-center text-slate-500">
                        <p className="text-lg font-medium mb-2">Network Traffic Visualization</p>
                        <p className="text-sm mb-6">Live map rendering...</p>
                        {/* Simple visual mock for a map or chart */}
                        <div className="w-full h-full bg-slate-800/50 rounded-lg relative overflow-hidden">
                            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-4 p-4 opacity-20">
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <div key={i} className="border border-cyan-500/30 rounded"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <RecentActivity threats={threats} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
