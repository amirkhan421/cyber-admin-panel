import { useState } from 'react';
import { Save, Bell, Shield, Lock, Eye, Terminal } from 'lucide-react';

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({
        notifications: true,
        emailAlerts: true,
        twoFactor: false,
        darkMode: true,
        autoLock: 15, // minutes
        logLevel: 'verbose'
    });

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        setLoading(true);
        // Simulate save
        setTimeout(() => {
            setLoading(false);
            alert('Settings saved successfully');
        }, 1000);
    };

    return (
        <div className="max-w-4xl space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-100">System Settings</h2>
                <p className="text-slate-400">Configure application preferences and security policies</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Security Settings */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="text-cyan-500" />
                        <h3 className="text-lg font-semibold text-slate-100">Security Policies</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-slate-200 block">Two-Factor Authentication</label>
                                <span className="text-xs text-slate-500">Require 2FA for all admin actions</span>
                            </div>
                            <button
                                onClick={() => handleChange('twoFactor', !settings.twoFactor)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.twoFactor ? 'bg-cyan-600' : 'bg-slate-700'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.twoFactor ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium text-slate-200 block">Auto-lock Session</label>
                            <select
                                value={settings.autoLock}
                                onChange={(e) => handleChange('autoLock', e.target.value)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-200 focus:border-cyan-500 outline-none"
                            >
                                <option value={5}>5 Minutes</option>
                                <option value={15}>15 Minutes</option>
                                <option value={30}>30 Minutes</option>
                                <option value={60}>1 Hour</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-slate-200 block">Strict IP Whitelisting</label>
                                <span className="text-xs text-slate-500">Only allow access from VPN IPs</span>
                            </div>
                            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-700 transition-colors">
                                <span className="inline-block h-4 w-4 transform rounded-full bg-slate-400 translate-x-1" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* System Preferences */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Terminal className="text-purple-500" />
                        <h3 className="text-lg font-semibold text-slate-100">System Preferences</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-slate-200 block">Push Notifications</label>
                                <span className="text-xs text-slate-500">Desktop alerts for high severity incidents</span>
                            </div>
                            <button
                                onClick={() => handleChange('notifications', !settings.notifications)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.notifications ? 'bg-cyan-600' : 'bg-slate-700'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-slate-200 block">Email Reports</label>
                                <span className="text-xs text-slate-500">Weekly digest of security stats</span>
                            </div>
                            <button
                                onClick={() => handleChange('emailAlerts', !settings.emailAlerts)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.emailAlerts ? 'bg-cyan-600' : 'bg-slate-700'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.emailAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium text-slate-200 block">Log Verbosity</label>
                            <select
                                value={settings.logLevel}
                                onChange={(e) => handleChange('logLevel', e.target.value)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-200 focus:border-cyan-500 outline-none"
                            >
                                <option value="error">Error Only</option>
                                <option value="info">Info</option>
                                <option value="verbose">Verbose</option>
                                <option value="debug">Debug</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-2.5 font-medium text-white hover:bg-cyan-700 disabled:opacity-50"
                >
                    <Save size={18} />
                    {loading ? 'Saving...' : 'Save Configuration'}
                </button>
            </div>
        </div>
    );
};

export default Settings;
