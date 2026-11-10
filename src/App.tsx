import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './components/AboutPage';
import { PropertiesPage } from './components/PropertiesPage';
import { PropertyDetailPage } from './components/PropertyDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { mockProperties } from './data/mockProperties';
import type { Property } from './types/property';

export function App() {
  const [properties] = useState<Property[]>(mockProperties);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('verdant_favorites') || localStorage.getItem('estatein_favorites');
      return saved ? JSON.parse(saved) : ['prop-ng-01', 'prop-ng-03'];
    } catch {
      return ['prop-ng-01', 'prop-ng-03'];
    }
  });

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem('verdant_favorites', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-grey-08 text-white flex flex-col font-sans selection:bg-purple-60 selection:text-white">
        {/* Top Sticky Navbar */}
        <Navbar favoriteCount={favorites.length} />

        {/* Dynamic Route Pages */}
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/properties"
              element={
                <PropertiesPage
                  properties={properties}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
            <Route path="/properties/:id" element={<PropertyDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
