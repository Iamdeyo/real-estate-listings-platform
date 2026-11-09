export type PropertyType = 'house' | 'apartment' | 'condo' | 'townhouse' | 'villa' | 'cottage';

export type ListingStatus = 'for-sale' | 'for-rent' | 'sold' | 'pending';

export interface Agent {
  name: string;
  phone: string;
  email: string;
  avatar: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  period?: 'month' | 'year';
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  propertyType: PropertyType;
  status: ListingStatus;
  featured?: boolean;
  images: string[];
  amenities: string[];
  agent: Agent;
  yearBuilt?: number;
  createdAt: string;
}

export interface FilterState {
  searchQuery: string;
  propertyType: string;
  status: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  bathrooms: string;
  sortBy: 'recommended' | 'price-low' | 'price-high' | 'newest';
}

export interface Testimonial {
  id: string;
  title: string;
  quote: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  twitter?: string;
}

export interface ClientCaseStudy {
  id: string;
  name: string;
  since: string;
  domain: string;
  category: string;
  quote: string;
  websiteUrl: string;
}
