import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const CompliancePage = () => {
  const [auditLogs] = useState([
    { id: 1, timestamp: '2025-09-07 14:30:15', user: 'Admin', action: 'Created HR Account: Jane Doe', ip: '192.168.1.10' },
    { id: 2, timestamp: '2025-09-07 15:01:03', user: 'John Smith', action: 'Failed Login Attempt', ip: '203.0.113.45' },
    { id: 3, timestamp: '2025-09-07 15:45:22', user: 'Admin', action: 'Updated System Setting: Min Password Length', ip: '192.168.1.10' },
    { id: 4, timestamp: '2025-09-07 16:10:05', user: 'Jane Doe', action: 'Approved Leave Request: Alice Johnson', ip: '10.0.0.5' },
    { id: 5, timestamp: '2025-09-07 17:05:30', user: 'System', action: 'Scheduled Daily Backup', ip: 'N/A' },
  ]);

  const [complianceRules] = useState([
    { id: 1, name: 'GDPR Data Retention Policy', description: 'Employee data retained for 7 years post-termination.', status: 'Active', enforced: true },
    { id: 2, name: 'Password Complexity Requirements', description: 'Passwords must be >10 chars, include symbols, numbers, upper/lower case.', status: 'Active', enforced: true },
    { id: 3, name: 'Access Control Policy', description: 'Role-based access controls enforced for all system modules.', status: 'Active', enforced: true },
    { id: 4, name: 'PCI DSS Compliance', description: 'Strict handling rules for payment card data.', status: 'Draft', enforced: false },
  ]);

  return (
    <DashboardLayout
        role="admin"
        title="Compliance"
        userName="System Admin"
        userEmail="admin@workbridge.com"
    >
        <div className="p-8">
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Audit Logs</h2>
                <p className="text-gray-600 mb-6">
                    Review all system activities and user actions for auditing and security purposes.
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left bg-white border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="p-3 font-semibold text-gray-600">Timestamp</th>
                                <th className="p-3 font-semibold text-gray-600">User</th>
                                <th className="p-3 font-semibold text-gray-600">Action</th>
                                <th className="p-3 font-semibold text-gray-600">IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auditLogs.map(log => (
                                <tr key={log.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 text-gray-700 text-sm">{log.timestamp}</td>
                                    <td className="p-3 text-gray-700 text-sm">{log.user}</td>
                                    <td className="p-3 text-gray-700 text-sm">{log.action}</td>
                                    <td className="p-3 text-gray-700 text-sm">{log.ip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {auditLogs.length === 0 && (
                    <p className="text-center text-gray-500 mt-6">No audit logs found.</p>
                )}
                <div className="mt-6 text-right">
                    <button className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                        View Full Audit Trail
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Compliance Rules & Policies</h2>
                <p className="text-gray-600 mb-6">
                    Define and manage organizational compliance rules and ensure adherence to regulations.
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left bg-white border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="p-3 font-semibold text-gray-600">Rule Name</th>
                                <th className="p-3 font-semibold text-gray-600">Description</th>
                                <th className="p-3 font-semibold text-gray-600">Status</th>
                                <th className="p-3 font-semibold text-gray-600">Enforced</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complianceRules.map(rule => (
                                <tr key={rule.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 text-gray-700">{rule.name}</td>
                                    <td className="p-3 text-gray-700 text-sm max-w-xs">{rule.description}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${rule.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {rule.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${rule.enforced ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {rule.enforced ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {complianceRules.length === 0 && (
                    <p className="text-center text-gray-500 mt-6">No compliance rules defined.</p>
                )}
                <div className="mt-6 text-right">
                    <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Manage Rules
                    </button>
                </div>
            </div>
        </div>
    </DashboardLayout>
  );
};

export default CompliancePage;