import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ApplicantDetailsModal = ({ isOpen, onClose, applicant, onInterviewScheduled }) => {
  // Internal state to switch between the 'details' view and the 'scheduling' form
  const [viewMode, setViewMode] = useState('details'); // 'details' or 'scheduling'
  
  // State to hold the interview form data
  const [interviewDetails, setInterviewDetails] = useState({
    date: '',
    time: '',
    interviewer: '',
  });

  // Effect to reset the view and form data whenever the modal is opened or the applicant changes
  useEffect(() => {
    if (isOpen) {
      setViewMode('details');
      setInterviewDetails({ date: '', time: '', interviewer: '' });
    }
  }, [isOpen, applicant]);

  if (!isOpen || !applicant) return null;

  // --- ACTION HANDLERS ---

  /**
   * Handles the resume download process for a secured API endpoint.
   */
  const handleDownloadResume = () => {
    const promise = axios.get(`http://localhost:8080/api/hr/applicants/${applicant.id}/resume`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
        responseType: 'blob', // Crucial for handling file data
    });

    toast.promise(promise, {
        loading: 'Downloading resume...',
        success: (response) => {
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            const contentDisposition = response.headers['content-disposition'];
            let fileName = `Resume_${applicant.name.replace(/\s/g, '_')}.pdf`; // Fallback
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch && fileNameMatch.length === 2) fileName = fileNameMatch[1];
            }
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            return "Download started!";
        },
        error: (err) => `Could not download resume: ${err.response?.data?.message || err.message}`,
    });
  };

  /**
   * Handles submitting the interview schedule to the backend.
   */
  const handleSaveSchedule = () => {
    if (!interviewDetails.date || !interviewDetails.time || !interviewDetails.interviewer) {
        toast.error("Please fill in the date, time, and interviewer's name.");
        return;
    }

    const payload = {
        interviewDateTime: `${interviewDetails.date}T${interviewDetails.time}`, // Format: YYYY-MM-DDTHH:MM
        interviewer: interviewDetails.interviewer,
    };

    const promise = axios.put(`http://localhost:8080/api/hr/applicants/${applicant.id}/schedule-interview`, payload, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
    });

    toast.promise(promise, {
        loading: 'Saving schedule...',
        success: (response) => {
            onInterviewScheduled(response.data); // Send the updated applicant back to the parent page
            onClose(); // Close the modal
            return `Interview scheduled successfully for ${applicant.name}.`;
        },
        error: (err) => `Error: ${err.response?.data?.message || err.message}`,
    });
  };

  const handleInterviewDetailsChange = (e) => {
    setInterviewDetails({ ...interviewDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">{applicant.name}'s Application</h2>
                <p className="text-sm text-gray-600">Applied for: <strong>{applicant.appliedFor}</strong></p>
            </div>
            <button onClick={onClose} className="text-3xl text-gray-400 hover:text-gray-700 leading-none" aria-label="Close">&times;</button>
        </div>
        
        <div className="border-t pt-4">
          {viewMode === 'details' ? (
            // --- VIEW 1: Applicant Details ---
            <div className="space-y-4">
                <p><strong>Email:</strong> <a href={`mailto:${applicant.email}`} className="text-blue-600 hover:underline">{applicant.email}</a></p>
                <p><strong>Current Stage:</strong> 
                    <span className="ml-2 px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full">{applicant.stage}</span>
                </p>
                <div className="pt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Internal Notes:</label>
                    <textarea rows="3" placeholder={`Add notes for ${applicant.name}...`} className="w-full p-2 border rounded-md"></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    <button onClick={handleDownloadResume} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">Download Resume</button>
                    <button onClick={() => setViewMode('scheduling')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-semibold hover:bg-gray-300">Schedule Interview</button>
                </div>
            </div>
          ) : (
            // --- VIEW 2: Scheduling Form ---
            <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-700">Schedule Interview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Interview Date</label>
                        <input type="date" name="date" value={interviewDetails.date} onChange={handleInterviewDetailsChange} className="mt-1 w-full p-2 border rounded"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Interview Time</label>
                        <input type="time" name="time" value={interviewDetails.time} onChange={handleInterviewDetailsChange} className="mt-1 w-full p-2 border rounded"/>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Interviewer's Name</label>
                    <input type="text" name="interviewer" value={interviewDetails.interviewer} onChange={handleInterviewDetailsChange} placeholder="e.g., Jane Doe" className="mt-1 w-full p-2 border rounded"/>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    <button onClick={() => setViewMode('details')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-semibold">Cancel</button>
                    <button onClick={handleSaveSchedule} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold">Save Schedule</button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetailsModal;