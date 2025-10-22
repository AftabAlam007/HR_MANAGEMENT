import React, { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { PencilIcon } from "../../../components/ui/Icons";
import profileImg from "../../../assets/Image/profileimg.png";

const menuItems = [
  "Personal Details",
  "Contact Details",
  "Education Qualifications",
];

const UserProfile = () => {
  const [activeMenu, setActiveMenu] = useState("Personal Details");

  const renderContent = () => {
    switch (activeMenu) {
      case "Personal Details":
        return (
          <div className="bg-white p-6 rounded-lg shadow w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Personal Details</h2>
<button
  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
  onClick={() => window.location.href = "/user/profile/edit"}
>
  <PencilIcon className="h-5 w-5" />
  <span>Edit</span>
</button>
            </div>
            <div className="flex flex-col items-center space-y-6">
              <div className="bg-yellow-400 rounded-full p-6">
                <img
                  src={profileImg}
                  alt="Profile Avatar"
                  className="h-40 w-40 rounded-full"
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg">Aftab Alam</p>
                <p className="text-sm text-gray-600">Employee Name</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg">Computer Science</p>
                <p className="text-sm text-gray-600">Department</p>
              </div>
              <div className="flex justify-between w-full max-w-md mt-4">
                <div>
                  <p className="font-semibold text-lg">
                    Java Fullstack Developer
                  </p>
                  <p className="text-sm text-gray-600">Job Title</p>
                </div>
                <div>
                  <p className="font-semibold text-lg">Full time</p>
                  <p className="text-sm text-gray-600">Job Category</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "Contact Details":
        return (
          <div className="bg-white p-6 rounded-lg shadow w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Contact Details</h2>
            </div>
            <div className="grid grid-cols-2 gap-6 max-w-4xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number 1
                </label>
                <input
                  type="text"
                  defaultValue="Phone Number 1"
                  className="w-full bg-blue-100 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number 2
                </label>
                <input
                  type="text"
                  defaultValue="Phone Number 2"
                  className="w-full bg-blue-100 rounded-md p-2"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail Address
                </label>
                <input
                  type="email"
                  defaultValue="johndoe@gmail.com"
                  className="w-full bg-blue-100 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State of residence
                </label>
                <input
                  type="text"
                  defaultValue="Phone Number 1"
                  className="w-full bg-blue-100 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  defaultValue="Phone Number 2"
                  className="w-full bg-blue-100 rounded-md p-2"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Residential Address
                </label>
                <textarea
                  defaultValue="18 Junction site Lekki"
                  className="w-full bg-blue-100 rounded-md p-2"
                  rows={3}
                />
              </div>
              <div className="col-span-2">
                <button className="bg-green-600 text-white font-semibold px-6 py-2 rounded hover:bg-green-700">
                  Update
                </button>
              </div>
            </div>
          </div>
        );
      case "Education Qualifications":
        return (
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-6xl">
            <h2 className="text-lg font-semibold mb-4">
              Academic Records / Academic Details
            </h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Name of Institution
                </label>
                <div className="bg-blue-100 p-3 rounded">
                  Babcock University
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Department
                </label>
                <div className="bg-blue-100 p-3 rounded">Computer Dept</div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Course
                </label>
                <select className="bg-blue-100 p-3 rounded w-full">
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                  <option>Software Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Location
                </label>
                <div className="bg-blue-100 p-3 rounded">
                  Ogun state, Nigeria
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="bg-blue-100 p-3 rounded w-full"
                  defaultValue="1998-01-01"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="bg-blue-100 p-3 rounded w-full"
                  defaultValue="2019-01-01"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-1">
                  Description
                </label>
                <textarea
                  className="bg-blue-100 p-3 rounded w-full"
                  rows={6}
                  defaultValue={
                    "• Gathering and evaluating product requirements, in collaboration with product managers and the developers\n" +
                    "• Illustrating design ideas using storyboards, process flows, and sitemaps.\n" +
                    "• Designing graphic user interface pages and elements, like menus, tabs, and widgets\n" +
                    "• Design wireframes, mockups, storyboards, and fully interactive prototype design"
                  }
                />
              </div>
              <div className="col-span-2">
                <button className="bg-green-600 text-white font-semibold px-6 py-2 rounded hover:bg-green-700">
                  Update
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a menu item to view details.</div>;
    }
  };

  return (
    <DashboardLayout
      role="user"
      title="My Profile"
      userName="Aftab Alam"
      userEmail="user@workbridge.com"
    >
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow flex">
          {/* Left menu */}
          <div className="w-1/4 bg-blue-100 p-4 rounded-l-lg space-y-3">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveMenu(item)}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeMenu === item
                    ? "bg-yellow-400 text-black font-semibold"
                    : "text-gray-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right content */}
          <div className="w-3/4 p-6">{renderContent()}</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;