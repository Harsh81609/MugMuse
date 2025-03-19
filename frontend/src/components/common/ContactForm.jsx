import React from "react";
import { toast } from "react-toastify";

export default function ContactForm() {
  const handleClick=async(e)=>{
    e.preventDefault();
    toast.success("Your Message Send Successfully!")
  }
  return (
    <form className="bg-gray-50 p-8 rounded-lg shadow-md w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="text" placeholder="Your Name" className="w-full p-4 text-lg border rounded-lg focus:ring focus:ring-gray-300" />
        <input type="email" placeholder="Your Email" className="w-full p-4 text-lg border rounded-lg focus:ring focus:ring-gray-300" />
      </div>
      <textarea placeholder="Your Message" rows="6" className="w-full mt-6 p-4 text-lg border rounded-lg focus:ring focus:ring-gray-300"></textarea>
      <button className="w-full bg-blue-500 text-white p-4 text-lg font-semibold rounded-lg hover:bg-blue-700 transition mt-6" onClick={handleClick}>Send Message</button>
    </form>
  );
};  