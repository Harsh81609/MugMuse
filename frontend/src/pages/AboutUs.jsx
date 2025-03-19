import React from "react";
import Section from "../components/common/Section"; 
import SocialLinks from "../components/common/SocialLinks";
import TeamSection from "../components/common/TeamSection";
import Testimonials from "../components/common/Testimonials";
import FAQSection from "../components/common/FAQSection";

export default function AboutUs() {
    const teamMembers = [
        {
          name: "Emma Brown",
          role: "Head Barista",
          image: "https://images.pexels.com/photos/3728131/pexels-photo-3728131.jpeg",
        },
        {
          name: "Olivia Johnson",
          role: "Cafe Manager",
          image: "https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg",
        },
        {
          name: "Sophia Williams",
          role: "Latte Artist",
          image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb",
        },
        {
          name: "Noah Anderson",
          role: "Customer Service",
          image: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg",
        },
      ];
      
  return (
    <div className="bg-base-200 min-h-screen flex flex-col items-center justify-center p-6">
      <Section title="About Us">
        <p className="text-gray-600 text-lg text-center">
          Welcome to Mug & Muse, the home of premium coffee and relaxation.
        </p>
        <TeamSection teamMembers={teamMembers} />
        <Testimonials />
        <FAQSection />
        <SocialLinks />
      </Section>
    </div>
  );
}
