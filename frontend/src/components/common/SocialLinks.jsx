import React from "react";
import {Facebook, Instagram, X} from "lucide-react"
import { Link } from "react-router-dom";

export default function SocialLinks() {
  return (
    <div className="mt-6 text-center">
      <h3 className="text-lg font-medium text-gray-700">Follow Us:</h3>
      <div className="flex justify-center space-x-4 mt-2">
        <Link className="text-blue-500 text-xl"><Facebook /> Facebook</Link>
        <Link className="text-blue-400 text-xl"><X /> X (Twitter)</Link>
        <Link className="text-pink-500 text-xl"><Instagram /> Instagram</Link>
      </div>
    </div>
  );
}
