import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { technologies, languages } from '../constants';
import { styles } from '../styles';

class ThreeJSErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Three.js component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const SkillBallCanvas = lazy(() =>
  import('./canvas/SkillBall').catch(() => ({
    default: ({ icon }) => (
      <div className="w-full h-full rounded-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
        <img
          src={icon}
          alt="skill"
          className="w-1/2 h-1/2 object-contain"
          style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.15))' }}
        />
      </div>
    ),
  })),
);

const BallFallback = ({ icon, name }) => (
  <div className="w-full h-28 flex flex-col items-center justify-center">
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
      <img
        src={icon}
        alt={name}
        className="w-1/2 h-1/2 object-contain"
        style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.15))' }}
      />
    </div>
  </div>
);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const SkillSpheres = () => {
  return (
    <section className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeInUp} custom={0} className={styles.sectionSubText}>
            Skills
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className={`${styles.sectionHeadText} mt-2`}
          >
            Tools & Technologies
          </motion.h2>
        </motion.div>

        <div className="flex flex-row flex-wrap justify-center gap-10 mt-10">
          {technologies.map((tech) => (
            <div className="w-28 h-28" key={tech.name}>
              <ThreeJSErrorBoundary
                fallback={<BallFallback icon={tech.icon} name={tech.name} />}
              >
                <Suspense
                  fallback={<BallFallback icon={tech.icon} name={tech.name} />}
                >
                  <SkillBallCanvas icon={tech.icon} />
                </Suspense>
              </ThreeJSErrorBoundary>
              <p className="mt-3 text-center font-inter text-sm text-stone-500">
                {tech.name}
              </p>
            </div>
          ))}
        </div>

        {/* <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16"
        >
          <motion.h3
            variants={fadeInUp}
            custom={0}
            className={`${styles.sectionHeadText} text-center`}
            style={{ fontSize: '28px' }}
          >
            Languages
          </motion.h3>
        </motion.div>

        <div className="flex flex-row flex-wrap justify-center gap-10 mt-10">
          {languages.map((lang) => (
            <div className="w-28 h-28" key={lang.name}>
              <ThreeJSErrorBoundary
                fallback={<BallFallback icon={lang.icon} name={lang.name} />}
              >
                <Suspense
                  fallback={<BallFallback icon={lang.icon} name={lang.name} />}
                >
                  <SkillBallCanvas icon={lang.icon} />
                </Suspense>
              </ThreeJSErrorBoundary>
              <p className="mt-3 text-center font-inter text-sm text-stone-500">
                {lang.name}
              </p>
              <p className="text-center font-inter text-xs text-stone-400">
                ({lang.level})
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default SkillSpheres;
