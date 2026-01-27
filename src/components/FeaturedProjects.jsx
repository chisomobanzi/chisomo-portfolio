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
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
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
                    : 'bg-stone-200/60 text-stone-500 hover:bg-stone-200'
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
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Project Image Placeholder */}
                  <div
                    className="relative aspect-[4/3] rounded-lg overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${current.color}22, ${current.color}44)`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="font-orbitron text-6xl sm:text-8xl font-black opacity-10"
                        style={{ color: current.color }}
                      >
                        {String(current.index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-orbitron text-[11px] tracking-[0.2em] text-white bg-black/50 px-4 py-2 rounded">
                        VIEW PROJECT
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="flex flex-col gap-4">
                    {/* Platform Badge */}
                    <div className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: current.color }}
                      />
                      <span className="font-orbitron text-[10px] tracking-[0.25em] uppercase text-stone-400">
                        {current.platform} — {current.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 group-hover:text-orange-600 transition-colors">
                      {current.title}
                    </h3>

                    {/* Tagline */}
                    <p className="font-inter text-stone-500 text-base leading-relaxed">
                      {current.tagline}
                    </p>

                    {/* Role */}
                    <p className="font-orbitron text-[11px] tracking-[0.2em] uppercase text-stone-400">
                      {current.role}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {current.highlights.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-inter text-[11px] px-3 py-1 rounded-full bg-stone-100 text-stone-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            {/* Dot Navigation */}
            <div className="dot-nav flex gap-2">
              {filtered.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 h-2 bg-orange-600'
                      : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>

            {/* Progress Text */}
            <span className="font-orbitron text-[11px] tracking-[0.15em] text-stone-400">
              {String(currentIndex + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
