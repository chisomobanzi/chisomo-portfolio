import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-orbitron text-2xl font-bold text-stone-800">
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
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 font-orbitron text-[11px] tracking-[0.2em] uppercase text-stone-500 hover:text-orange-600 transition-colors"
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
                <span className="font-orbitron text-[11px] tracking-[0.25em] uppercase text-stone-400">
                  {project.platform}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeIn}
                custom={1}
                className="font-orbitron font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.02em] text-stone-800"
              >
                {project.title}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                variants={fadeIn}
                custom={2}
                className="font-inter text-lg sm:text-xl text-stone-500 leading-relaxed mt-6 max-w-xl"
              >
                {project.tagline}
              </motion.p>

              {/* Description */}
              <motion.p
                variants={fadeIn}
                custom={3}
                className="font-inter text-stone-500 text-base leading-relaxed mt-6 max-w-xl"
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
                    className="font-inter text-[12px] px-4 py-1.5 rounded-full border border-stone-200 text-stone-500"
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
              className="space-y-8 md:pt-12"
            >
              <div>
                <p className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-2">
                  Platform
                </p>
                <p className="font-inter text-stone-700 font-medium">
                  {project.platform}
                </p>
              </div>
              <div>
                <p className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-2">
                  Year
                </p>
                <div className="flex items-center gap-3">
                  <p className="font-inter text-stone-700 font-medium">
                    {project.year}
                  </p>
                  {project.releasing && (
                    <span className="font-orbitron text-[9px] tracking-[0.15em] uppercase bg-orange-100 text-orange-600 px-2 py-0.5 rounded">
                      Releasing Soon
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-2">
                  Role
                </p>
                <p className="font-inter text-stone-700 font-medium">
                  {project.role}
                </p>
              </div>
              <div>
                <p className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-2">
                  Category
                </p>
                <p className="font-inter text-stone-700 font-medium">
                  {project.category}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Gallery Placeholder Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-16">
          <p className={`${styles.sectionSubText} mb-8`}>Gallery</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: num * 0.08 }}
                className="aspect-[4/3] rounded-lg overflow-hidden"
                style={{
                  background: `linear-gradient(${135 + num * 20}deg, ${project.color}15, ${project.color}08)`,
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-orbitron text-[10px] tracking-[0.2em] uppercase text-stone-300">
                    Image {String(num).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project Navigation */}
      <section className="border-t border-stone-200 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-16">
          <Link
            to={`/project/${nextProject.id}`}
            className="group block text-center"
          >
            <p className="font-orbitron text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-4">
              Next Project
            </p>
            <h3 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 group-hover:text-orange-600 transition-colors">
              {nextProject.title}
            </h3>
            <p className="font-orbitron text-[11px] tracking-[0.2em] uppercase text-stone-400 mt-3">
              {nextProject.platform} — {nextProject.year}
            </p>
            <div className="mt-6">
              <svg
                className="w-6 h-6 mx-auto text-stone-400 group-hover:text-orange-600 transition-colors"
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
