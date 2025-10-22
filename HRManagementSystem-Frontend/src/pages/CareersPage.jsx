import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ApplyJobModal from '../components/modals/ApplyJonModal'; // We will create this next
import Navbar from '../components/layout/Navbar'; // Assuming you have a public Navbar
import Footer from '../components/layout/Footer'; // Assuming you have a public Footer

const CareersPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Call the new PUBLIC endpoint
                const response = await axios.get('http://localhost:8080/public/jobs');
                setJobs(response.data);
            } catch (err) {
                toast.error("Could not load job postings at this time.");
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleApplyClick = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-50 min-h-screen">
                <ApplyJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} job={selectedJob} />
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-4">Join Our Team</h1>
                    <p className="text-center text-gray-600 mb-8">We're looking for passionate people to join us on our mission.</p>
                    {loading ? <p>Loading openings...</p> : (
                        <div className="space-y-4">
                            {jobs.map(job => (
                                <div key={job.id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                                    <div>
                                        <h2 className="text-xl font-bold text-blue-700">{job.title}</h2>
                                        <p className="text-gray-600">{job.department} &bull; {job.location}</p>
                                    </div>
                                    <button onClick={() => handleApplyClick(job)} className="bg-green-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-green-700">
                                        Apply Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};
export default CareersPage;