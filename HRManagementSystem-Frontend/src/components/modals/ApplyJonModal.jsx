import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ApplyJobModal = ({ isOpen, onClose, job }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [resume, setResume] = useState(null); // State to hold the file object
    const [fileName, setFileName] = useState(''); // State to display the selected file's name

    if (!isOpen || !job) return null;

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Basic validation for file type and size (optional but recommended)
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error("File is too large. Please upload a file smaller than 5MB.");
                return;
            }
            setResume(file);
            setFileName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resume) {
            toast.error("Please upload your resume to apply.");
            return;
        }

        // --- CREATE FORMDATA OBJECT ---
        // This is essential for sending files
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('resume', resume); // Append the file itself

        const promise = axios.post(`http://localhost:8080/public/jobs/${job.id}/apply`, formData, {
            headers: {
                // Axios will automatically set the 'Content-Type' to 'multipart/form-data'
                // when you pass a FormData object as the body.
            }
        });

        toast.promise(promise, {
            loading: 'Submitting your application...',
            success: (res) => {
                onClose();
                return res.data.message;
            },
            error: (err) => err.response?.data?.message || "Submission failed. Please try again.",
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-2">Apply for {job.title}</h2>
                <p className="text-gray-600 mb-6">{job.department} &bull; {job.location}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required className="w-full p-2 border rounded"/>
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" required className="w-full p-2 border rounded"/>
                    
                    {/* --- NEW FILE INPUT --- */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume</label>
                        <label htmlFor="resume-upload" className="cursor-pointer bg-white border border-gray-300 rounded-md p-2 flex items-center justify-center hover:bg-gray-50">
                            <span>{fileName || 'Select a file (PDF, DOCX)...'}</span>
                        </label>
                        <input id="resume-upload" name="resume" type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">Submit Application</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyJobModal;