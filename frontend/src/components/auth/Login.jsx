import React, { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../service/auth';
import { toast } from 'react-toastify';

export default function Login() {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleAction = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    setErrors("");

    if (!email || !password) {
      toast.error("All fields are required")
      return;
    }

    try {
      const response = await login({ email, password });
      if (response && response.data && response.data) {
        toast.success("Login successfull")
        navigate("/")
      } else {
        toast.error("Login failed. Try again.")
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
    } else {
        toast.error("Something went wrong. Please try again.");
    }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleAction} method="post" className="space-y-6">
          <div className="w-full">
            <label htmlFor="email" className="text-lg font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="abc123@gmail.com"
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label htmlFor="password" className="text-lg font-medium text-gray-600">Password</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="password"
                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer">
                {show ? (
                  <EyeClosed onClick={() => setShow(false)} className="text-gray-600" />
                ) : (
                  <Eye onClick={() => setShow(true)} className="text-gray-600" />
                )}
              </div>
            </div>
          </div>
          {errors && <div className="text-red-500 text-sm">{errors}</div>}
          <div className="flex justify-between items-center">
            <Link to="/forgot-password" className="text-blue-600 text-sm hover:underline">Forgot Password?</Link>
          </div>
          <button
            type="submit"
            disabled={!!errors}
            className="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          <div className="text-center text-sm mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
