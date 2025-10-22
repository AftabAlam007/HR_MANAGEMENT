import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import UserActionModal from '../../../components/modals/UserActionModel'; // <-- CORRECTED TYPO: Modal, not Model

const UserManagementPage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedUserId, setSelectedUserId] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:8080/api/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (err) {
            toast.error(`Failed to fetch users: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                setCurrentUser(jwtDecode(token));
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
        fetchUsers();
    }, []);

    const handleOpenCreateModal = () => {
        setModalMode('create');
        setSelectedUserId(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (userId) => {
        setModalMode('edit');
        setSelectedUserId(userId);
        setIsModalOpen(true);
    };
    
    const handleModalComplete = (result) => {
        if (modalMode === 'create') {
            toast.success("Refreshing user list...");
            fetchUsers();
        } else {
            setUsers(prev => prev.map(user => 
                user.id === result.id ? result : user
            ));
        }
    };
    
    const handleResendInvite = (email) => {
        const promise = axios.post('http://localhost:8080/api/users/resend-invite', { email }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        toast.promise(promise, {
            loading: `Resending invite to ${email}...`,
            success: (response) => `${response.data.message}`,
            error: (err) => `Error: ${err.response?.data?.message || err.message}`,
        });
    };

    const handleDelete = (userId, userName) => {
        toast((t) => (
          <div className="flex flex-col items-center gap-2 p-2">
            <p className="font-medium text-center">Delete <b>{userName}</b>?</p>
            <div className="flex gap-4 mt-2">
              <button onClick={() => { performDelete(userId); toast.dismiss(t.id); }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm">Delete</button>
              <button onClick={() => toast.dismiss(t.id)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded text-sm">Cancel</button>
            </div>
          </div>
        ));
    };
  
    const performDelete = (userId) => {
        const promise = axios.delete(`http://localhost:8080/api/users/${userId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        toast.promise(promise, {
            loading: `Deleting user ${userId}...`,
            success: (response) => {
                setUsers(prev => prev.filter(user => user.id !== userId));
                return response.data.message;
            },
            error: (err) => `Error: ${err.response?.data?.message || err.message}`,
        });
    };

    const getStatusDisplay = (user) => {
        if (user.status === 'PENDING') {
          return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending Invite</span>;
        }
        if (user.requiresPasswordChange) {
          return <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Awaiting Reset</span>;
        }
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>;
    };
  
    const getRoleDisplay = (role) => {
        const roles = {
            'ADMIN': 'bg-purple-100 text-purple-800',
            'HR': 'bg-cyan-100 text-cyan-800',
            'USER': 'bg-gray-100 text-gray-700'
        };
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${roles[role] || 'bg-gray-100'}`}>{role}</span>
    };

    return (
        <DashboardLayout
            role="admin"
            title="User Management"
            userName={currentUser?.fullName || 'System Admin'}
            userEmail={currentUser?.sub || ''}
        >
            <UserActionModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                mode={modalMode}
                userId={selectedUserId}
                onComplete={handleModalComplete}
            />

            <div className="p-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">All System Users</h2>
                            <p className="text-gray-600">Oversee and manage all user accounts, roles, and statuses.</p>
                        </div>
                        <button onClick={handleOpenCreateModal} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700">
                            + Create New User
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left bg-white">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="p-3 font-semibold text-gray-600 uppercase">Name</th>
                                    <th className="p-3 font-semibold text-gray-600 uppercase">Job Title</th>
                                    <th className="p-3 font-semibold text-gray-600 uppercase">Role</th>
                                    <th className="p-3 font-semibold text-gray-600 uppercase">Status</th>
                                    <th className="p-3 font-semibold text-gray-600 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" className="text-center p-6 text-gray-500">Loading users...</td></tr>
                                ) : (
                                    users.map(user => (
                                        <tr key={user.id} className="border-b hover:bg-gray-50">
                                            <td className="p-3">
                                                <div className="font-medium text-gray-800">{user.fullName}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </td>
                                            <td className="p-3 text-gray-700">{user.jobTitle || 'N/A'}</td>
                                            <td className="p-3">{getRoleDisplay(user.role)}</td>
                                            <td className="p-3">{getStatusDisplay(user)}</td>
                                            <td className="p-3 text-right space-x-4">
                                                {user.status === 'PENDING' ? (
                                                    <button onClick={() => handleResendInvite(user.email)} className="text-blue-600 hover:underline text-sm font-semibold">Resend Invite</button>
                                                ) : (
                                                    <>
                                                        <button onClick={() => handleOpenEditModal(user.id)} className="text-blue-600 hover:underline text-sm font-medium">Edit</button>
                                                        <button onClick={() => handleDelete(user.id, user.fullName)} className="text-red-600 hover:underline text-sm font-medium">Delete</button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UserManagementPage;