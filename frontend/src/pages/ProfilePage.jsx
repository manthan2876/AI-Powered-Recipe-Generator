// src/pages/ProfilePage.jsx
import React from "react";

export const ProfilePage = ({
  user = {
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date().toISOString(),
    links: Array(5).fill(null),
    totalClicks: 123,
    lastActive: new Date().toISOString(),
    isEmailValid: false,
  },
}) => {
  // Format dates
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full py-4 bg-white shadow">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">Your App</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl w-full">
        <h2 className="text-3xl font-semibold mb-8">Your Profile</h2>

        <div className="mb-6">
          {user ? (
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded">
              <i className="material-icons">check_circle</i>
              <span>You are logged in</span>
            </div>
          ) : (
            <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded">
              <i className="material-icons">warning</i>
              <span>You are not logged in</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded shadow p-6 mb-8">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl font-bold uppercase">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-600 flex items-center space-x-1">
                <i className="material-icons text-gray-400">email</i>
                <span>{user.email}</span>
              </p>
              <p className="text-gray-600 flex items-center space-x-1">
                <i className="material-icons text-gray-400">calendar_today</i>
                <span>Member since {formatDate(user.createdAt)}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 text-center gap-6 mb-6">
            <div>
              <span className="text-2xl font-bold block">
                {user.links ? user.links.length : 0}
              </span>
              <span className="text-gray-600">Links Created</span>
            </div>
            <div>
              <span className="text-2xl font-bold block">
                {user.totalClicks || 0}
              </span>
              <span className="text-gray-600">Total Clicks</span>
            </div>
            <div>
              <span className="text-2xl font-bold block">
                {user.lastActive ? formatDate(user.lastActive) : "Today"}
              </span>
              <span className="text-gray-600">Last Active</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="flex items-center space-x-2">
              <span className="font-semibold">Email Verification:</span>
              {user.isEmailValid ? (
                <span className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-semibold">
                  <i className="material-icons">check_circle</i>
                  <span>Verified</span>
                </span>
              ) : (
                <>
                  <span className="inline-flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-semibold">
                    <i className="material-icons">warning</i>
                    <span>Not Verified</span>
                  </span>
                  <a
                    href="/verify-email"
                    className="ml-4 inline-flex items-center space-x-1 text-indigo-600 hover:underline text-sm"
                  >
                    <i className="material-icons">mail_outline</i>
                    <span>Verify Now</span>
                  </a>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <a
            href="/edit-profile"
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
          >
            <i className="material-icons">edit</i>
            <span>Edit Profile</span>
          </a>
          <a
            href="/change-password"
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
          >
            <i className="material-icons">vpn_key</i>
            <span>Change Password</span>
          </a>
          <a
            href="/logout"
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            <i className="material-icons">power_settings_new</i>
            <span>Logout</span>
          </a>
        </div>
      </main>

      <footer className="w-full py-4 bg-white text-center text-gray-500 text-sm mt-auto">
        © 2025 Your App. All rights reserved.
      </footer>
    </div>
  );
};

export default ProfilePage;
