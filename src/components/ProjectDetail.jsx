import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../constants';
import { styles } from '../styles';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [brokenImages, setBrokenImages] = useState(new Set());
  const lightboxOpen = lightboxIndex !== null;
  const gallery = project?.gallery || [];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(
    () => setLightboxIndex((i) => (i + 1) % gallery.length),
    [gallery.length],
  );
  const goPrev = useCallback(
    () => setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length),
    [gallery.length],
  );

  // Scroll to top and reset state on project change
  useEffect(() => {
    window.scrollTo(0, 0);
    setLightboxIndex(null);
    setBrokenImages(new Set());
  }, [id]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-orbitron text-2xl font-bold text-stone-100">
            Project Not Found
          </h2>
          <Link
            to="/"
            className={`${styles.btnPrimary} mt-6`}
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Find next project
  const currentIdx = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIdx + 1) % projects.length];

  return (
    <div className="min-h-screen pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 sm:px-16 pt-6">
        <button
          onClick={() => navigate('/#work')}
          className="inline-flex items-center gap-2 font-orbitron text-[11px] tracking-[0.2em] uppercase text-stone-400 hover:text-orange-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Work
        </button>
      </div>

      {/* Hero Area */}
      <motion.section
        initial="hidden"
        animate="visible"
        className="relative py-16 sm:py-24 overflow-hidden"
      >
        {/* Color gradient background */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background: `linear-gradient(135deg, ${project.color}, transparent 60%)`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-16">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {/* Left - Project Info (2 cols) */}
            <div className="md:col-span-2">
              {/* Platform Badge */}
              <motion.div
                variants={fadeIn}
                custom={0}
                className="flex items-center gap-3 mb-6"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <span className="font-orbitron text-[11px] tracking-[0.25em] uppercase text-stone-500">
                  {project.platform}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeIn}
                custom={1}
                className="font-orbitron font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.02em] text-stone-100"
              >
                {project.title}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                variants={fadeIn}
                custom={2}
                className="font-inter text-lg sm:text-xl text-stone-400 leading-relaxed mt-6 max-w-xl"
              >
                {project.tagline}
              </motion.p>

              {/* Description */}
              <motion.p
                variants={fadeIn}
                custom={3}
                className="font-inter text-stone-400 text-base leading-relaxed mt-6 max-w-xl"
              >
                {project.description}
              </motion.p>

              {/* Highlights */}
              <motion.div
                variants={fadeIn}
                custom={4}
                className="flex flex-wrap gap-2 mt-8"
              >
                {project.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="font-inter text-[12px] px-4 py-1.5 rounded-full border border-stone-800 text-stone-400"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* View Project Link */}
              {project.link && (
                <motion.a
                  variants={fadeIn}
                  custom={5}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 bg-orange-600 hover:bg-orange-700 text-white font-inter font-medium text-sm px-6 py-3 rounded transition-colors"
                >
                  View on Quest Store
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              )}
            </div>

            {/* Right - Details Sidebar */}
            <motion.div
              variants={fadeIn}
              custom={3}
              className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 md:grid-cols-1 md:space-y-8 md:gap-0 md:pt-12"
            >
              <div>
                <p className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-2">
                  Platform
                </p>
                <p className="font-inter text-stone-200 font-medium">
                  {project.platform}
                </p>
              </div>
              <div>
                <p className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-2">
                  Year
                </p>
                <div className="flex items-center gap-3">
                  <p className="font-inter text-stone-200 font-medium">
                    {project.year}
                  </p>
                  {project.releasing && (
                    <span className="font-orbitron text-[9px] tracking-[0.15em] uppercase bg-orange-600/20 text-orange-600 px-2 py-0.5 rounded">
                      Releasing Soon
                    </span>
                  )}
                  {project.status && (
                    <span className="font-orbitron text-[9px] tracking-[0.15em] uppercase bg-stone-800 text-stone-400 px-2 py-0.5 rounded">
                      {project.status}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-2">
                  Role
                </p>
                <p className="font-inter text-stone-200 font-medium">
                  {project.role}
                </p>
              </div>
              <div>
                <p className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-2">
                  Category
                </p>
                <p className="font-inter text-stone-200 font-medium">
                  {project.category}
                </p>
              </div>
              {project.keyFigures?.length > 0 && (
                <div className="col-span-2 sm:col-span-4 md:col-span-1">
                  <p className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-3">
                    Key Figures
                  </p>
                  <ul className="space-y-2">
                    {project.keyFigures.map((figure) => (
                      <li key={figure.name} className="font-inter text-sm">
                        {figure.link ? (
                          <a
                            href={figure.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-200 font-medium hover:text-orange-600 transition-colors inline-flex items-center gap-1"
                          >
                            {figure.name}
                            <svg className="w-3 h-3 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          <span className="text-stone-200 font-medium">{figure.name}</span>
                        )}
                        <span className="text-stone-500"> — {figure.role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Gallery Grid */}
      {gallery.length > 0 && <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-16">
          <p className={`${styles.sectionSubText} mb-8`}>Gallery</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((item, num) => {
              const src = typeof item === 'string' ? item : item.src;
              return (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: num * 0.08 }}
                  className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
                  style={{
                    background: `linear-gradient(${135 + num * 20}deg, ${project.color}15, ${project.color}08)`,
                  }}
                  onClick={() => setLightboxIndex(num)}
                >
                  {/\.(mp4|webm|mov)$/i.test(src) ? (
                    <video
                      src={src}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : brokenImages.has(num) ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-orbitron text-[10px] tracking-[0.2em] uppercase text-stone-600">
                        Image {String(num + 1).padStart(2, '0')}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={src}
                      alt={`${project.title} — ${num + 1}`}
                      className="w-full h-full object-cover"
                      onError={() => setBrokenImages((prev) => new Set(prev).add(num))}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous arrow */}
            {gallery.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 sm:left-8 text-white/50 hover:text-white transition-colors z-10"
                aria-label="Previous image"
              >
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next arrow */}
            {gallery.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 sm:right-8 text-white/50 hover:text-white transition-colors z-10"
                aria-label="Next image"
              >
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Media + Caption */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const item = gallery[lightboxIndex];
                const src = typeof item === 'string' ? item : item.src;
                const caption = typeof item === 'string' ? '' : item.caption;
                const isVideo = /\.(mp4|webm|mov)$/i.test(src);

                return (
                  <>
                    {isVideo ? (
                      <video
                        key={src}
                        src={src}
                        className="max-w-full max-h-[75vh] rounded-lg object-contain"
                        controls
                        autoPlay
                      />
                    ) : (
                      <img
                        src={src}
                        alt={caption || `${project.title} — ${lightboxIndex + 1}`}
                        className="max-w-full max-h-[75vh] rounded-lg object-contain"
                      />
                    )}
                    {caption && (
                      <p className="font-inter text-sm text-white/70 mt-4 text-center max-w-lg">
                        {caption}
                      </p>
                    )}
                    {gallery.length > 1 && (
                      <p className="font-inter text-xs text-white/40 mt-2">
                        {lightboxIndex + 1} / {gallery.length}
                      </p>
                    )}
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Project Navigation */}
      <section className="border-t border-stone-800 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-16">
          <Link
            to={`/project/${nextProject.id}`}
            className="group block text-center"
          >
            <p className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-4">
              Next Project
            </p>
            <h3 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 group-hover:text-orange-600 transition-colors">
              {nextProject.title}
            </h3>
            <p className="font-orbitron text-[11px] tracking-[0.2em] uppercase text-stone-500 mt-3">
              {nextProject.platform} — {nextProject.year}
            </p>
            <div className="mt-6">
              <svg
                className="w-6 h-6 mx-auto text-stone-500 group-hover:text-orange-600 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
