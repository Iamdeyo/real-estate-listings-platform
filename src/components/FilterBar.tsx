import React, { useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import type { FilterState } from '../types/property';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount: number;
}

const PROPERTY_TYPES = [
  { value: 'all', label: 'All Properties' },
  { value: 'house', label: 'Houses' },
  { value: 'apartment', label: 'Apartments' },
  { value: 'condo', label: 'Condos' },
  { value: 'townhouse', label: 'Townhouses' },
  { value: 'villa', label: 'Villas' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  totalCount,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      propertyType: 'all',
      status: 'all',
      minPrice: 0,
      maxPrice: 3000000,
      bedrooms: 'all',
      bathrooms: 'all',
      sortBy: 'recommended',
    });
  };

  const isFiltered =
    filters.searchQuery !== '' ||
    filters.propertyType !== 'all' ||
    filters.status !== 'all' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 3000000 ||
    filters.bedrooms !== 'all' ||
    filters.bathrooms !== 'all' ||
    filters.sortBy !== 'recommended';

  return (
    <div className="bg-grey-10 rounded-2xl p-4 sm:p-6 border border-grey-15 mb-8 space-y-5">
      {/* Search & Actions Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-grey-40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
            }
            placeholder="Search for a property, city, or location..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white placeholder:text-grey-40 focus:outline-none focus:border-purple-60 focus:ring-1 focus:ring-purple-60 transition-all"
          />
        </div>

        {/* Quick status tabs: All / For Sale / For Rent */}
        <div className="flex bg-grey-08 p-1.5 rounded-xl border border-grey-15">
          {[
            { id: 'all', label: 'All' },
            { id: 'for-sale', label: 'For Sale' },
            { id: 'for-rent', label: 'For Rent' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() =>
                setFilters((prev) => ({ ...prev, status: item.id }))
              }
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filters.status === item.id
                  ? 'bg-grey-15 text-white border border-grey-20 shadow-xs'
                  : 'text-grey-60 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <select
          value={filters.sortBy}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              sortBy: e.target.value as FilterState['sortBy'],
            }))
          }
          className="px-4 py-3 rounded-xl bg-grey-08 border border-grey-15 text-sm font-medium text-white focus:outline-none focus:border-purple-60 cursor-pointer"
        >
          <option value="recommended">Sort: Recommended</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest Listed</option>
        </select>

        {/* Toggle Filters Button */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all ${
            showAdvanced || isFiltered
              ? 'border-purple-60 text-purple-60 bg-purple-60/10'
              : 'border-grey-15 bg-grey-08 text-white hover:border-grey-20'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>

        {/* Reset Filter Button */}
        {isFiltered && (
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-1.5 px-3.5 py-3 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Property Type Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {PROPERTY_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() =>
              setFilters((prev) => ({ ...prev, propertyType: type.value }))
            }
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
              filters.propertyType === type.value
                ? 'bg-purple-60 text-white border-purple-60 shadow-xs'
                : 'bg-grey-08 text-grey-60 border-grey-15 hover:text-white hover:border-grey-20'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Advanced Filter Collapsible Area */}
      {showAdvanced && (
        <div className="pt-4 border-t border-grey-15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {/* Bedrooms */}
          <div>
            <label className="block text-xs font-semibold uppercase text-grey-60 mb-2">
              Bedrooms
            </label>
            <select
              value={filters.bedrooms}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, bedrooms: e.target.value }))
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white focus:outline-none focus:border-purple-60"
            >
              <option value="all">Any Bedrooms</option>
              <option value="1">1+ Bedrooms</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
            </select>
          </div>

          {/* Bathrooms */}
          <div>
            <label className="block text-xs font-semibold uppercase text-grey-60 mb-2">
              Bathrooms
            </label>
            <select
              value={filters.bathrooms}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, bathrooms: e.target.value }))
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-grey-08 border border-grey-15 text-sm text-white focus:outline-none focus:border-purple-60"
            >
              <option value="all">Any Bathrooms</option>
              <option value="1">1+ Bathrooms</option>
              <option value="2">2+ Bathrooms</option>
              <option value="3">3+ Bathrooms</option>
              <option value="4">4+ Bathrooms</option>
            </select>
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-xs font-semibold uppercase text-grey-60 mb-2">
              Max Price: ${filters.maxPrice.toLocaleString()}
            </label>
            <input
              type="range"
              min="50000"
              max="3000000"
              step="50000"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  maxPrice: Number(e.target.value),
                }))
              }
              className="w-full h-2 bg-grey-08 rounded-lg appearance-none cursor-pointer accent-purple-60"
            />
          </div>
        </div>
      )}

      {/* Footer stats */}
      <div className="flex items-center justify-between text-xs text-grey-60 pt-1">
        <span>
          Showing <strong className="text-white">{totalCount}</strong> listings
        </span>
      </div>
    </div>
  );
};
