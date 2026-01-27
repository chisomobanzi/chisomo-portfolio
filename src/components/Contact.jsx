import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { socialLinks } from '../constants';
import { styles } from '../styles';

const ContactGlobe = lazy(() => import('./canvas/ContactGlobe'));

/* Simple inline SVG icons */
const SocialIcon = ({ icon }) => {
  const icons = {
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    behance: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.63.16-1.3.25-2.01.25H0V4.51h6.938v-.007zM6.545 10.16c.6 0 1.1-.16 1.46-.49.37-.33.55-.79.55-1.38 0-.32-.06-.58-.174-.79-.116-.21-.27-.38-.46-.5-.19-.12-.41-.2-.67-.24-.26-.04-.54-.06-.84-.06H3.48v3.46h3.065zm.185 5.22c.33 0 .63-.03.92-.1.29-.06.55-.18.77-.35.22-.16.39-.38.52-.64.12-.27.18-.6.18-1.01 0-.81-.24-1.39-.71-1.74-.48-.35-1.12-.53-1.92-.53H3.48v4.37h3.25zM15.14 4.12h5.84v1.57h-5.84V4.12zm6.56 9.3c0-.7-.16-1.35-.48-1.95-.32-.61-.81-1.06-1.49-1.37.53-.23.96-.54 1.29-.91.33-.38.56-.82.68-1.32.12-.5.18-1.05.18-1.63 0-.69-.13-1.29-.38-1.82a3.4 3.4 0 00-1.06-1.29 4.64 4.64 0 00-1.59-.76c-.61-.17-1.27-.25-1.98-.25h-6.33v17.34h6.42c.73 0 1.42-.11 2.06-.33.64-.22 1.2-.54 1.66-.96.46-.42.82-.93 1.08-1.54.26-.61.39-1.29.39-2.05 0-.87-.22-1.63-.67-2.27-.45-.64-1.08-1.1-1.89-1.39l.01-.01c.68-.24 1.21-.62 1.58-1.15.37-.53.56-1.14.56-1.84v.3zM15.14 7.93h2.96c.86 0 1.53.19 2.02.56.49.38.73.96.73 1.75 0 .43-.08.79-.23 1.07-.15.28-.35.5-.59.66-.24.16-.51.27-.82.33-.3.06-.61.09-.93.09h-3.14V7.93zm0 8.33V12.7h3.23c.87 0 1.57.22 2.09.65.52.43.78 1.07.78 1.91 0 .46-.08.85-.23 1.16-.16.31-.37.57-.64.77-.27.2-.58.34-.93.43-.35.09-.72.13-1.1.13h-3.2v.51z"/>
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
    imdb: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.31 9.588v.005c-.077-.048-.227-.07-.42-.07v4.815c.27 0 .44-.06.5-.165.062-.105.09-.39.09-.852v-2.86c0-.375-.013-.63-.042-.765-.03-.135-.07-.228-.128-.278v.17zm-6.54-1.2h1.59l.538 3.11.445-3.11h1.59v5.604H10.5v-3.855l-.615 3.855H8.77l-.602-3.765v3.765h-1.4V8.388zm-3.45 0h1.74v5.604H4.32V8.388zM24 4.5v15c0 2.484-2.016 4.5-4.5 4.5h-15A4.502 4.502 0 010 19.5v-15C0 2.016 2.016 0 4.5 0h15C21.984 0 24 2.016 24 4.5zm-6.87 8.175c0 .584.015.98.06 1.2.04.215.135.39.27.523.15.135.36.21.63.21.345 0 .615-.1.795-.3.18-.195.27-.51.27-.945v-.6h-1.65v-1.29h3.195v3.855h-1.11l-.135-.585c-.165.24-.345.405-.54.51-.195.105-.435.165-.72.165-.375 0-.69-.075-.945-.24-.255-.15-.45-.375-.57-.645-.12-.27-.195-.5-.225-.69-.03-.195-.045-.51-.045-.96V12.15c0-.675.015-1.11.03-1.305.015-.195.075-.39.18-.585.105-.195.27-.36.48-.48.21-.135.465-.195.765-.195.39 0 .705.075.945.24.24.165.42.39.525.66.105.27.165.675.165 1.215v1.245h-1.545v-.96c0-.345-.015-.57-.06-.675-.04-.105-.135-.165-.27-.165-.135 0-.225.06-.27.165-.045.12-.06.375-.06.78v2.46l.005-.005zM17.055 8.388h1.74v1.47c.21-.57.39-.96.555-1.17.165-.21.42-.315.75-.315.27 0 .555.09.84.255l-.555 1.44c-.195-.12-.36-.18-.5-.18-.225 0-.39.12-.51.36-.12.24-.18.705-.18 1.395v3.75h-1.74V8.388h-.4z"/>
      </svg>
    ),
  };
  return icons[icon] || null;
};

const Contact = () => {
  return (
    <section id="contact" className="relative bg-stone-900 text-white py-20 sm:py-32 overflow-hidden">
      {/* 3D Globe Background */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-20 md:opacity-30">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          frameloop="always"
        >
          <Suspense fallback={null}>
            <ContactGlobe />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-16">
        <div className="max-w-xl">
          {/* Label */}
          <p className="font-orbitron text-[11px] tracking-[0.3em] uppercase text-orange-500 font-medium">
            Get in Touch
          </p>

          {/* Heading */}
          <h2 className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl tracking-[0.03em] mt-4 text-white">
            Let&apos;s Work
            <br />
            Together
          </h2>

          <p className="font-inter text-stone-400 text-base leading-relaxed mt-6 max-w-md">
            Available for set design positions on major productions and
            collaboration on immersive/XR and virtual production projects.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="mailto:chisomo@truefictionstudio.com"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-inter font-medium text-sm px-6 py-3 rounded transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Email
            </a>
            <a
              href="https://www.imdb.com/name/nm12855764/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-stone-600 hover:border-orange-500 text-stone-300 hover:text-orange-500 font-inter font-medium text-sm px-6 py-3 rounded transition-colors duration-200"
            >
              View IMDB
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-12">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-orange-500 transition-colors duration-200"
                aria-label={link.name}
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
