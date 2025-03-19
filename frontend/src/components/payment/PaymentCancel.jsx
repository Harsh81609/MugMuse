import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentCancel() {
    const navigate=useNavigate();
  return (
    
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <h2 className="text-3xl font-bold text-red-600">Payment Cancelled</h2>
                <p className="text-lg text-gray-600 mt-2">You cancelled your payment. If this was a mistake, please try again.</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    Go Back to Home
                </button>
            </div>    
  )
}