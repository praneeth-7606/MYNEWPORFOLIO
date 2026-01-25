'use client';

import { motion } from 'framer-motion';

export default function Education() {
  return (
    <section id="education" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Education
          </span>
        </h2>
        <div className="text-center text-gray-400">
          <p>Education section coming soon...</p>
        </div>
      </motion.div>
    </section>
  );
}
