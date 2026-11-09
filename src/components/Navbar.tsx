import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  favoriteCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ favoriteCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const location = useLocation();
  const isContactActive = location.pathname === '/contact';

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/properties', label: 'Properties' },
    { to: '/services', label: 'Services' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-grey-08/95 backdrop-blur-md border-b border-grey-15">
      {/* Top Banner with Dismiss Button */}
      {bannerVisible && (
        <div className="relative bg-grey-10 py-2.5 px-4 text-center text-xs text-grey-60 border-b border-grey-15 flex items-center justify-center">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-amber-300">✨</span>
            <span className="text-white">Discover Your Dream Property with Estatein</span>
            <Link
              to="/properties"
              className="text-white hover:text-purple-60 underline underline-offset-4 ml-1 transition-colors cursor-pointer"
            >
              Learn More
            </Link>
          </div>
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full bg-grey-15/60 hover:bg-grey-15 text-grey-60 hover:text-white transition-all cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Header Container (1596px 2xl / 1280px xl) */}
      <div className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Estatein Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <img
              src="/logo.png"
              alt="Estatein Logo"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-5 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'text-white bg-grey-10 border border-grey-15 rounded-xl shadow-xs'
                      : 'text-grey-60 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/contact"
              className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                isContactActive
                  ? 'bg-purple-60 text-white border border-purple-60 shadow-md shadow-purple-60/25'
                  : 'text-white bg-grey-10 border border-grey-15 hover:border-grey-20'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile hamburger menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-grey-10 border border-grey-15 text-white hover:bg-grey-15 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-grey-15 bg-grey-10 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `w-full text-left px-4 py-2.5 rounded-xl text-base font-medium block ${
                  isActive
                    ? 'text-white bg-grey-08 border border-grey-15'
                    : 'text-grey-60 hover:text-white hover:bg-grey-15'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {favoriteCount > 0 && (
            <Link
              to="/properties"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-purple-75 bg-purple-60/10 border border-purple-60/20 block"
            >
              Saved Properties ({favoriteCount})
            </Link>
          )}
          <div className="pt-2">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full py-2.5 text-center text-sm font-semibold rounded-xl block transition-all cursor-pointer ${
                isContactActive
                  ? 'bg-purple-60 text-white border border-purple-60 shadow-md'
                  : 'text-white bg-grey-08 border border-grey-15 hover:bg-grey-15'
              }`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
