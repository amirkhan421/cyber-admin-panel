import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import * as Icons from 'lucide-react';

const StatsCard = ({ title, value, change, status, iconName }) => {
    const Icon = Icons[iconName] || Icons.Activity;

    let statusColor = 'text-slate-400';
    let changeColor = 'text-slate-500';
    let bgRing = 'ring-slate-700';

    if (status === 'danger') {
        statusColor = 'text-red-500';
        changeColor = 'text-red-400';
        bgRing = 'ring-red-500/30';
    } else if (status === 'success') {
        statusColor = 'text-emerald-500';
        changeColor = 'text-emerald-400';
        bgRing = 'ring-emerald-500/30';
    } else if (status === 'warning') {
        statusColor = 'text-amber-500';
        changeColor = 'text-amber-400';
        bgRing = 'ring-amber-500/30';
    } else if (status === 'info') {
        statusColor = 'text-cyan-500';
        changeColor = 'text-cyan-400';
        bgRing = 'ring-cyan-500/30';
    }

    return (
        <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm hover:border-slate-700 transition duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-400">{title}</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-100">{value}</p>
                </div>
                <div className={`rounded-full p-3 bg-slate-800 ring-1 ${bgRing}`}>
                    <Icon className={`h-6 w-6 ${statusColor}`} />
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
                <span className={`flex items-center gap-1 font-medium ${changeColor}`}>
                    {change.includes('+') ? <ArrowUp size={16} /> : change.includes('-') ? <ArrowDown size={16} /> : <Minus size={16} />}
                    {change}
                </span>
                <span className="ml-2 text-slate-500">from last week</span>
            </div>
        </div>
    );
};

export default StatsCard;
