import React from "react";

const faqs = [
  { question: "Do you offer vegan options?", answer: "Yes! We have a variety of vegan-friendly drinks and pastries." },
  { question: "Do you have free Wi-Fi?", answer: "Absolutely! Enjoy high-speed Wi-Fi while you sip your coffee." },
  { question: "Can I book a table?", answer: "Yes, we accept reservations through our website or phone." },
];

export default function FAQSection() {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">FAQs</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="font-bold text-gray-800">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
