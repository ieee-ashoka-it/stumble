'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const events = [
  { id: 1, title: 'Tech Talk: AI in Healthcare', date: '2024-03-15', image: '/images/event-1.jpg' },
  { id: 2, title: 'Workshop: IoT Basics', date: '2024-03-22', image: '/images/event-2.jpg' },
  { id: 3, title: 'Hackathon: Sustainable Solutions', date: '2024-04-05', image: '/images/event-3.jpg' },
]

export default function EventsPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className="w-full py-16 bg-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <motion.div key={event.id} variants={itemVariants} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <Image src={event.image} alt={event.title} width={400} height={200} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}