const Footer = () => {
  return (
    <footer className="bg-stone-100 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-inter text-xs text-stone-400">
          &copy; {new Date().getFullYear()} Chisomo Banzi. All rights reserved.
        </p>
        <p className="font-orbitron text-[10px] tracking-[0.25em] uppercase text-stone-400">
          Australia
        </p>
      </div>
    </footer>
  );
};

export default Footer;
