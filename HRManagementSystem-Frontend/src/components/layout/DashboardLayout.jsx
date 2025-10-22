import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    WorkBridgeLogoIcon,
    ChartBarIcon,
    UsersIcon,
    BriefcaseIcon,
    CurrencyDollarIcon,
    CalendarDaysIcon,
    UserCircleIcon,
    CogIcon,
    ShieldCheckIcon,
    LogoutIcon,
} from '../ui/Icons'; // Ensure path is correct

const SidebarLink = ({ icon, text, to, active }) => (
    <Link
        to={to}
        className={`flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 ${
            active
                ? 'bg-green-700 text-white'
                : 'text-gray-300 hover:bg-green-700 hover:text-white'
        }`}
    >
        {icon}
        <span className="ml-3">{text}</span>
    </Link>
);

const DashboardLayout = ({ children, role, title, userName, userEmail }) => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const roleLinks = {
        admin: {
            mainNav: [
                { icon: <ChartBarIcon className="h-5 w-5" />, text: 'Dashboard', to: '/admin/dashboard' },
                { icon: <UsersIcon className="h-5 w-5" />, text: 'User Management', to: '/admin/user-management' },
                { icon: <CogIcon className="h-5 w-5" />, text: 'System Settings', to: '/admin/system-settings' },
                { icon: <ShieldCheckIcon className="h-5 w-5" />, text: 'Compliance', to: '/admin/compliance' },
                { icon: <ChartBarIcon className="h-5 w-5" />, text: 'Reports', to: '/admin/reports' },
            ],
            footerNav: [
                { icon: <UserCircleIcon className="h-5 w-5" />, text: 'Profile', to: '/admin/profile' },
                { icon: <CogIcon className="h-5 w-5" />, text: 'Settings', to: '/admin/settings' },
            ]
        },
        hr: {
            mainNav: [
                { icon: <ChartBarIcon className="h-5 w-5" />, text: 'Dashboard', to: '/hr/dashboard' },
                { icon: <UsersIcon className="h-5 w-5" />, text: 'Employees', to: '/hr/employees' },
                { icon: <BriefcaseIcon className="h-5 w-5" />, text: 'Recruitment', to: '/hr/recruitment' },
                { icon: <CalendarDaysIcon className="h-5 w-5" />, text: 'Leave', to: '/hr/leave' },
                { icon: <CurrencyDollarIcon className="h-5 w-5" />, text: 'Payroll', to: '/hr/payroll' },
            ],
            footerNav: [
                { icon: <UserCircleIcon className="h-5 w-5" />, text: 'Profile', to: '/hr/profile' },
                { icon: <CogIcon className="h-5 w-5" />, text: 'Settings', to: '/hr/settings' },
            ]
        },
        user: {
            mainNav: [
                { icon: <ChartBarIcon className="h-5 w-5" />, text: 'My Dashboard', to: '/user/dashboard' },
                { icon: <CalendarDaysIcon className="h-5 w-5" />, text: 'Leave', to: '/user/leave-application' },
                { icon: <CurrencyDollarIcon className="h-5 w-5" />, text: 'Payslips', to: '/user/payslips' },
            ],
            footerNav: [
                { icon: <UserCircleIcon className="h-5 w-5" />, text: 'Profile', to: '/user/profile' },
                { icon: <CogIcon className="h-5 w-5" />, text: 'Settings', to: '/user/settings' },
            ]
        },
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <aside className={`flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-20'} bg-green-800 text-white flex flex-col transition-width duration-300`}>
                <div className="h-16 flex items-center justify-center border-b border-green-900 flex-shrink-0">
                    <WorkBridgeLogoIcon />
                    {isSidebarOpen && <span className="ml-2 text-xl font-bold">WorkBridge</span>}
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {roleLinks[role].mainNav.map(link => (
                        <SidebarLink key={link.text} {...link} active={window.location.pathname === link.to} />
                    ))}
                </nav>
                <div className="px-4 py-6 border-t border-green-900 space-y-2">
                    {roleLinks[role].footerNav.map(link => (
                        <SidebarLink key={link.text} {...link} active={window.location.pathname === link.to} />
                    ))}
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2.5 rounded-lg text-gray-300 hover:bg-red-700 hover:text-white">
                        <LogoutIcon className="h-5 w-5"/>
                        {isSidebarOpen && <span className="ml-3">Logout</span>}
                    </button>
                </div>
            </aside>
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-500 focus:outline-none lg:hidden">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <h1 className="text-2xl font-semibold text-gray-800 ml-4">{title}</h1>
                    </div>
                    <div className="flex items-center">
                        <div className="text-right mr-4">
                            <p className="font-semibold text-gray-800">{userName}</p>
                            <p className="text-sm text-gray-500">{userEmail}</p>
                        </div>
                        <UserCircleIcon className="h-10 w-10 text-gray-600" />
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
