import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function HeroSectionWithOverlayImage({ img, text, btnText,btnLink }) {
    const navigate = useNavigate()
    const handleClick =(e)=>{
        e.preventDefault();
        navigate(btnLink)
    }
    return (
        <div
            className="hero"
            style={{
                backgroundImage: `url(${img})`,
                height: '90vh'
            }}>
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there!</h1>
                    <p className="mb-5">
                        {text}
                    </p>
                    <button className="btn btn-primary" onClick={handleClick}>{btnText}</button>
                </div>
            </div>
        </div>
    )
}
