import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CardGrid({ products = [], heading }) {
    const navigate = useNavigate();
    const image = import.meta.env.VITE_SERVER_URL + "/product/image/";
    const [visibleProducts, setVisibleProducts] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        if (products.length > 0) {
            setVisibleProducts(products.slice(0, 8));
        }
    }, [products]);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
                if (scrollLeft + clientWidth >= scrollWidth - 5) {
                    if (visibleProducts.length < products.length) {
                        setVisibleProducts((prev) => [
                            ...prev,
                            ...products.slice(prev.length, prev.length + 4),
                        ]);
                    }
                }
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, [visibleProducts, products]);

    const handleClick = (e, productId) => {
        e.preventDefault();
        navigate(`/product/detail/${productId}`);
    };

    return (
        <div className="bg-white py-6 px-6">
            <h2 className="text-3xl font-bold text-left px-3 text-gray-800 mb-4">{heading}</h2>
            <div
                ref={containerRef}
                className="flex overflow-x-auto space-x-4 p-4 bg-white rounded-xl shadow-lg px-5"
                style={{
                    scrollSnapType: "x mandatory",
                    scrollbarWidth: "none",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {visibleProducts.length > 0 ? (
                    visibleProducts.map((product) => (
                        <div
                            key={product._id}
                            className="min-w-[210px] border rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-transform duration-300 transform hover:scale-105 cursor-pointer px-6"
                            onClick={(e) => handleClick(e, product._id)}
                            style={{ scrollSnapAlign: "start" }}
                        >
                            <img
                                src={`${image}${product.image}`}
                                className="w-full h-36 mt-3 object-cover rounded-t-xl"
                                alt={product.name}
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                                <p className="text-gray-600 text-xs mt-1">
                                    {product.description.length > 50
                                        ? product.description.substring(0, 50) + "..."
                                        : product.description}
                                </p>
                                <p className="text-indigo-600 font-bold mt-2 text-md">₹{product.price}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center w-full">No products available</p>
                )}
            </div>
        </div>
    );
}