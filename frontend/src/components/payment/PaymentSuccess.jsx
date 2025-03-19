import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => navigate("/"), 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="green" strokeWidth="2" fill="none" />
                <path d="M7 12l3 3l7-7" stroke="green" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-2xl font-bold mt-4 text-green-600">Payment Successful!</p>
        </div>
    );
}