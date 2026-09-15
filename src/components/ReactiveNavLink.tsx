import React, { useRef, useEffect, useState } from 'react';

export interface ReactiveNavLinkProps {
  text: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  asButton?: boolean;
  fontSize?: string;
  letterSpacing?: string;
  fontWeight?: number | string;
  baseColor?: string;
  hoverColor?: string;
  textShadow?: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

interface LetterPhysics {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  skew: number;
  vx: number;
  vy: number;
  vRotate: number;
  vScale: number;
  vSkew: number;
  targetX: number;
  targetY: number;
  targetRotate: number;
  targetScale: number;
  targetSkew: number;
}

export const ReactiveNavLink: React.FC<ReactiveNavLinkProps> = ({
  text,
  href,
  onClick,
  asButton = false,
  fontSize = '0.74rem',
  letterSpacing = '0.24em',
  fontWeight = 500,
  baseColor = '#f6f2ea',
  hoverColor = '#c99368',
  textShadow = '0 2px 10px rgba(0, 0, 0, 0.8)',
  className = '',
  style = {},
  ariaLabel,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const chars = text.split('');

  const physicsRef = useRef<LetterPhysics[]>(
    chars.map(() => ({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      skew: 0,
      vx: 0,
      vy: 0,
      vRotate: 0,
      vScale: 0,
      vSkew: 0,
      targetX: 0,
      targetY: 0,
      targetRotate: 0,
      targetScale: 1,
      targetSkew: 0,
    }))
  );
  const isHoveredRef = useRef(false);
  const isFinePointerRef = useRef(true);
  const rafIdRef = useRef<number | null>(null);
  const [isHoveredState, setIsHoveredState] = useState(false);

  // Detect touch / fine pointer capabilities
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    isFinePointerRef.current = media.matches;

    const listener = (e: MediaQueryListEvent) => {
      isFinePointerRef.current = e.matches;
    };
    media.addEventListener('change', listener);
    return () => {
      media.removeEventListener('change', listener);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Animation Loop (Runs ONLY when active or settling, 0% CPU when idle)
  const runPhysicsStep = () => {
    const stiffness = 0.16; // elastic tension
    const damping = 0.74;   // organic physical damping

    let allResting = true;

    for (let i = 0; i < physicsRef.current.length; i++) {
      const p = physicsRef.current[i];
      const el = letterRefs.current[i];
      if (!el || !p) continue;

      // Spring Euler integration
      p.vx = (p.vx + (p.targetX - p.x) * stiffness) * damping;
      p.x += p.vx;

      p.vy = (p.vy + (p.targetY - p.y) * stiffness) * damping;
      p.y += p.vy;

      p.vRotate = (p.vRotate + (p.targetRotate - p.rotate) * stiffness) * damping;
      p.rotate += p.vRotate;

      p.vScale = (p.vScale + (p.targetScale - p.scale) * stiffness) * damping;
      p.scale += p.vScale;

      p.vSkew = (p.vSkew + (p.targetSkew - p.skew) * stiffness) * damping;
      p.skew += p.vSkew;

      // Check resting state
      const isResting =
        Math.abs(p.x - p.targetX) < 0.02 && Math.abs(p.vx) < 0.01 &&
        Math.abs(p.y - p.targetY) < 0.02 && Math.abs(p.vy) < 0.01 &&
        Math.abs(p.rotate - p.targetRotate) < 0.03 && Math.abs(p.vRotate) < 0.02 &&
        Math.abs(p.scale - p.targetScale) < 0.002 && Math.abs(p.vScale) < 0.001 &&
        Math.abs(p.skew - p.targetSkew) < 0.03 && Math.abs(p.vSkew) < 0.02;

      if (!isResting) {
        allResting = false;
      }

      // Hardware-accelerated direct transform (no React state updates)
      el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) rotate(${p.rotate.toFixed(2)}deg) scale(${p.scale.toFixed(3)}) skewX(${p.skew.toFixed(2)}deg)`;
    }

    if (allResting && !isHoveredRef.current) {
      // Clean reset to exact baseline
      physicsRef.current.forEach((p, idx) => {
        p.x = 0; p.y = 0; p.rotate = 0; p.scale = 1; p.skew = 0;
        p.vx = 0; p.vy = 0; p.vRotate = 0; p.vScale = 0; p.vSkew = 0;
        const el = letterRefs.current[idx];
        if (el) el.style.transform = '';
      });
      rafIdRef.current = null;
    } else {
      rafIdRef.current = requestAnimationFrame(runPhysicsStep);
    }
  };

  const startLoop = () => {
    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(runPhysicsStep);
    }
  };

  const handlePointerEnter = () => {
    if (!isFinePointerRef.current) return;
    isHoveredRef.current = true;
    setIsHoveredState(true);
    startLoop();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isFinePointerRef.current) return;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const radius = 64; // Influence radius in pixels

    for (let i = 0; i < letterRefs.current.length; i++) {
      const el = letterRefs.current[i];
      const p = physicsRef.current[i];
      if (!el || !p) continue;

      const rect = el.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      const dx = mouseX - charCenterX;
      const dy = mouseY - charCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        // Smooth non-linear proximity wave factor
        const factor = Math.pow(1 - dist / radius, 1.7);

        // Arched vertical lift (upwards under cursor)
        p.targetY = -factor * 6.5;

        // Subtle lateral spread away from pointer
        const normX = dx / (dist || 1);
        p.targetX = -normX * factor * 4.5;

        // Organic fan angle (tilting away from center of pressure)
        p.targetRotate = -(dx / radius) * factor * 6.5;

        // Tactile scale expansion
        p.targetScale = 1 + factor * 0.08;

        // Dynamic elastic shear
        p.targetSkew = -(dx / radius) * factor * 3.5;
      } else {
        p.targetX = 0;
        p.targetY = 0;
        p.targetRotate = 0;
        p.targetScale = 1;
        p.targetSkew = 0;
      }
    }

    startLoop();
  };

  const handlePointerLeave = () => {
    if (!isFinePointerRef.current) return;
    isHoveredRef.current = false;
    setIsHoveredState(false);

    // Spring all characters back toward baseline
    for (let i = 0; i < physicsRef.current.length; i++) {
      const p = physicsRef.current[i];
      if (!p) continue;
      p.targetX = 0;
      p.targetY = 0;
      p.targetRotate = 0;
      p.targetScale = 1;
      p.targetSkew = 0;
    }

    startLoop();
  };

  const sharedContainerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize,
    letterSpacing,
    fontWeight,
    textDecoration: 'none',
    color: isHoveredState ? hoverColor : baseColor,
    opacity: isHoveredState ? 1 : 0.88,
    textShadow,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: '8px 10px',
    margin: '-8px -10px',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    transition: 'color 0.25s ease, opacity 0.25s ease',
    ...style,
  };

  const content = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        letterSpacing: 'inherit',
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          style={{
            display: 'inline-block',
            willChange: 'transform',
            pointerEvents: 'none',
            letterSpacing: 'inherit',
            transition: 'color 0.25s ease',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );

  if (asButton) {
    return (
      <button
        ref={containerRef as React.RefObject<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`reactive-nav-link ${className}`}
        style={sharedContainerStyle}
        aria-label={ariaLabel || text}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      ref={containerRef as React.RefObject<HTMLAnchorElement>}
      href={href || '#'}
      onClick={onClick}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`reactive-nav-link ${className}`}
      style={sharedContainerStyle}
      aria-label={ariaLabel || text}
    >
      {content}
    </a>
  );
};
