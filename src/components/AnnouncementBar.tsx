export const AnnouncementBar = () => {
  return (
    <aside
      className="announcement-bar"
      aria-label="Editorial Announcement"
      style={{
        backgroundColor: '#cf9c57', // Refined warm roasted amber/copper gold
        color: '#171310',
        padding: '0.55rem 1.5rem',
        fontSize: '0.74rem',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        position: 'relative',
        zIndex: 60,
        borderBottom: '1px solid rgba(23, 19, 16, 0.15)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--site-max-width)',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem 1rem',
        }}
      >
        {/* Left: Punchy Reference 1 Headline with refined tone */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: '0.82rem',
              letterSpacing: '0.16em',
              color: '#171310',
            }}
          >
            NEW SITE — WHO DIS?!
          </span>
          <span style={{ opacity: 0.35 }}>|</span>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.14em' }}>
            AUTUMN HARVEST EDITION 02 · SPECIALTY COFFEE & DARK CHOCOLATE
          </span>
        </div>

        {/* Center: Live indicator */}
        <div
          className="announcement-center"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.68rem',
            fontWeight: 700,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#171310',
              animation: 'delicatePulse 2s infinite ease-in-out',
            }}
          />
          <span>CUPPING ROOM & TASTING SALON OPEN TODAY</span>
        </div>

        {/* Right: Small subtle tag */}
        <div style={{ fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.16em' }}>
          FLAGSHIP ATELIER ✦
        </div>
      </div>
    </aside>
  );
};
