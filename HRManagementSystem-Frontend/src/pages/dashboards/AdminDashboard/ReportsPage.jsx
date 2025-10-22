import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { ChartBarIcon, UsersIcon, ShieldCheckIcon } from '../../../components/ui/Icons'; // Using relevant icons

const ReportSummaryCard = ({ title, value, description, icon, color }) => (
    <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
        <div className={`text-4xl ${color}`}>{icon}</div>
        <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    </div>
);

const ReportsPage = () => {
  const [reportFilters, setReportFilters] = useState({
    reportType: 'user_activity',
    timeframe: 'last_30_days',
    status: 'all',
  });
  const [generatedReport, setGeneratedReport] = useState(null);

  const availableReports = [
    { id: 'user_activity', name: 'User Activity Log', description: 'Detailed log of user actions.' },
    { id: 'employee_demographics', name: 'Employee Demographics', description: 'Overview of employee distribution.' },
    { id: 'system_performance', name: 'System Performance', description: 'Metrics on system uptime and resource usage.' },
  ];

  const timeframes = [
    { id: 'last_7_days', name: 'Last 7 Days' },
    { id: 'last_30_days', name: 'Last 30 Days' },
    { id: 'last_90_days', name: 'Last 90 Days' },
    { id: 'this_year', name: 'This Year' },
    { id: 'custom', name: 'Custom Range' },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setReportFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateReport = (e) => {
    e.preventDefault();
    console.log("Generating report with filters:", reportFilters);
    // Simulate API call to generate report
    setTimeout(() => {
      setGeneratedReport({
        id: Date.now(),
        type: reportFilters.reportType,
        timeframe: reportFilters.timeframe,
        generatedAt: new Date().toLocaleString(),
        data: {
          headers: ['Date', 'User', 'Action', 'Details'],
          rows: [
            ['2025-09-01', 'Admin', 'Logged In', 'Successful'],
            ['2025-09-02', 'HR Manager', 'Created new employee', 'Alice Johnson'],
            ['2025-09-03', 'Employee', 'Requested leave', 'Vacation, 3 days'],
            ['2025-09-04', 'Admin', 'Updated system settings', 'Password length to 10'],
          ],
        },
        summary: {
            'Total Actions': 1500,
            'Unique Users': 120,
            'Critical Alerts': 5,
        }
      });
      alert(`Report "${availableReports.find(r => r.id === reportFilters.reportType)?.name}" generated for ${timeframes.find(t => t.id === reportFilters.timeframe)?.name}! (Simulated)`);
    }, 1000);
  };

  return (
    <DashboardLayout
        role="admin"
        title="Reports"
        userName="System Admin"
        userEmail="admin@workbridge.com"
    >
        <div className="p-8">
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Reporting & Analytics</h2>
                <p className="text-gray-600 mb-6">
                    Generate insightful reports on user activity, system performance, and employee demographics.
                </p>

                <form onSubmit={handleGenerateReport} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">Report Type</label>
                        <select
                            name="reportType"
                            id="reportType"
                            value={reportFilters.reportType}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        >
                            {availableReports.map(report => (
                                <option key={report.id} value={report.id}>{report.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700">Timeframe</label>
                        <select
                            name="timeframe"
                            id="timeframe"
                            value={reportFilters.timeframe}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        >
                            {timeframes.map(tf => (
                                <option key={tf.id} value={tf.id}>{tf.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="w-full bg-green-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-800 transition-colors"
                        >
                            Generate Report
                        </button>
                    </div>
                </form>

                {generatedReport && (
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Generated Report: {availableReports.find(r => r.id === generatedReport.type)?.name}</h3>
                        <p className="text-gray-600 mb-4">Generated on: {generatedReport.generatedAt} for {timeframes.find(t => t.id === generatedReport.timeframe)?.name}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <ReportSummaryCard 
                                title="Total Actions" 
                                value={generatedReport.summary['Total Actions']} 
                                description="Overall activities recorded" 
                                icon={<ChartBarIcon />} 
                                color="text-blue-500" 
                            />
                            <ReportSummaryCard 
                                title="Unique Users" 
                                value={generatedReport.summary['Unique Users']} 
                                description="Users performing actions" 
                                icon={<UsersIcon />} 
                                color="text-purple-500" 
                            />
                             <ReportSummaryCard 
                                title="Critical Alerts" 
                                value={generatedReport.summary['Critical Alerts']} 
                                description="High-priority system events" 
                                icon={<ShieldCheckIcon />} 
                                color="text-red-500" 
                            />
                        </div>

                        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
                            <h4 className="font-semibold text-gray-700 mb-2">Details</h4>
                            <table className="min-w-full text-left bg-white border-collapse">
                                <thead>
                                    <tr className="border-b bg-gray-50">
                                        {generatedReport.data.headers.map((header, index) => (
                                            <th key={index} className="p-3 font-semibold text-gray-600">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {generatedReport.data.rows.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="border-b hover:bg-gray-50">
                                            {row.map((cell, cellIndex) => (
                                                <td key={cellIndex} className="p-3 text-gray-700 text-sm">{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 text-right">
                            <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mr-2">
                                Export as CSV
                            </button>
                            <button className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                                Print Report
                            </button>
                        </div>
                    </div>
                )}
                 {!generatedReport && (
                    <div className="text-center p-10 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Select a report type and timeframe, then click "Generate Report" to view analytics.</p>
                    </div>
                 )}
            </div>
        </div>
    </DashboardLayout>
  );
};

export default ReportsPage;