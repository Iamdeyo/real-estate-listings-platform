import React, { useState } from 'react';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Heart,
} from 'lucide-react';
import type { Property } from '../types/property';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [contactSuccess, setContactSuccess] = useState(false);

  if (!property) return null;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-grey-10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-grey-15 shadow-2xl flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-5 bg-grey-10/95 backdrop-blur-md border-b border-grey-15">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-purple-60/20 text-purple-75 border border-purple-60/30">
              {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
            </span>
            <span className="text-xs font-semibold text-grey-60 uppercase bg-grey-08 px-3 py-1 rounded-full border border-grey-15">
              {property.propertyType}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onToggleFavorite(property.id, e)}
              className={`p-2.5 rounded-xl border border-grey-15 transition-all ${
                isFavorite
                  ? 'bg-purple-60 text-white border-purple-60'
                  : 'bg-grey-08 text-grey-60 hover:text-white hover:border-grey-20'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-grey-08 border border-grey-15 text-grey-60 hover:text-white hover:border-grey-20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-grey-08 overflow-hidden">
          <img
            src={property.images[activeImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-all duration-500"
          />

          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-grey-08/80 text-white hover:bg-grey-08 border border-grey-15 backdrop-blur-md transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-grey-08/80 text-white hover:bg-grey-08 border border-grey-15 backdrop-blur-md transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-grey-08/90 border border-grey-15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs text-white">
                {activeImageIndex + 1} / {property.images.length}
              </div>
            </>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-7">
          {/* Header & Price */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-grey-15">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {property.title}
              </h2>
              <div className="flex items-center gap-1.5 text-grey-60 text-sm mt-2">
                <MapPin className="w-4 h-4 text-purple-60 shrink-0" />
                <span>
                  {property.address}, {property.city}, {property.state} {property.zipCode}
                </span>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-xs text-grey-60 block">Price</span>
              <div className="text-3xl font-extrabold text-white">
                {formattedPrice}
                {property.period && (
                  <span className="text-sm font-normal text-grey-60">
                    /{property.period}
                  </span>
                )}
              </div>
              <span className="text-xs text-grey-50 mt-1 block">
                Est. Mortgage: ${(property.price * 0.005).toFixed(0)}/mo
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-grey-08 border border-grey-15">
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <Bed className="w-5 h-5 text-purple-60 mb-1.5" />
              <span className="text-lg font-bold text-white">{property.bedrooms}</span>
              <span className="text-xs text-grey-60">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <Bath className="w-5 h-5 text-purple-60 mb-1.5" />
              <span className="text-lg font-bold text-white">{property.bathrooms}</span>
              <span className="text-xs text-grey-60">Bathrooms</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <Square className="w-5 h-5 text-purple-60 mb-1.5" />
              <span className="text-lg font-bold text-white">
                {property.areaSqFt.toLocaleString()}
              </span>
              <span className="text-xs text-grey-60">Square Feet</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <Calendar className="w-5 h-5 text-purple-60 mb-1.5" />
              <span className="text-lg font-bold text-white">
                {property.yearBuilt || '2023'}
              </span>
              <span className="text-xs text-grey-60">Year Built</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-base font-bold text-white mb-2">Description</h4>
            <p className="text-grey-60 leading-relaxed text-sm whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="text-base font-bold text-white mb-3">Key Features & Amenities</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {property.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-grey-08 border border-grey-15 text-xs font-medium text-grey-60"
                >
                  <CheckCircle2 className="w-4 h-4 text-purple-60 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Information Card */}
          <div className="pt-6 border-t border-grey-15">
            <h4 className="text-base font-bold text-white mb-3">Inquire About This Property</h4>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl border border-grey-15 bg-grey-08 gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-purple-60/40"
                />
                <div>
                  <h5 className="font-bold text-white">{property.agent.name}</h5>
                  <p className="text-xs text-grey-60">Estatein Property Specialist</p>
                  <p className="text-xs text-purple-75 mt-0.5">{property.agent.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl border border-grey-15 bg-grey-10 text-white hover:border-grey-20 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{property.agent.phone}</span>
                </a>
                <button
                  onClick={() => setContactSuccess(true)}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-purple-60 text-white hover:bg-purple-65 transition-colors shadow-sm shadow-purple-60/30"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>

            {contactSuccess && (
              <div className="mt-3 p-3 bg-purple-60/10 border border-purple-60/30 rounded-xl text-xs font-medium text-purple-75 text-center">
                Message sent! {property.agent.name} will respond to you shortly.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
