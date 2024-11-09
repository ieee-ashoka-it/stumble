"use client";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const Twitter = ({ className, size }: { className?: string; size?: number }) => (
    <>
      {/* <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g>
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"></path>
      </g>
    </svg> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="Layer_1"
        width={size}
        height={size}
        className={className}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        viewBox="0 0 24 24"
      >
        <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z" />
      </svg>
    </>
  );

  const socialLinks = [
    {
      id: 0,
      icon: Mail,
      href: "mailto:ieee.asb@ashoka.edu.in",
      label: "Email",
    },
    {
      id: 1,
      icon: Instagram,
      href: "https://www.instagram.com/ieee.ashoka",
      label: "Instagram",
    },
    {
      id: 2,
      icon: Twitter,
      href: "https://x.com/IEEEAshoka",
      label: "Twitter",
    },
    {
      id: 3,
      icon: Linkedin,
      href: "https://www.linkedin.com/company/ieee-ashoka-student-branch",
      label: "LinkedIn",
    },
    {
      id: 4,
      icon: Youtube,
      href: "https://www.youtube.com/@IEEEAshoka",
      label: "YouTube",
    },
  ];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.7 }}
      className={`w-full py-6 bg-[#fbfbf8]`}
    >
      <div className="flex justify-center space-x-2 md:space-x-12 bg-transparent">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center"
          >
            <div className="text-[#467eb5] p-4 rounded-full mb-2">
              <link.icon size={isMobile ? 27 : 35} />
            </div>
            <span className="text-sm font-medium text-[#fbfbf8]">
              {link.label}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
};

export default Footer;
