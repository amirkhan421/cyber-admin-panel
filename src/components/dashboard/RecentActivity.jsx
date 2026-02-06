import { ShieldAlert, shieldCheck, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns'; // We might not have date-fns, lets use native Date

const RecentActivity = ({ threats }) => {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-100">Recent Security Events</h3>
            <div className="space-y-4">
                {threats.map((threat) => (
                    <div key={threat.id} className="flex items-start gap-4 rounded-lg border border-slate-800/50 bg-slate-900/30 p-4 transition hover:bg-slate-800/50">
                        <div className={`mt-1 rounded-full p-2 
              ${threat.severity === 'Critical' ? 'bg-red-500/20 text-red-500' :
                                threat.severity === 'High' ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-500'}`}
                        >
                            <AlertTriangle size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="font-medium text-slate-200">{threat.type}</p>
                                <span className={`text-xs px-2 py-0.5 rounded-full border 
                  ${threat.status === 'Blocked' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10' :
                                        'border-amber-500/30 text-amber-500 bg-amber-500/10'}`}>
                                    {threat.status}
                                </span>
                            </div>
                            <p className="text-sm text-slate-400 mt-1">Source: <span className="font-mono text-slate-300">{threat.source}</span></p>
                        </div>
                        <div className="text-right text-xs text-slate-500">
                            {new Date(threat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                ))}
                {threats.length === 0 && <p className="text-slate-500 text-center py-4">No recent activity.</p>}
            </div>
        </div>
    );
};

export default RecentActivity;
