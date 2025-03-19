import React from 'react';

export default function LeftHeroSection({ img, heading, text }) {
  return (
    <div className="flex flex-row items-center bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden" style={{ height: '90vh' }}>
      <div className="w-1/2 h-full">
        <img src={img} alt="Cafe" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 flex flex-col justify-center p-8 text-left">
        <h2 className="text-4xl font-bold mb-4">{heading}</h2>
        <p className="text-lg leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
