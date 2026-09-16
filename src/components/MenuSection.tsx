import { assetUrl } from '../utils/assets';
import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles } from 'lucide-react';

export interface MenuItem {
  id: string;
  category: 'COFFEE' | 'CHOCOLATE' | 'PASTRIES';
  categoryLabel: string;
  title: string;
  price: string;
  shortDescription: string;
  image: string;
  details: {
    origin: string;
    elevation: string;
    roast: string;
    process: string;
    tastingNotes: string[];
    pairingRitual: string;
  };
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'obsidian-ritual',
    category: 'COFFEE',
    categoryLabel: 'SIGNATURE PAIRING',
    title: 'THE OBSIDIAN RITUAL',
    price: '$16',
    shortDescription: 'Double-shot espresso paired with two tempered shards of dark cacao.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85',
    details: {
      origin: 'Sidama Micro-lot & Sambirano Cacao',
      elevation: '2,180m',
      roast: 'Slow Drum Roasting · Light-Medium',
      process: 'Natural Anaerobic · 72-Hour Fermentation',
      tastingNotes: ['Wild Blackberry', '85% Single-Origin Cacao', 'Candied Bergamot'],
      pairingRitual:
        'Sip the espresso hot at 93°C, let a shard of dark cacao dissolve slowly on the tongue, then take a second sip to awaken complex stone-fruit undertones.',
    },
  },
  {
    id: 'single-origin-geisha',
    category: 'COFFEE',
    categoryLabel: 'HAND-DRIP FILTER',
    title: 'SINGLE-ORIGIN GEISHA',
    price: '$12',
    shortDescription: 'Hand-poured filter coffee highlighting delicate jasmine florality and peach nectar.',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=85',
    details: {
      origin: 'Hacienda La Esmeralda, Boquete, Panama',
      elevation: '1,850m',
      roast: 'Ultra-Light Scandinavian Roast',
      process: 'Washed Extended Maceration',
      tastingNotes: ['Jasmine Florals', 'White Peach Nectar', 'Meyer Lemon Peel', 'Bergamot'],
      pairingRitual:
        'Brewed through hand-blown Japanese ceramic dripper with soft 45ppm volcanic water. Served in a thin tulip cup.',
    },
  },
  {
    id: 'flat-white-smoked-salt',
    category: 'COFFEE',
    categoryLabel: 'SIGNATURE CRAFT',
    title: 'FLAT WHITE & SMOKED SALT',
    price: '$11',
    shortDescription: 'Micro-foamed textured milk over double ristretto with smoked sea salt.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1000&q=85',
    details: {
      origin: 'Huehuetenango & Chiapas Terraces',
      elevation: '1,900m',
      roast: 'Medium Espresso Profile',
      process: 'Honey Processed',
      tastingNotes: ['Velvety Sweet Cream', 'Smoked Maldon Salt', 'Roasted Hazelnut Ganache'],
      pairingRitual:
        'Whole organic pasture milk textured to silky 62°C micro-foam, finished with hand-harvested smoked salt.',
    },
  },
  {
    id: 'noir-85-chocolate',
    category: 'CHOCOLATE',
    categoryLabel: 'ATELIER CACAO',
    title: 'NOIR 85% ARTISANAL CHOCOLATE',
    price: '$14',
    shortDescription: 'Stone-conched Madagascar dark chocolate slab with wild berry acidity.',
    image: assetUrl('/images/chocolate-bar.jpg'),
    details: {
      origin: 'Sambirano Valley, Northern Madagascar',
      elevation: 'Sea level to 400m micro-climate',
      roast: 'Low-Temperature Conche · 48 Hours',
      process: 'Wooden Box Fermentation on Banana Leaves',
      tastingNotes: ['Wild Raspberry', 'Earthy Cedar', 'Tuscan Leather', 'Pure Cacao'],
      pairingRitual:
        'Break along the scored debossed grid line. Allow the cocoa butter to melt at body temperature to release citrus acidity.',
    },
  },
  {
    id: 'kyoto-cold-drip',
    category: 'COFFEE',
    categoryLabel: 'SLOW EXTRACTION',
    title: 'KYOTO COLD DRIP',
    price: '$14',
    shortDescription: 'Twelve-hour slow ice extraction served over hand-carved crystal ice.',
    image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1000&q=85',
    details: {
      origin: 'Kenya Nyeri AA & Criollo Cacao Shards',
      elevation: '1,780m',
      roast: 'Omni-Roast Light Filter',
      process: '12-Hour Drop-by-Drop Gravity Drip',
      tastingNotes: ['Black Currant', 'Sparkling Wine Acidity', 'Bittersweet Cocoa Liqueur'],
      pairingRitual:
        'Served chilled in lead-free crystal with raw Venezuelan cacao slivers resting on a hand-carved ice sphere.',
    },
  },
  {
    id: 'white-cacao-truffles',
    category: 'CHOCOLATE',
    categoryLabel: 'ATELIER CACAO',
    title: '72% WHITE CACAO TRUFFLES',
    price: '$15',
    shortDescription: 'Rare heirloom white cacao truffles dusted in bitter Dutch cocoa.',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1000&q=85',
    details: {
      origin: 'Piura Blanco Valley, Northern Peru',
      elevation: '600m Dry Forest Microclimate',
      roast: 'Gentle Hot Air Roasting',
      process: 'Stone-Rolled Ganache Core',
      tastingNotes: ['Almond Blossom', 'Toasted Brioche', 'White Caramel', 'Muted Citrus'],
      pairingRitual:
        'Crafted from rare albino cacao beans. The silky ganache core pairs harmoniously with dark espresso extraction.',
    },
  },
  {
    id: 'double-shot-obsidian',
    category: 'COFFEE',
    categoryLabel: 'LEVER EXTRACTION',
    title: 'DOUBLE-SHOT OBSIDIAN ESPRESSO',
    price: '$5.5',
    shortDescription: 'Lever-extracted Ethiopian Sidama micro-lot with dense, tiger-striped crema.',
    image: assetUrl('/images/roastery-craft.jpg'),
    details: {
      origin: 'Sidama Bensa Micro-Lot #84, Ethiopia',
      elevation: '2,200m',
      roast: 'Custom Espresso Roast',
      process: 'Dry Natural Sun-Dried on Raised Beds',
      tastingNotes: ['Dark Cocoa Nib', 'Candied Fig', 'Blood Orange Zest', 'Syrupy Body'],
      pairingRitual:
        'Pulled on our customized hydraulic spring-lever espresso machine at 9.2 bars of pressure and 93.5°C water temperature.',
    },
  },
  {
    id: 'cacao-canele',
    category: 'PASTRIES',
    categoryLabel: 'BAKED DAILY',
    title: 'ROASTED CACAO CANELÉ',
    price: '$6.5',
    shortDescription: 'Caramelized beeswax crust with a soft custard crumb and nibs.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=85',
    details: {
      origin: 'Bordeaux Tradition with NOIR Cacao Nibs',
      elevation: 'Artisanal Bakery Batch',
      roast: 'Copper Mold Baked at 220°C',
      process: '48-Hour Cold Batter Aging',
      tastingNotes: ['Dark Caramel Crust', 'Tahitian Vanilla Custard', 'Crunchy Bitter Nibs', 'Aged Rum'],
      pairingRitual:
        'Baked fresh every morning in beeswax-lined copper molds. The crunchy caramelized shell contrasts with the custard core.',
    },
  },
];

