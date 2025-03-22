import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo/latte-art.gif";
import logoText from "../../assets/logo/1.png";
import { checkAuth, logout } from '../../service/auth';
import { toast } from "react-toastify";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await checkAuth();
        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, []);

  const handleLogout = async () => {
    const response = await logout();
    if (response.data) {
      setUser(null);
      toast.success(response.data.msg);
      navigate("/login")
    } else {
      toast.error(response.data.msg);
    }
  };

  const imageUrl = user?.image ? `${import.meta.env.VITE_SERVER_URL}/user/profile-image/${user.image}` : null;

  return (
    <header className="navbar bg-[#F8F1E5] shadow-sm h-16 z-50">
      <div className="navbar-start">
        <Link to="/" className="cursor-pointer flex flex-row justify-center items-center">
          <img src={logoText} alt="Mug & Muse" className="w-46 h-9" />
          <img src={Logo} alt="Logo" className="w-24 h-16" />
        </Link>
      </div>
      <div className="navbar-center flex items-center">
        <div className="bg-[#8B4513] rounded-full flex items-center justify-center px-8 h-12 text-white">
          <ul className="menu menu-horizontal px-4 text-lg font-semibold">
            <li><Link to="/" className="hover:bg-[#a0522d] px-4 py-2 rounded-full transition-all">Home</Link></li>
            <li><Link to="/product" className="hover:bg-[#a0522d] px-4 py-2 rounded-full transition-all">Products</Link></li>
            <li><Link to="/about" className="hover:bg-[#a0522d] px-4 py-2 rounded-full transition-all">About Us</Link></li>
            <li><Link to="/contact" className="hover:bg-[#a0522d] px-4 py-2 rounded-full transition-all">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      {user ? (
        <div className='navbar-end flex items-center justify-end gap-2'>
          <div className="relative w-16 h-16 cursor-pointer">
            <div className="dropdown">
              <div className="ring-primary ring-offset-base-100 w-11 h-10 mt-3 rounded-full ring ring-offset-2 flex items-center justify-center bg-gray-200 overflow-hidden shadow-md">
                {imageUrl ? (
                  <>
                    <img src={imageUrl} tabIndex={0} className="rounded-full w-full h-full object-cover" alt="Profile" />
                  </>
                ) : (
                  <span className="text-gray-500 text-xl font-semibold"></span>
                )}
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                <li><Link to="/order/list">Orders</Link></li>
                <li><Link to="/user/setting">Settings</Link></li>
              </ul>
            </div>
          </div>
          <button className='btn bg-[#F8F1E5] text-amber-950 hover:bg-[#8B4513] hover:text-white mx-0' onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="navbar-end">
          <Link to="/login" className="btn bg-[#F8F1E5] text-amber-950 hover:bg-[#8B4513] hover:text-white mx-1">Login</Link>
          <Link to="/register" className="btn bg-[#F8F1E5] text-amber-950 hover:bg-[#8B4513] hover:text-white mx-1">Register</Link>
        </div>
      )}
    </header>
  );
}
