import React, { useState } from 'react';

const PostJobModal = ({ isOpen, onClose }) => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Job Posting:", jobDetails);
    alert(`Job "${jobDetails.title}" posted successfully! (Simulated)`);
    onClose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a New Job Opening</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
              <input type="text" name="title" id="title" value={jobDetails.title} onChange={handleChange} className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <input type="text" name="department" id="department" value={jobDetails.department} onChange={handleChange} className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" name="location" id="location" value={jobDetails.location} onChange={handleChange} className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="e.g., Remote or City, State" required />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Job Type</label>
              <select name="type" id="type" value={jobDetails.type} onChange={handleChange} className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea name="description" id="description" value={jobDetails.description} onChange={handleChange} rows="5" className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" required />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-6 py-2 rounded-md text-sm font-medium text-white bg-green-700 hover:bg-green-800">Post Job</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobModal;
