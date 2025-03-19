import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteUser, getMe, updateUser } from '../../service/user';
import { toast } from 'react-toastify';

export default function Setting() {
    const [errors, setErrors] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        file: null
    });
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await getMe();
                if (response.status === 200) {
                    setUser(prevUser => ({
                        ...prevUser,
                        ...response.data.user
                    }));
                }
            } catch (error) {
                console.error("Authentication failed", error);
            } finally {
                setLoading(false);
            }
        };
        verifyAuth();
    }, []);

    const handleAction = async (e) => {
        e.preventDefault();
        setErrors("");

        if (user.password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        const formData = new FormData();
        Object.keys(user).forEach(key => {
            formData.append(key, user[key]);
        });
        if (imageFile) formData.append("file", imageFile);

        try {
            const response = await updateUser(formData);
            if (response.data.status) {
                toast.success("Data updated successfully!");
                setUser(prev => ({ ...prev, password: "" }));
                setConfirmPassword("");
            } else {
                toast.error(response.data.msg || "Something went wrong, please try again.");
            }
        } catch (error) {
            toast.error("An error occurred, please try again later.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleDelete = async () => {
        toast.warn(
            ({ closeToast }) => (
                <div className="p-3">
                    <p className="font-semibold text-gray-800">Are you sure you want to delete your account?</p>
                    <div className="flex justify-end gap-3 mt-3">
                        <button
                            onClick={async () => {
                                closeToast();
                                try {
                                    const response = await deleteUser();
                                    if (response.data.status) {
                                        toast.success("Your account has been deleted successfully.");
                                        navigate("/login");
                                    } else {
                                        toast.error(response.data.msg || "Account deletion failed. Try again.");
                                    }
                                } catch (error) {
                                    toast.error("Account deletion failed. Try again.");
                                }
                            }}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={closeToast}
                            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ),
            {
                position: "top-right",
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
                draggable: false,
                theme: "colored",
            }
        );
    };    

    const imageUrl = selectedImage ||
        (user?.image ? `${import.meta.env.VITE_SERVER_URL}/user/profile-image/${user.image}` : "https://via.placeholder.com/150");

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">Edit Profile</h2>
                    <button className="btn btn-outline btn-error flex items-center gap-2" onClick={handleDelete}>
                        <Trash2 size={16} /> Delete Account
                    </button>
                </div>
                {errors && <div className="text-red-500 text-sm mb-4">{errors}</div>}
                <form onSubmit={handleAction} className="space-y-6">
                    <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20">
                            <img src={imageUrl} className="rounded-full w-full h-full object-cover shadow-md" alt="Profile" />
                            <button
                                type="button"
                                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md border border-gray-300 hover:bg-blue-600 transition"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <Pencil className="h-4 w-4 text-gray-700 hover:text-white" />
                            </button>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Full Name" className="input input-bordered w-full" />
                        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" className="input input-bordered w-full" />
                        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="New Password" className="input input-bordered w-full" />
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="input input-bordered w-full" />
                        <textarea name="address" value={user.address} onChange={handleChange} placeholder="Address" className="textarea textarea-bordered w-full"></textarea>
                        <input type="tel" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" className="input input-bordered w-full" />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Update</button>
                </form>
            </div>
        </div>
    );
}
