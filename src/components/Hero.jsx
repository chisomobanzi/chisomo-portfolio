import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { styles } from '../styles';

const ParticleField = lazy(() => import('./canvas/ParticleField'));

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          frameloop="always"
        >
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-16 w-full">
        <div className="max-w-2xl">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.sectionLabel}
          >
SET DESIGNER &amp; XR DEVELOPER
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className={`${styles.heroHeadText} mt-4`}
          >
            <span className="text-orange-600 opacity-60 mr-2">&gt;</span>CHISOMO
            <br />
            <span className="text-orange-600 opacity-0 mr-2">&gt;</span><span className="text-orange-600">BANZI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={`${styles.heroSubText} mt-6 max-w-lg`}
          >
            <span className="bg-stone-900/80 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none rounded px-1 sm:px-0 py-0.5 sm:py-0 box-decoration-clone leading-[1.9] sm:leading-relaxed">Set designer and virtual art department specialist.</span>
            <br />
            <span className="bg-stone-900/80 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none rounded px-1 sm:px-0 py-0.5 sm:py-0 box-decoration-clone leading-[1.9] sm:leading-relaxed">I build the Unreal environments and the tools to create them - from VR previs through to on-set delivery.</span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 flex gap-4"
          >
            <a href="#work" className={styles.btnPrimary}>
              View Work
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#contact" className={`${styles.btnOutline} bg-stone-900/80 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none`}>
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-orbitron text-[9px] tracking-[0.3em] uppercase text-stone-500">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-stone-700 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-stone-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
