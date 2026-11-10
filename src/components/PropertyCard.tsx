import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bed, Bath, Building, Heart } from 'lucide-react';
import type { Property } from '../types/property';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelect?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) => {
  const navigate = useNavigate();

  const formattedPrice = `₦${property.price.toLocaleString('en-US')}`;

  const formatPropertyType = (type: string) => {
    switch (type) {
      case 'detached-duplex':
        return 'Detached Duplex';
      case 'terraced-duplex':
        return 'Terraced Duplex';
      case 'semi-detached':
        return 'Semi-Detached';
      case 'apartment':
        return 'Apartment';
      default:
        return type.replace('-', ' ');
    }
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(property);
    }
    navigate(`/properties/${property.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-grey-10 rounded-2xl p-5 sm:p-6 border border-grey-15 hover:border-grey-20 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Property Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-grey-08 mb-5">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Favorite Button */}
          <button
            onClick={(e) => onToggleFavorite(property.id, e)}
            className={`absolute top-3 right-3 p-2.5 rounded-full border border-grey-15 backdrop-blur-md transition-all duration-200 cursor-pointer ${
              isFavorite
                ? 'bg-purple-60 text-white border-purple-60'
                : 'bg-grey-08/80 text-white hover:text-purple-60 hover:bg-grey-08'
            }`}
            aria-label="Save Property"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title and Description */}
        <div className="space-y-2 mb-5">
          <h3 className="font-bold text-lg text-white group-hover:text-purple-60 transition-colors line-clamp-1">
            {property.title}
          </h3>

          <p className="text-xs sm:text-sm text-grey-60 line-clamp-2 leading-relaxed">
            {property.description}
            <span className="text-white hover:text-purple-60 ml-1 font-medium cursor-pointer">
              Read More
            </span>
          </p>
        </div>

        {/* Specs Pills Row: Bedroom, Bathroom, Type */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-grey-08 border border-grey-15 text-grey-60">
            <Bed className="w-3.5 h-3.5 text-white shrink-0" />
            <span>{property.bedrooms}-Bedroom</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-grey-08 border border-grey-15 text-grey-60">
            <Bath className="w-3.5 h-3.5 text-white shrink-0" />
            <span>{property.bathrooms}-Bathroom</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-grey-08 border border-grey-15 text-grey-60">
            <Building className="w-3.5 h-3.5 text-white shrink-0" />
            <span>{formatPropertyType(property.propertyType)}</span>
          </div>
        </div>
      </div>

      {/* Footer: Price & CTA Button */}
      <div className="mt-6 pt-5 border-t border-grey-15 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-grey-60 block font-medium">Price</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-bold text-white">
              {formattedPrice}
            </span>
            {property.period && (
              <span className="text-xs text-grey-60">/{property.period}</span>
            )}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="px-4 py-2.5 bg-purple-60 hover:bg-purple-65 active:scale-95 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-purple-60/20 cursor-pointer"
        >
          View Property Details
        </button>
      </div>
    </div>
  );
};
