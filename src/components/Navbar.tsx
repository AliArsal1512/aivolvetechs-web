import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  visible?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, visible = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'ABOUT', id: 'about', num: '01' },
    { label: 'SERVICES', id: 'services', num: '02' },
    { label: 'MARKETS & CLIENTS', id: 'markets', num: '03' },
    { label: 'WHY AIVOLVE', id: 'why-aivolve', num: '04' },
    { label: 'TEAM', id: 'team', num: '05' },
    { label: 'CONTACT', id: 'contact', num: '06' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      transition: { 
        duration: 0.2, 
        ease: 'easeOut',
      } 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.28, 
        ease: [0.16, 1, 0.3, 1],
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -6 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <>
      {/* Full-Screen Pure Optical Blur Page Backdrop (Zero opaque color tint) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 w-screen h-screen z-40 bg-black/5 cursor-pointer pointer-events-auto"
            style={{
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
            }}
          />
        )}
      </AnimatePresence>

      <header 
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        } ${
          scrolled 
            ? 'py-3.5 bg-black/30 backdrop-blur-xl border-b border-[#d4af37]/20 shadow-[0_8px_32px_rgba(0,0,0,0.35)]' 
            : 'py-5 bg-black/10 backdrop-blur-md border-b border-white/[0.06]'
        }`}
        style={{
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <button 
            id="nav-logo-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('hero');
            }}
            className="flex items-center gap-3 group text-left cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
          >
            <img 
              src="/av_logo.png" 
              alt="Aivolve Techs" 
              className="w-12 h-auto object-fill rounded-lg transition-all duration-300" 
            />
            <div className="flex flex-col">
              <span className="font-poppins font-extrabold text-base sm:text-lg text-white tracking-widest leading-none">
                AIVOLVE <span className="font-light text-[#d4af37]">TECHS</span>
              </span>
              <span className="text-[8px] sm:text-[8.5px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold font-poppins mt-0.5">
                AI Advertisement &amp; Software
              </span>
            </div>
          </button>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.24em] font-medium font-poppins text-slate-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className="hover:text-[#fef08a] transition-all duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-[#d4af37] after:to-[#fef08a] hover:after:w-full after:transition-all after:duration-200 cursor-pointer text-slate-300/90 hover:drop-shadow-[0_0_8px_rgba(254,240,138,0.4)]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right: Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <button
              id="nav-get-started-btn"
              onClick={() => onNavigate('contact')}
              className="text-[11px] uppercase tracking-[0.22em] font-semibold font-poppins px-5 py-2.5 rounded-lg border border-[#d4af37]/80 bg-[#d4af37]/5 backdrop-blur-md text-[#fef08a] hover:bg-[#d4af37] hover:text-[#08080a] transition-all duration-200 flex items-center gap-2 group cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_22px_rgba(212,175,55,0.45)] hover:scale-[1.02]"
            >
              <span>Partner With Us</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile / Tablet Hamburger Toggle */}
          <button
            id="nav-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg text-slate-200 hover:text-[#fcd34d] hover:bg-white/[0.05] transition-all cursor-pointer relative"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <motion.div
              initial={false}
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#fcd34d]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </button>
        </div>

        {/* Mobile / Tablet Pure Glass Blur Dropdown (No background color) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation-dropdown"
              key="mobile-nav-dropdown-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="lg:hidden w-full mt-3 overflow-hidden bg-transparent backdrop-blur-3xl border-y border-white/[0.12] origin-top will-change-transform"
              style={{ 
                backdropFilter: 'blur(36px)',
                WebkitBackdropFilter: 'blur(36px)',
                boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 16px 40px rgba(0,0,0,0.4)',
              }}
            >
              {/* Golden Top Glow Line */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />

              <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-2.5">
                <div className="text-[9px] uppercase tracking-[0.28em] text-[#d4af37] font-semibold font-poppins pb-2.5 border-b border-white/[0.08] flex items-center justify-between">
                  <span>DIRECTORY</span>
                  <span className="text-slate-400 font-mono text-[9px]">AIVOLVE · UAE / CA</span>
                </div>

                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    variants={itemVariants}
                    onClick={() => handleLinkClick(item.id)}
                    className="w-full text-left py-3 px-3 rounded-lg text-[11.5px] uppercase tracking-[0.22em] font-poppins text-slate-200 hover:text-[#fef08a] hover:bg-white/[0.08] border-b border-white/[0.04] flex items-center justify-between transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="font-mono text-[10px] text-[#d4af37]/80 group-hover:text-[#fcd34d] font-semibold">
                        {item.num}
                      </span>
                      <span className="font-medium group-hover:translate-x-1 transition-transform">
                        {item.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#d4af37]/60 group-hover:text-[#fcd34d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </motion.button>
                ))}

                {/* Mobile Partner CTA Button */}
                <motion.div variants={itemVariants} className="pt-3">
                  <button
                    id="mobile-nav-cta-btn"
                    onClick={() => handleLinkClick('contact')}
                    className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#d4af37] text-[#08080a] font-bold text-[11px] uppercase tracking-[0.24em] text-center cursor-pointer shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-2 group font-poppins"
                  >
                    <span>Partner With Us</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
