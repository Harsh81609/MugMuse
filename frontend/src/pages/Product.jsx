import React, { useEffect, useState } from 'react'
import ProductList from '../components/product/ProductList'
import { getAllProduct } from '../service/product';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const response = await getAllProduct();
                if (response.data) {
                    setProducts(response.data.data)
                } else {
                    alert(response.data.msg);
                }
            }
            fetchProducts();
        } catch (error) {
            console.error("Error in fetching products: ", error);
            alert("Failed to fetch products");
        } finally {
            setIsLoading(false)
        }
    }, [])

    if (isLoading) {
        <h2>Loading...</h2>
    }


    return (
        <div className='w-full overflow-auto p-3'>
            {products && products.length === 0 ? (
                <h2>No Products Found</h2>
            ) : (
                <ProductList products={products} />
            )}
        </div>
    )
}
