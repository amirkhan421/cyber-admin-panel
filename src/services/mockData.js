export const MOCK_STATS = [
    { title: 'Active Threats', value: '12', change: '+2', status: 'danger', icon: 'ShieldAlert' },
    { title: 'System Health', value: '98%', change: 'Stable', status: 'success', icon: 'Activity' },
    { title: 'Network Traffic', value: '1.2 TB', change: '+15%', status: 'warning', icon: 'Network' },
    { title: 'Blocked Attacks', value: '1,024', change: '+120', status: 'info', icon: 'ShieldCheck' },
];

export const MOCK_THREATS = [
    { id: 101, type: 'SQL Injection', source: '192.168.1.5', severity: 'Critical', timestamp: '2023-10-27T10:30:00Z', status: 'Blocked' },
    { id: 102, type: 'XSS Attempt', source: '10.0.0.45', severity: 'High', timestamp: '2023-10-27T11:15:00Z', status: 'Blocked' },
    { id: 103, type: 'Brute Force', source: '203.0.113.8', severity: 'Medium', timestamp: '2023-10-27T12:00:00Z', status: 'Mitigated' },
    { id: 104, type: 'Malware Download', source: 'Internal', severity: 'Critical', timestamp: '2023-10-27T13:45:00Z', status: 'Investigating' },
    { id: 105, type: 'Port Scan', source: '198.51.100.2', severity: 'Low', timestamp: '2023-10-27T14:20:00Z', status: 'Logged' },
];

export const MOCK_USERS = [
    { id: 1, name: 'Admin User', email: 'admin@cyberpanel.com', role: 'admin', status: 'Active', lastLogin: '2023-10-27T09:00:00Z' },
    { id: 2, name: 'Security Analyst', email: 'analyst@cyberpanel.com', role: 'user', status: 'Active', lastLogin: '2023-10-26T16:30:00Z' },
    { id: 3, name: 'John Doe', email: 'john@cyberpanel.com', role: 'user', status: 'Inactive', lastLogin: '2023-10-20T11:00:00Z' },
];

export const LATENCY = 600;
