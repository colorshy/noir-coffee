import { useState } from 'react';
import { X, Check } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal = ({ isOpen, onClose }: ReservationModalProps) => {
  const [experience, setExperience] = useState('obsidian-flight');
  const [timeSlot, setTimeSlot] = useState('09:30 AM');
  const [guests, setGuests] = useState('2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      // Auto close after 3.5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3500);
    }, 500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 8, 6, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          backgroundColor: '#191410',
          border: '1px solid var(--line-strong)',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: 'clamp(1.8rem, 4vw, 2.8rem)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close reservation dialog"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            color: 'var(--muted)',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'rgba(85, 168, 104, 0.15)',
                color: '#55a868',
                marginBottom: '1.5rem',
                border: '1px solid #55a868',
              }}
            >
              <Check size={28} />
            </div>
            <span className="badge-caps" style={{ color: '#55a868' }}>
              RESERVATION CONFIRMED
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                color: 'var(--ink)',
                margin: '0.8rem 0 1rem',
              }}
            >
              We look forward to pouring for you, {name}.
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.6 }}>
              A confirmation and tasting guide has been dispatched to <strong>{email}</strong>.
              Please arrive 5 minutes before {timeSlot}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="section-tag" style={{ marginBottom: '0.5rem' }}>
              SANCTUARY RESERVATION · FLAGSHIP
            </div>
            <h3
              id="reservation-title"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 3vw, 2.3rem)',
                color: 'var(--ink)',
                margin: '0 0 1.5rem',
              }}
            >
              Reserve Your Ritual.
            </h3>

            {/* Step 1: Select Experience */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="badge-caps" style={{ display: 'block', marginBottom: '0.6rem' }}>
                EXPERIENCE SELECTION
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  {
                    id: 'obsidian-flight',
                    title: 'The Obsidian Espresso & Chocolate Flight',
                    desc: 'Double shot, 85% slab tasting, and origin cupping notes (45 min)',
                  },
                  {
                    id: 'pour-over-ritual',
                    title: 'Master Roaster Pour-Over Session',
                    desc: 'Two rare micro-lots brewed tableside with confection pairings (60 min)',
                  },
                ].map((item) => {
                  const isChecked = experience === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setExperience(item.id)}
                      style={{
                        padding: '0.85rem 1rem',
                        border: isChecked ? '1px solid var(--copper)' : '1px solid var(--line)',
                        backgroundColor: isChecked ? 'rgba(156, 103, 71, 0.1)' : 'rgba(23, 19, 16, 0.5)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ fontSize: '0.88rem', color: 'var(--ink)', fontWeight: 500 }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                        {item.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Time Slots & Guests */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              <div>
                <label className="badge-caps" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  SLOT TIME
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#120f0c',
                    color: 'var(--ink)',
                    border: '1px solid var(--line)',
                    fontFamily: 'inherit',
                    fontSize: '0.82rem',
                    outline: 'none',
                  }}
                >
                  <option value="09:30 AM">09:30 AM (Quiet Morning)</option>
                  <option value="11:00 AM">11:00 AM (Roast Tasting)</option>
                  <option value="02:30 PM">02:30 PM (Chocolate Flight)</option>
                  <option value="04:30 PM">04:30 PM (Golden Hour Pour)</option>
                </select>
              </div>

              <div>
                <label className="badge-caps" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  GUESTS
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#120f0c',
                    color: 'var(--ink)',
                    border: '1px solid var(--line)',
                    fontFamily: 'inherit',
                    fontSize: '0.82rem',
                    outline: 'none',
                  }}
                >
                  <option value="1">1 Person (Solitary Ritual)</option>
                  <option value="2">2 Guests (Table Pair)</option>
                  <option value="4">4 Guests (Private Tasting Table)</option>
                </select>
              </div>
            </div>

            {/* Step 3: Guest Information */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.8rem' }}>
              <div>
                <label className="badge-caps" style={{ display: 'block', marginBottom: '0.4rem' }}>
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    backgroundColor: '#120f0c',
                    color: 'var(--ink)',
                    border: '1px solid var(--line)',
                    fontFamily: 'inherit',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label className="badge-caps" style={{ display: 'block', marginBottom: '0.4rem' }}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    backgroundColor: '#120f0c',
                    color: 'var(--ink)',
                    border: '1px solid var(--line)',
                    fontFamily: 'inherit',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'var(--copper)',
                color: '#171310',
                fontSize: '0.74rem',
                letterSpacing: '0.2em',
                fontWeight: 600,
                textTransform: 'uppercase',
                border: 'none',
                transition: 'background-color 0.25s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--copper-light)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--copper)')}
            >
              CONFIRM RESERVATION →
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
