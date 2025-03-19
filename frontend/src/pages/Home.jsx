import React, { useEffect, useState } from 'react'
import HeroSectionWithOverlayImage from '../components/common/HeroSectionWithOverlayImage';
import ImgSlider from '../components/common/ImgSlider';
import d1 from '../assets/discount-image/d4.jpg'
import d2 from '../assets/discount-image/d7.jpg'
import d3 from '../assets/discount-image/d6.jpg'
import LeftHeroSection from '../components/common/LeftHeroSection';
import { featuredProducts } from '../service/product';
import CardGrid from '../components/common/CardGrid';

export default function Home() {
  const [product, setProduct] = useState([]);
    const discountImages = [d1,d2,d3];

    const coffeeImages = [
        "https://images.unsplash.com/photo-1511920170033-f8396924c348",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        "https://images.unsplash.com/photo-1514481538271-cf9f451d7242"
    ]; 
    
      const heroSection = {
        img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        text: "Welcome to Our Café",
        btnText: "Explore Menu",
        btnLink:"/product"
      };
      
      const aboutUs = {
        img: "https://images.unsplash.com/photo-1517705008128-361805f42e86", 
        heading: "About Us",
        text: "At our café, we believe in the perfect blend of quality coffee, warm ambiance, and exceptional service. Whether you're here for a quick espresso or a relaxed brunch, we strive to create a welcoming space where every sip and bite is a delightful experience."
    };
    
    const handleFeaturedProducts=async () => {
      const response=await featuredProducts();
      if(response.data){
        setProduct(response.data.products)
      }else{
        alert(response.data.msg);
      }
    }

    useEffect(()=>{
      handleFeaturedProducts();
    },[])
      
    return (
        <>
        <HeroSectionWithOverlayImage {...heroSection} />
        <LeftHeroSection {...aboutUs} />
        <ImgSlider img={discountImages} />
        <CardGrid products={product} heading="Featured Products" />
        </>
    )
}
