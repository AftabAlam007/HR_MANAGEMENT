import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { UsersIcon, BriefcaseIcon, CurrencyDollarIcon, CalendarDaysIcon } from '../../../components/ui/Icons';
import { employees, leaveRequests, jobApplicants } from '../../../components/data/mockHrData';
import CreateUserModal from '../../../components/modals/CreateUserModal';
import PostJobModal from '../../../components/modals/PostJobModal';

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <div className={`text-3xl ${color} mb-2`}>{icon}</div>
        <h3 className="text-gray-500 text-sm font-medium uppercase">{title}</h3>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
);

const HrDashboard = () => {
    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
    const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
    const navigate = useNavigate();

    const pendingLeaveRequests = leaveRequests.filter(req => req.status === 'Pending');

    const handleApprove = (id) => {
      alert(`Leave request ID ${id} approved! (Simulated)`);
      // Here you would update the state or call an API
    };

    const handleDeny = (id) => {
      alert(`Leave request ID ${id} denied! (Simulated)`);
    };

    return (
        <DashboardLayout
            role="hr"
            title="HR Dashboard"
            userName="Zakir Hussain"
            userEmail="zakir.h@workbridge.com"
        >
            <CreateUserModal isOpen={isCreateUserModalOpen} onClose={() => setIsCreateUserModalOpen(false)} onUserCreated={() => {}} />
            <PostJobModal isOpen={isPostJobModalOpen} onClose={() => setIsPostJobModalOpen(false)} />

            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Employees" value={employees.length} icon={<UsersIcon className="h-8 w-8" />} color="text-blue-500" />
                    <StatCard title="New Applicants" value={jobApplicants.length} icon={<BriefcaseIcon className="h-8 w-8" />} color="text-green-500" />
                    <StatCard title="Leave Requests" value={pendingLeaveRequests.length} icon={<CalendarDaysIcon className="h-8 w-8" />} color="text-yellow-500" />
                    <StatCard title="Payroll Pending" value={'\$310k'} icon={<CurrencyDollarIcon className="h-8 w-8" />} color="text-red-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Pending Leave Requests</h3>
                            <Link to="/hr/leave" className="text-sm font-semibold text-green-600 hover:underline">View All</Link>
                        </div>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {pendingLeaveRequests.length > 0 ? pendingLeaveRequests.map(req => (
                                <div key={req.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                                    <div>
                                        <p className="font-semibold">{req.employeeName} <span className="text-sm text-gray-500 ml-2">({req.leaveType}: {req.days} days)</span></p>
                                        <p className="text-sm text-gray-500">Dates: {req.startDate} to {req.endDate}</p>
                                    </div>
                                    <div className="space-x-2 flex-shrink-0">
                                        <button onClick={() => handleApprove(req.id)} className="text-sm bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-md hover:bg-green-200">Approve</button>
                                        <button onClick={() => handleDeny(req.id)} className="text-sm bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-md hover:bg-red-200">Deny</button>
                                    </div>
                                </div>
                            )) : <p className="text-gray-500 text-center py-4">No pending leave requests.</p>}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
                            <ul className="space-y-3">
                                <li><button onClick={() => setIsCreateUserModalOpen(true)} className="block w-full text-left bg-blue-100 text-blue-800 p-3 rounded-lg hover:bg-blue-200 font-semibold transition-colors">+ Onboard New Employee</button></li>
                                <li><button onClick={() => setIsPostJobModalOpen(true)} className="block w-full text-left bg-green-100 text-green-800 p-3 rounded-lg hover:bg-green-200 font-semibold transition-colors">Post a New Job</button></li>
                                <li><button onClick={() => navigate('/hr/payroll')} className="block w-full text-left bg-yellow-100 text-yellow-800 p-3 rounded-lg hover:bg-yellow-200 font-semibold transition-colors">Run Payroll</button></li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                             <h3 className="text-xl font-semibold text-gray-800 mb-4">Recruitment Pipeline</h3>
                              <p className="text-sm text-gray-500 mb-3">Senior Frontend Developer</p>
                              <div className="space-y-2 text-sm">
                                <p className="flex justify-between"><strong>Applied:</strong> <span>12</span></p>
                                <p className="flex justify-between"><strong>Screening:</strong> <span>4</span></p>
                                <p className="flex justify-between"><strong>Interview:</strong> <span>2</span></p>
                                <p className="flex justify-between"><strong>Offer:</strong> <span>1</span></p>
                              </div>
                              <Link to="/hr/recruitment" className="text-sm font-semibold text-green-600 hover:underline mt-4 block text-right">View Details</Link>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default HrDashboard;
