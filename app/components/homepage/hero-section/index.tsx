'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { FaFacebook, FaTwitterSquare } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { MdDownload } from 'react-icons/md';
import { RiContactsFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import personalData from '@/data/personal.json';
import CodeDisplay from './CodeDisplay';

const specializations = [
  "AI Full-Stack Engineer",
  "GenAI Specialist",
  "LLM Integration Expert",
  "Cloud AI Architect"
];

export default function HeroSection() {
  const [currentSpecialization, setCurrentSpecialization] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpecialization((prev) => (prev + 1) % specializations.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const socialLinks = [
    { icon: BsGithub, href: personalData.socialLinks.github, label: "GitHub" },
    { icon: BsLinkedin, href: personalData.socialLinks.linkedin, label: "LinkedIn" },
    { icon: FaFacebook, href: personalData.socialLinks.facebook, label: "Facebook" },
    { icon: SiLeetcode, href: personalData.socialLinks.leetcode, label: "LeetCode" },
    { icon: FaTwitterSquare, href: personalData.socialLinks.twitter, label: "Twitter" },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 lg:py-0">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Text Content */}
          <motion.div variants={itemVariants} className="order-2 lg:order-1 space-y-8">
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-white">Hello, I'm</span>
                <span className="block mt-2 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  {personalData.name}
                </span>
              </h1>
            </motion.div>

            {/* Animated Specialization */}
            <motion.div
              variants={itemVariants}
              className="h-16 flex items-center"
            >
              <h2 className="text-2xl md:text-3xl font-semibold">
                <span className="text-white">I'm a </span>
                <motion.span
                  key={currentSpecialization}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text"
                >
                  {specializations[currentSpecialization]}
                </motion.span>
              </h2>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 max-w-xl"
            >
              {personalData.tagline}
            </motion.p>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-5">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500 hover:text-teal-400 transition-all duration-300 hover:scale-125"
                    aria-label={social.label}
                  >
                    <social.icon size={30} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <Link
                href="#contact"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-full text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                <span className="relative z-10">Contact Me</span>
                <RiContactsFill size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <Link
                href={personalData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-cyan-500 rounded-full text-sm font-semibold text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-300"
              >
                <span>Get Resume</span>
                <MdDownload size={18} className="group-hover:translate-y-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Availability Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm text-green-400 font-medium">
                Available for Freelance Projects
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column - Code Display */}
          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2"
          >
            <CodeDisplay />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
