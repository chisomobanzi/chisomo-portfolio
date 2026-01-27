import { motion } from 'framer-motion';
import { stats } from '../constants';
import { styles } from '../styles';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const About = () => {
  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left – Bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p variants={fadeInUp} custom={0} className={styles.sectionSubText}>
              About
            </motion.p>
            <motion.h2 variants={fadeInUp} custom={1} className={`${styles.sectionHeadText} mt-2`}>
              Background
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="font-inter text-stone-500 text-base leading-relaxed mt-6"
            >
              I&apos;m a skilled set designer and 3D software developer working across
              traditional and virtual art departments in the film industry. My keen eye
              for detail and passion for innovation have enabled me to have the privilege
              of working on some of the most exciting and visually stunning productions
              in Australia&apos;s entertainment industry.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              custom={3}
              className="font-inter text-stone-500 text-base leading-relaxed mt-4"
            >
              Bridging traditional and virtual production design, I develop XR and
              immersive experiences that explore the intersection of spatial narrative
              and interactive design — bringing a filmmaker&apos;s eye to emerging media.
            </motion.p>
          </motion.div>

          {/* Right – Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-3 gap-6 md:mt-20"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                custom={i}
                className="text-center md:text-left"
              >
                <p className="font-orbitron text-4xl sm:text-5xl font-bold text-orange-600">
                  {stat.value}
                </p>
                <p className="font-orbitron text-[10px] tracking-[0.25em] uppercase text-stone-400 mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
