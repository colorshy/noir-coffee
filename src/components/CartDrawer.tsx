import { assetUrl } from '../utils/assets';
import { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, CheckCircle2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreMenu?: () => void;
}

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

export const CartDrawer = ({ isOpen, onClose, onExploreMenu }: CartDrawerProps) => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 'item-1',
      name: 'NOIR 85% Obsidian Dark Slab (100g)',
      category: 'Atelier Chocolate',
      price: 14,
      quantity: 2,
      image: assetUrl('/images/chocolate-bar.jpg'),
    },
    {
      id: 'item-2',
      name: 'Single-Origin Sidama Micro-Lot #84 (250g)',
      category: 'Fresh Roasted Beans',
      price: 18,
      quantity: 1,
      image: assetUrl('/images/roastery-craft.jpg'),
    },
  ]);

  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 40 ? 0 : 6;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsOrdered(true);
    setTimeout(() => {
      setTimeout(() => {
        setIsOrdered(false);
        setItems([]);
        onClose();
      }, 3500);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
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
          maxWidth: '480px',
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
              marginBottom: '1.8rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShoppingBag size={18} color="var(--copper-light)" />
              <span className="badge-caps" style={{ color: 'var(--copper-light)' }}>
                YOUR TASTING FLIGHT ({items.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close cart drawer"
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

          {/* Body */}
          {isOrdered ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
              <CheckCircle2 size={48} color="#55a868" style={{ marginBottom: '1.2rem' }} />
              <span className="badge-caps" style={{ color: '#55a868' }}>
                ORDER DISPATCHED
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--ink)', margin: '0.6rem 0 1rem' }}>
                Thank you for tasting NOIR.
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                Your order #NOIR-9482 has been routed to our roasting room and tempering atelier. Tracking is dispatching shortly.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Your tasting flight is currently empty.
              </p>
              <button
                onClick={() => {
                  onClose();
                  if (onExploreMenu) onExploreMenu();
                }}
                style={{
                  padding: '0.85rem 1.6rem',
                  backgroundColor: 'var(--copper)',
                  color: '#171310',
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  border: 'none',
                }}
              >
                EXPLORE MENU SELECTIONS →
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    paddingBottom: '1.2rem',
                    borderBottom: '1px solid var(--line)',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={assetUrl(item.image)}
                    alt={item.name}
                    style={{
                      width: '68px',
                      height: '68px',
                      objectFit: 'cover',
                      borderRadius: '2px',
                      border: '1px solid var(--line)',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--copper-light)' }}>
                      {item.category}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--ink)', fontWeight: 600, marginTop: '2px' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '2px' }}>
                      ${item.price} each
                    </div>

                    {/* Quantity Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.5rem' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid var(--line)',
                          borderRadius: '2px',
                          backgroundColor: '#120f0c',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          style={{ color: 'var(--ink)', padding: '0.3rem 0.5rem', display: 'flex' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.78rem', padding: '0 0.4rem', color: 'var(--paper)', minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          style={{ color: 'var(--ink)', padding: '0.3rem 0.5rem', display: 'flex' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                        style={{ color: 'var(--muted)', padding: '0.3rem', display: 'flex', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#e57373')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--copper-light)', fontWeight: 600 }}>
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Totals and Checkout CTA */}
        {!isOrdered && items.length > 0 && (
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.4rem' }}>
              <span>Subtotal</span>
              <span style={{ color: 'var(--ink)' }}>${subtotal}.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>
              <span>Artisanal Temperature-Controlled Dispatch</span>
              <span style={{ color: shipping === 0 ? '#55a868' : 'var(--ink)' }}>
                {shipping === 0 ? 'COMPLIMENTARY' : `$${shipping}.00`}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.25rem',
                fontFamily: 'var(--font-serif)',
                color: 'var(--ink)',
                paddingTop: '0.8rem',
                borderTop: '1px dashed var(--line)',
                marginBottom: '1.2rem',
              }}
            >
              <span>Total</span>
              <span style={{ color: 'var(--copper-light)', fontWeight: 700 }}>${total}.00</span>
            </div>

            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'var(--copper)',
                color: '#171310',
                fontSize: '0.76rem',
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
              COMPLETE TASTING ORDER (${total}.00) →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
