import Advantages from "@/components/advantages/Advantages";
import { Button } from "@/components/common/button";
import { Card, CardContent } from "@/components/common/card";
import CTA from "@/components/cta/CTA";
import Example from "@/components/example/Example";
import Features from "@/components/features/Features";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import Navigation from "@/components/navigation/Navigation";
import {
  Upload,
  MessageSquare,
  CheckCircle,
  Search,
  FileText,
  Zap,
  Shield,
  Github,
  Mail,
} from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navigation />
      <Hero />
      <Example />
      <Advantages />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default page;
