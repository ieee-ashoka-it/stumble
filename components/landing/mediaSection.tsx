"use client";
import { motion } from 'framer-motion';
import { Youtube, Instagram, Linkedin } from 'lucide-react';

const MediaSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Connect With Us</h2>
        <div className="flex justify-center space-x-8">
          {[Youtube, Instagram, Linkedin].map((Icon, index) => (
            <motion.a
              key={index}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="text-4xl text-gray-700 hover:text-blue-500"
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
