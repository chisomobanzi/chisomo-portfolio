import { motion } from 'framer-motion';
import { stats } from '../constants';
import { styles } from '../styles';
import profile from '../assets/people/profile.png';

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
          {/* Left – Photo + Bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col sm:flex-row gap-8 items-start"
          >
            {/* Profile photo */}
            <motion.div variants={fadeInUp} custom={0} className="shrink-0">
              <img
                src={profile}
                alt="Chisomo Banzi"
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-stone-800"
              />
            </motion.div>

            {/* Text */}
            <div>
              <motion.p variants={fadeInUp} custom={1} className={styles.sectionSubText}>
                Background
              </motion.p>
              <motion.h2 variants={fadeInUp} custom={2} className={`${styles.sectionHeadText} mt-2`}>
                About Me
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                custom={3}
                className="font-inter text-stone-400 text-base leading-relaxed mt-6"
              >
                I bridge traditional set design and virtual art department work, building both the Unreal environments 
                and the tools to create them. From technical drafting and on-set supervision through to VR previs and ICVFX, 
                I work across the full pipeline.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                custom={4}
                className="font-inter text-stone-400 text-base leading-relaxed mt-4"
              >
                I also develop XR and immersive experiences, bringing a filmmaker's eye 
                to spatial narrative and interactive design.
              </motion.p>
            </div>
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
                <p className="font-orbitron text-[10px] tracking-[0.25em] uppercase text-stone-500 mt-2">
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
