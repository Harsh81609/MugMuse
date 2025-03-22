import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyPayment } from '../../service/payment';
import { PacmanLoader } from 'react-spinners';

export default function PaymentStatus() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const toastShown = useRef(false);

    const status = searchParams.get("status");
    const transactionId = searchParams.get("session_id");

    useEffect(() => {
        if (status === "verify" && transactionId) {
            if (toastShown.current) return;
            toastShown.current = true;
            setLoading(true);
            toast.info("verifying Payment...");
            verifyPayment(transactionId)
                .then((response) => {
                    if (response.data.status) {
                        toast.success("Payment Successful!");
                        navigate("/payment?status=success");
                    } else {
                        toast.error("Payment Failed!");
                        navigate("/payment?status=fail");
                }
                })
                .catch(() => {
                    setLoading(false);
                    toast.error("Payment Verification Failed!");
                    navigate("/payment?status=fail");
            })
        } else {
            let msg = "";
            let type = "info";
            let delay = 3000;
            switch (status) {
                case "success":
                    msg = "Payment Successful!";
                    type = "success";
                    delay = 3000;
                    break;
                case "fail":
                    msg = "Payment Failed!";
                    type = "error";
                    delay = 5000;
                    break;
                case "cancel":
                    msg = "Payment Cancelled! Redirecting to Home Page";
                    type = "warning";
                    delay = 3000;
                    break;
                default:
                    msg = "Redirecting...";
                    break;
            }
            toast[type](msg);
            toastShown.current = true;

            const timer = setTimeout(() => navigate("/"), delay);
            return () => clearTimeout(timer);
        }
    },[status,transactionId,navigate])
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      {loading && <PacmanLoader color="#091096" size={50} />}
    </div>
  )
}
