import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  personalization: boolean;
}

const STORAGE_KEY = 'noir_cookie_consent';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
    personalization: true,
  });

  useEffect(() => {
    // Check if user has already made a selection
    const savedConsent = localStorage.getItem(STORAGE_KEY);
    if (!savedConsent) {
      // Elegant 800ms entrance delay so hero video and entrance typography load first
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Allow re-opening from footer or legal triggers
  useEffect(() => {
    const handleOpen = () => {
      setIsVisible(true);
      setIsCustomizeOpen(true);
    };
    window.addEventListener('noir_open_cookie_settings', handleOpen);
    return () => window.removeEventListener('noir_open_cookie_settings', handleOpen);
  }, []);

  const handleAcceptAll = () => {
    const allEnabled: CookiePreferences = {
      essential: true,
      analytics: true,
      personalization: true,
    };
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...allEnabled, timestamp: new Date().toISOString() })
    );
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      personalization: false,
    };
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...essentialOnly, timestamp: new Date().toISOString() })
    );
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...preferences, timestamp: new Date().toISOString() })
    );
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: 'clamp(1rem, 2.5vw, 2rem)',
            left: 'clamp(1rem, 2.5vw, 2rem)',
            zIndex: 100,
            width: 'clamp(320px, 92vw, 440px)',
            backgroundColor: 'rgba(20, 16, 13, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(246, 242, 234, 0.14)',
            borderRadius: '4px',
            boxShadow:
              '0 25px 60px -10px rgba(0, 0, 0, 0.75), 0 0 35px rgba(201, 147, 104, 0.08)',
            padding: 'clamp(1.2rem, 2vh, 1.6rem)',
            color: '#f6f2ea',
            fontFamily: 'var(--font-sans, system-ui, sans-serif)',
          }}
        >
          {/* Top Bar: Tag & Close Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.65rem',
            }}
          >
            <span
              style={{
                fontSize: '0.64rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#c99368', // Warm copper
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <ShieldCheck size={13} />
              ATELIER PROTOCOL · COOKIES
            </span>

            <button
              type="button"
              onClick={handleEssentialOnly}
              aria-label="Dismiss cookie notice with essential cookies only"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(246, 242, 234, 0.6)',
                cursor: 'pointer',
                padding: '0.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f6f2ea')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(246, 242, 234, 0.6)')}
            >
              <X size={16} />
            </button>
          </div>

          {/* Heading */}
          <h2
            id="cookie-banner-title"
            style={{
              margin: '0 0 0.5rem 0',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '1.24rem',
              fontWeight: 600,
              color: '#f6f2ea',
              lineHeight: 1.25,
            }}
          >
            Sensory Cookies &amp; Privacy
          </h2>

          {/* Editorial Description */}
          <p
            style={{
              margin: '0 0 1rem 0',
              fontSize: '0.82rem',
              lineHeight: 1.55,
              color: 'rgba(246, 242, 234, 0.72)',
            }}
          >
            We use cookies to personalize your digital ritual, remember bespoke coffee and
            chocolate tasting preferences, and study cellar analytics in quiet contemplation.
          </p>

          {/* Expandable Customization Accordion */}
          <div style={{ marginBottom: '1.1rem' }}>
            <button
              type="button"
              onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#c99368',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontWeight: 600,
                transition: 'opacity 0.2s ease',
              }}
            >
              <span>{isCustomizeOpen ? 'HIDE PREFERENCES' : 'CUSTOMIZE PREFERENCES'}</span>
              {isCustomizeOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            <AnimatePresence>
              {isCustomizeOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  style={{
                    overflow: 'hidden',
                    marginTop: '0.8rem',
                    paddingTop: '0.8rem',
                    borderTop: '1px solid rgba(246, 242, 234, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.7rem',
                  }}
                >
                  {/* 1. Essential */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '0.8rem',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f6f2ea' }}>
                        Essential Protocol
                      </div>
                      <div
                        style={{
                          fontSize: '0.7rem',
                          color: 'rgba(246, 242, 234, 0.55)',
                          lineHeight: 1.4,
                        }}
                      >
                        Required for bag cart, reservation sessions, and security.
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '0.66rem',
                        letterSpacing: '0.1em',
                        color: '#c99368',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        paddingTop: '0.15rem',
                      }}
                    >
                      ALWAYS ACTIVE
                    </span>
                  </div>

                  {/* 2. Analytics */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f6f2ea' }}>
                        Sensory Analytics
                      </div>
                      <div
                        style={{
                          fontSize: '0.7rem',
                          color: 'rgba(246, 242, 234, 0.55)',
                          lineHeight: 1.4,
                        }}
                      >
                        Helps us refine interaction pacing and harvest exhibition curiosity.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({ ...preferences, analytics: e.target.checked })
                      }
                      style={{
                        accentColor: '#c99368',
                        width: '16px',
                        height: '16px',
                        marginTop: '0.2rem',
                        cursor: 'pointer',
                      }}
                    />
                  </label>

                  {/* 3. Personalization */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f6f2ea' }}>
                        Ritual Personalization
                      </div>
                      <div
                        style={{
                          fontSize: '0.7rem',
                          color: 'rgba(246, 242, 234, 0.55)',
                          lineHeight: 1.4,
                        }}
                      >
                        Remembers dark chocolate intensity and tailored roasting recommendations.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.personalization}
                      onChange={(e) =>
                        setPreferences({ ...preferences, personalization: e.target.checked })
                      }
                      style={{
                        accentColor: '#c99368',
                        width: '16px',
                        height: '16px',
                        marginTop: '0.2rem',
                        cursor: 'pointer',
                      }}
                    />
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isCustomizeOpen ? '1fr 1fr' : '1fr 1fr',
              gap: '0.65rem',
            }}
          >
            {isCustomizeOpen ? (
              <>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  style={{
                    backgroundColor: '#c99368',
                    color: '#171310',
                    border: 'none',
                    borderRadius: '2px',
                    padding: '0.65rem 0.8rem',
                    fontSize: '0.72rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f6f2ea';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#c99368';
                  }}
                >
                  SAVE PREFERENCES
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#f6f2ea',
                    border: '1px solid rgba(246, 242, 234, 0.25)',
                    borderRadius: '2px',
                    padding: '0.65rem 0.8rem',
                    fontSize: '0.72rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#c99368';
                    e.currentTarget.style.color = '#c99368';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(246, 242, 234, 0.25)';
                    e.currentTarget.style.color = '#f6f2ea';
                  }}
                >
                  ACCEPT ALL
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  style={{
                    backgroundColor: '#c99368',
                    color: '#171310',
                    border: 'none',
                    borderRadius: '2px',
                    padding: '0.65rem 0.8rem',
                    fontSize: '0.72rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 4px 15px rgba(201, 147, 104, 0.25)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f6f2ea';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#c99368';
                  }}
                >
                  ACCEPT ALL
                </button>

                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#f6f2ea',
                    border: '1px solid rgba(246, 242, 234, 0.25)',
                    borderRadius: '2px',
                    padding: '0.65rem 0.8rem',
                    fontSize: '0.72rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#c99368';
                    e.currentTarget.style.color = '#c99368';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(246, 242, 234, 0.25)';
                    e.currentTarget.style.color = '#f6f2ea';
                  }}
                >
                  ESSENTIAL ONLY
                </button>
              </>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
