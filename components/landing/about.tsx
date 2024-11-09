'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.5 }}
      className="w-full py-16 bg-gray-100"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">About IEEE Ashoka</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div variants={variants} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p>IEEE Ashoka is dedicated to fostering technological innovation and excellence for the benefit of humanity, inspiring a global community of innovators for the benefit of humanity.</p>
          </motion.div>
          <motion.div variants={variants} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">What We Do</h3>
            <p>We organize workshops, seminars, and projects that allow students to apply their knowledge to real-world problems, bridging the gap between academia and industry.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}