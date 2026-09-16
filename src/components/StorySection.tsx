import { assetUrl } from '../utils/assets';
import { useState, useRef, useEffect, useCallback } from 'react';

interface SpecItem {
  id: 'elevation' | 'extraction' | 'conching' | 'roast';
  label: string;
  target?: number;
  suffix?: string;
  textValue?: string;
  desc: string;
}

const specsData: SpecItem[] = [
  {
    id: 'elevation',
    label: 'MICRO-LOT ELEVATION',
    target: 2180,
    suffix: 'm',
    desc: 'Sidama highland canopy',
  },
  {
    id: 'extraction',
    label: 'EXTRACTION PROFILE',
    target: 93,
    suffix: '°C',
    desc: 'Precision thermal stability',
  },
  {
    id: 'conching',
    label: 'STONE CONCHING',
    target: 72,
    suffix: ' Hours',
    desc: 'Granite roll shear',
  },
  {
    id: 'roast',
    label: 'ROAST PROFILE',
    textValue: 'City+ Dark',
    desc: 'Preserves origin florals',
  },
];

export const StorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Parallax depth state for the main photograph
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth numerical count-up state for statistics
  const [countValues, setCountValues] = useState({
    elevation: 0,
    extraction: 0,
    conching: 0,
  });

  // 1. Viewport Intersection Observer for coordinated entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  // 2. Animated Statistics Count-Up Animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1800; // ms
    let startTimestamp: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic ease-out: 1 - (1 - progress)^3
      const ease = 1 - Math.pow(1 - progress, 3);

      setCountValues({
        elevation: Math.round(ease * 2180),
        extraction: Math.round(ease * 93),
        conching: Math.round(ease * 72),
      });

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        // Ensure exact final numbers
        setCountValues({
          elevation: 2180,
          extraction: 93,
          conching: 72,
        });
      }
    };

    // Stagger count-up start to coordinate with specs card entrance
    const timer = setTimeout(() => {
      animId = requestAnimationFrame(step);
    }, 550);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  // 3. Pointer move handler for subtle, restrained photo parallax
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    // Normalized offset between -0.5 and 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  // Format the spec numerical values
  const getDisplayValue = (spec: SpecItem) => {
    if (spec.id === 'elevation') {
      return `${countValues.elevation.toLocaleString('en-US')}${spec.suffix}`;
    }
    if (spec.id === 'extraction') {
      return `${countValues.extraction}${spec.suffix}`;
    }
    if (spec.id === 'conching') {
      return `${countValues.conching}${spec.suffix}`;
    }
    return spec.textValue || '';
  };

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-label="The Architecture of Slow Roasting and Extraction"
      style={{
        position: 'relative',
        backgroundColor: '#e8e0d3', // Warm cream paper for visual breathing room
        color: '#1a1410',
        padding: 'clamp(5.5rem, 10vw, 9.5rem) 0',
        borderTop: '2px solid #1a1410',
        borderBottom: '2px solid #1a1410',
        overflow: 'hidden',
      }}
    >
      {/* 
        Subtle Living Marble & Cream Liquid Background Layer
        Pure slow-motion blooming espresso & milk currents under the roasting craft section
      */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.20,
            mixBlendMode: 'multiply',
            filter: 'contrast(1.12) brightness(1.02)',
          }}
        >
          <source src={assetUrl('/videos/espresso-milk-blend.mp4')} type="video/mp4" />
        </video>
      </div>

      {/* 4. Delicate Architectural Grid Texture - Softened visual intensity */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backgroundImage:
            'linear-gradient(to right, rgba(26, 20, 16, 0.022) 1px, transparent 1px), linear-gradient(to bottom, rgba(26, 20, 16, 0.022) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 50%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 50%, transparent 95%)',
          pointerEvents: 'none',
        }}
      />

      <div className="site-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header with Coordinated Scroll Entrance */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(26, 20, 16, 0.15)',
            marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
            flexWrap: 'wrap',
            gap: '1.8rem',
          }}
        >
          <div>
            {/* Storytelling Continuity: Connecting Hero pour to Roasting craft */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#9c6747',
                fontWeight: 700,
                marginBottom: '0.9rem',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#9c6747' }} />
              COFFEE METIER & CRAFT · CHAPTER 02
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '1px',
                  backgroundColor: 'rgba(156, 103, 71, 0.45)',
                  marginLeft: '0.35rem',
                }}
              />
              <span style={{ fontSize: '0.65rem', color: '#6d5a4d', letterSpacing: '0.18em' }}>
                FROM THE POUR TO THE SOURCE
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5.2vw, 4.6rem)',
                color: '#1a1410',
                margin: 0,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition:
                  'opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.12s, transform 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.12s',
              }}
            >
              The Architecture of <br />
              <em style={{ fontStyle: 'italic', color: '#9c6747' }}>Slow Roasting</em> & Extraction.
            </h2>
          </div>

          {/* Hero Storytelling Connector copy */}
          <div
            style={{
              maxWidth: '410px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition:
                'opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.22s, transform 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.22s',
            }}
          >
            <p style={{ fontSize: '0.88rem', lineHeight: 1.75, margin: 0, color: '#574c43' }}>
              The clarity poured into the glass began seventy-two hours earlier in Sidama. We source
              exclusively from shade-grown micro-lots, where each harvest undergoes anaerobic maceration
              before arriving at our central cast-iron roastery.
            </p>
          </div>
        </div>

        {/* Editorial Story Layout: Photo + Typography & Specs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 4vw, 4.5rem)',
            alignItems: 'center',
          }}
        >
          {/* Editorial Image Container with Restrained Parallax Depth */}
          <div
            style={{
              gridColumn: 'span 7',
              position: 'relative',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(22px)',
              transition:
                'opacity 1.15s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, transform 1.15s cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
            }}
            className="story-image-col"
          >
            {/* 5. Editorial Detail 1: Copper Roasting Registration Batch Stamp */}
            <div
              className="story-copper-badge"
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-13px',
                right: '24px',
                zIndex: 6,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: '#1a1410',
                color: '#cf9c57',
                border: '1px solid #9c6747',
                padding: '0.38rem 0.85rem',
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                fontWeight: 700,
                textTransform: 'uppercase',
                boxShadow: '0 8px 24px rgba(26, 20, 16, 0.22)',
                borderRadius: '1px',
                transform: `translate3d(${mouseOffset.x * 5}px, ${mouseOffset.y * 5}px, 0)`,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: 'none',
              }}
            >
              <span style={{ fontSize: '0.72rem', lineHeight: 1, color: '#cf9c57' }}>✛</span>
              <span>CAST-IRON PROBAT · LOT 04</span>
            </div>

            {/* Interactive Photo Frame */}
            <div
              onPointerMove={handlePointerMove}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
              style={{
                position: 'relative',
                boxShadow: '0 25px 50px rgba(40, 24, 18, 0.18)',
                overflow: 'hidden',
                borderRadius: '2px',
                border: '1px solid rgba(26, 20, 16, 0.16)',
                backgroundColor: '#1a1410',
                cursor: 'crosshair',
              }}
            >
              {/* Inner Parallax Image: Smoothly translated inversely to cursor */}
              <img
                src={assetUrl('/images/roastery-craft.jpg')}
                alt="Artisanal roaster evaluating freshly roasted specialty coffee beans with copper cupping spoon on dark timber table"
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'contrast(1.04)',
                  transform: `scale(${isHovered ? 1.03 : 1.0}) translate3d(${mouseOffset.x * -12}px, ${mouseOffset.y * -12}px, 0)`,
                  transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform',
                }}
              />

              {/* Cinematic Specular Sheen layer that tracks pointer smoothly */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: `radial-gradient(550px circle at ${(mouseOffset.x + 0.5) * 100}% ${(mouseOffset.y + 0.5) * 100}%, rgba(255, 240, 220, 0.11), transparent 60%)`,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                  mixBlendMode: 'screen',
                }}
              />

              {/* Floating Cupping Protocol Badge with Multi-Plane Parallax Depth */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '1.25rem',
                  color: '#ffffff',
                  fontSize: '0.66rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  backgroundColor: 'rgba(23, 19, 16, 0.88)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '2px',
                  border: '1px solid rgba(241, 238, 230, 0.15)',
                  transform: `translate3d(${mouseOffset.x * 8}px, ${mouseOffset.y * 8}px, 0)`,
                  transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: 'none',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.3)',
                }}
              >
                CUPPING PROTOCOL N° 34 · HARVEST EVALUATION
              </div>
            </div>

            {/* 5. Editorial Detail 2: Fine-line negative space coordinate & origin note */}
            <div
              aria-hidden="true"
              style={{
                marginTop: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#8b7a6d',
                padding: '0 0.2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#9c6747', fontWeight: 800 }}>▲</span>
                <span>ORIGIN REGISTRATION: SIDAMA ETHIOPIA</span>
              </div>
              <div>
                <span>CANOPY ELEV. 2,180M · SINGLE-LOT</span>
              </div>
            </div>
          </div>

          {/* Story Text & Animated Spec Matrix */}
          <div
            style={{
              gridColumn: 'span 5',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition:
                'opacity 1.05s cubic-bezier(0.16, 1, 0.3, 1) 0.32s, transform 1.05s cubic-bezier(0.16, 1, 0.3, 1) 0.32s',
            }}
            className="story-text-col"
          >
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#9c6747',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                STILLNESS OVER SPEED
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)',
                  color: '#1a1410',
                  margin: '0 0 1.2rem',
                  lineHeight: 1.15,
                }}
              >
                Tasting is listening before speaking.
              </h3>
              <p
                style={{
                  fontSize: '0.88rem',
                  lineHeight: 1.75,
                  color: '#574c43',
                  marginBottom: '1rem',
                }}
              >
                Most modern cafes are obsessed with volume and convenience. NOIR was created as an antidote.
                Heating water, grinding roasted beans, and tempering dark chocolate are sensory rituals that demand focus.
              </p>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: '#574c43', margin: 0 }}>
                Every cup is prepared at a stabilized 93°C, engineered to harmonize with our single-origin chocolate blocks.
              </p>
            </div>

            {/* Spec Matrix Grid with Sequential Reveal & Animated Count-Up */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.6rem 1.4rem',
                borderTop: '1px solid rgba(26, 20, 16, 0.15)',
                paddingTop: '2.2rem',
              }}
            >
              {specsData.map((spec, index) => (
                <div
                  key={spec.label}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${
                      0.5 + index * 0.12
                    }s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + index * 0.12}s`,
                  }}
                >
                  {/* Animated Metric Value */}
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.75rem, 2.2vw, 2.1rem)',
                      color: '#9c6747',
                      fontWeight: 600,
                      marginBottom: '0.2rem',
                      letterSpacing: '-0.02em',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {getDisplayValue(spec)}
                  </div>
                  <div
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#1a1410',
                      fontWeight: 700,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {spec.label}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#574c43', lineHeight: 1.4 }}>
                    {spec.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .story-image-col {
            grid-column: span 12 !important;
          }
          .story-text-col {
            grid-column: span 12 !important;
          }
          .story-copper-badge {
            right: 14px !important;
            font-size: 0.58rem !important;
            padding: 0.32rem 0.65rem !important;
          }
        }
        @media (max-width: 540px) {
          .story-copper-badge {
            top: -10px !important;
            right: 8px !important;
          }
        }
      `}</style>
    </section>
  );
};
