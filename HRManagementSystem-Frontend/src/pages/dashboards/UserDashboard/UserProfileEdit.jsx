import React from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";

const UserProfileEdit = () => {
  return (
    <DashboardLayout
      role="user"
      title="Edit Personal Details"
      userName="Aftab Alam"
      userEmail="user@workbridge.com"
    >
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Edit Personal Details</h2>
          {/* Form fields for editing personal details */}
          <form className="space-y-4 max-w-md">
            <div>
              <label className="block font-semibold mb-1">Employee Name</label>
              <input
                type="text"
                defaultValue="Aftab Alam"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Department</label>
              <input
                type="text"
                defaultValue="Computer Science"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Job Title</label>
              <input
                type="text"
                defaultValue="Java Fullstack Developer"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Job Category</label>
              <input
                type="text"
                defaultValue="Full time"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="bg-green-600 text-white font-semibold px-6 py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfileEdit;