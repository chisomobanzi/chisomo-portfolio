import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../constants';
import { styles } from '../styles';

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  // Auto-rotate every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section className="py-20 sm:py-32 bg-stone-100/50">
      <div className="max-w-4xl mx-auto px-6 sm:px-16 text-center">
        {/* Label */}
        <p className={styles.sectionSubText}>Testimonials</p>
        <h2 className={`${styles.sectionHeadText} mt-2 mb-16`}>
          From the Set
        </h2>

        {/* Testimonial Card */}
        <div className="relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {/* Quote Mark */}
              <div className="text-orange-600/20 text-7xl font-serif leading-none mb-4">
                &ldquo;
              </div>

              {/* Quote */}
              <p className="font-inter text-lg sm:text-xl text-stone-600 leading-relaxed italic max-w-2xl mx-auto">
                {t.quote}
              </p>

              {/* Attribution */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-orbitron text-sm font-semibold text-stone-800 tracking-[0.1em]">
                    {t.name}
                  </p>
                  <p className="font-inter text-sm text-stone-400 mt-1">
                    {t.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === current
                  ? 'w-8 h-2 bg-orange-600'
                  : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