type CategoryFilter = 'ALL' | 'COFFEE' | 'CHOCOLATE' | 'PASTRIES';

interface EditorialMenuCardProps {
  item: MenuItem;
  index: number;
  totalCount: number;
  smoothProgress: MotionValue<number>;
  onOpenDetails: (item: MenuItem) => void;
  isMobile: boolean;
}

/**
 * EditorialMenuCard
 * Standalone component that cleanly calls its own hooks top-level.
 * Implements subtle camera hover parallax and clean 70% image layout.
 */
const EditorialMenuCard = ({
  item,
  index,
  totalCount,
  smoothProgress,
  onOpenDetails,
  isMobile,
}: EditorialMenuCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Subtle focal emphasis: central card is 100% clarity, neighbors are subtly 0.97 scale / 0.88 opacity
  const centerProgress = totalCount > 1 ? index / (totalCount - 1) : 0;
  const spread = 0.24;

  const cardScale = useTransform(
    smoothProgress,
    [centerProgress - spread, centerProgress, centerProgress + spread],
    [0.96, 1.0, 0.96]
  );

  const cardOpacity = useTransform(
    smoothProgress,
    [centerProgress - spread, centerProgress, centerProgress + spread],
    [0.86, 1.0, 0.86]
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: xRatio * 10, y: yRatio * 10 });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <motion.article
      layout
      style={{
        scale: isMobile ? 1 : cardScale,
        opacity: isMobile ? 1 : cardOpacity,
        position: 'relative',
        flexShrink: 0,
        width: isMobile ? '82vw' : 'clamp(340px, 28vw, 410px)',
        maxWidth: isMobile ? '380px' : '440px',
        backgroundColor: '#FAF7F2',
        borderRadius: '2px',
        overflow: 'hidden',
        boxShadow: isHovered
          ? '0 24px 50px rgba(45, 30, 20, 0.09), 0 4px 12px rgba(45, 30, 20, 0.04)'
          : '0 10px 30px rgba(45, 30, 20, 0.05), 0 2px 6px rgba(45, 30, 20, 0.02)',
        border: '1px solid rgba(26, 20, 16, 0.08)',
        cursor: 'pointer',
        transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="editorial-card"
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={() => onOpenDetails(item)}
      role="button"
      tabIndex={0}
      aria-label={`View tasting notes for ${item.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDetails(item);
        }
      }}
    >
      {/* 
        1. HERO PHOTOGRAPHY CONTAINER (68% - 72% of card height)
        Borderless, uncluttered editorial framing with smooth parallax
      */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '280px' : 'clamp(320px, 46vh, 400px)',
          overflow: 'hidden',
          backgroundColor: '#ebe4d8',
        }}
      >
        <img
          src={assetUrl(item.image)}
          alt={item.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: isHovered
              ? `scale(1.05) translate3d(${mouseOffset.x.toFixed(1)}px, ${mouseOffset.y.toFixed(1)}px, 0)`
              : 'scale(1.0) translate3d(0, 0, 0)',
            transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
          }}
        />

        {/* Subtle Warm Film Lighting Scrim */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(247, 243, 236, 0) 65%, rgba(247, 243, 236, 0.25) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* 
        2. EDITORIAL INFORMATION BLOCK (Remaining ~30% space)
        Strictly uncluttered: Product Name, Price, and short 8-12 word sentence.
      */}
      <div
        style={{
          padding: 'clamp(1.2rem, 2.2vh, 1.6rem) clamp(1.2rem, 1.8vw, 1.6rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          backgroundColor: '#FAF7F2',
        }}
      >
        <div>
          {/* Row 1: Product Name & Price */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '0.8rem',
              marginBottom: '0.6rem',
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 'clamp(0.96rem, 1.1vw, 1.15rem)',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: '#1b1411',
                lineHeight: 1.25,
                transition: 'color 0.25s ease',
              }}
            >
              {item.title}
            </h3>

            <span
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(0.96rem, 1.1vw, 1.15rem)',
                fontWeight: 600,
                color: '#a6653f', // Muted copper
                letterSpacing: '0.02em',
                flexShrink: 0,
              }}
            >
              {item.price}
            </span>
          </div>

          {/* Row 2: Short 8-12 Word Editorial Description */}
          <p
            style={{
              margin: '0 0 1.1rem 0',
              fontSize: '0.84rem',
              lineHeight: 1.5,
              color: '#63574e', // Soft roasted espresso
              fontWeight: 400,
            }}
          >
            {item.shortDescription}
          </p>
        </div>

        {/* Row 3: Refined Tasting Notes Trigger */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.75rem',
            borderTop: '1px solid rgba(26, 20, 16, 0.08)',
          }}
        >
          <span
            style={{
              fontSize: '0.66rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: isHovered ? '#a6653f' : '#8c7b70',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'color 0.25s ease',
            }}
          >
            EXPLORE TASTING NOTES
            <ArrowRight
              size={12}
              style={{
                transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                transition: 'transform 0.25s ease',
              }}
            />
          </span>

          <span
            style={{
              fontSize: '0.66rem',
              letterSpacing: '0.14em',
              color: '#8c7b70',
              textTransform: 'uppercase',
            }}
          >
            {item.category}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export const MenuSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('ALL');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItemForDetails, setSelectedItemForDetails] = useState<MenuItem | null>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'ALL') return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Natural Page Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Silky smooth spring momentum for horizontal glide
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    restDelta: 0.001,
  });

  // Track active item index for the minimal progress indicator (e.g. 01 / 08)
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      const idx = Math.min(
        filteredItems.length - 1,
        Math.max(0, Math.round(v * (filteredItems.length - 1)))
      );
      setActiveIndex(idx);
    });
    return () => unsubscribe();
  }, [smoothProgress, filteredItems.length]);

  // Horizontal translation geometry
  const cardWidth = 380; // px
  const cardGap = 48; // px
  const totalItemDistance = cardWidth + cardGap;
  const totalTravel = Math.max(0, (filteredItems.length - 1) * totalItemDistance);

  // Horizontal translation of the exhibition track
  const trackX = useTransform(smoothProgress, [0, 1], [0, -totalTravel]);

  const categories: CategoryFilter[] = ['ALL', 'COFFEE', 'CHOCOLATE', 'PASTRIES'];

  return (
    <section
      id="menu"
      ref={containerRef}
      aria-label="NOIR Curated Offerings Exhibition"
      style={{
        position: 'relative',
        backgroundColor: '#F1ECE3', // Warm milk / cream editorial canvas
        color: '#1b1411', // Deep espresso typography
        height: isMobile ? 'auto' : '380vh',
      }}
    >
      {/* ========================================================================= */}
      {/* 1. ATMOSPHERIC SECTION TRANSITION FROM DARK NOIR TO WARM MILK / CREAM     */}
      {/* ========================================================================= */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: 'linear-gradient(to bottom, #171310 0%, #2b221d 22%, #68574a 52%, #b5a89b 78%, #F1ECE3 100%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {/* 
        STICKY EXHIBITION CANVAS
        Pins to viewport on desktop while natural vertical page scroll drives the horizontal track
      */}
      <div
        style={{
          position: isMobile ? 'relative' : 'sticky',
          top: 0,
          height: isMobile ? 'auto' : '100vh',
          width: '100vw',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: isMobile
            ? '6rem 0 4.5rem'
            : 'clamp(1.8rem, 3.2vh, 2.8rem) 0 clamp(1.4rem, 2.5vh, 2.2rem)',
          boxSizing: 'border-box',
          zIndex: 10,
        }}
      >
        {/* ========================================================================= */}
        {/* AMBIENT LIGHT-THEMED FLUID BACKGROUND (MILK & ESPRESSO LIQUID MARBLE)    */}
        {/* ========================================================================= */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
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
              opacity: 0.24,
            }}
          >
            <source src={assetUrl('/videos/espresso-milk-blend.mp4')} type="video/mp4" />
          </video>
          {/* Subtle cream blend layer on top of the video */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(247, 243, 236, 0.45)',
              backdropFilter: 'blur(1px)',
              WebkitBackdropFilter: 'blur(1px)',
            }}
          />
        </div>

        {/* Subtle Warm Paper Texture Light Vignette */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 25%, rgba(247, 243, 236, 0.6) 0%, transparent 70%), radial-gradient(circle at 90% 80%, rgba(166, 101, 63, 0.04) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* ========================================================================= */}
        {/* 2. TOP BAR: Editorial Chapter, Large Heading & Real-Time Progress        */}
        {/* ========================================================================= */}
        <div
          className="site-container"
          style={{
            position: 'relative',
            zIndex: 15,
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingBottom: '1.4rem',
            borderBottom: '1px solid rgba(26, 20, 16, 0.1)',
            flexWrap: 'wrap',
            gap: '1.2rem',
          }}
        >
          {/* Header Title & Chapter Tag */}
          <div>
            <div
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#a6653f', // Muted copper
                marginBottom: '0.45rem',
              }}
            >
              CURATED OFFERINGS · CHAPTER 03
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(2.1rem, 3.8vw, 3.4rem)',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 500,
                color: '#1b1411', // Deep obsidian espresso
                lineHeight: 1.08,
                letterSpacing: '-0.01em',
              }}
            >
              Essentials &amp;{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  color: '#a6653f',
                  fontWeight: 400,
                }}
              >
                Bespoke Pairings
              </em>
              .
            </h2>
          </div>

          {/* Controls: Editorial Category Filter & Minimal Progress Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(1.5rem, 3vw, 3rem)',
              flexWrap: 'wrap',
            }}
          >
            {/* Category Filter Controls */}
            <nav
              aria-label="Filter menu items by category"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(1rem, 1.8vw, 1.8rem)',
              }}
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    type="button"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0.35rem 0',
                      fontSize: '0.72rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#1b1411' : '#8c7b70',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'color 0.25s ease',
                      outline: 'none',
                    }}
                  >
                    {cat}
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryUnderline"
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2px',
                          backgroundColor: '#a6653f',
                          borderRadius: '1px',
                        }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Minimal Editorial Progress Indicator: 01 — 08 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.76rem',
                fontFamily: '"Playfair Display", Georgia, serif',
                letterSpacing: '0.12em',
                color: '#8c7b70',
                paddingLeft: '1.2rem',
                borderLeft: '1px solid rgba(26, 20, 16, 0.15)',
              }}
            >
              <span style={{ color: '#1b1411', fontWeight: 600 }}>
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span>—</span>
              <span>{String(filteredItems.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. MAIN EXHIBITION TRACK: HORIZONTAL SCROLL SHOWCASE                      */}
        {/* ========================================================================= */}
        <div
          style={{
            position: 'relative',
            zIndex: 12,
            width: '100%',
            overflow: isMobile ? 'visible' : 'hidden',
            padding: isMobile ? '1.5rem 0' : '1rem 0',
          }}
        >
          {isMobile ? (
            /* Mobile View: Native horizontal touch scrolling with snap */
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                padding: '0 1.5rem',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
              }}
            >
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    scrollSnapAlign: 'center',
                    flexShrink: 0,
                  }}
                >
                  <EditorialMenuCard
                    item={item}
                    index={idx}
                    totalCount={filteredItems.length}
                    smoothProgress={smoothProgress}
                    onOpenDetails={setSelectedItemForDetails}
                    isMobile={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Desktop View: Vertically scroll-jacked continuous horizontal translation */
            <motion.div
              style={{
                x: trackX,
                display: 'flex',
                gap: `${cardGap}px`,
                paddingLeft: 'max(4vw, calc((100vw - 1280px) / 2 + 1.5rem))',
                paddingRight: '10vw',
                width: 'max-content',
                alignItems: 'center',
              }}
            >
              {filteredItems.map((item, idx) => (
                <EditorialMenuCard
                  key={item.id}
                  item={item}
                  index={idx}
                  totalCount={filteredItems.length}
                  smoothProgress={smoothProgress}
                  onOpenDetails={setSelectedItemForDetails}
                  isMobile={false}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 4. BOTTOM BAR: Subtle Hint & Editorial Note                               */}
        {/* ========================================================================= */}
        <div
          className="site-container"
          style={{
            position: 'relative',
            zIndex: 15,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.8rem',
            borderTop: '1px solid rgba(26, 20, 16, 0.08)',
            fontSize: '0.68rem',
            color: '#8c7b70',
            letterSpacing: '0.14em',
            flexWrap: 'wrap',
            gap: '0.8rem',
          }}
        >
          <span style={{ textTransform: 'uppercase' }}>
            NOIR ATELIER · SEASONAL HARVEST &amp; RARE LOT EXTRACTIONS
          </span>

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>SCROLL TO GLIDE EXHIBITION</span>
            <span style={{ color: '#a6653f' }}>→</span>
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. EXPANDED TASTING NOTES DRAWER / MODAL                                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedItemForDetails && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={() => setSelectedItemForDetails(null)}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(23, 17, 14, 0.55)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            />

            {/* Slide-in Editorial Details Drawer */}
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label={`Detailed tasting profile for ${selectedItemForDetails.title}`}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: '520px',
                height: '100%',
                backgroundColor: '#F7F3EC',
                color: '#1b1411',
                boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
              }}
            >
              {/* Drawer Hero Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '260px',
                  backgroundColor: '#ebe4d8',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <img
                  src={assetUrl(selectedItemForDetails.image)}
                  alt={selectedItemForDetails.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(247, 243, 236, 1) 0%, transparent 60%)',
                  }}
                />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedItemForDetails(null)}
                  type="button"
                  aria-label="Close details"
                  style={{
                    position: 'absolute',
                    top: '1.2rem',
                    right: '1.2rem',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(247, 243, 236, 0.9)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(26, 20, 16, 0.1)',
                    color: '#1b1411',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Content Body */}
              <div
                style={{
                  padding: '1.8rem 2.2rem 2.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.8rem',
                }}
              >
                {/* Title & Price Header */}
                <div>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#a6653f',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {selectedItemForDetails.categoryLabel} · {selectedItemForDetails.category}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: '1rem',
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '1.7rem',
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontWeight: 600,
                        color: '#1b1411',
                        lineHeight: 1.2,
                      }}
                    >
                      {selectedItemForDetails.title}
                    </h3>
                    <span
                      style={{
                        fontSize: '1.5rem',
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontWeight: 600,
                        color: '#a6653f',
                      }}
                    >
                      {selectedItemForDetails.price}
                    </span>
                  </div>

                  <p
                    style={{
                      marginTop: '0.8rem',
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                      color: '#63574e',
                    }}
                  >
                    {selectedItemForDetails.shortDescription}
                  </p>
                </div>

                {/* Terroir & Origin Specification Table */}
                <div
                  style={{
                    backgroundColor: '#efe9df',
                    borderRadius: '4px',
                    padding: '1.2rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    border: '1px solid rgba(26, 20, 16, 0.06)',
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.62rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#8c7b70',
                        marginBottom: '0.25rem',
                      }}
                    >
                      ORIGIN TERROIR
                    </span>
                    <strong style={{ fontSize: '0.85rem', color: '#1b1411', fontWeight: 600 }}>
                      {selectedItemForDetails.details.origin}
                    </strong>
                  </div>

                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.62rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#8c7b70',
                        marginBottom: '0.25rem',
                      }}
                    >
                      ELEVATION
                    </span>
                    <strong style={{ fontSize: '0.85rem', color: '#1b1411', fontWeight: 600 }}>
                      {selectedItemForDetails.details.elevation}
                    </strong>
                  </div>

                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.62rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#8c7b70',
                        marginBottom: '0.25rem',
                      }}
                    >
                      ROAST / CONCHE
                    </span>
                    <strong style={{ fontSize: '0.85rem', color: '#1b1411', fontWeight: 600 }}>
                      {selectedItemForDetails.details.roast}
                    </strong>
                  </div>

                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.62rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#8c7b70',
                        marginBottom: '0.25rem',
                      }}
                    >
                      PROCESS
                    </span>
                    <strong style={{ fontSize: '0.85rem', color: '#1b1411', fontWeight: 600 }}>
                      {selectedItemForDetails.details.process}
                    </strong>
                  </div>
                </div>

                {/* Sensory Tasting Notes */}
                <div>
                  <div
                    style={{
                      fontSize: '0.66rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#a6653f',
                      fontWeight: 600,
                      marginBottom: '0.7rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Sparkles size={12} />
                    SENSORY FLAVOR PROFILE
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selectedItemForDetails.details.tastingNotes.map((note) => (
                      <span
                        key={note}
                        style={{
                          backgroundColor: '#F7F3EC',
                          border: '1px solid rgba(166, 101, 63, 0.3)',
                          color: '#1b1411',
                          fontSize: '0.75rem',
                          padding: '0.35rem 0.85rem',
                          borderRadius: '999px',
                          fontWeight: 500,
                        }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* The Pairing Ritual */}
                <div>
                  <div
                    style={{
                      fontSize: '0.66rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#8c7b70',
                      fontWeight: 600,
                      marginBottom: '0.6rem',
                    }}
                  >
                    THE CURATED RITUAL
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.88rem',
                      lineHeight: 1.65,
                      color: '#63574e',
                      fontStyle: 'italic',
                      borderLeft: '2px solid #a6653f',
                      paddingLeft: '1rem',
                    }}
                  >
                    "{selectedItemForDetails.details.pairingRitual}"
                  </p>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => setSelectedItemForDetails(null)}
                  style={{
                    marginTop: '1rem',
                    width: '100%',
                    padding: '0.95rem',
                    backgroundColor: '#1b1411',
                    color: '#F7F3EC',
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: '0.74rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    transition: 'background-color 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#a6653f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1b1411';
                  }}
                >
                  RETURN TO SHOWCASE
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
