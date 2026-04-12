"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", href: "#hero" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Website Development", href: "/services/website-development" },
      { label: "Mobile Apps", href: "/services/mobile-apps" },
      { label: "Custom Integrations", href: "/services/custom-integrations" },
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "Google Ads", href: "/services/google-ads" },
      { label: "Meta & TikTok Ads", href: "/services/meta-tiktok-ads" },
    ],
  },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: isScrolled
            ? "var(--surface)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: isScrolled ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img
                src="/ejago-dark-calligraphy-fixed.png"
                alt="eJago"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <button
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                      className="flex items-center gap-1 text-sm font-semibold transition-colors cursor-pointer stitch-nav-link"
                      style={{ color: "var(--text)" }}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        style={{
                          color: "var(--text)",
                          transform: isServicesOpen ? "rotate(180deg)" : "none",
                          transition: "transform 0.2s",
                        }}
                      />
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="text-sm font-semibold transition-colors hover:opacity-80 stitch-nav-link"
                      style={{ color: "var(--text)" }}
                    >
                      {item.label}
                    </a>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                        className="absolute top-full left-0 pt-2"
                      >
                        <div
                          className="rounded-xl p-2 min-w-[200px]"
                          style={{
                            backgroundColor: "var(--surface)",
                            border: "1px solid var(--border)",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                          }}
                        >
                          {item.children.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2 text-sm rounded-lg transition-colors"
                              style={{ color: "var(--text)" }}
                              onClick={() => setIsServicesOpen(false)}
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <a
                href="#contact"
                className="hidden md:block px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--accent-hover)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--accent)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Start a Project
              </a>

              {/* Mobile menu button */}
              <button
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                style={{
                  color: "var(--text)",
                  backgroundColor: isScrolled ? "var(--surface)" : "transparent",
                  border: isScrolled ? "1px solid var(--border)" : "1px solid transparent"
                }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ backgroundColor: "var(--bg)" }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-medium"
                  style={{ color: "var(--text)" }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-8 py-3 rounded-lg text-lg font-semibold mt-4"
                style={{ backgroundColor: "var(--accent)", color: "white" }}
              >
                Start a Project
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
