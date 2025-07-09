import Advantages from "@/components/advantages/Advantages";
import ClientPage from "@/components/clientPage/ClientPage";
import CTA from "@/components/cta/CTA";
import Example from "@/components/example/Example";
import Features from "@/components/features/Features";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <ClientPage />
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
