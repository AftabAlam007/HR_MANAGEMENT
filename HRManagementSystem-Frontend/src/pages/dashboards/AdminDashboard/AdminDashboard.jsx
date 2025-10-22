import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { ChartBarIcon, UsersIcon, ShieldCheckIcon, CogIcon } from '../../../components/ui/Icons';
import CreateHrModal from '../../../components/modals/CreateHrModal';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <div className={`text-3xl ${color} mb-2`}>{icon}</div>
        <h3 className="text-gray-500 text-sm font-medium uppercase">{title}</h3>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
);

const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Simulated user data for the recent activity table
    const recentUsers = [
        { id: 1, name: 'Jane Doe', email: 'jane.d@example.com', role: 'HR Manager', status: 'Active' },
        { id: 2, name: 'John Smith', email: 'john.s@example.com', role: 'Employee', status: 'Active' },
    ];

    return (
        <DashboardLayout
            role="admin"
            title="Admin Dashboard"
            userName="System Admin"
            userEmail="admin@workbridge.com"
        >
            <CreateHrModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="p-8">
                {/* Top Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Users" value="1,250" icon={<UsersIcon className="h-8 w-8"/>} color="text-blue-500" />
                    <StatCard title="System Uptime" value="99.98%" icon={<ShieldCheckIcon className="h-8 w-8"/>} color="text-green-500" />
                    <StatCard title="API Requests (24h)" value="1.2M" icon={<ChartBarIcon className="h-8 w-8"/>} color="text-yellow-500" />
                    <StatCard title="Pending Approvals" value="3" icon={<CogIcon className="h-8 w-8"/>} color="text-red-500" />
                </div>

                {/* Main Grid: User Management and System Controls */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Management Panel */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Users</h3>
                        <p className="text-gray-600 mb-4">Create HR accounts or view all users in the system.</p>
                        
                        <div className="mt-4 flex flex-wrap gap-3">
                           <Link 
                                to="/admin/user-management" // Updated link
                                className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700"
                            >
                                View All Users
                            </Link>
                           <button 
                                onClick={() => setIsModalOpen(true)} 
                                className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
                            >
                                Create HR Account
                            </button>
                        </div>
                        
                        <div className="mt-6">
                            <h4 className="font-semibold text-gray-700 mb-2">Recent User Activity</h4>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b">
                                        <th className="p-2">Name</th>
                                        <th className="p-2">Email</th>
                                        <th className="p-2">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentUsers.map(user => (
                                        <tr key={user.id} className="border-b hover:bg-gray-50">
                                            <td className="p-2">{user.name}</td>
                                            <td className="p-2">{user.email}</td>
                                            <td className="p-2"><span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">{user.role}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* System Controls Panel */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">System Controls</h3>
                        <ul className="space-y-3">
                            <li><Link to="/admin/system-settings" className="flex items-center text-green-700 hover:underline"><CogIcon className="h-5 w-5 mr-2"/> Manage System Settings</Link></li>
                            <li><Link to="/admin/reports" className="flex items-center text-green-700 hover:underline"><ChartBarIcon className="h-5 w-5 mr-2"/> Generate Reports</Link></li>
                            <li><Link to="/admin/compliance" className="flex items-center text-green-700 hover:underline"><ShieldCheckIcon className="h-5 w-5 mr-2"/> View Compliance Rules</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;