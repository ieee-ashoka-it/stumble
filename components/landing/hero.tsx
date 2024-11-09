"use client";
import { motion } from "framer-motion";
import Image from "next/image";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
import Carousel from "react-material-ui-carousel";

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-screen flex items-center justify-center"
    >
      <Carousel className="w-full h-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <Image
            key={index}
            src={`/images/hero-${index + 1}.jpg`}
            alt={`Hero ${index + 1}`}
            width={1000}
            height={1000}
            className="w-full h-[100vh] object-cover"
          />
        ))}
      </Carousel>
    </motion.section>
  );
};

export default Hero;
