import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, filterTabs } from '../constants';
import { styles } from '../styles';

const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const filtered = activeFilter === 'ALL'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const current = filtered[currentIndex] || filtered[0];

  const goTo = useCallback(
    (idx) => setCurrentIndex(idx % filtered.length),
    [filtered.length]
  );

  const next = useCallback(
    () => goTo(currentIndex + 1),
    [currentIndex, goTo]
  );

  // Auto-rotate every 5s
  useEffect(() => {
    if (isPaused || filtered.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next, filtered.length]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  return (
    <section id="work" className="relative py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className={styles.sectionSubText}>Portfolio</p>
            <h2 className={`${styles.sectionHeadText} mt-2`}>
              Featured Work
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`font-orbitron text-[10px] tracking-[0.2em] px-4 py-2 rounded transition-all duration-200 ${
                  activeFilter === tab
                    ? 'bg-orange-600 text-white'
                    : 'bg-stone-700/60 text-stone-400 hover:bg-stone-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Showcase */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to={`/project/${current.id}`}
                className="block group"
              >
                {/* Hero Image / Video */}
                <div
                  className="relative w-full aspect-[3/4] sm:aspect-[21/9] rounded-2xl overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${current.color}18, ${current.color}35)`,
                  }}
                >
                  {/* Hero image or video (if available) */}
                  {current.hero && (
                    /\.(mp4|webm|mov)$/i.test(current.hero) ? (
                      <video
                        src={current.hero}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={current.hero}
                        alt={current.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    )
                  )}

                  {/* Large background number (visible as fallback) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-orbitron text-[8rem] sm:text-[12rem] md:text-[16rem] font-black opacity-[0.06] select-none leading-none"
                      style={{ color: current.color }}
                    >
                      {String(current.index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Bottom gradient for text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Overlay title on image */}
                  <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 md:bottom-10 md:left-10">
                    <h3 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
                      {current.title}
                    </h3>
                    <p className="font-orbitron text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-white/70 mt-2 sm:mt-3">
                      {current.platform} — {current.year}
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-orbitron text-[11px] tracking-[0.2em] text-white bg-black/50 backdrop-blur-sm px-5 py-2.5 rounded">
                      VIEW PROJECT
                    </span>
                  </div>
                </div>

                {/* Project Info — below image */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-8 mt-6 sm:mt-8">
                  {/* Left: meta + tagline */}
                  <div className="flex flex-col gap-2.5 min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: current.color }}
                      />
                      <span className="font-orbitron text-[10px] tracking-[0.25em] uppercase text-stone-500">
                        {current.role}
                      </span>
                      {current.releasing && (
                        <span className="font-orbitron text-[9px] tracking-[0.15em] uppercase bg-orange-600/20 text-orange-600 px-2 py-0.5 rounded shrink-0">
                          Releasing Soon
                        </span>
                      )}
                    </div>

                    <p className="font-inter text-stone-400 text-base leading-relaxed max-w-xl">
                      {current.tagline}
                    </p>
                  </div>

                  {/* Right: Tags */}
                  <div className="flex flex-wrap gap-2 sm:justify-end sm:max-w-xs shrink-0">
                    {current.highlights.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-inter text-[11px] px-3 py-1 rounded-full bg-stone-800 text-stone-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 sm:mt-12">
            {/* Dot Navigation */}
            <div className="dot-nav flex gap-2">
              {filtered.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 h-2 bg-orange-600'
                      : 'w-2 h-2 bg-stone-600 hover:bg-stone-500'
                  }`}
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>

            {/* Progress Text */}
            <span className="font-orbitron text-[11px] tracking-[0.15em] text-stone-500">
              {String(currentIndex + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
