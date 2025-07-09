// src/pages/RegisterPage.jsx
import React from "react";

export const RegisterPage = ({ errors = [] }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <section className="bg-white rounded shadow-md max-w-4xl w-full flex overflow-hidden">
          {/* Left Image */}
          <div className="hidden md:block md:w-1/2">
            <img
              src="images/signup-image.jpg"
              alt="Sign up"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-6">Sign up</h2>

            <form action="/register" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Your Name
                </label>
                <div className="relative">
                  <i className="zmdi zmdi-account material-icons-name absolute left-3 top-3 text-gray-400"></i>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Your Email
                </label>
                <div className="relative">
                  <i className="zmdi zmdi-account material-icons-name absolute left-3 top-3 text-gray-400"></i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    autoComplete="off"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <i className="zmdi zmdi-lock absolute left-3 top-3 text-gray-400"></i>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Errors */}
              {errors.length > 0 && (
                <div className="space-y-2">
                  {errors.map((error, i) => (
                    <p
                      key={i}
                      className="text-red-600 bg-red-100 px-3 py-2 rounded"
                    >
                      {error}
                    </p>
                  ))}
                </div>
              )}

              <div>
                <input
                  type="submit"
                  value="Register"
                  className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 cursor-pointer transition"
                />
              </div>
            </form>

            <p className="mt-6 text-center">
              <a
                href="/login"
                className="text-indigo-600 hover:underline font-medium"
              >
                I am already member
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterPage;
