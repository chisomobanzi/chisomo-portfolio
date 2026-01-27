import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../constants';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleNavClick = (id) => {
    if (!isHome) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-50/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-16 flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <Link
          to="/"
          className="font-orbitron font-bold text-sm sm:text-base tracking-[0.15em] text-stone-800 hover:text-orange-600 transition-colors"
        >
          CHISOMO BANZI
        </Link>

        {/* Desktop Links */}
        <ul className="hidden sm:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.id}>
              {isHome ? (
                <button
                  onClick={() => handleNavClick(link.id)}
                  className="font-orbitron text-[11px] tracking-[0.25em] uppercase text-stone-500 hover:text-orange-600 transition-colors accent-underline"
                >
                  {link.title}
                </button>
              ) : (
                <Link
                  to={`/#${link.id}`}
                  className="font-orbitron text-[11px] tracking-[0.25em] uppercase text-stone-500 hover:text-orange-600 transition-colors accent-underline"
                >
                  {link.title}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-stone-700 transition-transform duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-stone-700 transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-stone-700 transition-transform duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-stone-50/95 backdrop-blur-md border-t border-stone-200"
          >
            <ul className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <li key={link.id}>
                  {isHome ? (
                    <button
                      onClick={() => handleNavClick(link.id)}
                      className="font-orbitron text-[12px] tracking-[0.25em] uppercase text-stone-600 hover:text-orange-600 transition-colors"
                    >
                      {link.title}
                    </button>
                  ) : (
                    <Link
                      to={`/#${link.id}`}
                      className="font-orbitron text-[12px] tracking-[0.25em] uppercase text-stone-600 hover:text-orange-600 transition-colors"
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
