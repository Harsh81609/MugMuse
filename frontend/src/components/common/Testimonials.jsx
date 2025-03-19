import React from "react";

const reviews = [
  { name: "Alice M.", text: "Best coffee in town! ☕", rating: 5 },
  { name: "John D.", text: "Lovely atmosphere and amazing pastries!", rating: 4.5 },
  { name: "Sophia W.", text: "My go-to place for a peaceful coffee break.", rating: 5 },
];

export default function Testimonials() {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">What Our Customers Say</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div key={index} className="p-4 bg-white shadow-lg rounded-lg">
            <p className="text-gray-700 italic">"{review.text}"</p>
            <h3 className="mt-3 text-lg font-bold">{review.name}</h3>
            <p className="text-yellow-500">⭐ {review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
