import { useState } from 'react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="visit"
      aria-label="Site Footer and Directory"
      style={{
        backgroundColor: '#12100E',
        color: '#EAE6E1',
        borderTop: '1px solid rgba(234, 230, 225, 0.12)',
        padding: 'clamp(2.5rem, 4.5vw, 3.5rem) 0 clamp(1.8rem, 3vw, 2.4rem)',
        position: 'relative',
      }}
    >
      <div className="site-container">
        {/* ========================================================================= */}
        {/* 1. TOP BLOCK: COMPACT NEWSLETTER DISPATCH                                 */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            paddingBottom: 'clamp(1.8rem, 3vw, 2.4rem)',
            borderBottom: '1px solid rgba(234, 230, 225, 0.12)',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: Compact Heading & 1-line Subtitle */}
          <div style={{ maxWidth: '440px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
                fontWeight: 500,
                color: '#EAE6E1',
                margin: '0 0 0.35rem 0',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              Receive private harvest dispatches.
            </h3>
            <p
              style={{
                fontSize: '0.82rem',
                lineHeight: 1.5,
                color: '#8C857B',
                margin: 0,
              }}
            >
              Exclusive access to seasonal single-origin micro-lots and small-batch chocolate releases.
            </p>
          </div>

          {/* Right: Combined Input & Button in a Compact Pill Shape */}
          <form
            onSubmit={handleSubscribe}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: '380px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(234, 230, 225, 0.14)',
              borderRadius: '9999px',
              padding: '0.25rem 0.3rem 0.25rem 1rem',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s ease',
            }}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email for private harvest dispatches"
              style={{
                flex: 1,
                minWidth: 0,
                backgroundColor: 'transparent',
                border: 'none',
                color: '#EAE6E1',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              aria-label="Join dispatch list"
              style={{
                padding: '0.65rem 1.25rem',
                backgroundColor: '#C28859',
                color: '#12100E',
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                outline: 'none',
                transition: 'background-color 0.2s ease, opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d29665')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C28859')}
            >
              {subscribed ? 'JOINED ✦' : 'JOIN'}
            </button>
          </form>
        </div>

        {/* ========================================================================= */}
        {/* 2. BOTTOM BLOCK: 4 COMPACT COLUMNS (TIGHT GAP, NO AWKWARD EMPTINESS)      */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            paddingTop: 'clamp(1.8rem, 3vw, 2.4rem)',
            paddingBottom: 'clamp(1.8rem, 2.8vw, 2.2rem)',
            borderBottom: '1px solid rgba(234, 230, 225, 0.12)',
          }}
        >
          {/* Column 1: Brand Ethos */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                color: '#EAE6E1',
                display: 'block',
                marginBottom: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              NOIR
            </span>
            <p
              style={{
                fontSize: '0.8rem',
                lineHeight: 1.6,
                color: '#8C857B',
                margin: 0,
              }}
            >
              Specialty single-origin coffee roastery &amp; bespoke dark chocolate atelier. Built around the quiet ritual of slow mornings.
            </p>
          </div>

          {/* Column 2: Navigation Index (gap: 8px) */}
          <div>
            <div
              style={{
                fontSize: '0.66rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#C28859',
                marginBottom: '0.75rem',
              }}
            >
              INDEX
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px', // Dense 8px spacing
              }}
            >
              {[
                { label: 'Menu & Pairings', href: '#menu' },
                { label: 'Roasting Craft', href: '#story' },
                { label: 'Signature Chocolate', href: '#chocolate' },
                { label: 'Sanctuary Space', href: '#sanctuary' },
                { label: 'Private Cupping', href: '#visit' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '0.8rem',
                      color: '#8C857B',
                      transition: 'color 0.2s ease',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#C28859')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#8C857B')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Atelier Location */}
          <div>
            <div
              style={{
                fontSize: '0.66rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#C28859',
                marginBottom: '0.75rem',
              }}
            >
              ATELIER
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                lineHeight: 1.6,
                color: '#8C857B',
              }}
            >
              <div>48 Rue des Minimes</div>
              <div>75003 Paris, France</div>
              <div style={{ marginTop: '0.35rem', color: '#EAE6E1', fontWeight: 500 }}>
                Tue – Sun: 07:30 – 19:00
              </div>
            </div>
          </div>

          {/* Column 4: Direct Inquiries */}
          <div>
            <div
              style={{
                fontSize: '0.66rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#C28859',
                marginBottom: '0.75rem',
              }}
            >
              INQUIRIES
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px', // Dense 8px spacing
              }}
            >
              {[
                { label: 'atelier@noircoffee.art', href: 'mailto:atelier@noircoffee.art' },
                { label: 'roast@noircoffee.art', href: 'mailto:roast@noircoffee.art' },
                { label: 'journal@noircoffee.art', href: 'mailto:journal@noircoffee.art' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: '0.8rem',
                      color: '#8C857B',
                      transition: 'color 0.2s ease',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#C28859')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#8C857B')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. SUB-FOOTER STRIP: LEGAL & BACK TO TOP                                  */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1.25rem',
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            color: '#8C857B',
            flexWrap: 'wrap',
            gap: '0.85rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span>© {new Date().getFullYear()} NOIR ATELIER. ALL RIGHTS RESERVED.</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('noir_open_cookie_settings'))}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: '#8C857B',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C28859')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8C857B')}
            >
              COOKIE SETTINGS
            </button>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            style={{
              color: '#8C857B',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C28859')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8C857B')}
          >
            <span>BACK TO TOP</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
