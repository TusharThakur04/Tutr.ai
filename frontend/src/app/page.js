"use client";
import Advantages from "@/components/advantages/Advantages";
import CTA from "@/components/cta/CTA";
import Example from "@/components/example/Example";
import Features from "@/components/features/Features";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import Logging from "@/components/logging/Logging";
import Navigation from "@/components/navigation/Navigation";
import { useState } from "react";

const page = () => {
  const [loggingState, setLoggingState] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navigation setLoggingState={setLoggingState} />
      <Hero />
      <Example />
      <Advantages />
      <Features />
      <CTA />
      <Footer />
      {loggingState && <Logging setLoggingState={setLoggingState} />}
    </div>
  );
};

export default page;
