'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle navbar visibility (hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Handle background blur effect
      setIsScrolled(currentScrollY > 50);

      // Determine active section
      const sections = navItems.map(item => item.href.replace('/#', ''));
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#0a0e27]/80 backdrop-blur-md shadow-lg border-b border-teal-500/20" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link
            href="/"
            className="text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-xl sm:text-2xl font-bold hover:scale-105 transition-transform duration-300"
          >
            Praneeth Vedagiri
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const sectionId = item.href.replace('/#', '');
              const isActive = activeSection === sectionId;
              
              return (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg relative ${
                      isActive 
                        ? "text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text" 
                        : "text-white hover:text-cyan-400"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick("/#contact")}
              className="px-6 py-2.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-full text-sm font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0a0e27]/95 backdrop-blur-md border-t border-teal-500/20"
          >
            <ul className="px-6 py-4 space-y-2">
              {navItems.map((item, index) => {
                const sectionId = item.href.replace('/#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-teal-500/10 text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text border-l-4 border-teal-500"
                          : "text-white hover:bg-teal-500/10 hover:text-cyan-400"
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <button
                  onClick={() => handleNavClick("/#contact")}
                  className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-full text-sm font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  Hire Me
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
