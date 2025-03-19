import React from "react";

export default function TeamSection({teamMembers}) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Meet Our Team</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center p-4 bg-white shadow-lg rounded-lg">
            <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="mt-3 text-lg font-bold">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
