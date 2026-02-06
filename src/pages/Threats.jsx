import { useEffect, useState } from 'react';
import { dataService } from '../services/data.service';
import { AlertCircle, Search, Filter, Download } from 'lucide-react';

const Threats = () => {
    const [threats, setThreats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        loadThreats();
    }, []);

    const loadThreats = async () => {
        setLoading(true);
        try {
            const data = await dataService.getThreats();
            setThreats(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'Critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'High': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        }
    };

    const filteredThreats = filter === 'All' ? threats : threats.filter(t => t.severity === filter);

    if (loading) return <div className="p-4 text-slate-400">Loading logs...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">Threat Intelligence Log</h2>
                    <p className="text-slate-400 text-sm">Real-time security events and incidents</p>
                </div>

                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search logs..."
                            className="rounded-lg border border-slate-700 bg-slate-900 pl-9 pr-4 py-2 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none"
                        />
                    </div>
                    <button className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700">
                        <Filter size={16} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-cyan-600/20 border border-cyan-500/30 px-3 py-2 text-sm text-cyan-400 hover:bg-cyan-600/30">
                        <Download size={16} />
                        Export
                    </button>
                </div>
            </div>

            <div className="flex gap-2 mb-4">
                {['All', 'Critical', 'High', 'Medium', 'Low'].map(sev => (
                    <button
                        key={sev}
                        onClick={() => setFilter(sev)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
              ${filter === sev
                                ? 'bg-slate-700 text-white border-slate-600'
                                : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-700'}`}
                    >
                        {sev}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredThreats.map((threat) => (
                    <div key={threat.id} className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900/40 p-4 md:flex-row md:items-center md:justify-between hover:bg-slate-800/40 transition">
                        <div className="flex items-start gap-4">
                            <div className={`mt-1 rounded-lg p-2 border ${getSeverityColor(threat.severity)}`}>
                                <AlertCircle size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-200">{threat.type}</h4>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                                    <span>Source: <code className="text-slate-400">{threat.source}</code></span>
                                    <span>•</span>
                                    <span>ID: #{threat.id}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 md:gap-2">
                            <span className={`px-2 py-0.5 rounded text-xs border ${threat.status === 'Blocked' ? 'border-emerald-500/30 text-emerald-400' : 'border-amber-500/30 text-amber-400'
                                }`}>
                                {threat.status}
                            </span>
                            <span className="text-xs text-slate-500">
                                {new Date(threat.timestamp).toLocaleString()}
                            </span>
                        </div>
                    </div>
                ))}
                {filteredThreats.length === 0 && (
                    <div className="text-center py-12 border border-dashed border-slate-800 rounded-lg">
                        <p className="text-slate-500">No logs found matching filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Threats;
