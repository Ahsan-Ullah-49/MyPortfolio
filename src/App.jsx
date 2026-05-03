import { useState, useEffect } from "react";
import Layout from "./layouts/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import FeaturedProjects from "./components/FeaturedProjects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminChat from "./components/AdminChat";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (window.location.search.includes("admin=true")) {
      setIsAdmin(true);
    }
  }, []);

  if (isAdmin) {
    return <AdminChat />;
  }

  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Testimonials />
      <Contact />
      <Footer />
    </Layout>
  );
}
