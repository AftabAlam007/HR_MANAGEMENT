import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { employees as initialEmployees } from '../../../components/data/mockHrData';
import CreateUserModal from '../../../components/modals/CreateUserModal';

const EmployeesPage = () => {
    const [employees, setEmployees] = useState(initialEmployees);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'On Leave': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <DashboardLayout
            role="hr"
            title="Employee Management"
            userName="Zakir Hussain"
            userEmail="zakir.h@workbridge.com"
        >
            <CreateUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onUserCreated={() => {}} />

            <div className="p-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">All Employees</h2>
                            <p className="text-gray-600">View, search, and manage all employee records.</p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            + Add Employee
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left bg-white">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="p-3 font-semibold text-gray-600">Name</th>
                                    <th className="p-3 font-semibold text-gray-600">Job Title</th>
                                    <th className="p-3 font-semibold text-gray-600">Department</th>
                                    <th className="p-3 font-semibold text-gray-600">Status</th>
                                    <th className="p-3 font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(user => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">
                                            <div className="font-medium text-gray-800">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </td>
                                        <td className="p-3 text-gray-700">{user.jobTitle}</td>
                                        <td className="p-3 text-gray-700">{user.department}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <button className="text-blue-600 hover:underline text-sm">View Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default EmployeesPage;
