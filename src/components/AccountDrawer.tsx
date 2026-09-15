import { useState } from 'react';
import { X, User, Check, LogOut, ShieldCheck } from 'lucide-react';

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountDrawer = ({ isOpen, onClose }: AccountDrawerProps) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; tier: string } | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setCurrentUser({
      name: email.split('@')[0],
      email: email,
      tier: 'Reserve Cupping Member',
    });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setCurrentUser({
      name: name,
      email: email,
      tier: 'Atelier Circle · Founding Member',
    });
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-drawer-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 8, 6, 0.75)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        zIndex: 120,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#19130f',
          borderLeft: '1px solid var(--line-strong)',
          padding: 'clamp(1.8rem, 4vw, 2.5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto',
          boxShadow: '-15px 0 50px rgba(0, 0, 0, 0.9)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header Strip */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid var(--line)',
              marginBottom: '2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <User size={18} color="var(--copper-light)" />
              <span className="badge-caps" style={{ color: 'var(--copper-light)' }}>
                ATELIER MEMBER PORTAL
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close account drawer"
              style={{
                color: 'var(--muted)',
                padding: '0.4rem',
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
          </div>

          {currentUser ? (
            /* Logged In View */
            <div>
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'rgba(156, 103, 71, 0.12)',
                  border: '1px solid var(--copper)',
                  marginBottom: '1.8rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <ShieldCheck size={18} color="#55a868" />
                  <span style={{ fontSize: '0.66rem', letterSpacing: '0.18em', color: '#55a868', fontWeight: 700, textTransform: 'uppercase' }}>
                    VERIFIED MEMBER
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--ink)', margin: '0 0 0.3rem' }}>
                  {currentUser.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: 0 }}>
                  {currentUser.email}
                </p>
                <div
                  style={{
                    display: 'inline-block',
                    marginTop: '0.8rem',
                    fontSize: '0.66rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--copper-light)',
                    backgroundColor: 'rgba(23, 19, 16, 0.8)',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '2px',
                  }}
                >
                  {currentUser.tier}
                </div>
              </div>

              {/* Member Privileges */}
              <div style={{ marginBottom: '2rem' }}>
                <span className="badge-caps" style={{ display: 'block', marginBottom: '0.8rem' }}>
                  ACTIVE PRIVILEGES
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    'Priority booking for private cupping table sessions',
                    'First access to seasonal 92% Criollo micro-batches',
                    'Complimentary shipping on whole-bean allocations',
                  ].map((perk, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.8rem', color: 'var(--paper)' }}>
                      <Check size={15} color="var(--copper)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sign out button */}
              <button
                onClick={handleSignOut}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem 1.25rem',
                  border: '1px solid var(--line)',
                  color: 'var(--muted)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--ink)';
                  e.currentTarget.style.borderColor = 'var(--copper)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted)';
                  e.currentTarget.style.borderColor = 'var(--line)';
                }}
              >
                <LogOut size={16} />
                <span>SIGN OUT</span>
              </button>
            </div>
          ) : (
            /* Auth Forms */
            <div>
              {/* Tab Selector */}
              <div
                style={{
                  display: 'flex',
                  borderBottom: '1px solid var(--line)',
                  marginBottom: '1.8rem',
                }}
              >
                <button
                  onClick={() => setTab('signin')}
                  style={{
                    flex: 1,
                    padding: '0.75rem 0',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    letterSpacing: '0.18em',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: tab === 'signin' ? 'var(--copper-light)' : 'var(--muted)',
                    borderBottom: tab === 'signin' ? '2px solid var(--copper)' : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  SIGN IN
                </button>
                <button
                  onClick={() => setTab('signup')}
                  style={{
                    flex: 1,
                    padding: '0.75rem 0',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    letterSpacing: '0.18em',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: tab === 'signup' ? 'var(--copper-light)' : 'var(--muted)',
                    borderBottom: tab === 'signup' ? '2px solid var(--copper)' : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  CREATE ACCOUNT
                </button>
              </div>

              {tab === 'signin' ? (
                <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label className="badge-caps" style={{ display: 'block', marginBottom: '0.4rem' }}>
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@noircoffee.art"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: '#120f0c',
                        border: '1px solid var(--line)',
                        color: 'var(--ink)',
                        fontSize: '0.85rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label className="badge-caps" style={{ display: 'block', marginBottom: '0.4rem' }}>
                      PASSWORD
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: '#120f0c',
                        border: '1px solid var(--line)',
                        color: 'var(--ink)',
                        fontSize: '0.85rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.95rem',
                      backgroundColor: 'var(--copper)',
                      color: '#171310',
                      fontSize: '0.75rem',
                      letterSpacing: '0.2em',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--copper-light)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--copper)')}
                  >
                    SIGN IN TO ATELIER →
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label className="badge-caps" style={{ display: 'block', marginBottom: '0.4rem' }}>
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Julian Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: '#120f0c',
                        border: '1px solid var(--line)',
                        color: 'var(--ink)',
                        fontSize: '0.85rem',
                        fontFamily: 'inherit',
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
                      placeholder="client@noircoffee.art"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: '#120f0c',
                        border: '1px solid var(--line)',
                        color: 'var(--ink)',
                        fontSize: '0.85rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label className="badge-caps" style={{ display: 'block', marginBottom: '0.4rem' }}>
                      SET PASSWORD
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: '#120f0c',
                        border: '1px solid var(--line)',
                        color: 'var(--ink)',
                        fontSize: '0.85rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.95rem',
                      backgroundColor: 'var(--copper)',
                      color: '#171310',
                      fontSize: '0.75rem',
                      letterSpacing: '0.2em',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--copper-light)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--copper)')}
                  >
                    JOIN ATELIER CIRCLE →
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1.2rem', fontSize: '0.72rem', color: 'var(--muted)' }}>
          Private cupping logs and order history encrypted on NOIR roastery servers.
        </div>
      </div>
    </div>
  );
};
