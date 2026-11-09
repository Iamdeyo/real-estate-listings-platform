import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const navColumns = [
    {
      title: 'Home',
      route: '/',
      links: [
        { label: 'Hero Section', to: '/' },
        { label: 'Features', to: '/services' },
        { label: 'Properties', to: '/properties' },
        { label: 'Testimonials', to: '/' },
        { label: "FAQ's", to: '/' },
      ],
    },
    {
      title: 'About Us',
      route: '/about',
      links: [
        { label: 'Our Story', to: '/about' },
        { label: 'Our Works', to: '/about' },
        { label: 'How It Works', to: '/about' },
        { label: 'Our Team', to: '/about' },
        { label: 'Our Clients', to: '/about' },
      ],
    },
    {
      title: 'Properties',
      route: '/properties',
      links: [
        { label: 'Portfolio', to: '/properties' },
        { label: 'Categories', to: '/properties' },
      ],
    },
    {
      title: 'Services',
      route: '/services',
      links: [
        { label: 'Valuation Mastery', to: '/services' },
        { label: 'Strategic Marketing', to: '/services' },
        { label: 'Negotiation Wizardry', to: '/services' },
        { label: 'Closing Success', to: '/services' },
        { label: 'Property Management', to: '/services' },
      ],
    },
    {
      title: 'Contact Us',
      route: '/contact',
      links: [
        { label: 'Contact Form', to: '/contact' },
        { label: 'Our Offices', to: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-grey-10 border-t border-grey-15 pt-16 pb-12 mt-auto">
      {/* Main Container */}
      <div className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-14 border-b border-grey-15">
          {/* Logo & Newsletter Form */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block cursor-pointer">
              <img
                src="/logo.png"
                alt="Estatein"
                className="h-9 w-auto object-contain"
              />
            </Link>

            <form onSubmit={handleSubscribe} className="relative max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full pl-4 pr-12 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white placeholder:text-grey-40 focus:outline-none focus:border-purple-60"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-grey-40 hover:text-purple-60 transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-purple-75 animate-fadeIn">
                ✓ Thank you for subscribing to Estatein newsletters!
              </p>
            )}
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {navColumns.map((col) => (
              <div key={col.title}>
                <Link
                  to={col.route}
                  className="text-sm font-semibold text-white mb-4 block hover:text-purple-60 transition-colors"
                >
                  {col.title}
                </Link>
                <ul className="space-y-2.5 text-xs text-grey-60">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="hover:text-white cursor-pointer transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-grey-60">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-center sm:text-left">
            <span>&copy; {CURRENT_YEAR} Estatein. All Rights Reserved.</span>
            <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Facebook */}
            <button
              className="p-2.5 rounded-full bg-grey-08 border border-grey-15 text-grey-60 hover:text-purple-60 hover:border-purple-60 transition-all active:scale-95"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>

            {/* LinkedIn */}
            <button
              className="p-2.5 rounded-full bg-grey-08 border border-grey-15 text-grey-60 hover:text-purple-60 hover:border-purple-60 transition-all active:scale-95"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </button>

            {/* Twitter / X */}
            <button
              className="p-2.5 rounded-full bg-grey-08 border border-grey-15 text-grey-60 hover:text-purple-60 hover:border-purple-60 transition-all active:scale-95"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>

            {/* YouTube */}
            <button
              className="p-2.5 rounded-full bg-grey-08 border border-grey-15 text-grey-60 hover:text-purple-60 hover:border-purple-60 transition-all active:scale-95"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
