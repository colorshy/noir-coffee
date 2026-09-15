import { useState, useRef } from 'react';

interface SpaceSectionProps {
  onOpenReserve?: () => void;
}

export const SpaceSection = ({ onOpenReserve }: SpaceSectionProps) => {
  // 3D Tilt state for interactive photo card
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Magnetic button state for "Reserve a Table" CTA
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  // Smooth photo card 3D tilt tracking (max 4-6 deg)
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width - 0.5) * 2; // -1 to 1
    const yPct = (y / rect.height - 0.5) * 2; // -1 to 1
    const maxTilt = 5; // Subtle 5 deg tilt

    setTilt({
      rotateX: -yPct * maxTilt,
      rotateY: xPct * maxTilt,
    });
  };

  const handleCardMouseLeave = () => {
    setIsCardHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Magnetic CTA button coordinates tracking
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Subtle magnetic attraction factor (0.32)
    setBtnOffset({
      x: deltaX * 0.32,
      y: deltaY * 0.32,
    });
  };

  const handleBtnMouseLeave = () => {
    setIsBtnHovered(false);
    setBtnOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="sanctuary"
      aria-label="NOIR Sanctuary Space and Flagship Roastery"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#110e0b',
        padding: 'clamp(5rem, 9vw, 8rem) 0',
        borderBottom: '1px solid var(--line)',
      }}
    >
      {/* 
        0. Ambient Swirling Espresso & Chocolate Background Video
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="sanctuary-bg-video"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.35,
        }}
      >
        <source src="/videos/espresso-swirl.mp4" type="video/mp4" />
        <source src="/videos/espresso-chocolate-swirl.mp4" type="video/mp4" />
      </video>

      {/* Ambient Dark Overlay Layer for 100% Crisp Legibility */}
      <div
        aria-hidden="true"
        className="sanctuary-bg-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(18, 11, 8, 0.6)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle edge blend fades */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '90px',
          background: 'linear-gradient(to bottom, #110e0b 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '90px',
          background: 'linear-gradient(to top, #110e0b 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div
        className="site-container"
        style={{
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* ========================================================================= */}
        {/* 1. MINIMALIST SECTION HEADER: Pure Editorial Title (No Text Clutter)      */}
        {/* ========================================================================= */}
        <div
          style={{
            paddingBottom: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            borderBottom: '1px solid var(--line)',
            marginBottom: 'clamp(2.5rem, 4.5vw, 4rem)',
          }}
        >
          <div className="section-tag" style={{ marginBottom: '0.6rem' }}>
            ATMOSPHERE &amp; SANCTUARY · CHAPTER 04
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              color: 'var(--ink)',
              margin: 0,
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}
          >
            The Architecture of{' '}
            <em style={{ color: '#c28863', fontStyle: 'italic', fontWeight: 400 }}>
              Quiet Contemplation
            </em>
            .
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* 2. GALLERY SHOWCASE: 3D Tilt Card + Streamlined Info & Magnetic CTA       */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 4.5vw, 4rem)',
            alignItems: 'center',
          }}
        >
          {/* Main Architectural Visual with 3D Mouse-Follow Tilt & Ambient Soft Glow */}
          <div
            ref={cardRef}
            className="space-image-col"
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              gridColumn: 'span 7',
              position: 'relative',
              borderRadius: '1rem', // rounded-xl
              overflow: 'hidden',
              boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8)',
              perspective: '1000px',
              transform: isCardHovered
                ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.015, 1.015, 1.015)`
                : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
              transition: isCardHovered
                ? 'transform 0.08s ease-out'
                : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease',
              willChange: 'transform',
            }}
          >
            <img
              src="/images/space-interior.jpg"
              alt="NOIR Flagship coffee sanctuary interior with dark oak wood paneling, warm copper espresso bar, and gentle morning sunlight"
              loading="lazy"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '1rem',
                filter: 'contrast(1.03)',
                transform: isCardHovered ? 'scale(1.02)' : 'scale(1)',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />

            {/* Ambient Glass Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                backgroundColor: 'rgba(23, 19, 16, 0.72)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                border: '1px solid rgba(241, 238, 230, 0.12)',
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#c28863',
                fontWeight: 600,
                pointerEvents: 'none',
              }}
            >
              CENTRAL ATELIER · PARIS
            </div>
          </div>

          {/* Minimalist Details: Address + Hours + Magnetic CTA */}
          <div
            className="space-text-col"
            style={{
              gridColumn: 'span 5',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(1.6rem, 2.5vw, 2.4rem)',
              paddingLeft: 'clamp(0rem, 2vw, 1.5rem)',
            }}
          >
            {/* 1. Address */}
            <div>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.68rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: '#c28863',
                  marginBottom: '0.5rem',
                }}
              >
                LOCATION
              </span>
              <h3
                style={{
                  fontSize: 'clamp(1.5rem, 2.3vw, 2.1rem)',
                  color: 'var(--ink)',
                  margin: 0,
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}
              >
                48 Rue des Minimes, Paris
              </h3>
            </div>

            {/* 2. Hours */}
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1.4rem' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.68rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: '#c28863',
                  marginBottom: '0.5rem',
                }}
              >
                SANCTUARY HOURS
              </span>
              <div
                style={{
                  fontSize: 'clamp(1.15rem, 1.6vw, 1.45rem)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                }}
              >
                Tue – Sun: 07:30 – 19:00
              </div>
            </div>

            {/* 3. Magnetic CTA Button */}
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1.6rem' }}>
              <button
                ref={buttonRef}
                type="button"
                onClick={onOpenReserve}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={handleBtnMouseLeave}
                aria-label="Reserve a Table at NOIR Sanctuary"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  padding: '1.05rem 2.2rem',
                  borderRadius: '9999px',
                  border: '1px solid #A06235',
                  backgroundColor: isBtnHovered ? '#A06235' : 'transparent',
                  color: isBtnHovered ? '#ffffff' : 'var(--ink)',
                  fontSize: '0.74rem',
                  letterSpacing: '0.22em',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: isBtnHovered
                    ? '0 12px 28px -6px rgba(160, 98, 53, 0.45)'
                    : 'none',
                  transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
                  transition: isBtnHovered
                    ? 'background-color 0.32s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s ease, box-shadow 0.32s ease, transform 0.12s ease-out'
                    : 'background-color 0.32s ease, color 0.25s ease, box-shadow 0.32s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform',
                }}
              >
                <span>Reserve a Table</span>
                <span
                  style={{
                    display: 'inline-block',
                    transform: isBtnHovered ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'transform 0.25s ease',
                    color: isBtnHovered ? '#ffffff' : '#c28863',
                  }}
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .space-image-col {
            grid-column: span 12 !important;
          }
          .space-text-col {
            grid-column: span 12 !important;
            padding-left: 0 !important;
            margin-top: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
