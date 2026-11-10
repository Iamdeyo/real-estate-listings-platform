import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { ServiceCards } from '../components/ServiceCards';
import { PropertyCard } from '../components/PropertyCard';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FAQSection } from '../components/FAQSection';
import { CTABanner } from '../components/CTABanner';
import { mockProperties, mockTestimonials, mockFAQs } from '../data/mockProperties';
import type { Property } from '../types/property';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HomePageProps {
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty?: (property: Property) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  favorites,
  onToggleFavorite,
  onSelectProperty,
}) => {
  const navigate = useNavigate();
  const [featuredPage, setFeaturedPage] = useState(1);

  const allFeatured = useMemo(() => {
    const list = mockProperties.filter((p) => p.featured);
    return list.length > 0 ? list : mockProperties;
  }, []);

  const FEATURED_PER_PAGE = 3;
  const totalFeaturedPages = Math.max(1, Math.ceil(allFeatured.length / FEATURED_PER_PAGE));

  const currentFeaturedProperties = useMemo(() => {
    const start = (featuredPage - 1) * FEATURED_PER_PAGE;
    return allFeatured.slice(start, start + FEATURED_PER_PAGE);
  }, [allFeatured, featuredPage]);

  const scrollToFeatured = () => {
    const el = document.getElementById('featured-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO SECTION - FULL SCREEN EDGE-TO-EDGE */}
      <section className="relative w-full min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] xl:min-h-[720px] 2xl:min-h-[800px] flex flex-col justify-between border-b border-grey-15 overflow-hidden bg-grey-08">
        {/* Split Screen Container (Edge-to-Edge) */}
        <div className="w-full h-full flex-1 flex flex-col-reverse lg:flex-row items-stretch">
          {/* Left Column: Heading, Subtitle, Dual CTAs, Stats Cards */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 lg:py-16 xl:py-20 px-6 sm:px-12 lg:pl-12 xl:pl-20 2xl:pl-28 lg:pr-12 xl:pr-16 border-b lg:border-b-0 lg:border-r border-grey-15 z-10 my-auto">
            <div className="space-y-6 sm:space-y-8 max-w-xl">
              <h1 className="text-3.5xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.14]">
                Discover Your Dream <br />
                Property with <span className="text-white">Verdant Estates</span>
              </h1>

              <p className="text-grey-60 text-sm sm:text-base leading-relaxed">
                Your journey to finding the perfect property begins here. Explore our listings to find
                the home that matches your dreams.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
                <button
                  onClick={scrollToFeatured}
                  className="px-6 py-3.5 rounded-xl bg-grey-10 border border-grey-15 hover:border-grey-20 text-white font-medium text-xs sm:text-sm text-center transition-all cursor-pointer"
                >
                  Learn More
                </button>
                <button
                  onClick={() => navigate('/properties')}
                  className="px-6 py-3.5 rounded-xl bg-purple-60 hover:bg-purple-65 active:scale-95 text-white font-medium text-xs sm:text-sm text-center transition-all shadow-md shadow-purple-60/25 cursor-pointer"
                >
                  Browse Properties
                </button>
              </div>
            </div>

            {/* Stats Grid matching Figma (3 in row on desktop, 2x1 on mobile) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-8 lg:pt-12 mt-8 border-t border-grey-15 max-w-xl">
              <div className="p-4 sm:p-5 rounded-2xl bg-grey-10 border border-grey-15">
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">200+</span>
                <span className="text-xs text-grey-60 mt-1 block">Happy Customers</span>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-grey-10 border border-grey-15">
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">10k+</span>
                <span className="text-xs text-grey-60 mt-1 block">Properties For Clients</span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-4 sm:p-5 rounded-2xl bg-grey-10 border border-grey-15">
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">16+</span>
                <span className="text-xs text-grey-60 mt-1 block">Years of Experience</span>
              </div>
            </div>
          </div>

          {/* Right Column: Luxury Architectural High-Rise */}
          <div className="w-full lg:w-1/2 relative flex items-end justify-center overflow-hidden bg-grey-08 h-full min-h-[420px] sm:min-h-[500px] lg:min-h-full">
            {/* Subtle Ambient Emerald Backlight Glow */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-60/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Building Image Container with Cinematic Edge Gradients */}
            <div className="w-full h-full flex items-end justify-center relative z-10">
              <img
                src="/hero-building.jpg"
                alt="Verdant Estates Luxury High-Rise"
                className="w-full h-full object-cover object-center lg:object-bottom transition-all duration-700"
              />
              {/* Subtle edge vignette for smooth transition into dark background */}
              <div className="absolute inset-0 bg-gradient-to-t from-grey-08/70 via-transparent to-grey-08/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-grey-08/40 via-transparent to-transparent pointer-events-none hidden lg:block" />
            </div>
          </div>

          {/* Circular Rotating Badge Centered on Border Seam (Never Clipped) */}
          <div
            onClick={scrollToFeatured}
            className="absolute top-6 left-6 sm:top-8 sm:left-8 lg:top-[38%] lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-30 w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full border border-grey-15 bg-grey-10/95 backdrop-blur-md flex items-center justify-center p-2 shadow-2xl hover:border-purple-60 transition-all cursor-pointer group select-none"
            title="Discover Your Dream Property"
          >
            {/* Spinning Text SVG */}
            <svg
              className="w-full h-full animate-[spin_20s_linear_infinite]"
              viewBox="0 0 140 140"
            >
              <defs>
                <path
                  id="circlePathHero"
                  d="M 70, 70 m 0, -48 a 48,48 0 1,1 0,96 a 48,48 0 1,1 0,-96"
                  fill="none"
                />
              </defs>
              <text className="text-[9.5px] fill-white font-medium tracking-[0.16em]">
                <textPath href="#circlePathHero" startOffset="50%" textAnchor="middle">
                  Discover Your Dream Property ✨
                </textPath>
              </text>
            </svg>

            {/* Inner Concentric Circle with Arrow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-grey-08 border border-grey-15 flex items-center justify-center text-white group-hover:border-purple-60/60 group-hover:bg-purple-60/15 group-hover:text-purple-60 transition-all shadow-inner">
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4 FEATURE SERVICE CARDS (Max width 1596 / 1280) */}
      <ServiceCards
        onCardClick={(serviceId) => {
          if (serviceId === 'dream-home') {
            navigate('/properties');
          } else {
            navigate('/services');
          }
        }}
      />

      {/* 3. FEATURED PROPERTIES SECTION (Max width 1596 / 1280) */}
      <section
        id="featured-section"
        className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      >
        <SectionHeader
          title="Featured Properties"
          subtitle="Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Verdant Estates. Click &quot;View Details&quot; for more information."
          buttonText="View All Properties"
          onButtonClick={() => navigate('/properties')}
        />

        {/* 3 Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {currentFeaturedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectProperty}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-10 pt-6 border-t border-grey-15 flex items-center justify-between">
          <span className="text-xs text-grey-60">
            <strong className="text-white">
              {featuredPage < 10 ? `0${featuredPage}` : featuredPage}
            </strong>{' '}
            of {totalFeaturedPages < 10 ? `0${totalFeaturedPages}` : totalFeaturedPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setFeaturedPage((prev) => (prev > 1 ? prev - 1 : totalFeaturedPages))
              }
              className="p-2.5 rounded-full bg-grey-10 border border-grey-15 text-grey-60 hover:text-white hover:border-grey-20 transition-all active:scale-95 cursor-pointer"
              aria-label="Previous properties"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setFeaturedPage((prev) => (prev < totalFeaturedPages ? prev + 1 : 1))
              }
              className="p-2.5 rounded-full bg-grey-10 border border-grey-15 text-grey-60 hover:text-white hover:border-grey-20 transition-all active:scale-95 cursor-pointer"
              aria-label="Next properties"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. WHAT OUR CLIENTS SAY (Max width 1596 / 1280) */}
      <TestimonialsSection testimonials={mockTestimonials} />

      {/* 5. FREQUENTLY ASKED QUESTIONS (Max width 1596 / 1280) */}
      <FAQSection faqs={mockFAQs} />

      {/* 6. CTA BANNER (Max width 1596 / 1280) */}
      <CTABanner onExploreClick={() => navigate('/properties')} />
    </div>
  );
};
