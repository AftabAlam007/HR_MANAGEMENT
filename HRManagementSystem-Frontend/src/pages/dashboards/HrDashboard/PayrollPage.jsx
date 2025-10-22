import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { payrollRecords as initialRecords } from '../../../components/data/mockHrData';
import { CurrencyDollarIcon, UsersIcon } from '../../../components/ui/Icons';

const PayrollPage = () => {
    const [records, setRecords] = useState(initialRecords);
    const [activeTab, setActiveTab] = useState('Current');

    const handleRunPayroll = () => {
        if (window.confirm("Are you sure you want to run payroll for the current period? This action cannot be undone.")) {
            // Simulate API call and state update
            alert("Payroll is being processed for all pending employees... (Simulated)");
            setRecords(records.map(r => r.status === 'Pending' ? { ...r, status: 'Processing' } : r));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Processing': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const currentRecords = records.filter(r => r.payPeriod === 'September 2025');
    const pastRecords = records.filter(r => r.payPeriod !== 'September 2025');

    const recordsToDisplay = activeTab === 'Current' ? currentRecords : pastRecords;

    // Calculate stats for the current period
    const totalPayroll = currentRecords.reduce((sum, record) => sum + record.netPay, 0);
    const employeesToPay = currentRecords.filter(r => r.status === 'Pending' || r.status === 'Processing').length;

    return (
        <DashboardLayout
            role="hr"
            title="Payroll"
            userName="Zakir Hussain"
            userEmail="zakir.h@workbridge.com"
        >
            <div className="p-8">
                {/* Header and Main Action */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Run Payroll for September 2025</h2>
                        <p className="text-gray-600">Review employee salaries and process payments for the current pay period.</p>
                    </div>
                    <button
                        onClick={handleRunPayroll}
                        disabled={employeesToPay === 0}
                        className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Run Payroll
                    </button>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <CurrencyDollarIcon className="h-8 w-8 text-green-500 mb-2" />
                        <h3 className="text-gray-500 text-sm font-medium uppercase">Total Net Payroll (Current)</h3>
                        <p className="text-3xl font-bold text-gray-800">${totalPayroll.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <UsersIcon className="h-8 w-8 text-blue-500 mb-2" />
                        <h3 className="text-gray-500 text-sm font-medium uppercase">Employees in this Run</h3>
                        <p className="text-3xl font-bold text-gray-800">{currentRecords.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <UsersIcon className="h-8 w-8 text-yellow-500 mb-2" />
                        <h3 className="text-gray-500 text-sm font-medium uppercase">Payments Pending/Processing</h3>
                        <p className="text-3xl font-bold text-gray-800">{employeesToPay}</p>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="border-b border-gray-200 mb-4">
                        <nav className="-mb-px flex space-x-6">
                            <button onClick={() => setActiveTab('Current')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'Current' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                Current Period (September 2025)
                            </button>
                            <button onClick={() => setActiveTab('Past')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'Past' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                Past Payrolls
                            </button>
                        </nav>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left bg-white">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="p-3 font-semibold text-gray-600">Employee</th>
                                    <th className="p-3 font-semibold text-gray-600 text-right">Gross Pay</th>
                                    <th className="p-3 font-semibold text-gray-600 text-right">Deductions</th>
                                    <th className="p-3 font-semibold text-gray-600 text-right">Net Pay</th>
                                    <th className="p-3 font-semibold text-gray-600">Status</th>
                                    <th className="p-3 font-semibold text-gray-600">Pay Date</th>
                                    <th className="p-3 font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recordsToDisplay.map(record => (
                                    <tr key={record.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-medium text-gray-800">{record.employeeName}</td>
                                        <td className="p-3 text-gray-700 text-right">${record.grossPay.toLocaleString()}</td>
                                        <td className="p-3 text-red-600 text-right">(${record.deductions.toLocaleString()})</td>
                                        <td className="p-3 font-bold text-gray-800 text-right">${record.netPay.toLocaleString()}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td className="p-3 text-gray-700">{record.payDate || '—'}</td>
                                        <td className="p-3">
                                            <button className="text-blue-600 hover:underline text-sm">View Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {recordsToDisplay.length === 0 && <p className="text-center text-gray-500 py-6">No payroll records found for this period.</p>}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PayrollPage;
