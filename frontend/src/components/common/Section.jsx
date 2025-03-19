import React from "react";

export default function Section({ title, children }) {
    return (
        <div className="max-w-6xl w-full bg-white shadow-lg rounded-xl p-12 my-12">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">{title}</h2>
            {children}
        </div>
    );
};