import { motion } from 'framer-motion';
import { services } from '../constants';
import { styles } from '../styles';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const Services = () => {
  return (
    <section className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p variants={fadeInUp} custom={0} className={styles.sectionSubText}>
            Services
          </motion.p>
          <motion.h2 variants={fadeInUp} custom={1} className={`${styles.sectionHeadText} mt-2`}>
            What I Offer
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              custom={i}
              className="bg-stone-900 rounded-lg p-8"
            >
              <h3 className="font-orbitron text-lg font-semibold text-stone-100">
                {service.title}
              </h3>
              <p className="font-inter text-stone-400 mt-3 leading-relaxed">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="font-inter text-sm text-stone-500 flex items-start gap-2"
                  >
                    <span className="text-orange-600 mt-1 shrink-0">&bull;</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
