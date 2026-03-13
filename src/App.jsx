import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import SkillSpheres from './components/SkillSpheres';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LogoTicker from './components/LogoTicker';
import Services from './components/Services';
import ProjectDetail from './components/ProjectDetail';
import BlogIndex from './components/blog/BlogIndex';
import BlogPost from './components/blog/BlogPost';

function HomePage() {
  return (
    <>
      <Hero />
      <LogoTicker />
      <FeaturedProjects />
      <About />
      <SkillSpheres />
      <Services />
      <Testimonials />
      <Contact />
    </>
  );
}

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (pathname === '/' && hash) {
      const id = hash.replace('#', '');
      // Small delay to let the home page render before scrolling
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <div className="relative">
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
