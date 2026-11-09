import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CTABanner } from '../components/CTABanner';
import {
  Home,
  Landmark,
  Building2,
  Sun,
  ArrowUpRight,
  BarChart3,
  Megaphone,
  Briefcase,
  Award,
  Users,
  Wrench,
  Coins,
  ShieldCheck,
  LineChart,
  PieChart,
  Compass,
  Layers,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    navigate('/properties');
    setTimeout(() => {
      const el = document.getElementById('contact-form');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const heroNavCards = [
    {
      id: 'dream-home',
      title: 'Find Your Dream Home',
      icon: Home,
      onClick: () => navigate('/properties'),
    },
    {
      id: 'property-value',
      title: 'Unlock Property Value',
      icon: Landmark,
      onClick: () => scrollToSection('unlock-property-value'),
    },
    {
      id: 'property-management',
      title: 'Effortless Property Management',
      icon: Building2,
      onClick: () => scrollToSection('effortless-management'),
    },
    {
      id: 'smart-investments',
      title: 'Smart Investments, Informed Decisions',
      icon: Sun,
      onClick: () => scrollToSection('smart-investments'),
    },
  ];

  return (
    <div className="w-full flex flex-col font-sans">
      {/* 1. HERO SECTION WITH 4 FEATURE CARDS */}
      <section className="relative w-full border-b border-grey-15 bg-grey-08 overflow-hidden">
        {/* Subtle decorative background wave pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hero-wave-pattern"
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
            <rect width="100%" height="100%" fill="url(#hero-wave-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20">
          {/* Header Title & Subtitle */}
          <div className="max-w-4xl space-y-3 sm:space-y-4 mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              Elevate Your Real Estate Experience
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-grey-60 leading-relaxed max-w-3xl">
              Welcome to Estatein, where your real estate aspirations meet expert guidance. Explore our
              comprehensive range of services, each designed to cater to your unique needs and dreams.
            </p>
          </div>

          {/* 4 Feature Service Cards (2x2 on mobile, 4 in a row on desktop) */}
          <div className="bg-grey-10 p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border border-grey-15 shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {heroNavCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={item.onClick}
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

                    <h3 className="mt-4 sm:mt-6 text-xs sm:text-sm font-semibold text-white group-hover:text-purple-75 transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 1: UNLOCK PROPERTY VALUE */}
      <section
        id="unlock-property-value"
        className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-grey-15"
      >
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="text-grey-40 text-xs">✦</span>
            <span className="text-purple-60 text-sm">✦</span>
            <span className="text-grey-40 text-xs">✦</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Unlock Property Value
          </h2>
          <p className="text-grey-60 text-xs sm:text-sm lg:text-base mt-2.5 max-w-4xl leading-relaxed">
            Selling your property should be a rewarding experience, not a stressful one. At Estatein,
            we specialize in maximizing your property&apos;s value through strategic marketing,
            comprehensive market analysis, and seasoned negotiation skills.
          </p>
        </div>

        {/* Asymmetrical Grid matching Figma (Row 1: 3 cards; Row 2: 1 card + 2-col banner) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Valuation Mastery */}
          <div className="group bg-grey-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-grey-15 hover:border-grey-20 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4 sm:mb-5">
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full bg-purple-60/20 blur-xs scale-125" />
                  <div className="w-12 h-12 rounded-full bg-grey-08 border border-purple-60/40 ring-4 ring-purple-60/10 flex items-center justify-center text-purple-60 group-hover:bg-purple-60 group-hover:text-white transition-all duration-300">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-60 transition-colors">
                  Valuation Mastery
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-grey-60 leading-relaxed">
                Discover the true worth of your property with our expert valuation services.
              </p>
            </div>
          </div>

          {/* Card 2: Strategic Marketing */}
          <div className="group bg-grey-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-grey-15 hover:border-grey-20 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4 sm:mb-5">
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full bg-purple-60/20 blur-xs scale-125" />
                  <div className="w-12 h-12 rounded-full bg-grey-08 border border-purple-60/40 ring-4 ring-purple-60/10 flex items-center justify-center text-purple-60 group-hover:bg-purple-60 group-hover:text-white transition-all duration-300">
                    <Megaphone className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-60 transition-colors">
                  Strategic Marketing
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-grey-60 leading-relaxed">
                Selling your property requires more than just a listing; it demands a strategic marketing approach.
              </p>
            </div>
          </div>

          {/* Card 3: Negotiation Wizardry */}
          <div className="group bg-grey-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-grey-15 hover:border-grey-20 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4 sm:mb-5">
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full bg-purple-60/20 blur-xs scale-125" />
                  <div className="w-12 h-12 rounded-full bg-grey-08 border border-purple-60/40 ring-4 ring-purple-60/10 flex items-center justify-center text-purple-60 group-hover:bg-purple-60 group-hover:text-white transition-all duration-300">
                    <Briefcase className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-60 transition-colors">
                  Negotiation Wizardry
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-grey-60 leading-relaxed">
                Negotiating the best deal is an art, and our seasoned negotiators are masters of it.
              </p>
            </div>
          </div>

          {/* Card 4: Closing Success */}
          <div className="group bg-grey-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-grey-15 hover:border-grey-20 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4 sm:mb-5">
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full bg-purple-60/20 blur-xs scale-125" />
                  <div className="w-12 h-12 rounded-full bg-grey-08 border border-purple-60/40 ring-4 ring-purple-60/10 flex items-center justify-center text-purple-60 group-hover:bg-purple-60 group-hover:text-white transition-all duration-300">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-60 transition-colors">
                  Closing Success
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-grey-60 leading-relaxed">
                A successful sale is not complete until the closing. We guide you through the intricate closing process.
              </p>
            </div>
          </div>

          {/* Card 5: Wide Banner Card spanning 2 columns on desktop */}
          <div className="md:col-span-2 relative bg-grey-10 border border-grey-15 rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden flex flex-col justify-between">
            {/* Subtle textured background stripes */}
            <div className="absolute inset-0 pointer-events-none opacity-25">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="banner1-pattern"
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
                <rect width="100%" height="100%" fill="url(#banner1-pattern)" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Unlock the Value of Your Property Today
              </h3>
              <button
                onClick={handleLearnMore}
                className="shrink-0 self-start sm:self-auto px-5 py-3 rounded-xl bg-grey-08 border border-grey-15 hover:border-grey-20 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                Learn More
              </button>
            </div>

            <p className="relative z-10 text-xs sm:text-sm text-grey-60 leading-relaxed max-w-2xl mt-2 sm:mt-4">
              Ready to unlock the true value of your property? Explore our Property Selling Service
              page and learn how we can help you achieve the best possible deal for your valuable asset.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SECTION 2: EFFORTLESS PROPERTY MANAGEMENT */}
      <section
        id="effortless-management"
        className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-grey-15"
      >
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="text-grey-40 text-xs">✦</span>
            <span className="text-purple-60 text-sm">✦</span>
            <span className="text-grey-40 text-xs">✦</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Effortless Property Management
          </h2>
          <p className="text-grey-60 text-xs sm:text-sm lg:text-base mt-2.5 max-w-4xl leading-relaxed">
            Taking care of your investment property shouldn&apos;t be a 24/7 job. Our comprehensive
            property management services handle everything from tenant screening and maintenance to
            legal compliance and financial reporting.
          </p>
        </div>

        {/* Asymmetrical Grid (Row 1: 3 cards; Row 2: 1 card + 2-col banner) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Tenant Harmony */}
          <div className="group bg-grey-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-grey-15 hover:border-grey-20 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4 sm:mb-5">
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full bg-purple-60/20 blur-xs scale-125" />
                  <div className="w-12 h-12 rounded-full bg-grey-08 border border-purple-60/40 ring-4 ring-purple-60/10 flex items-center justify-center text-purple-60 group-hover:bg-purple-60 group-hover:text-white transition-all duration-300">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-60 transition-colors">
                  Tenant Harmony
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-grey-60 leading-relaxed">
                Our tenant management services ensure you find and retain reliable, respectful tenants who care for your property.
              </p>
            </div>
          </div>

          {/* Card 2: Maintenance Ease */}
          <div className="group bg-grey-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-grey-15 hover:border-grey-20 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4 sm:mb-5">
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full bg-purple-60/20 blur-xs scale-125" />
                  <div className="w-12 h-12 rounded-full bg-grey-08 border border-purple-60/40 ring-4 ring-purple-60/10 flex items-center justify-center text-purple-60 group-hover:bg-purple-60 group-hover:text-white transition-all duration-300">
                    <Wrench className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-60 transition-colors">
                  Maintenance Ease
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-grey-60 leading-relaxed">
                Say goodbye to property maintenance headaches. We handle routine inspections and emergency repairs efficiently.
              </p>
            </div>
          </div>

          {/* Card 3: Financial Peace of Mind */}
          <div className="group bg-grey-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-grey-15 hover:border-grey-20 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4 sm:mb-5">
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full bg-purple-60/20 blur-xs scale-125" />
                  <div className="w-12 h-12 rounded-full bg-grey-08 border border-purple-60/40 ring-4 ring-purple-60/10 flex items-center justify-center text-purple-60 group-hover:bg-purple-60 group-hover:text-white transition-all duration-300">
                    <Coins className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-60 transition-colors">
                  Financial Peace of Mind
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-grey-60 leading-relaxed">
                Managing property finances can be complex. We handle rent collection, expense tracking, and financial reporting.
              </p>
            </div>
          </div>

          {/* Card 4: Legal Guardian */}
          <div className="group bg-grey-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-grey-15 hover:border-grey-20 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4 sm:mb-5">
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full bg-purple-60/20 blur-xs scale-125" />
                  <div className="w-12 h-12 rounded-full bg-grey-08 border border-purple-60/40 ring-4 ring-purple-60/10 flex items-center justify-center text-purple-60 group-hover:bg-purple-60 group-hover:text-white transition-all duration-300">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-60 transition-colors">
                  Legal Guardian
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-grey-60 leading-relaxed">
                Stay compliant with ever-changing property laws. We handle lease agreements, local regulations, and tenant-landlord disputes.
              </p>
            </div>
          </div>

          {/* Card 5: Wide Banner Card spanning 2 columns on desktop */}
          <div className="md:col-span-2 relative bg-grey-10 border border-grey-15 rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden flex flex-col justify-between">
            {/* Subtle textured background stripes */}
            <div className="absolute inset-0 pointer-events-none opacity-25">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="banner2-pattern"
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
                <rect width="100%" height="100%" fill="url(#banner2-pattern)" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Experience Effortless Property Management
              </h3>
              <button
                onClick={handleLearnMore}
                className="shrink-0 self-start sm:self-auto px-5 py-3 rounded-xl bg-grey-08 border border-grey-15 hover:border-grey-20 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                Learn More
              </button>
            </div>

            <p className="relative z-10 text-xs sm:text-sm text-grey-60 leading-relaxed max-w-2xl mt-2 sm:mt-4">
              Ready to experience stress-free property management? Explore our Property Management Services
              page and discover how we can help you maximize your investment while enjoying the benefits of property ownership.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SECTION 3: SMART INVESTMENTS, INFORMED DECISIONS */}
      <section
        id="smart-investments"
        className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (5 cols): Header + Promo Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="text-grey-40 text-xs">✦</span>
                <span className="text-purple-60 text-sm">✦</span>
                <span className="text-grey-40 text-xs">✦</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Smart Investments, <br className="hidden sm:inline" />
                Informed Decisions
              </h2>
              <p className="text-grey-60 text-xs sm:text-sm lg:text-base mt-2.5 leading-relaxed">
                Building a real estate portfolio requires strategic planning, market insight, and
                continuous evaluation. At Estatein, we help you make informed investment decisions that
                align with your financial goals.
              </p>
            </div>

            {/* Featured Promo Card */}
            <div className="relative bg-grey-10 border border-grey-15 rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden">
              {/* Subtle textured stripes */}
              <div className="absolute inset-0 pointer-events-none opacity-25">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id="banner3-pattern"
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
                  <rect width="100%" height="100%" fill="url(#banner3-pattern)" />
                </svg>
              </div>

              <div className="relative z-10 space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Unlock Your Investment Potential
                </h3>
                <p className="text-xs sm:text-sm text-grey-60 leading-relaxed">
                  Explore our Property Investment Services page to learn how we can help you identify
                  high-yield opportunities, analyze market trends, and build a lucrative real estate portfolio.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleLearnMore}
                    className="w-full py-3.5 rounded-xl bg-grey-08 border border-grey-15 hover:border-grey-20 text-white font-semibold text-xs sm:text-sm text-center transition-all cursor-pointer shadow-sm"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): 2x2 Grid of Feature Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Card 1: Market Insight */}
            <div className="group bg-grey-10 p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-grey-15 hover:border-grey-20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 rounded-full bg-purple-60/20 blur-xs scale-125" />
                    <div className="w-11 h-11 rounded-full bg-grey-08 border border-purple-60/40 ring-4 ring-purple-60/10 flex items-center justify-center text-purple-60 group-hover:bg-purple-60 group-hover:text-white transition-all duration-300">
                      <LineChart className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-60 transition-colors">
                    Market Insight
                  </h3>
                </div>
                <p className="text-xs text-grey-60 leading-relaxed">
                  Stay ahead of the market with our expert analysis. We provide in-depth reports on market trends, property values, and growth areas.
                </p>
              </div>
            </div>

            {/* Card 2: ROI Assessment */}
            <div className="group bg-grey-10 p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-grey-15 hover:border-grey-20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 rounded-full bg-purple-60/20 blur-xs scale-125" />
                    <div className="w-11 h-11 rounded-full bg-grey-08 border border-purple-60/40 ring-4 ring-purple-60/10 flex items-center justify-center text-purple-60 group-hover:bg-purple-60 group-hover:text-white transition-all duration-300">
                      <PieChart className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-60 transition-colors">
                    ROI Assessment
                  </h3>
                </div>
                <p className="text-xs text-grey-60 leading-relaxed">
                  Make investment decisions with confidence. Our ROI analysis calculates potential returns, cash flow projections, and risk assessments.
                </p>
              </div>
            </div>

            {/* Card 3: Customized Strategies */}
            <div className="group bg-grey-10 p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-grey-15 hover:border-grey-20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 rounded-full bg-purple-60/20 blur-xs scale-125" />
                    <div className="w-11 h-11 rounded-full bg-grey-08 border border-purple-60/40 ring-4 ring-purple-60/10 flex items-center justify-center text-purple-60 group-hover:bg-purple-60 group-hover:text-white transition-all duration-300">
                      <Compass className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-60 transition-colors">
                    Customized Strategies
                  </h3>
                </div>
                <p className="text-xs text-grey-60 leading-relaxed">
                  Every investor has unique goals. We craft tailored investment strategies based on your risk tolerance, timeline, and financial objectives.
                </p>
              </div>
            </div>

            {/* Card 4: Diversification Mastery */}
            <div className="group bg-grey-10 p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-grey-15 hover:border-grey-20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 rounded-full bg-purple-60/20 blur-xs scale-125" />
                    <div className="w-11 h-11 rounded-full bg-grey-08 border border-purple-60/40 ring-4 ring-purple-60/10 flex items-center justify-center text-purple-60 group-hover:bg-purple-60 group-hover:text-white transition-all duration-300">
                      <Layers className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-60 transition-colors">
                    Diversification Mastery
                  </h3>
                </div>
                <p className="text-xs text-grey-60 leading-relaxed">
                  Spread your investment risk effectively. We help you diversify across property types, geographic locations, and investment strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER: "Start Your Real Estate Journey Today" */}
      <CTABanner onExploreClick={() => navigate('/properties')} />
    </div>
  );
};

export default ServicesPage;
