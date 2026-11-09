import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SectionHeader } from './SectionHeader';
import { FAQSection } from './FAQSection';
import { CTABanner } from './CTABanner';
import { mockProperties, mockFAQs } from '../data/mockProperties';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find selected property by id, or default to first property
  const property =
    mockProperties.find((p) => p.id === id) || mockProperties[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [activePricingTab, setActivePricingTab] = useState<string | null>(null);

  const [inquiryForm, setInquiryForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agreeTerms: false,
  });

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  const images = property.images && property.images.length > 0 ? property.images : [
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  ];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const secondaryImageIndex = (activeImageIndex + 1) % images.length;

  // Dynamic pricing calculations based on property price
  const price = property.price || 1250000;
  const transferTax = Math.round(price * 0.02);
  const legalFees = 3000;
  const inspectionFee = 500;
  const insuranceFee = 1200;
  const propertyTaxAnnual = Math.round(price * 0.012);
  const propertyTaxMonthly = Math.round(propertyTaxAnnual / 12);
  const hoaMonthly = 300;
  const downPayment = Math.round(price * 0.2);
  const mortgageAmount = Math.round(price * 0.8);
  const monthlyMortgage = Math.round((mortgageAmount * 0.06) / 12 + 1800);
  const totalAdditionalFees = transferTax + legalFees + inspectionFee + insuranceFee;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        agreeTerms: false,
      });
    }, 4000);
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. TOP TITLE & PRICE HEADER */}
      <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/properties')}
          className="inline-flex items-center gap-1.5 text-xs text-grey-60 hover:text-white mb-6 transition-colors cursor-pointer"
        >
          <span>← Back to Properties</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-grey-60 mt-2">
              <MapPin className="w-4 h-4 text-purple-60 shrink-0" />
              <span>
                {property.address}, {property.city}, {property.state}
              </span>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-xs text-grey-60 block font-medium">Price</span>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              {formattedPrice}
              {property.period && (
                <span className="text-sm font-normal text-grey-60">/{property.period}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMAGE GALLERY CONTAINER */}
      <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-grey-10 p-4 sm:p-6 rounded-3xl border border-grey-15 shadow-2xl space-y-4">
          {/* Thumbnail Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative shrink-0 w-20 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-purple-60 scale-102 shadow-md'
                    : 'border-grey-15 opacity-60 hover:opacity-100 hover:border-grey-20'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-grey-08 border border-grey-15">
              <img
                src={images[activeImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="hidden lg:block relative aspect-[16/10] rounded-2xl overflow-hidden bg-grey-08 border border-grey-15">
              <img
                src={images[secondaryImageIndex]}
                alt={`${property.title} Interior`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bottom Pagination */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'w-6 bg-purple-60'
                      : 'w-2 bg-grey-20 hover:bg-grey-30'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevImage}
                className="p-2.5 rounded-full bg-grey-08 border border-grey-15 text-grey-60 hover:text-white hover:border-grey-20 transition-all cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="p-2.5 rounded-full bg-grey-08 border border-grey-15 text-grey-60 hover:text-white hover:border-grey-20 transition-all cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESCRIPTION & KEY FEATURES / AMENITIES */}
      <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Card: Description */}
          <div className="bg-grey-10 p-6 sm:p-8 rounded-3xl border border-grey-15 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Description</h3>
              <p className="text-xs sm:text-sm text-grey-60 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-grey-15">
              <div className="p-3.5 rounded-2xl bg-grey-08 border border-grey-15">
                <div className="flex items-center gap-1.5 text-xs text-grey-60 mb-1">
                  <Bed className="w-3.5 h-3.5 text-purple-60" />
                  <span>Bedrooms</span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-white">
                  0{property.bedrooms}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-grey-08 border border-grey-15">
                <div className="flex items-center gap-1.5 text-xs text-grey-60 mb-1">
                  <Bath className="w-3.5 h-3.5 text-purple-60" />
                  <span>Bathrooms</span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-white">
                  0{property.bathrooms}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-grey-08 border border-grey-15">
                <div className="flex items-center gap-1.5 text-xs text-grey-60 mb-1">
                  <Square className="w-3.5 h-3.5 text-purple-60" />
                  <span>Area</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-white truncate block">
                  {property.areaSqFt.toLocaleString()} sqft
                </span>
              </div>
            </div>
          </div>

          {/* Right Card: Key Features and Amenities */}
          <div className="bg-grey-10 p-6 sm:p-8 rounded-3xl border border-grey-15 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              Key Features and Amenities
            </h3>

            <div className="space-y-3">
              {property.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-grey-08 border border-grey-15 text-xs sm:text-sm text-white font-medium"
                >
                  <div className="w-7 h-7 rounded-full bg-purple-60/20 text-purple-75 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. INQUIRE ABOUT THIS PROPERTY FORM */}
      <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-grey-15">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-14">
          <div className="w-full lg:w-1/3 space-y-3">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-grey-40 text-xs">✦</span>
              <span className="text-purple-60 text-sm">✦</span>
              <span className="text-grey-40 text-xs">✦</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
              Inquire About <br className="hidden sm:inline" />
              {property.title}
            </h2>
            <p className="text-grey-60 text-sm leading-relaxed">
              Interested in this property? Fill out the form below, and our dedicated agent will contact you with more details, arrange a private viewing, or answer any questions.
            </p>
          </div>

          <div className="w-full lg:w-2/3 bg-grey-10 p-6 sm:p-10 rounded-3xl border border-grey-15 shadow-2xl">
            <form onSubmit={handleInquirySubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white mb-2 block">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.firstName}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, firstName: e.target.value })
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
                    value={inquiryForm.lastName}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, lastName: e.target.value })
                    }
                    placeholder="Enter Last Name"
                    className="w-full px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white placeholder:text-grey-40 focus:outline-none focus:border-purple-60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryForm.email}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, email: e.target.value })
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
                    value={inquiryForm.phone}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, phone: e.target.value })
                    }
                    placeholder="Enter Phone Number"
                    className="w-full px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white placeholder:text-grey-40 focus:outline-none focus:border-purple-60"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white mb-2 block">
                  Selected Property
                </label>
                <div className="w-full px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white flex items-center justify-between">
                  <span>
                    {property.title}, {property.city}, {property.state}
                  </span>
                  <MapPin className="w-4 h-4 text-purple-60 shrink-0 ml-2" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white mb-2 block">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={inquiryForm.message}
                  onChange={(e) =>
                    setInquiryForm({ ...inquiryForm, message: e.target.value })
                  }
                  placeholder="Enter your Message here..."
                  className="w-full px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white placeholder:text-grey-40 focus:outline-none focus:border-purple-60"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <label className="flex items-center gap-2.5 text-xs text-grey-60 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={inquiryForm.agreeTerms}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, agreeTerms: e.target.checked })
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

            {inquirySubmitted && (
              <div className="mt-4 p-4 rounded-xl bg-purple-60/15 border border-purple-60/30 text-purple-75 text-center text-sm font-semibold animate-fadeIn">
                ✓ Thank you! Agent {property.agent.name} has received your inquiry for {property.title}.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. COMPREHENSIVE PRICING DETAILS */}
      <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-grey-15">
        <SectionHeader
          title="Comprehensive Pricing Details"
          subtitle="At Estatein, transparency is key. We provide a clear breakdown of all costs associated with this property, ensuring you have all the information necessary to make an informed financial decision."
        />

        {/* Disclaimer Note */}
        <div className="mb-8 p-4 rounded-2xl bg-grey-10 border border-grey-15 flex items-start gap-3 text-xs sm:text-sm text-grey-60">
          <Info className="w-5 h-5 text-purple-60 shrink-0 mt-0.5" />
          <span>
            <strong>Note:</strong> The pricing details provided below are estimated and subject to change based on actual market conditions and negotiations.
          </span>
        </div>

        {/* Pricing Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-1/3 bg-grey-10 p-6 sm:p-8 rounded-3xl border border-grey-15 space-y-2">
            <span className="text-xs text-grey-60 uppercase font-semibold tracking-wider block">
              Listing Price
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white">
              {formattedPrice}
            </div>
            <p className="text-xs text-grey-60 pt-2 leading-relaxed">
              Price includes premium architectural finishes, all permanent fixtures, and verified deed transfer verification.
            </p>
          </div>

          <div className="w-full lg:w-2/3 space-y-6">
            {/* Additional Fees */}
            <div className="bg-grey-10 p-6 sm:p-8 rounded-3xl border border-grey-15 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-grey-15">
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Additional Fees
                </h4>
                <button
                  onClick={() =>
                    setActivePricingTab(activePricingTab === 'fees' ? null : 'fees')
                  }
                  className="px-3.5 py-1.5 rounded-lg bg-grey-08 border border-grey-15 text-xs font-semibold text-white hover:border-grey-20 cursor-pointer"
                >
                  {activePricingTab === 'fees' ? 'Show Less' : 'Learn More'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-grey-08 border border-grey-15 space-y-1">
                  <span className="text-grey-60 block">Property Transfer Tax</span>
                  <span className="text-base font-bold text-white block">
                    ${transferTax.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-grey-60">Based on sale price & local rate</span>
                </div>

                <div className="p-3.5 rounded-xl bg-grey-08 border border-grey-15 space-y-1">
                  <span className="text-grey-60 block">Legal Fees</span>
                  <span className="text-base font-bold text-white block">
                    ${legalFees.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-grey-60">Title search & legal representation</span>
                </div>

                <div className="p-3.5 rounded-xl bg-grey-08 border border-grey-15 space-y-1">
                  <span className="text-grey-60 block">Home Inspection</span>
                  <span className="text-base font-bold text-white block">
                    ${inspectionFee.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-grey-60">Full structural & safety report</span>
                </div>

                <div className="p-3.5 rounded-xl bg-grey-08 border border-grey-15 space-y-1">
                  <span className="text-grey-60 block">Property Insurance</span>
                  <span className="text-base font-bold text-white block">
                    ${insuranceFee.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-grey-60">Estimated annual comprehensive premium</span>
                </div>
              </div>

              {activePricingTab === 'fees' && (
                <p className="text-xs text-grey-60 p-3 bg-grey-08 rounded-xl border border-grey-15 animate-fadeIn">
                  Total estimated additional closing fees: <strong>${totalAdditionalFees.toLocaleString()}</strong>. These are typically paid once at closing through certified escrow.
                </p>
              )}
            </div>

            {/* Monthly Costs */}
            <div className="bg-grey-10 p-6 sm:p-8 rounded-3xl border border-grey-15 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-grey-15">
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Monthly Costs
                </h4>
                <button
                  onClick={() =>
                    setActivePricingTab(activePricingTab === 'monthly' ? null : 'monthly')
                  }
                  className="px-3.5 py-1.5 rounded-lg bg-grey-08 border border-grey-15 text-xs font-semibold text-white hover:border-grey-20 cursor-pointer"
                >
                  {activePricingTab === 'monthly' ? 'Show Less' : 'Learn More'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-grey-08 border border-grey-15 space-y-1">
                  <span className="text-grey-60 block">Property Taxes</span>
                  <span className="text-base font-bold text-white block">
                    ${propertyTaxMonthly.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-grey-60">Estimated monthly property tax assessment</span>
                </div>

                <div className="p-3.5 rounded-xl bg-grey-08 border border-grey-15 space-y-1">
                  <span className="text-grey-60 block">HOA Fee</span>
                  <span className="text-base font-bold text-white block">
                    ${hoaMonthly.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-grey-60">Community maintenance and security</span>
                </div>
              </div>

              {activePricingTab === 'monthly' && (
                <p className="text-xs text-grey-60 p-3 bg-grey-08 rounded-xl border border-grey-15 animate-fadeIn">
                  Monthly recurring non-mortgage carrying cost is approx. <strong>${(propertyTaxMonthly + hoaMonthly).toLocaleString()}/month</strong>.
                </p>
              )}
            </div>

            {/* Total Initial Investment */}
            <div className="bg-grey-10 p-6 sm:p-8 rounded-3xl border border-grey-15 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-grey-15">
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Total Initial Investment
                </h4>
                <button
                  onClick={() =>
                    setActivePricingTab(activePricingTab === 'investment' ? null : 'investment')
                  }
                  className="px-3.5 py-1.5 rounded-lg bg-grey-08 border border-grey-15 text-xs font-semibold text-white hover:border-grey-20 cursor-pointer"
                >
                  {activePricingTab === 'investment' ? 'Show Less' : 'Learn More'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-grey-08 border border-grey-15 space-y-1">
                  <span className="text-grey-60 block">Down Payment (20%)</span>
                  <span className="text-base font-bold text-white block">
                    ${downPayment.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-grey-60">Recommended initial equity</span>
                </div>

                <div className="p-3.5 rounded-xl bg-grey-08 border border-grey-15 space-y-1">
                  <span className="text-grey-60 block">Mortgage Amount (80%)</span>
                  <span className="text-base font-bold text-white block">
                    ${mortgageAmount.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-grey-60">30-year fixed loan balance</span>
                </div>
              </div>
            </div>

            {/* Monthly Expenses */}
            <div className="bg-grey-10 p-6 sm:p-8 rounded-3xl border border-grey-15 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-grey-15">
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Monthly Expenses
                </h4>
                <button
                  onClick={() =>
                    setActivePricingTab(activePricingTab === 'expenses' ? null : 'expenses')
                  }
                  className="px-3.5 py-1.5 rounded-lg bg-grey-08 border border-grey-15 text-xs font-semibold text-white hover:border-grey-20 cursor-pointer"
                >
                  {activePricingTab === 'expenses' ? 'Show Less' : 'Learn More'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-grey-08 border border-grey-15 space-y-1">
                  <span className="text-grey-60 block">Mortgage Payment</span>
                  <span className="text-base font-bold text-white block">
                    ${monthlyMortgage.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-grey-60">Principal + interest payment</span>
                </div>

                <div className="p-3.5 rounded-xl bg-grey-08 border border-grey-15 space-y-1">
                  <span className="text-grey-60 block">Insurance Allocation</span>
                  <span className="text-base font-bold text-white block">
                    $100
                  </span>
                  <span className="text-[11px] text-grey-60">Monthly escrow reserve</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQS */}
      <FAQSection faqs={mockFAQs} />

      {/* 7. CTA BANNER */}
      <CTABanner onExploreClick={() => navigate('/properties')} />
    </div>
  );
};
