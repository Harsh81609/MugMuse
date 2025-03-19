import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getOneProduct } from "../../service/product";

export default function ProductDetail() {
    const [product, setProduct] = useState({});
    const { productId } = useParams();
    const navigate= useNavigate();

    const image = import.meta.env.VITE_SERVER_URL + "/product/image/";

    const handleClick = async (e) => {
        e.preventDefault();
        navigate(`/order/place-order/${productId}`)
    }

    useEffect(() => {
        const fetchOneProduct = async (productId) => {
            const response = await getOneProduct(productId);
            if (response.data) {
                setProduct(response.data.data);
            } else {
                alert(response.data.msg);
            }
        };
        fetchOneProduct(productId);
    }, [productId]);

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2">
                <img
                    src={`${image}${product.image}`}
                    alt={product.name}
                    className="rounded-xl object-cover w-full h-72 lg:h-96 shadow-md"
                />
            </div>
            <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between">
                <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
                <p className="mt-2 text-gray-600">{product.description}</p>
                <p className="mt-4 text-2xl font-bold text-indigo-600">₹{product.price}</p>
                <button
                    className="mt-6 px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
                    onClick={handleClick}
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
}
