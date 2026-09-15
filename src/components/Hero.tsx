import { useRef } from 'react';
import { ReactiveNavLink } from './ReactiveNavLink';

// Subtle, refined editorial profile icon matching user reference screenshot
export const EditorialUserIcon = ({
  size = 21,
  strokeWidth = 1.3,
}: {
  size?: number;
  strokeWidth?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
    aria-hidden="true"
  >
    {/* Head circle */}
    <circle
      cx="12"
      cy="7.2"
      r="3.5"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    {/* Body: smooth curved shoulders with flat horizontal base */}
    <path
      d="M4.5 19.5h15c0-4-3.35-6.2-7.5-6.2s-7.5 2.2-7.5 6.2z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </svg>
);

// Subtle, refined editorial shopping bag matching user reference screenshot
export const EditorialBagIcon = ({
  size = 21,
  strokeWidth = 1.3,
}: {
  size?: number;
  strokeWidth?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
    aria-hidden="true"
  >
    {/* Handle arch */}
    <path
      d="M8.8 8V6a3.2 3.2 0 0 1 6.4 0v2"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Bag body: tapered tote with flat top and rounded base */}
    <path
      d="M5.5 8h13l-0.85 11.8a1.2 1.2 0 0 1-1.2 1.2H7.55a1.2 1.2 0 0 1-1.2-1.2L5.5 8z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </svg>
);

interface HeroProps {
  onExploreClick?: () => void;
  onOpenReserve?: () => void;
  onOpenAccount?: () => void;
  onOpenCart?: () => void;
  cartCount?: number;
}

export const Hero = ({
  onExploreClick,
  onOpenReserve,
  onOpenAccount,
  onOpenCart,
  cartCount = 3,
}: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="NOIR Coffee Experience"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#0d0a08',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* 
        1. Fullscreen Cinematic Background Video
        Pure, clean 1080p pour animation without any baked-in text
      */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="coffee-bg"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          zIndex: 1,
        }}
      >
        <source src="/videos/coffee-pour.webm" type="video/webm" />
        <source src="/videos/coffee-pour.mp4" type="video/mp4" />
        <source src="/videos/hero-coffee-pour.mp4" type="video/mp4" />
      </video>

      {/* Subtle Atmospheric Scrim & Vignette for Editorial Depth & Readability */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 45%, transparent 40%, rgba(13, 10, 8, 0.35) 75%, rgba(13, 10, 8, 0.8) 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: 'linear-gradient(to bottom, rgba(13, 10, 8, 0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* ========================================================================= */}
      {/* 2. Top Navigation Bar (Integrated directly on Hero per user mockup)       */}
      {/* ========================================================================= */}
      <header
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          padding: 'clamp(1.4rem, 3.2vw, 2.4rem) clamp(1.8rem, 5vw, 4.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Brand Logo + Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(2rem, 5vw, 5rem)' }}>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="NOIR Coffee Home"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: '#f6f2ea',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.8)',
              lineHeight: 1,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c99368')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#f6f2ea')}
          >
            NOIR
          </a>

          {/* Desktop Links: MENU, STORY, VISIT, RESERVE */}
          <nav
            className="hero-nav-links"
            aria-label="Hero Navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(1.5rem, 2.6vw, 3.2rem)',
            }}
          >
            <ReactiveNavLink
              href="#menu"
              text="MENU"
              fontSize="0.74rem"
              letterSpacing="0.24em"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('menu');
              }}
            />

            <ReactiveNavLink
              href="#story"
              text="STORY"
              fontSize="0.74rem"
              letterSpacing="0.24em"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('story');
              }}
            />

            <ReactiveNavLink
              href="#sanctuary"
              text="VISIT"
              fontSize="0.74rem"
              letterSpacing="0.24em"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('sanctuary');
              }}
            />

            <ReactiveNavLink
              asButton
              text="RESERVE"
              fontSize="0.74rem"
              letterSpacing="0.24em"
              onClick={onOpenReserve}
            />
          </nav>
        </div>

        {/* Right: Editorial User Profile Icon & Shopping Bag Cart Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          {/* User Profile Button */}
          <button
            onClick={onOpenAccount}
            aria-label="Member Account Portal"
            title="Member Account"
            style={{
              color: '#f6f2ea',
              opacity: 0.9,
              background: 'none',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              padding: '0.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))',
              transition: 'all 0.2s ease',
              WebkitTapHighlightColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.color = '#c99368';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.color = '#f6f2ea';
            }}
          >
            <EditorialUserIcon size={20} strokeWidth={1.3} />
          </button>

          {/* Shopping Bag Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label={`Tasting Flight Cart (${cartCount} items)`}
            title={`Cart (${cartCount} items)`}
            style={{
              color: '#f6f2ea',
              opacity: 0.9,
              background: 'none',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              padding: '0.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))',
              transition: 'all 0.2s ease',
              WebkitTapHighlightColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.color = '#c99368';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.color = '#f6f2ea';
            }}
          >
            <EditorialBagIcon size={20} strokeWidth={1.3} />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. Main Hero Visual Layer: "Noir Coffee" (Left) & Motto (Right)           */}
      {/* ========================================================================= */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1.8rem, 5vw, 4.5rem)',
          pointerEvents: 'none',
        }}
      >
        {/* LEFT: Grand Signature "Noir Coffee" Headline */}
        <div
          onClick={onExploreClick || (() => scrollTo('story'))}
          style={{
            maxWidth: 'min(50vw, 720px)',
            pointerEvents: 'auto',
            userSelect: 'none',
            cursor: 'pointer',
          }}
          title="Explore NOIR Story"
        >
          {/* Eyebrow matching reference: SPECIALTY COFFEE */}
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.68rem, 0.95vw, 0.82rem)',
              letterSpacing: '0.34em',
              textTransform: 'uppercase',
              color: '#f6f2ea',
              opacity: 0.9,
              marginBottom: '0.75rem',
              fontWeight: 500,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
            }}
          >
            SPECIALTY COFFEE
          </div>

          <h1
            style={{
              fontFamily: "'DM Serif Display', 'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(4.8rem, 11vw, 11.2rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              color: '#f6f2ea',
              margin: 0,
              padding: 0,
              textShadow:
                '0 8px 32px rgba(0, 0, 0, 0.9), 0 2px 6px rgba(0, 0, 0, 0.7)',
            }}
          >
            <span style={{ display: 'block', fontStyle: 'italic' }}>Noir</span>
            <span
              style={{
                display: 'block',
                fontStyle: 'italic',
                marginTop: '0.04em',
              }}
            >
              Coffee
            </span>
          </h1>
        </div>

        {/* RIGHT: Curated Editorial Motto Stack with vertical accent line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem',
            pointerEvents: 'auto',
            alignSelf: 'center',
            transform: 'translateY(-2rem)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.62rem, 0.78vw, 0.74rem)',
              letterSpacing: '0.26em',
              lineHeight: 2.1,
              color: '#f6f2ea',
              opacity: 0.88,
              textAlign: 'right',
              fontWeight: 500,
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)',
              userSelect: 'none',
            }}
          >
            <div>COFFEE</div>
            <div>CHOCOLATE</div>
            <div>PEOPLE</div>
            <div style={{ whiteSpace: 'nowrap' }}>A BRIGHTER TOMORROW</div>
          </div>

          {/* Thin vertical accent line */}
          <div
            style={{
              width: '1px',
              height: '74px',
              backgroundColor: 'rgba(246, 242, 234, 0.45)',
              boxShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
            }}
          />
        </div>
      </div>

      {/* Bottom spacer for clean editorial breathing room */}
      <div style={{ height: 'clamp(1rem, 3vh, 2.5rem)', zIndex: 10 }} />

      <style>{`
        @media (max-width: 768px) {
          .hero-nav-links {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
