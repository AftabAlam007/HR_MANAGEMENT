import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { jobPostings, jobApplicants } from '../../../components/data/mockHrData';
import PostJobModal from '../../../components/modals/PostJobModal';

const RecruitmentPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <DashboardLayout
            role="hr"
            title="Recruitment"
            userName="Zakir Hussain"
            userEmail="zakir.h@workbridge.com"
        >
            <PostJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="p-8 space-y-8">
                {/* Job Postings Section */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Current Job Postings</h2>
                            <p className="text-gray-600">Manage open positions and track applicants.</p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            + Post New Job
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobPostings.map(job => (
                            <div key={job.id} className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-lg text-gray-800">{job.title}</h3>
                                <p className="text-sm text-gray-500">{job.department} &bull; {job.location}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-sm font-semibold">{job.applicants} Applicants</span>
                                    <a href="#" className="text-sm font-semibold text-green-600 hover:underline">View</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Applicants Section */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Applicants</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left bg-white">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="p-3 font-semibold text-gray-600">Applicant Name</th>
                                    <th className="p-3 font-semibold text-gray-600">Applied For</th>
                                    <th className="p-3 font-semibold text-gray-600">Stage</th>
                                    <th className="p-3 font-semibold text-gray-600">Submitted On</th>
                                    <th className="p-3 font-semibold text-gray-600">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                {jobApplicants.map(applicant => (
                                    <tr key={applicant.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-medium text-gray-800">{applicant.name}</td>
                                        <td className="p-3 text-gray-700">{applicant.appliedFor}</td>
                                        <td className="p-3 text-gray-700">{applicant.stage}</td>
                                        <td className="p-3 text-gray-700">{applicant.submitted}</td>
                                        <td className="p-3">
                                            <a href="#" className="text-blue-600 hover:underline text-sm">View Application</a>
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

export default RecruitmentPage;
