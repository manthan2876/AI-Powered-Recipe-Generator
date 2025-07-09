// src/pages/EditProfilePage.jsx
import React, { useState } from "react";

export const EditProfilePage = ({ user }) => {
  // fallback user data
  user = user || {
    name: "John Doe",
    email: "john@example.com",
  };

  // Local state for form fields (optional, for UI only)
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState("");

  // Dummy submit handler just for UI feedback
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="w-full py-4 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold text-gray-800">Your App</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">Edit Profile</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded shadow-md p-6 space-y-6"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
            />
          </div>

          {/* Submit button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-700 transition"
            >
              Update Profile
            </button>
          </div>

          {/* Success message */}
          {message && (
            <p className="text-green-600 font-semibold text-center">{message}</p>
          )}
        </form>
      </main>

      <footer className="w-full bg-white py-4 text-center text-gray-500 text-sm mt-auto">
        © 2025 Your App. All rights reserved.
      </footer>
    </div>
  );
};

export default EditProfilePage;
