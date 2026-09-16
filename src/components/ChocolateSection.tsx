import { assetUrl } from '../utils/assets';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const SWIPE_EASE = [0.16, 1, 0.3, 1] as const;

interface ChocolateSectionProps {
  onExplorePairings?: () => void;
}

interface ChocolateVariant {
  id: string;
  percentage: '72%' | '74%' | '85%';
  name: string;
  subtitle: string;
  tagline: string;
  cacaoProfile: string;
  flavorNotes: string[];
  terroir: string;
  concheTime: string;
  surfaceFilter: string;
  ambientGlow: string;
  hiddenManifesto: {
    hero: string;
    sub: string;
    notes: string[];
    origin: string;
  };
}

const variants: ChocolateVariant[] = [
  {
    id: 'c72',
    percentage: '72%',
    name: 'BALANCED CACAO',
    subtitle: 'Piura Blanco · White Cacao',
    tagline: 'Smooth, rounded and quietly rich.',
    cacaoProfile: 'Light roast, delicate silk mouthfeel with floral orchard undertones.',
    flavorNotes: ['Velvety Hazelnut', 'Vanilla Orchid', 'Warm Honeycomb', 'Toasted Almond'],
    terroir: 'Piura Blanco Valley, Peru · 1,200m Elev.',
    concheTime: '54 Hours Granite Roller',
    surfaceFilter: 'brightness(1.15) contrast(1.04) sepia(0.18) saturate(1.12) hue-rotate(-4deg)',
    ambientGlow: 'rgba(214, 166, 120, 0.18)',
    hiddenManifesto: {
      hero: '72% CACAO',
      sub: 'BALANCED CACAO',
      notes: ['VELVETY HAZELNUT', 'VANILLA ORCHID', 'TENDER CREAM FINISH'],
      origin: 'PIURA BLANCO VALLEY · PERU',
    },
  },
  {
    id: 'c74',
    percentage: '74%',
    name: 'DEEP ROAST',
    subtitle: 'Chiapas Canopy · Sea Salt',
    tagline: 'A darker roast with a warm, lingering finish.',
    cacaoProfile: 'Medium-dark roast infused with dried coffee blossom and flake salt.',
    flavorNotes: ['Maldon Smoked Salt', 'Coffee Blossom', 'Roasted Cacao Nib', 'Smoked Oak'],
    terroir: 'Chiapas High Canopy, Mexico · 1,450m Elev.',
    concheTime: '64 Hours Stone Mill',
    surfaceFilter: 'brightness(1.02) contrast(1.10) sepia(0.08) saturate(1.04)',
    ambientGlow: 'rgba(178, 110, 68, 0.22)',
    hiddenManifesto: {
      hero: '74% CACAO',
      sub: 'DEEP ROAST',
      notes: ['SMOKED SEA SALT', 'COFFEE BLOSSOM', 'WARM ROASTED NIBS'],
      origin: 'CHIAPAS CANOPY · MEXICO',
    },
  },
  {
    id: 'c85',
    percentage: '85%',
    name: 'DARK INTENSITY',
    subtitle: 'Sambirano Monolith · Rare Obsidian',
    tagline: 'Deep cacao character. Minimal sweetness. Long finish.',
    cacaoProfile: 'Extreme dark roast, architectural fracture, built to melt against hot espresso.',
    flavorNotes: ['Obsidian Cocoa', 'Bergamot Zest', 'Black Fig', 'Single-Origin Espresso'],
    terroir: 'Sambirano Valley, Madagascar · 1,800m Elev.',
    concheTime: '72 Hours Slow Granite Conche',
    surfaceFilter: 'brightness(0.92) contrast(1.18) saturate(0.90)',
    ambientGlow: 'rgba(140, 80, 48, 0.26)',
    hiddenManifesto: {
      hero: '85% CACAO',
      sub: 'DARK INTENSITY',
      notes: ['DEEP CACAO CHARACTER', 'MINIMAL SWEETNESS', 'OBSIDIAN COCOA & ESPRESSO', 'LONG FINISH'],
      origin: 'SAMBIRANO VALLEY · MADAGASCAR',
    },
  },
];

