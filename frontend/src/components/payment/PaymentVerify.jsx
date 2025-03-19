import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { verifyPayment } from '../../service/payment';
import { toast } from 'react-toastify';

export default function PaymentVerify() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const transactionId = searchParams.get("session_id");

    useEffect(() => {
        const verify = async () => {
            if (!transactionId) return;
            try {
                setLoading(true);
                const response = await verifyPayment(transactionId);
                setLoading(false);
                if (response.data.status) {
                    navigate("/payment/success");
                } else {
                    navigate("/payment/fail");
                }
            } catch (error) {
                setLoading(false);
                toast.promise("Verifying Payment Informations!");
                navigate("/payment/fail");
            }
        };
        verify();
    }, [navigate, transactionId]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {loading && <PacmanLoader color="#091096" loading size={50} />}
        </div>
    );
}