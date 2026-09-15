import { useState, useEffect } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { EditorialUserIcon, EditorialBagIcon } from './Hero';
import { ReactiveNavLink } from './ReactiveNavLink';

interface NavbarProps {
  onOpenReserve?: () => void;
  onOpenAccount?: () => void;
  onOpenCart?: () => void;
  cartCount?: number;
}

export const Navbar = ({ onOpenReserve, onOpenAccount, onOpenCart, cartCount = 3 }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Fade in sticky navbar only after scrolling past the Hero video
      setScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'MENU', href: '#menu' },
    { label: 'STORY', href: '#story' },
    { label: 'VISIT', href: '#sanctuary' },
  ];

  return (
    <>
      {/* Sticky Header: appears seamlessly only when scrolled past the Hero section */}
      <header
        className="site-header"
        aria-hidden={!scrolled}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          width: '100%',
          backgroundColor: 'rgba(18, 14, 11, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(246, 242, 234, 0.1)',
          padding: '1.2rem 0',
          opacity: scrolled ? 1 : 0,
          visibility: scrolled ? 'visible' : 'hidden',
          pointerEvents: scrolled ? 'auto' : 'none',
          transform: scrolled ? 'translateY(0)' : 'translateY(-12px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease, background-color 0.35s ease, visibility 0.35s',
        }}
      >
        <div
          className="site-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left: Brand Logo & Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(2rem, 5vw, 4.5rem)' }}>
            <a
              href="#"
              aria-label="NOIR Coffee home"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.65rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: '#f6f2ea',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)',
                lineHeight: 1,
              }}
            >
              NOIR
            </a>

            {/* Desktop Navigation Links */}
            <nav
              className="desktop-nav-links"
              aria-label="Main Navigation"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2.5rem',
              }}
            >
              {navLinks.map((link) => (
                <ReactiveNavLink
                  key={link.label}
                  href={link.href}
                  text={link.label}
                  fontSize="0.72rem"
                  letterSpacing="0.22em"
                  textShadow="none"
                />
              ))}

              {/* Reserve trigger link */}
              <ReactiveNavLink
                asButton
                text="RESERVE"
                onClick={onOpenReserve}
                fontSize="0.72rem"
                letterSpacing="0.22em"
                textShadow="none"
              />
            </nav>
          </div>

          {/* Right: Minimalist User & Shopping Bag Icons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            {/* User Icon */}
            <button
              onClick={onOpenAccount}
              aria-label="Atelier Member Account"
              title="Account & Membership"
              style={{
                color: '#f6f2ea',
                opacity: 0.85,
                background: 'none',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                padding: '0.3rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                WebkitTapHighlightColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.color = '#c99368';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.85';
                e.currentTarget.style.color = '#f6f2ea';
              }}
            >
              <EditorialUserIcon size={19} strokeWidth={1.3} />
            </button>

            {/* Shopping Bag Icon with Counter */}
            <button
              onClick={onOpenCart}
              aria-label="Tasting Flight Cart"
              title="View Cart"
              style={{
                color: '#f6f2ea',
                opacity: 0.85,
                background: 'none',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                padding: '0.3rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'all 0.2s',
                WebkitTapHighlightColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.color = '#c99368';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.85';
                e.currentTarget.style.color = '#f6f2ea';
              }}
            >
              <EditorialBagIcon size={19} strokeWidth={1.3} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-4px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--copper)',
                  }}
                />
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                color: '#f6f2ea',
                padding: '0.3rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Only active when menu opened) */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 0,
            backgroundColor: 'rgba(18, 14, 11, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 90,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '3rem 2rem',
            gap: '2rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#f6f2ea' }}>
              NOIR
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#f6f2ea', padding: '0.5rem', background: 'none', border: 'none' }}
            >
              <X size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  color: '#f6f2ea',
                  borderBottom: '1px solid var(--line)',
                  paddingBottom: '0.8rem',
                }}
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenReserve) onOpenReserve();
              }}
              style={{
                marginTop: '1.5rem',
                padding: '1.1rem',
                borderRadius: '999px',
                backgroundColor: 'var(--copper)',
                color: '#171310',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              RESERVE A TASTING TABLE
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav-links {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
