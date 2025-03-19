import React from "react";

export default function LocationMap () {
    return (
      <div className="mt-10">
        <iframe
          className="w-full max-w-6xl h-96 mx-auto rounded-xl shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345095255!2d144.95565131550407!3d-37.81732774202144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577c9cfd61f7f32!2sCoffee%20Shop!5e0!3m2!1sen!2sus!4v1632798539123!5m2!1sen!2sus"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    );
  };