import React, { useState, useMemo, useRef } from 'react';
import { SectionHeader } from './SectionHeader';
import { PropertyCard } from './PropertyCard';
import { CTABanner } from './CTABanner';
import type { Property } from '../types/property';
import {
  Search,
  MapPin,
  Building,
  BadgeDollarSign,
  Square,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  SearchX,
  SlidersHorizontal,
} from 'lucide-react';

interface PropertiesPageProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty?: (property: Property) => void;
}

const ITEMS_PER_PAGE = 9;

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
}) => {
  const listingsRef = useRef<HTMLElement>(null);

  // Filter states matching the 5 dropdowns in Figma
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedBuildYear, setSelectedBuildYear] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Form State for "Let's Make it Happen"
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    propertyType: '',
    bathrooms: '',
    bedrooms: '',
    budget: '',
    contactMethod: 'phone', // 'phone' | 'email'
    message: '',
    agreeTerms: false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter change handlers that reset to page 1
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleLocationChange = (val: string) => {
    setSelectedLocation(val);
    setCurrentPage(1);
  };

  const handleTypeChange = (val: string) => {
    setSelectedType(val);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (val: string) => {
    setSelectedPriceRange(val);
    setCurrentPage(1);
  };

  const handleSizeChange = (val: string) => {
    setSelectedSize(val);
    setCurrentPage(1);
  };

  const handleBuildYearChange = (val: string) => {
    setSelectedBuildYear(val);
    setCurrentPage(1);
  };

  // Filtered Properties Logic
  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchCity = item.city.toLowerCase().includes(q);
        const matchAddress = item.address.toLowerCase().includes(q);
        const matchState = item.state.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchType = item.propertyType.toLowerCase().includes(q);
        const matchAmenities = item.amenities.some((a) =>
          a.toLowerCase().includes(q)
        );

        if (
          !matchTitle &&
          !matchCity &&
          !matchAddress &&
          !matchState &&
          !matchDesc &&
          !matchType &&
          !matchAmenities
        ) {
          return false;
        }
      }

      // 2. Location
      if (selectedLocation !== 'all') {
        const loc = selectedLocation.toLowerCase();
        if (loc === 'central-abuja') {
          const isJabiOrWuse =
            item.city.toLowerCase().includes('jabi') ||
            item.city.toLowerCase().includes('wuse');
          if (!isJabiOrWuse) return false;
        } else {
          const inCity = item.city.toLowerCase().includes(loc);
          const inAddress = item.address.toLowerCase().includes(loc);
          if (!inCity && !inAddress) return false;
        }
      }

      // 3. Property Type
      if (selectedType !== 'all') {
        if (item.propertyType.toLowerCase() !== selectedType.toLowerCase()) {
          return false;
        }
      }

      // 4. Price Range (Nigerian Naira tiers)
      if (selectedPriceRange !== 'all') {
        if (selectedPriceRange === 'under-250m' && item.price >= 250000000)
          return false;
        if (
          selectedPriceRange === '250m-500m' &&
          (item.price < 250000000 || item.price > 500000000)
        )
          return false;
        if (
          selectedPriceRange === '500m-1b' &&
          (item.price < 500000000 || item.price > 1000000000)
        )
          return false;
        if (
          selectedPriceRange === '1b-2.5b' &&
          (item.price < 1000000000 || item.price > 2500000000)
        )
          return false;
        if (selectedPriceRange === 'above-2.5b' && item.price <= 2500000000)
          return false;
      }

      // 5. Property Size (sq ft)
      if (selectedSize !== 'all') {
        const minSize = parseInt(selectedSize, 10);
        if (item.areaSqFt < minSize) return false;
      }

      // 6. Build Year
      if (selectedBuildYear !== 'all') {
        const minYear = parseInt(selectedBuildYear, 10);
        if ((item.yearBuilt || 2023) < minYear) return false;
      }

      return true;
    });
  }, [
    properties,
    searchQuery,
    selectedLocation,
    selectedType,
    selectedPriceRange,
    selectedSize,
    selectedBuildYear,
  ]);

  // Dynamic Pagination
  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProperties = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProperties, safeCurrentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (listingsRef.current) {
      listingsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('all');
    setSelectedType('all');
    setSelectedPriceRange('all');
    setSelectedSize('all');
    setSelectedBuildYear('all');
    setCurrentPage(1);
  };

  const isFiltered =
    searchQuery !== '' ||
    selectedLocation !== 'all' ||
    selectedType !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedSize !== 'all' ||
    selectedBuildYear !== 'all';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) {
      alert('Please fill out your First Name and Email.');
      return;
    }
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        propertyType: '',
        bathrooms: '',
        bedrooms: '',
        budget: '',
        contactMethod: 'phone',
        message: '',
        agreeTerms: false,
      });
    }, 4000);
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO & ADVANCED SEARCH FILTER BAR */}
      <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-grey-15">
        {/* Header copy */}
        <div className="max-w-3xl space-y-3 mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Find Your Dream Property
          </h1>
          <p className="text-grey-60 text-sm sm:text-base leading-relaxed">
            Welcome to Verdant Estates, where exceptional Nigerian luxury residences meet timeless design. Explore our verified portfolio across Lagos (Banana Island, Ikoyi, Lekki, Victoria Island, Ikeja GRA) and Abuja (Maitama, Guzape, Asokoro). Click "View Details" to explore specs, floor plans, and acquisition structures.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="bg-grey-10 p-3 sm:p-4 rounded-3xl border border-grey-15 shadow-2xl space-y-3">
          {/* Top Search Input with Emerald Action Button */}
          <div className="relative flex items-center bg-grey-08 border border-grey-15 rounded-2xl p-2 pl-4">
            <Search className="w-5 h-5 text-grey-40 shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by neighborhood, title, city, or features (e.g. Banana Island, BQ, Pool, Penthouse)..."
              className="w-full bg-transparent text-sm text-white placeholder:text-grey-40 focus:outline-none"
            />
            <button
              onClick={() => {
                if (listingsRef.current) {
                  listingsRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-60 hover:bg-purple-65 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-purple-60/25 cursor-pointer ml-2"
            >
              <Search className="w-4 h-4 hidden sm:inline" />
              <span>Find Property</span>
            </button>
          </div>

          {/* Bottom 5 Dropdowns Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
            {/* 1. Location */}
            <div className="relative">
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-xs font-medium text-grey-60 hover:text-white hover:border-grey-20 transition-all cursor-pointer">
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-4 h-4 text-purple-60 shrink-0" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    className="w-full bg-transparent appearance-none focus:outline-none cursor-pointer text-white text-xs truncate"
                  >
                    <option value="all" className="bg-grey-10 text-white">Location: All</option>
                    <option value="ikoyi" className="bg-grey-10 text-white">Ikoyi & Banana Island, Lagos</option>
                    <option value="lekki" className="bg-grey-10 text-white">Lekki Phase 1, Lagos</option>
                    <option value="victoria island" className="bg-grey-10 text-white">Victoria Island & Eko Atlantic</option>
                    <option value="ikeja" className="bg-grey-10 text-white">Ikeja GRA, Lagos</option>
                    <option value="maitama" className="bg-grey-10 text-white">Maitama, Abuja</option>
                    <option value="guzape" className="bg-grey-10 text-white">Guzape, Abuja</option>
                    <option value="asokoro" className="bg-grey-10 text-white">Asokoro, Abuja</option>
                    <option value="central-abuja" className="bg-grey-10 text-white">Jabi & Wuse 2, Abuja</option>
                  </select>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-grey-40 pointer-events-none shrink-0" />
              </div>
            </div>

            {/* 2. Property Type */}
            <div className="relative">
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-xs font-medium text-grey-60 hover:text-white hover:border-grey-20 transition-all cursor-pointer">
                <div className="flex items-center gap-2 truncate">
                  <Building className="w-4 h-4 text-purple-60 shrink-0" />
                  <select
                    value={selectedType}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    className="w-full bg-transparent appearance-none focus:outline-none cursor-pointer text-white text-xs truncate"
                  >
                    <option value="all" className="bg-grey-10 text-white">Property Type: All</option>
                    <option value="detached-duplex" className="bg-grey-10 text-white">Detached Duplex</option>
                    <option value="apartment" className="bg-grey-10 text-white">Luxury Apartment / Penthouse</option>
                    <option value="terraced-duplex" className="bg-grey-10 text-white">Terraced Duplex</option>
                    <option value="semi-detached" className="bg-grey-10 text-white">Semi-Detached Duplex</option>
                  </select>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-grey-40 pointer-events-none shrink-0" />
              </div>
            </div>

            {/* 3. Pricing Range */}
            <div className="relative">
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-xs font-medium text-grey-60 hover:text-white hover:border-grey-20 transition-all cursor-pointer">
                <div className="flex items-center gap-2 truncate">
                  <BadgeDollarSign className="w-4 h-4 text-purple-60 shrink-0" />
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => handlePriceRangeChange(e.target.value)}
                    className="w-full bg-transparent appearance-none focus:outline-none cursor-pointer text-white text-xs truncate"
                  >
                    <option value="all" className="bg-grey-10 text-white">Pricing Range: All</option>
                    <option value="under-250m" className="bg-grey-10 text-white">Under ₦250 Million</option>
                    <option value="250m-500m" className="bg-grey-10 text-white">₦250M – ₦500 Million</option>
                    <option value="500m-1b" className="bg-grey-10 text-white">₦500M – ₦1 Billion</option>
                    <option value="1b-2.5b" className="bg-grey-10 text-white">₦1 Billion – ₦2.5 Billion</option>
                    <option value="above-2.5b" className="bg-grey-10 text-white">Over ₦2.5 Billion</option>
                  </select>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-grey-40 pointer-events-none shrink-0" />
              </div>
            </div>

            {/* 4. Property Size */}
            <div className="relative">
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-xs font-medium text-grey-60 hover:text-white hover:border-grey-20 transition-all cursor-pointer">
                <div className="flex items-center gap-2 truncate">
                  <Square className="w-4 h-4 text-purple-60 shrink-0" />
                  <select
                    value={selectedSize}
                    onChange={(e) => handleSizeChange(e.target.value)}
                    className="w-full bg-transparent appearance-none focus:outline-none cursor-pointer text-white text-xs truncate"
                  >
                    <option value="all" className="bg-grey-10 text-white">Property Size: All</option>
                    <option value="3000" className="bg-grey-10 text-white">3,000+ sq ft</option>
                    <option value="5000" className="bg-grey-10 text-white">5,000+ sq ft</option>
                    <option value="7500" className="bg-grey-10 text-white">7,500+ sq ft</option>
                  </select>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-grey-40 pointer-events-none shrink-0" />
              </div>
            </div>

            {/* 5. Build Year */}
            <div className="relative">
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-xs font-medium text-grey-60 hover:text-white hover:border-grey-20 transition-all cursor-pointer">
                <div className="flex items-center gap-2 truncate">
                  <Calendar className="w-4 h-4 text-purple-60 shrink-0" />
                  <select
                    value={selectedBuildYear}
                    onChange={(e) => handleBuildYearChange(e.target.value)}
                    className="w-full bg-transparent appearance-none focus:outline-none cursor-pointer text-white text-xs truncate"
                  >
                    <option value="all" className="bg-grey-10 text-white">Build Year: All</option>
                    <option value="2023" className="bg-grey-10 text-white">2023 or Newer</option>
                    <option value="2024" className="bg-grey-10 text-white">2024 or Newer</option>
                    <option value="2025" className="bg-grey-10 text-white">2025 (Brand New)</option>
                  </select>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-grey-40 pointer-events-none shrink-0" />
              </div>
            </div>
          </div>

          {/* Reset Filters & Results Indicator */}
          {isFiltered && (
            <div className="pt-2 flex items-center justify-between border-t border-grey-15/60 mt-2">
              <div className="flex items-center gap-2 text-xs text-grey-60">
                <SlidersHorizontal className="w-3.5 h-3.5 text-purple-60" />
                <span>
                  Filtering active • Found <strong>{filteredProperties.length}</strong> matching {filteredProperties.length === 1 ? 'property' : 'properties'}
                </span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-purple-75 hover:text-white underline underline-offset-4 cursor-pointer font-medium"
              >
                Reset active filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. DISCOVER A WORLD OF POSSIBILITIES (LISTINGS) */}
      <section
        ref={listingsRef}
        id="properties-list"
        className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-grey-15"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <SectionHeader
            title="Discover a World of Possibilities"
            subtitle="Explore our verified luxury portfolio across Nigeria's prime residential hubs. Each property is architecturally certified with validated title documentation."
          />
          <div className="text-xs text-grey-60 shrink-0 pb-2">
            Showing <strong className="text-white">{filteredProperties.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}</strong> – <strong className="text-white">{Math.min(currentPage * ITEMS_PER_PAGE, filteredProperties.length)}</strong> of <strong className="text-white">{filteredProperties.length}</strong> properties
          </div>
        </div>

        {/* Property Grid or Empty State */}
        {paginatedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {paginatedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 bg-grey-10 rounded-3xl border border-grey-15">
            <div className="w-16 h-16 mx-auto mb-4 bg-grey-08 border border-grey-15 rounded-2xl flex items-center justify-center text-grey-60">
              <SearchX className="w-8 h-8 text-purple-60" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              No matching properties found
            </h3>
            <p className="text-sm text-grey-60 max-w-md mx-auto mb-6">
              Try adjusting your search criteria, property types, price range, or resetting active filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 bg-purple-60 hover:bg-purple-65 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-purple-60/25 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Dynamic Pagination Controls */}
        <div className="mt-10 pt-6 border-t border-grey-15 flex items-center justify-between">
          <span className="text-xs text-grey-60">
            <strong className="text-white">
              {currentPage < 10 ? `0${currentPage}` : currentPage}
            </strong>{' '}
            of {totalPages < 10 ? `0${totalPages}` : totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : totalPages)}
              className="p-2.5 rounded-full bg-grey-10 border border-grey-15 text-grey-60 hover:text-white hover:border-grey-20 transition-all active:scale-95 cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Quick Page Jump Pills */}
            <div className="hidden sm:flex items-center gap-1.5 px-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-purple-60 text-white shadow-md shadow-purple-60/20'
                      : 'bg-grey-08 text-grey-60 hover:text-white hover:bg-grey-15'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : 1)}
              className="p-2.5 rounded-full bg-grey-10 border border-grey-15 text-grey-60 hover:text-white hover:border-grey-20 transition-all active:scale-95 cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. LET'S MAKE IT HAPPEN (CONTACT / INQUIRY FORM) */}
      <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-grey-15">
        <SectionHeader
          title="Let's Make it Happen"
          subtitle="Ready to acquire your prime property in Nigeria? Fill out the brief below and our senior portfolio consultant will schedule a confidential discovery session and customized itinerary."
        />

        {/* Form Container */}
        <div className="bg-grey-10 p-6 sm:p-10 lg:p-14 rounded-3xl border border-grey-15 shadow-2xl">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Row 1: First Name, Last Name, Email, Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="text-xs font-semibold text-white mb-2 block">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="Enter First Name"
                  className="w-full px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white placeholder:text-grey-40 focus:outline-none focus:border-purple-60"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white mb-2 block">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Enter Last Name"
                  className="w-full px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white placeholder:text-grey-40 focus:outline-none focus:border-purple-60"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your Email"
                  className="w-full px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white placeholder:text-grey-40 focus:outline-none focus:border-purple-60"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white mb-2 block">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+234 800 000 0000"
                  className="w-full px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white placeholder:text-grey-40 focus:outline-none focus:border-purple-60"
                />
              </div>
            </div>

            {/* Row 2: Location, Property Type, Bathrooms, Bedrooms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="text-xs font-semibold text-white mb-2 block">
                  Preferred Location
                </label>
                <div className="relative">
                  <select
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white appearance-none focus:outline-none focus:border-purple-60 cursor-pointer"
                  >
                    <option value="" className="bg-grey-10 text-grey-40">Select Location</option>
                    <option value="ikoyi" className="bg-grey-10 text-white">Ikoyi & Banana Island, Lagos</option>
                    <option value="lekki" className="bg-grey-10 text-white">Lekki Phase 1 & Osapa, Lagos</option>
                    <option value="vi" className="bg-grey-10 text-white">Victoria Island & Eko Atlantic</option>
                    <option value="ikeja" className="bg-grey-10 text-white">Ikeja GRA, Lagos</option>
                    <option value="maitama" className="bg-grey-10 text-white">Maitama, Abuja</option>
                    <option value="guzape" className="bg-grey-10 text-white">Guzape, Abuja</option>
                    <option value="asokoro" className="bg-grey-10 text-white">Asokoro, Abuja</option>
                    <option value="jabi" className="bg-grey-10 text-white">Jabi & Wuse 2, Abuja</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-grey-40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white mb-2 block">
                  Property Type
                </label>
                <div className="relative">
                  <select
                    value={formData.propertyType}
                    onChange={(e) =>
                      setFormData({ ...formData, propertyType: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white appearance-none focus:outline-none focus:border-purple-60 cursor-pointer"
                  >
                    <option value="" className="bg-grey-10 text-grey-40">Select Property Type</option>
                    <option value="detached-duplex" className="bg-grey-10 text-white">Detached Duplex / Villa</option>
                    <option value="apartment" className="bg-grey-10 text-white">Luxury Apartment / Penthouse</option>
                    <option value="terraced-duplex" className="bg-grey-10 text-white">Terraced Duplex / Townhouse</option>
                    <option value="semi-detached" className="bg-grey-10 text-white">Semi-Detached Duplex</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-grey-40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white mb-2 block">
                  No. of Bathrooms
                </label>
                <div className="relative">
                  <select
                    value={formData.bathrooms}
                    onChange={(e) =>
                      setFormData({ ...formData, bathrooms: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white appearance-none focus:outline-none focus:border-purple-60 cursor-pointer"
                  >
                    <option value="" className="bg-grey-10 text-grey-40">Select Bathrooms</option>
                    <option value="2" className="bg-grey-10 text-white">2+ Bathrooms</option>
                    <option value="3" className="bg-grey-10 text-white">3+ Bathrooms</option>
                    <option value="4" className="bg-grey-10 text-white">4+ Bathrooms</option>
                    <option value="5" className="bg-grey-10 text-white">5+ Bathrooms</option>
                    <option value="6" className="bg-grey-10 text-white">6+ Bathrooms</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-grey-40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white mb-2 block">
                  No. of Bedrooms
                </label>
                <div className="relative">
                  <select
                    value={formData.bedrooms}
                    onChange={(e) =>
                      setFormData({ ...formData, bedrooms: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white appearance-none focus:outline-none focus:border-purple-60 cursor-pointer"
                  >
                    <option value="" className="bg-grey-10 text-grey-40">Select Bedrooms</option>
                    <option value="2" className="bg-grey-10 text-white">2 Bedrooms</option>
                    <option value="3" className="bg-grey-10 text-white">3 Bedrooms</option>
                    <option value="4" className="bg-grey-10 text-white">4 Bedrooms</option>
                    <option value="5" className="bg-grey-10 text-white">5 Bedrooms</option>
                    <option value="6" className="bg-grey-10 text-white">6+ Bedrooms</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-grey-40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 3: Budget & Preferred Contact Method */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-white mb-2 block">
                  Budget
                </label>
                <div className="relative">
                  <select
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white appearance-none focus:outline-none focus:border-purple-60 cursor-pointer"
                  >
                    <option value="" className="bg-grey-10 text-grey-40">Select Budget Range</option>
                    <option value="under-250m" className="bg-grey-10 text-white">Under ₦250 Million</option>
                    <option value="250m-500m" className="bg-grey-10 text-white">₦250M – ₦500 Million</option>
                    <option value="500m-1b" className="bg-grey-10 text-white">₦500M – ₦1 Billion</option>
                    <option value="1b-2.5b" className="bg-grey-10 text-white">₦1 Billion – ₦2.5 Billion</option>
                    <option value="above-2.5b" className="bg-grey-10 text-white">Over ₦2.5 Billion</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-grey-40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white mb-2 block">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, contactMethod: 'phone' })
                    }
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      formData.contactMethod === 'phone'
                        ? 'bg-purple-60/15 border-purple-60 text-white'
                        : 'bg-grey-08 border-grey-15 text-grey-60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-60" />
                      <span>Phone / WhatsApp</span>
                    </div>
                    <div
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        formData.contactMethod === 'phone'
                          ? 'border-purple-60 bg-purple-60'
                          : 'border-grey-30'
                      }`}
                    >
                      {formData.contactMethod === 'phone' && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, contactMethod: 'email' })
                    }
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      formData.contactMethod === 'email'
                        ? 'bg-purple-60/15 border-purple-60 text-white'
                        : 'bg-grey-08 border-grey-15 text-grey-60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-60" />
                      <span>Email</span>
                    </div>
                    <div
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        formData.contactMethod === 'email'
                          ? 'border-purple-60 bg-purple-60'
                          : 'border-grey-30'
                      }`}
                    >
                      {formData.contactMethod === 'email' && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Row 4: Message */}
            <div>
              <label className="text-xs font-semibold text-white mb-2 block">
                Message & Specific Requirements
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Mention specific preferences (e.g., Waterfront view, Boys Quarters, Private Cinema, Solar Inverter setup, Swimming Pool, C of O title status)..."
                className="w-full px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white placeholder:text-grey-40 focus:outline-none focus:border-purple-60"
              />
            </div>

            {/* Row 5: Terms Checkbox & Send Button */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <label className="flex items-center gap-2.5 text-xs text-grey-60 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeTerms: e.target.checked })
                  }
                  className="w-4 h-4 rounded bg-grey-08 border-grey-15 text-purple-60 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-purple-60"
                />
                <span>
                  I agree with{' '}
                  <span className="text-white underline underline-offset-4">
                    Terms of Use
                  </span>{' '}
                  and{' '}
                  <span className="text-white underline underline-offset-4">
                    Privacy Policy
                  </span>
                </span>
              </label>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-purple-60 hover:bg-purple-65 active:scale-95 text-white font-semibold text-sm transition-all shadow-md shadow-purple-60/25 cursor-pointer text-center"
              >
                Send Your Message
              </button>
            </div>
          </form>

          {/* Form success message */}
          {formSubmitted && (
            <div className="mt-4 p-4 rounded-xl bg-purple-60/15 border border-purple-60/30 text-purple-75 text-center text-sm font-semibold animate-fadeIn">
              ✓ Thank you! Your property inquiry has been received. A Verdant Estates portfolio advisor will contact you shortly.
            </div>
          )}
        </div>
      </section>

      {/* 4. CTA BANNER */}
      <CTABanner onExploreClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </div>
  );
};
