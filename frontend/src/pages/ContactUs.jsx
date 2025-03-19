import React from "react";
import Section from "../components/common/Section";
import ContactForm from "../components/common/ContactForm";
import ContactDetails from "../components/common/ContactDetails";
import OpeningHours from "../components/common/OpeningHours";
import LocationMap from "../components/common/LocationMap";

export default function ContactUs() {
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-10">
        <Section title="Contact Us">
          <p className="text-gray-600 text-xl text-center mb-6">
            Have questions? We'd love to hear from you!
          </p>
          <ContactForm />
          <ContactDetails />
          <OpeningHours />
          <LocationMap />
        </Section>
      </div>
    );
  }