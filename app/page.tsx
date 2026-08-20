import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Milestones from "@/components/Milestones";
import Journey from "@/components/Journey";
import Arsenal from "@/components/Arsenal";
import Work from "@/components/Work";
import Activity from "@/components/Activity";
import Github from "@/components/Github";
import MarqueeStrips from "@/components/MarqueeStrips";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="relative z-10 overflow-visible">
      <SmoothScroll />
      <Navbar />
      <div className="min-h-screen bg-[#0F0E0E]">
        <Hero />
        <div className="relative z-20">
          <About />
          <Expertise />
          <Milestones />
          <Journey />
        </div>
        <Arsenal />
        <Work />
        <Activity />
        <Github />
        <MarqueeStrips />
        <Contact />
        <Footer />
      </div>
      <FloatingButtons />
      <ContactForm />
    </main>
  );
}
