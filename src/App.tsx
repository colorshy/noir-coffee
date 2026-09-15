import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Marquee } from './components/Marquee';
import { StorySection } from './components/StorySection';
import { ChocolateSection } from './components/ChocolateSection';
import { MenuSection } from './components/MenuSection';
import { SpaceSection } from './components/SpaceSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { AccountDrawer } from './components/AccountDrawer';
import { CartDrawer } from './components/CartDrawer';
import { CookieBanner } from './components/CookieBanner';

export default function App() {
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-shell" style={{ minHeight: '100vh', backgroundColor: '#171310' }}>
      {/* 1. Transparent Fixed Header matching reference mockup */}
      <Navbar
        onOpenReserve={() => setIsReserveOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={3}
      />

      <main>
        {/* 1. Hero Section with clean video, typography and navigation */}
        <Hero
          onExploreClick={() => scrollToSection('story')}
          onOpenReserve={() => setIsReserveOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 2. Transition Announcement Strip into Marquee */}
        <AnnouncementBar />

        {/* 3. Moving Continuous Marquee */}
        <Marquee />

        {/* 5. Coffee Craft & Cupping Story (Warm Cream Paper Palette for Visual Breathing Room) */}
        <StorySection />

        {/* 6. CORE EXPERIENCE #1: NOIR Signature Chocolate with Interactive Mouse Melting Reveal */}
        <ChocolateSection onExplorePairings={() => scrollToSection('menu')} />

        {/* 7. Curated Essentials Menu & Bespoke Pairings */}
        <MenuSection />

        {/* 8. Architectural Sanctuary & Visiting Details */}
        <SpaceSection onOpenReserve={() => setIsReserveOpen(true)} />
      </main>

      {/* 9. Editorial Footer */}
      <Footer />

      {/* 10. Functional Dialogs & Drawers */}
      <ReservationModal isOpen={isReserveOpen} onClose={() => setIsReserveOpen(false)} />
      <AccountDrawer isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onExploreMenu={() => scrollToSection('menu')}
      />

      {/* 11. Atelier Cookie Consent Window */}
      <CookieBanner />
    </div>
  );
}
