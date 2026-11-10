import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CTABanner } from '../components/CTABanner';
import {
  Mail,
  Phone,
  MapPin,
  Share2,
  ArrowUpRight,
  ChevronDown,
  Check,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const navigate = useNavigate();

  // Contact quick cards
  const contactCards = [
    {
      id: 'email',
      icon: Mail,
      label: 'info@verdantestates.com',
      action: () => (window.location.href = 'mailto:info@verdantestates.com'),
    },
    {
      id: 'phone',
      icon: Phone,
      label: '+1 (123) 456-7890',
      action: () => (window.location.href = 'tel:+11234567890'),
    },
    {
      id: 'headquarters',
      icon: MapPin,
      label: 'Main Headquarters',
      action: () => {
        const el = document.getElementById('office-locations');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'socials',
      icon: Share2,
      label: 'Instagram  LinkedIn  Facebook',
      action: () => {
        const el = document.getElementById('office-locations');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: 'buying',
    howDidYouHear: 'google',
    message: '',
    agreeTerms: false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: 'buying',
        howDidYouHear: 'google',
        message: '',
        agreeTerms: false,
      });
    }, 4500);
  };

  // Office filter tabs
  const [officeFilter, setOfficeFilter] = useState<'all' | 'regional' | 'international'>('all');

  const offices = [
    {
      id: 'headquarters',
      category: 'regional',
      typeLabel: 'Main Headquarters',
      address: '123 Verdant Plaza, City Center, Metropolis',
      description:
        'Our headquarters is the central hub of Verdant Estates operations, housing our executive leadership, property valuation experts, and core advisory teams.',
      email: 'info@verdantestates.com',
      phone: '+1 (123) 456-7890',
      city: 'Metropolis',
    },
    {
      id: 'regional',
      category: 'regional',
      typeLabel: 'Regional Office',
      address: '456 Urban Avenue, Downtown District, Metropolis',
      description:
        'Our regional office specializes in local property marketing, client relations, and residential property viewings across the downtown district.',
      email: 'info.downtown@verdantestates.com',
      phone: '+1 (123) 654-0987',
      city: 'Metropolis',
    },
    {
      id: 'international',
      category: 'international',
      typeLabel: 'International Hub',
      address: '789 Skyline Tower, Financial District, London',
      description:
        'Connecting global investors to prime international and metropolitan properties with dedicated cross-border wealth advisory.',
      email: 'london@verdantestates.com',
      phone: '+44 20 7946 0912',
      city: 'London, UK',
    },
  ];

  const filteredOffices = offices.filter((off) => {
    if (officeFilter === 'all') return true;
    return off.category === officeFilter;
  });

  return (
    <div className="w-full flex flex-col font-sans">
      {/* 1. HERO SECTION & 4 QUICK CONTACT CARDS */}
      <section className="relative w-full border-b border-grey-15 bg-grey-08 overflow-hidden">
        {/* Subtle decorative background wave pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="contact-hero-wave"
                width="160"
                height="160"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 0 80 Q 40 40, 80 80 T 160 80"
                  fill="none"
                  stroke="#262626"
                  strokeWidth="1"
                />
                <path
                  d="M 0 40 Q 40 0, 80 40 T 160 40"
                  fill="none"
                  stroke="#1F1F1F"
                  strokeWidth="1"
                />
                <path
                  d="M 0 120 Q 40 80, 80 120 T 160 120"
                  fill="none"
                  stroke="#1F1F1F"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-hero-wave)" />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20">
          {/* Header Title & Subtitle */}
          <div className="max-w-4xl space-y-3 sm:space-y-4 mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              Get in Touch with Verdant Estates
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-grey-60 leading-relaxed max-w-3xl">
              Welcome to Verdant Estates&apos; Contact Us page. We&apos;re here to assist you with your inquiries,
              requests, and feedback. Whether you&apos;re looking to buy or sell a property, explore
              investment opportunities, or simply want to connect with our team, we&apos;re just a
              message away. Reach out to us today!
            </p>
          </div>

          {/* 4 Quick Contact Cards */}
          <div className="bg-grey-10 p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border border-grey-15 shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    onClick={card.action}
                    className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-grey-08 border border-grey-15 hover:border-grey-20 hover:bg-grey-10/70 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[140px] sm:min-h-[175px]"
                  >
                    {/* Concentric Glowing Purple Icon & Top-Right Arrow */}
                    <div className="flex items-start justify-between">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-purple-60/20 blur-xs scale-125" />
                        <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-grey-08 border border-purple-60/40 ring-4 ring-purple-60/10 flex items-center justify-center text-purple-60 group-hover:bg-purple-60 group-hover:text-white transition-all duration-300 shadow-sm">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </div>

                      <div className="text-grey-40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>

                    <h3 className="mt-4 sm:mt-6 text-xs sm:text-sm font-semibold text-white group-hover:text-purple-75 transition-colors leading-snug truncate">
                      {card.label}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: LET'S CONNECT FORM */}
      <section
        id="contact-form"
        className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-grey-15"
      >
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="text-grey-40 text-xs">✦</span>
            <span className="text-purple-60 text-sm">✦</span>
            <span className="text-grey-40 text-xs">✦</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Let&apos;s Connect
          </h2>
          <p className="text-grey-60 text-xs sm:text-sm lg:text-base mt-2.5 max-w-4xl leading-relaxed">
            We&apos;re excited to connect with you and learn more about your real estate goals. Use
            the form below to get in touch with Verdant Estates. Whether you have questions about our
            services or need assistance, we&apos;re here to help.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="bg-grey-10 p-6 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border border-grey-15 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Top 3-Column Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* First Name */}
              <div className="space-y-2.5">
                <label className="text-xs sm:text-sm font-semibold text-white block">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-grey-08 border border-grey-15 text-xs sm:text-sm text-white placeholder:text-grey-40 focus:outline-none focus:border-purple-60 transition-colors"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2.5">
                <label className="text-xs sm:text-sm font-semibold text-white block">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-grey-08 border border-grey-15 text-xs sm:text-sm text-white placeholder:text-grey-40 focus:outline-none focus:border-purple-60 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-2.5">
                <label className="text-xs sm:text-sm font-semibold text-white block">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-grey-08 border border-grey-15 text-xs sm:text-sm text-white placeholder:text-grey-40 focus:outline-none focus:border-purple-60 transition-colors"
                />
              </div>
            </div>

            {/* Second 3-Column Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Phone */}
              <div className="space-y-2.5">
                <label className="text-xs sm:text-sm font-semibold text-white block">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-grey-08 border border-grey-15 text-xs sm:text-sm text-white placeholder:text-grey-40 focus:outline-none focus:border-purple-60 transition-colors"
                />
              </div>

              {/* Inquiry Type */}
              <div className="space-y-2.5">
                <label className="text-xs sm:text-sm font-semibold text-white block">
                  Inquiry Type
                </label>
                <div className="relative">
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-grey-08 border border-grey-15 text-xs sm:text-sm text-white appearance-none focus:outline-none focus:border-purple-60 transition-colors cursor-pointer pr-10"
                  >
                    <option value="buying" className="bg-grey-10 text-white">
                      Buying a Property
                    </option>
                    <option value="selling" className="bg-grey-10 text-white">
                      Selling a Property
                    </option>
                    <option value="management" className="bg-grey-10 text-white">
                      Property Management
                    </option>
                    <option value="investment" className="bg-grey-10 text-white">
                      Investment Advisory
                    </option>
                    <option value="general" className="bg-grey-10 text-white">
                      General Inquiry
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-grey-40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* How Did You Hear About Us? */}
              <div className="space-y-2.5">
                <label className="text-xs sm:text-sm font-semibold text-white block">
                  How Did You Hear About Us?
                </label>
                <div className="relative">
                  <select
                    value={formData.howDidYouHear}
                    onChange={(e) => setFormData({ ...formData, howDidYouHear: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-grey-08 border border-grey-15 text-xs sm:text-sm text-white appearance-none focus:outline-none focus:border-purple-60 transition-colors cursor-pointer pr-10"
                  >
                    <option value="google" className="bg-grey-10 text-white">
                      Google Search
                    </option>
                    <option value="social" className="bg-grey-10 text-white">
                      Social Media
                    </option>
                    <option value="friend" className="bg-grey-10 text-white">
                      Friend or Family
                    </option>
                    <option value="ads" className="bg-grey-10 text-white">
                      Online Advertisement
                    </option>
                    <option value="event" className="bg-grey-10 text-white">
                      Real Estate Event
                    </option>
                    <option value="other" className="bg-grey-10 text-white">
                      Other
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-grey-40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Message Area */}
            <div className="space-y-2.5">
              <label className="text-xs sm:text-sm font-semibold text-white block">
                Message
              </label>
              <textarea
                rows={5}
                required
                placeholder="Enter your Message here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-grey-08 border border-grey-15 text-xs sm:text-sm text-white placeholder:text-grey-40 focus:outline-none focus:border-purple-60 transition-colors resize-none"
              />
            </div>

            {/* Bottom Form Actions: Checkbox & Submit */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-grey-60 select-none">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="w-4 h-4 rounded border-grey-15 bg-grey-08 text-purple-60 focus:ring-purple-60 focus:ring-offset-grey-10 cursor-pointer accent-purple-60"
                />
                <span>
                  I agree with{' '}
                  <span className="text-white underline underline-offset-4 hover:text-purple-60">
                    Terms of Use
                  </span>{' '}
                  and{' '}
                  <span className="text-white underline underline-offset-4 hover:text-purple-60">
                    Privacy Policy
                  </span>
                </span>
              </label>

              <button
                type="submit"
                className="px-7 py-3.5 rounded-xl bg-purple-60 hover:bg-purple-65 active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-purple-60/25 cursor-pointer self-start sm:self-auto"
              >
                Send Your Message
              </button>
            </div>

            {formSubmitted && (
              <div className="p-4 rounded-xl bg-purple-60/10 border border-purple-60/30 text-purple-75 text-xs sm:text-sm flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-60 shrink-0" />
                <span>Thank you! Your message has been sent successfully. A Verdant Estates advisor will contact you shortly.</span>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* 3. SECTION: DISCOVER OUR OFFICE LOCATIONS */}
      <section
        id="office-locations"
        className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-grey-15"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className="text-grey-40 text-xs">✦</span>
              <span className="text-purple-60 text-sm">✦</span>
              <span className="text-grey-40 text-xs">✦</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Discover Our Office Locations
            </h2>
            <p className="text-grey-60 text-xs sm:text-sm lg:text-base mt-2.5 max-w-3xl leading-relaxed">
              Verdant Estates is here to serve you across multiple locations. Whether you&apos;re looking to meet
              our team in person, discuss a property, or explore partnerships, our offices are
              conveniently located to assist you.
            </p>
          </div>

          {/* Filter Tabs matching Figma */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-grey-10 border border-grey-15 self-start md:self-auto shrink-0">
            <button
              onClick={() => setOfficeFilter('all')}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                officeFilter === 'all'
                  ? 'bg-grey-08 text-white border border-grey-15 shadow-xs'
                  : 'text-grey-60 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setOfficeFilter('regional')}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                officeFilter === 'regional'
                  ? 'bg-grey-08 text-white border border-grey-15 shadow-xs'
                  : 'text-grey-60 hover:text-white'
              }`}
            >
              Regional
            </button>
            <button
              onClick={() => setOfficeFilter('international')}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                officeFilter === 'international'
                  ? 'bg-grey-08 text-white border border-grey-15 shadow-xs'
                  : 'text-grey-60 hover:text-white'
              }`}
            >
              International
            </button>
          </div>
        </div>

        {/* Office Cards Grid (2-columns on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredOffices.map((office) => (
            <div
              key={office.id}
              className="bg-grey-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-grey-15 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <span className="inline-block text-xs font-medium text-grey-60 px-3 py-1 rounded-full bg-grey-08 border border-grey-15">
                  {office.typeLabel}
                </span>

                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                  {office.address}
                </h3>

                <p className="text-xs sm:text-sm text-grey-60 leading-relaxed">
                  {office.description}
                </p>

                {/* Contact Pill Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-grey-08 border border-grey-15 text-grey-60">
                    <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>{office.email}</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-grey-08 border border-grey-15 text-grey-60">
                    <Phone className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>{office.phone}</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-grey-08 border border-grey-15 text-grey-60">
                    <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>{office.city}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      office.address
                    )}`,
                    '_blank'
                  );
                }}
                className="w-full py-3.5 rounded-xl bg-purple-60 hover:bg-purple-65 active:scale-98 text-white font-semibold text-xs sm:text-sm text-center transition-all shadow-md shadow-purple-60/25 cursor-pointer"
              >
                Get Direction
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SECTION: EXPLORE VERDANT ESTATES' WORLD (PHOTO COLLAGE) */}
      <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-grey-15">
        <div className="bg-grey-10 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-grey-15 relative overflow-hidden">
          {/* Subtle textured stripes in background */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="gallery-pattern"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 0 40 L 40 0 M 20 40 L 40 20 M 0 20 L 20 0"
                    fill="none"
                    stroke="#262626"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gallery-pattern)" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column (5 cols): 2 Photos + Text Box */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* Photo 1: Office Workstation */}
              <div className="aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/9] rounded-2xl overflow-hidden border border-grey-15 bg-grey-08">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                  alt="Verdant Estates modern open office workstations"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Photo 2: Team Collaboration Overhead */}
              <div className="aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/9] rounded-2xl overflow-hidden border border-grey-15 bg-grey-08">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Team brainstorming session around meeting table"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Text Card from Figma */}
              <div className="pt-2">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <span className="text-grey-40 text-xs">✦</span>
                  <span className="text-purple-60 text-sm">✦</span>
                  <span className="text-grey-40 text-xs">✦</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Explore Verdant Estates&apos; World
                </h3>
                <p className="text-xs sm:text-sm text-grey-60 mt-2 leading-relaxed">
                  Step inside the world of Verdant Estates, where professionalism meets warmth. Our team,
                  office spaces, and everyday moments reflect our commitment to excellence,
                  integrity, and building lasting relationships with clients like you.
                </p>
              </div>
            </div>

            {/* Right Column (7 cols): Team Group Photo + Dual Middle Photos + Handshake */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              {/* Photo 3: Wide Team Smiling in Suits */}
              <div className="aspect-[16/8] rounded-2xl overflow-hidden border border-grey-15 bg-grey-08">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                  alt="Verdant Estates executive leadership team"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Middle Row: 2 Team Portraits side by side */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-grey-15 bg-grey-08">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
                    alt="Verdant Estates advisory team members"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-grey-15 bg-grey-08">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                    alt="Verdant Estates property management experts"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Photo 6: Handshake Partnership across table */}
              <div className="aspect-[16/8] rounded-2xl overflow-hidden border border-grey-15 bg-grey-08">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                  alt="Client partnership handshake with Verdant Estates advisor"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <CTABanner onExploreClick={() => navigate('/properties')} />
    </div>
  );
};

export default ContactPage;
