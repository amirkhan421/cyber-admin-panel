import { useEffect, useState } from 'react';
import { dataService } from '../services/data.service';
import { Trash2, Edit, UserCheck, UserX } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user: currentUser } = useAuth(); // To prevent deleting self (optional)

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await dataService.getUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            await dataService.deleteUser(id);
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const toggleStatus = async (userToUpdate) => {
        const newStatus = userToUpdate.status === 'Active' ? 'Inactive' : 'Active';
        await dataService.updateUserStatus(userToUpdate.id, newStatus);
        setUsers(users.map(u => u.id === userToUpdate.id ? { ...u, status: newStatus } : u));
    };

    if (loading) return <div className="p-4 text-slate-400">Loading users...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-100">User Management</h2>
                <button className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700">
                    Add User
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-900 text-xs uppercase text-slate-400">
                        <tr>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Last Login</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {users.map((u) => (
                            <tr key={u.id} className="hover:bg-slate-800/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-cyan-500">
                                            {u.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-200">{u.name}</div>
                                            <div className="text-xs text-slate-500">{u.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium 
                    ${u.role === 'admin' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium 
                    ${u.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-400'}`}></span>
                                        {u.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                    {new Date(u.lastLogin).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => toggleStatus(u)}
                                            className="p-2 text-slate-400 hover:text-cyan-400 transition"
                                            title={u.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        >
                                            {u.status === 'Active' ? <UserX size={18} /> : <UserCheck size={18} />}
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-amber-400 transition">
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(u.id)}
                                            className="p-2 text-slate-400 hover:text-red-500 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
