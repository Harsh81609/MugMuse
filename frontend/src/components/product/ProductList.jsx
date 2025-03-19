import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductList({ products }) {
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const image = import.meta.env.VITE_SERVER_URL + "/product/image/";
    const itemsPerPage = 8;

    useEffect(() => {
        setVisibleProducts(products.slice(0, page * itemsPerPage));
    }, [page, products]);

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            if (visibleProducts.length < products.length) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [visibleProducts]);

    const handleClick = (e, productId) => {
        e.preventDefault();
        navigate(`/product/detail/${productId}`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
            {visibleProducts.map((product) => (
                <div
                    key={product._id}
                    className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer transform hover:scale-105"
                    onClick={(e) => handleClick(e, product._id)}
                >
                    <img
                        src={`${image}${product.image}`}
                        className="w-full h-48 object-cover"
                        alt={product.name}
                    />
                    <div className="p-4">
                        <h2 className="text-lg text-black font-bold">{product.name}</h2>
                        <p className="text-gray-600 text-sm">
                            {product.description.length > 50
                                ? product.description.substring(0, 50) + "..."
                                : product.description}
                        </p>
                        <p className="text-indigo-600 font-semibold mt-2">₹{product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
