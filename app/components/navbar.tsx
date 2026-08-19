'use client';

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Freelancing", href: "/freelancing" },
  { label: "Contact", href: "/#contact" },
];

// Sections tracked for the active-link underline. Page links (e.g. /freelancing)
// have no corresponding element on the homepage and are skipped.
const sectionIds = navItems
  .filter((item) => item.href.startsWith("/#"))
  .map((item) => item.href.slice(2));

const NAV_OFFSET = 100; // fixed navbar height used as the "active" trigger line

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  // Scroll position drives derived booleans only, so it lives in a ref: writing it
  // to state would re-render (and re-subscribe the listener) on every scroll event.
  const lastScrollY = useRef(0);
  const frameRequested = useRef(false);

  useEffect(() => {
    // Reads window.scrollY only — no getBoundingClientRect, so no forced layout.
    const update = () => {
      frameRequested.current = false;
      const y = window.scrollY;
      const scrollingDown = y > lastScrollY.current;
      lastScrollY.current = y;

      // Hide on scroll down, show on scroll up. Both setters bail out when the
      // value is unchanged, so a full scroll costs only a handful of renders.
      setIsVisible(!(scrollingDown && y > NAV_OFFSET));
      setIsScrolled(y > 50);
    };

    const handleScroll = () => {
      if (frameRequested.current) return;
      frameRequested.current = true;
      requestAnimationFrame(update);
    };

    lastScrollY.current = window.scrollY;
    update();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section via IntersectionObserver: the root is collapsed to a 1px band
  // at y=NAV_OFFSET, so a section "activates" exactly when it crosses that line —
  // same semantics as the old per-scroll rect check, but with zero scroll work.
  useEffect(() => {
    const intersecting = new Set<string>();
    let observer: IntersectionObserver | null = null;

    const connect = () => {
      observer?.disconnect();
      intersecting.clear();

      const bottomMargin = Math.max(0, window.innerHeight - NAV_OFFSET - 1);
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) intersecting.add(entry.target.id);
            else intersecting.delete(entry.target.id);
          }
          // Preserve document order precedence from the original loop.
          const next = sectionIds.find((id) => intersecting.has(id)) ?? "";
          setActiveSection((prev) => (prev === next ? prev : next));
        },
        { rootMargin: `-${NAV_OFFSET}px 0px -${bottomMargin}px 0px`, threshold: 0 }
      );

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      }
    };

    connect();
    window.addEventListener("resize", connect);
    return () => {
      window.removeEventListener("resize", connect);
      observer?.disconnect();
    };
  }, []);

  const toggleMenu = useCallback(() => setIsOpen((open) => !open), []);

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);

    // Check if it's an external page link
    if (!href.startsWith('/#')) {
      window.location.href = href;
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - 80;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

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
