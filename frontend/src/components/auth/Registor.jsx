import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../service/auth'
import { Pencil } from 'lucide-react'
import { toast } from 'react-toastify'

export default function Register() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleAction = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (selectedImage) {
            formData.append("file", imageFile)
        }

        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')
        const cpassword = formData.get('cpassword')
        const address = formData.get('address')
        const phone = formData.get('phone')

        if (!name || !email || !password || !cpassword || !address || !phone || !selectedImage) {
            toast.error("Please fill out all fields.");
            return;
        }

        if (password !== cpassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const response = await register(formData);
            if (response.data.data) {
                toast.success("Registration successful!.");
                navigate("/");

            } else {
                toast.error(response.data.msg || "Something went wrong, please try again.");
            }
        } catch (error) {
            toast.error("An error occurred, please try again later.");
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file)
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lvh">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h2>
                <form onSubmit={handleAction} method="post" className="space-y-6">
                    <div className="flex flex-row justify-center items-center">
                        <div className="relative w-24 h-24 cursor-pointer">
                            <div className="ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring ring-offset-2 flex items-center justify-center bg-gray-200 overflow-hidden shadow-md">
                                {selectedImage ? (
                                    <img src={selectedImage} className="rounded-full w-full h-full object-cover" alt="Profile" />
                                ) : (
                                    <span className="text-gray-500 text-xl font-semibold">+</span>
                                )}
                            </div>
                            <div className="absolute bottom-0 right-0 z-10 bg-white p-[4px] rounded-full shadow-md border border-gray-300 flex items-center justify-center hover:bg-blue-600 transition"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current.click();
                                }}>
                                <Pencil className="h-5 w-5 text-gray-700 hover:text-white" />
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                        </div>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-7">
                        <div className="w-full">
                            <label htmlFor="name" className="text-lg font-medium text-gray-600">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="email" className="text-lg font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="abc123@gmail.com"
                                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className='flex flex-row justify-center items-center gap-7'>
                        <div className="w-full">
                            <label htmlFor="password" className="text-lg font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="cpassword" className="text-lg font-medium text-gray-600">Confirm Password</label>
                            <input
                                type="password"
                                id="cpassword"
                                name="cpassword"
                                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className='flex flex-row justify-center items-center gap-7'>
                        <div className="w-full">
                            <label htmlFor="address" className="text-lg font-medium text-gray-600">Address</label>
                            <textarea
                                id="address"
                                name="address"
                                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your address here"
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="phone" className="text-lg font-medium text-gray-600">Phone</label>
                            <input
                                type="number"
                                id="phone"
                                name="phone"
                                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="123-456-7890"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                    <div className="text-center text-sm mt-4">
                        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