export const ChocolateSection = ({ onExplorePairings }: ChocolateSectionProps) => {
  const [selectedIdx, setSelectedIdx] = useState(2); // 85% by default
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const current = variants[selectedIdx];

  // Cursor Tracking with Lerp Inertia for Soft Organic Reveal
  const chocolateContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const targetPos = useRef({ x: 50, y: 50 });
  const currentPos = useRef({ x: 50, y: 50 });

  // Directional variant selector with rapid full-viewport swipe & anti-glitch lock
  const handleSelectVariant = (newIdx: number) => {
    if (newIdx === selectedIdx || isAnimating) return;
    const newDir: 1 | -1 = newIdx > selectedIdx ? 1 : -1;
    setDirection(newDir);
    setSelectedIdx(newIdx);
    setIsAnimating(true);
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });

    // Failsafe unlock after rapid 350ms full-viewport swipe completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 360);
  };

  useEffect(() => {
    let frameId: number;
    const updateSmoothPosition = () => {
      const ease = 0.12; // Buttery smooth feather inertia
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      setCursorPos({
        x: Number(currentPos.current.x.toFixed(2)),
        y: Number(currentPos.current.y.toFixed(2)),
      });

      if (isHovered) {
        frameId = requestAnimationFrame(updateSmoothPosition);
      }
    };

    if (isHovered) {
      frameId = requestAnimationFrame(updateSmoothPosition);
    }
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isHovered]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!chocolateContainerRef.current || isAnimating) return;
    const rect = chocolateContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    targetPos.current = { x: percentX, y: percentY };

    // Subtle tactile 3D parallax tilt (restrained to ±4.5 deg)
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    setTilt({
      rotateX: normY * -6,
      rotateY: normX * 6,
    });

    if (!isHovered) setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    targetPos.current = { x: 50, y: 50 };
  };

  // Full-viewport rapid swipe variants ("вжух" full-viewport swipe-out with 2-3 deg aerodynamic inertia)
  const chocolateVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100vw' : '-100vw',
      rotate: dir > 0 ? 2.5 : -2.5,
      opacity: 1,
    }),
    center: {
      x: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: SWIPE_EASE,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100vw' : '100vw',
      rotate: dir > 0 ? -2.5 : 2.5,
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: SWIPE_EASE,
      },
    }),
  };

  return (
    <section
      id="chocolate"
      aria-label="NOIR Chocolate Atelier"
      style={{
        position: 'relative',
        backgroundColor: '#171310',
        padding: 'clamp(5rem, 9vw, 8rem) 0 clamp(4rem, 8vw, 7rem)',
        overflow: 'hidden',
        color: '#f6f2ea',
      }}
    >
      {/* 
        0. Atmospheric Molten Chocolate & Obsidian Espresso Swirl Video Layer
        Ultra slow-motion swirling dark cacao and espresso liquid dynamics
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
          playsInline poster={assetUrl('/images/chocolate-molten.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.22,
            filter: 'contrast(1.15) brightness(0.92)',
          }}
        >
          <source src={assetUrl('/videos/espresso-chocolate-swirl.mp4')} type="video/mp4" />
        </video>

        {/* Soft Vignettes so the video melts seamlessly into the #171310 edges */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 50%, transparent 35%, rgba(23, 19, 16, 0.6) 75%, #171310 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '140px',
            background: 'linear-gradient(to bottom, #171310 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '140px',
            background: 'linear-gradient(to top, #171310 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* 1. Ambient Warm Cacao Glow in the background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(550px, 75vw, 1000px)',
          height: 'clamp(550px, 75vw, 1000px)',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${current.ambientGlow} 0%, rgba(23, 19, 16, 0.4) 50%, transparent 75%)`,
          filter: 'blur(90px)',
          pointerEvents: 'none',
          transition: 'background 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 1,
        }}
      />

      {/* 2. Top Editorial Header & Flavor Selector Bar */}
      <div
        className="site-container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: 'clamp(1.5rem, 3vw, 3rem)',
          borderBottom: '1px solid rgba(246, 242, 234, 0.08)',
          paddingBottom: '1.5rem',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#c99368',
              fontWeight: 600,
              marginBottom: '0.4rem',
            }}
          >
            ATELIER ARCHIVE · SIGNATURE CHOCOLATE
          </div>

          {/* Synchronized Header Title Transition */}
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              height: 'clamp(2rem, 3.2vw, 2.8rem)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, y: direction > 0 ? 18 : -18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction > 0 ? -18 : 18 }}
                transition={{ duration: 0.35, ease: SWIPE_EASE }}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                  color: '#f6f2ea',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {current.percentage} {current.name}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Minimalist Flavor Selector Tabs with anti-glitch lock */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(246, 242, 234, 0.5)',
              fontWeight: 600,
            }}
          >
            SELECT INTENSITY
          </span>
          <div
            role="tablist"
            aria-label="Chocolate percentage selector"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'rgba(23, 19, 16, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(246, 242, 234, 0.12)',
              borderRadius: '999px',
              padding: '0.3rem',
              gap: '0.35rem',
              pointerEvents: isAnimating ? 'none' : 'auto',
              userSelect: 'none',
            }}
          >
            {variants.map((v, idx) => {
              const isSelected = idx === selectedIdx;
              return (
                <button
                  key={v.id}
                  role="tab"
                  disabled={isAnimating}
                  aria-selected={isSelected}
                  onClick={() => handleSelectVariant(idx)}
                  style={{
                    padding: '0.45rem 1.25rem',
                    borderRadius: '999px',
                    backgroundColor: isSelected ? '#c99368' : 'transparent',
                    color: isSelected ? '#171310' : '#f6f2ea',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: isAnimating ? 'default' : 'pointer',
                    outline: 'none',
                    border: 'none',
                  }}
                >
                  {v.percentage}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CENTRAL EDITORIAL STAGE: FREE-FLOATING CHOCOLATE & GIANT TYPOGRAPHY    */}
      {/* ========================================================================= */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 'clamp(540px, 68vh, 760px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          margin: '1.5rem 0',
        }}
      >
        {/* 
          GIANT LOW-CONTRAST EDITORIAL TYPOGRAPHY BEHIND THE CHOCOLATE:
          Partially hidden behind the floating object to generate cinematic depth.
          Smoothly transitions with directional fade / slide-up.
        */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(5.5rem, 18vw, 22rem)',
              fontWeight: 800,
              lineHeight: 0.8,
              letterSpacing: '-0.04em',
              color: 'rgba(246, 242, 234, 0.045)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            NOIR CACAO
          </div>

          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              marginTop: 'clamp(-1rem, -3vw, -3rem)',
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, y: direction > 0 ? 30 : -30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: direction > 0 ? -30 : 30, scale: 0.96 }}
                transition={{ duration: 0.35, ease: SWIPE_EASE }}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(4.5rem, 15vw, 18rem)',
                  fontWeight: 800,
                  fontStyle: 'italic',
                  lineHeight: 0.8,
                  letterSpacing: '-0.03em',
                  color: 'rgba(201, 147, 104, 0.08)',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {current.percentage} CACAO
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 
          FREE-FLOATING EDITORIAL BITTEN CHOCOLATE BAR:
          Directional slider / carousel with AnimatePresence
          Floats directly on the page canvas, tilted diagonally with deep drop shadow!
        */}
        <div
          ref={chocolateContainerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{
            position: 'relative',
            zIndex: 5,
            width: 'clamp(320px, 34vw, 470px)',
            aspectRatio: '533 / 864',
            cursor: 'crosshair',
            userSelect: 'none',
            touchAction: 'none',
            perspective: '1200px',
            filter:
              'drop-shadow(0 20px 45px rgba(0, 0, 0, 0.75)) drop-shadow(0 4px 12px rgba(18, 11, 8, 0.9))',
          }}
        >
          <AnimatePresence
            initial={false}
            custom={direction}
            mode="popLayout"
            onExitComplete={() => setIsAnimating(false)}
          >
            <motion.div
              key={current.id}
              custom={direction}
              variants={chocolateVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                willChange: 'transform',
              }}
            >
              {/* Parallax Tilt & Diagonal Float Wrapper */}
              <div
                className="chocolate-image"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transform: `rotate(-6.5deg) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${
                    isHovered ? 1.025 : 1
                  })`,
                  transition: isHovered
                    ? 'transform 0.12s ease-out'
                    : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  maskImage: 'radial-gradient(circle at center, black 65%, transparent 95%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 65%, transparent 95%)',
                }}
              >
                {/* 
                  UNDERNEATH LAYER:
                  Revealed directly beneath the erasing chocolate!
                  Shaped to the exact silhouette of the bitten chocolate bar via mask-image.
                  Contains secret etched golden typography and deep obsidian cacao texture.
                */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    maskImage: `url('${assetUrl('/images/chocolate-bar-floating.png')}')`,
                    WebkitMaskImage: `url('${assetUrl('/images/chocolate-bar-floating.png')}')`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                    backgroundColor: '#110c09',
                    backgroundImage:
                      'radial-gradient(circle at 50% 35%, rgba(45, 28, 20, 0.9) 0%, #0d0907 85%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingTop: '26%',
                    paddingLeft: '14%',
                    paddingRight: '14%',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                  }}
                >
                  {/* Internal flashlight/caramel illumination following cursor */}
                  {isHovered && (
                    <div
                      style={{
                        position: 'absolute',
                        left: `${cursorPos.x}%`,
                        top: `${cursorPos.y}%`,
                        transform: 'translate(-50%, -50%)',
                        width: '240px',
                        height: '240px',
                        borderRadius: '50%',
                        background:
                          'radial-gradient(circle, rgba(201, 147, 104, 0.4) 0%, rgba(156, 103, 71, 0.18) 45%, transparent 75%)',
                        mixBlendMode: 'screen',
                        pointerEvents: 'none',
                        transition: 'opacity 0.2s ease',
                      }}
                    />
                  )}

                  {/* Laser-Etched Hidden Atelier Manifesto Underneath */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 3,
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(1.1rem, 1.8vw, 1.6rem)',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        color: '#c99368',
                        marginBottom: '0.2rem',
                        textShadow: '0 0 12px rgba(201, 147, 104, 0.6)',
                      }}
                    >
                      NOIR
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(0.6rem, 0.85vw, 0.76rem)',
                        fontWeight: 800,
                        letterSpacing: '0.3em',
                        color: '#f6f2ea',
                        textTransform: 'uppercase',
                        marginBottom: '0.9rem',
                        borderBottom: '1px solid rgba(201, 147, 104, 0.3)',
                        paddingBottom: '0.6rem',
                      }}
                    >
                      {current.hiddenManifesto.hero}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.45rem',
                        marginBottom: '1rem',
                      }}
                    >
                      {current.hiddenManifesto.notes.map((note) => (
                        <div
                          key={note}
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: 'clamp(0.55rem, 0.72vw, 0.64rem)',
                            fontWeight: 700,
                            letterSpacing: '0.22em',
                            color: 'rgba(246, 242, 234, 0.92)',
                            textTransform: 'uppercase',
                          }}
                        >
                          {note}
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        fontSize: '0.55rem',
                        letterSpacing: '0.24em',
                        color: '#c99368',
                        opacity: 0.85,
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                    >
                      {current.hiddenManifesto.origin}
                    </div>
                  </div>
                </div>

                {/* 
                  SURFACE LAYER:
                  The physical bitten dark chocolate bar with foil.
                  Erased / dissolved dynamically around the cursor with soft feathered edges!
                */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 2,
                    backgroundImage: `url('${assetUrl('/images/chocolate-bar-floating.png')}')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    filter: current.surfaceFilter,
                    transition: 'filter 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    // Soft feathered organic brush erase effect
                    maskImage: isHovered
                      ? `radial-gradient(circle 115px at ${cursorPos.x}% ${cursorPos.y}%, transparent 0%, transparent 35%, rgba(0,0,0,0.5) 70%, black 100%)`
                      : 'none',
                    WebkitMaskImage: isHovered
                      ? `radial-gradient(circle 115px at ${cursorPos.x}% ${cursorPos.y}%, transparent 0%, transparent 35%, rgba(0,0,0,0.5) 70%, black 100%)`
                      : 'none',
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM EDITORIAL METRICS & PAIRINGS ACTION                              */}
      {/* ========================================================================= */}
      <div
        className="site-container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'clamp(1.5rem, 3vw, 3.5rem)',
          marginTop: 'clamp(1rem, 2.5vw, 2.5rem)',
          paddingTop: '1.8rem',
          borderTop: '1px solid rgba(246, 242, 234, 0.08)',
        }}
      >
        {/* Synchronized Bottom Details Transition */}
        <div style={{ position: 'relative', minHeight: '80px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id + '-col1'}
              custom={direction}
              initial={{ opacity: 0, y: direction > 0 ? 12 : -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction > 0 ? -12 : 12 }}
              transition={{ duration: 0.35, ease: SWIPE_EASE }}
            >
              <div
                style={{
                  fontSize: '0.66rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'rgba(246, 242, 234, 0.45)',
                  fontWeight: 600,
                  marginBottom: '0.4rem',
                }}
              >
                TERROIR &amp; ELEVATION
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#f6f2ea',
                  fontWeight: 500,
                  lineHeight: 1.5,
                }}
              >
                {current.terroir}
              </div>
              <div
                style={{
                  fontSize: '0.74rem',
                  color: '#c99368',
                  letterSpacing: '0.12em',
                  marginTop: '0.3rem',
                  fontWeight: 600,
                }}
              >
                {current.concheTime}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Column 2: Tasting Notes Pills */}
        <div style={{ position: 'relative', minHeight: '80px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id + '-col2'}
              custom={direction}
              initial={{ opacity: 0, y: direction > 0 ? 12 : -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction > 0 ? -12 : 12 }}
              transition={{ duration: 0.35, ease: SWIPE_EASE }}
            >
              <div
                style={{
                  fontSize: '0.66rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'rgba(246, 242, 234, 0.45)',
                  fontWeight: 600,
                  marginBottom: '0.6rem',
                }}
              >
                TASTING PROFILE NOTES
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {current.flavorNotes.map((note) => (
                  <span
                    key={note}
                    style={{
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(246, 242, 234, 0.05)',
                      border: '1px solid rgba(246, 242, 234, 0.1)',
                      color: '#f6f2ea',
                    }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Column 3: Interactive Instruction & Explore Trigger */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: isHovered ? '#55a868' : '#c99368',
              fontWeight: 600,
              transition: 'color 0.3s ease',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: isHovered ? '#55a868' : '#c99368',
                boxShadow: isHovered
                  ? '0 0 10px rgba(85, 168, 104, 0.8)'
                  : '0 0 8px rgba(201, 147, 104, 0.6)',
                transition: 'all 0.3s ease',
              }}
            />
            <span>
              {isHovered
                ? 'EXPOSING SINGLE-ORIGIN CRU MATRIX'
                : 'HOVER SLAB TO DISSOLVE & INSPECT CRU'}
            </span>
          </div>

          <button
            onClick={onExplorePairings}
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: '#171310',
              backgroundColor: '#c99368',
              padding: '0.75rem 1.75rem',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 20px rgba(201, 147, 104, 0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f6f2ea';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#c99368';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            EXPLORE COFFEE &amp; CHOCOLATE PAIRINGS →
          </button>
        </div>
      </div>
    </section>
  );
};
