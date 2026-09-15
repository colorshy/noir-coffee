import { Coffee } from 'lucide-react';

const marqueeItems = [
  'BREW SLOWLY',
  'STAY A WHILE',
  'NOIR COFFEE',
  'DARK CACAO',
  'TAKE YOUR TIME',
  'SINGLE ORIGIN',
  'OBSIDIAN ROAST',
  'RITUAL IN STILLNESS',
];

export const Marquee = () => {
  return (
    <div
      className="marquee-container"
      role="region"
      aria-label="NOIR Brand Philosophy Marquee"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#e8dfd3',
        borderTop: '1px solid rgba(23, 19, 16, 0.25)',
        borderBottom: '1px solid rgba(23, 19, 16, 0.25)',
        padding: '1.25rem 0',
        userSelect: 'none',
      }}
    >
      <div className="marquee-track">
        {/* Render 2 identical sets of items to guarantee a 100% seamless infinite right-to-left loop */}
        {[0, 1].map((setIndex) => (
          <div
            key={setIndex}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            {marqueeItems.map((phrase, idx) => (
              <div
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.2rem, 4.2vw, 3.8rem)',
                    fontWeight: 700,
                    fontStyle: idx % 2 === 1 ? 'italic' : 'normal',
                    letterSpacing: '-0.02em',
                    color: '#171310',
                    padding: '0 1.6rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {phrase}
                </span>

                {/* Subtle graphic coffee & brand glyphs */}
                {idx % 3 === 0 ? (
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      color: '#9c6747',
                      padding: '0 0.85rem',
                    }}
                  >
                    <Coffee size={24} strokeWidth={2.2} />
                  </span>
                ) : idx % 3 === 1 ? (
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-block',
                      fontSize: '1.4rem',
                      color: '#9c6747',
                      padding: '0 0.85rem',
                      fontWeight: 800,
                    }}
                  >
                    ✦
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-block',
                      fontSize: '1.8rem',
                      color: '#171310',
                      padding: '0 0.85rem',
                      lineHeight: 1,
                    }}
                  >
                    ·
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
