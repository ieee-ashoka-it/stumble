'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const photos = [
  { id: 1, src: '/images/photo-1.jpg', alt: 'IEEE Ashoka Event 1' },
  { id: 2, src: '/images/photo-2.jpg', alt: 'IEEE Ashoka Event 2' },
  { id: 3, src: '/images/photo-3.jpg', alt: 'IEEE Ashoka Event 3' },
  { id: 4, src: '/images/photo-4.jpg', alt: 'IEEE Ashoka Event 4' },
  { id: 5, src: '/images/photo-5.jpg', alt: 'IEEE Ashoka Event 5' },
  { id: 6, src: '/images/photo-6.jpg', alt: 'IEEE Ashoka Event 6' },
]

export default function PhotosSection() {
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className="w-full py-16 bg-gray-100"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Photo Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <motion.div key={photo.id} variants={itemVariants} className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={photo.src}
                alt={photo.alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}