import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30">
      <Header />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Blog />
      <Contact />
      <BackToTop />
    </main>
  );
}
