// src/pages/VerifyEmailPage.jsx
import React, { useState } from "react";

export const VerifyEmailPage = ({ email = "user@example.com", isLoggedIn = false }) => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleResend = (e) => {
    e.preventDefault();
    setMessage("Verification link resent to your email.");
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (/^\d{8}$/.test(token)) {
      setMessage("Verification code submitted!");
    } else {
      setMessage("Please enter a valid 8-digit code.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full py-4 bg-white shadow">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">Your App</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-center mb-8">Verify Your Email</h2>

        <div className="mb-6">
          {isLoggedIn ? (
            <div className="bg-green-100 text-green-800 p-4 rounded flex items-center space-x-2">
              <i className="material-icons">check_circle</i>
              <span>You are logged in</span>
            </div>
          ) : (
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded flex items-center space-x-2">
              <i className="material-icons">warning</i>
              <span>You are not logged in</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded shadow p-6 mb-8">
          <p className="mb-2">
            <strong>Email:</strong> {email}
          </p>
          <p className="mb-4">
            Your email has not been verified yet. Please verify your email by entering the 8-digit code or request a new verification link.
          </p>

          <form onSubmit={handleResend} className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded"
            >
              Resend Verification Link
            </button>
          </form>
        </div>

        <div className="bg-white rounded shadow p-6">
          <form onSubmit={handleVerify}>
            <label htmlFor="token" className="block mb-2 font-semibold text-gray-700">
              Enter 8-Digit Verification Code:
            </label>
            <input
              id="token"
              name="token"
              type="text"
              maxLength={8}
              pattern="\d{8}"
              title="Please enter an 8-digit number"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition"
            >
              Verify Code
            </button>
          </form>
        </div>

        {message && (
          <p className="mt-4 text-center text-indigo-600 font-semibold">{message}</p>
        )}
      </main>

      <footer className="w-full py-4 bg-white text-center text-gray-500 text-sm mt-auto">
        © 2025 Your App. All rights reserved.
      </footer>
    </div>
  );
};

export default VerifyEmailPage;
