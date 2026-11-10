import type { Property, Testimonial, FAQItem, TeamMember, ClientCaseStudy } from '../types/property';
import rawProperties from './properties.json';

export const mockProperties: Property[] = rawProperties as Property[];

export const mockTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    title: 'Exceptional Service!',
    quote: "Our experience with Verdant Estates was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!",
    author: 'Wade Warren',
    location: 'USA, California',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 'test-2',
    title: 'Efficient and Reliable',
    quote: "Verdant Estates provided us with top-notch service. They helped us find our dream home quickly and guided us through every step. We couldn't be happier with the result.",
    author: 'Emelie Thomson',
    location: 'USA, Florida',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 'test-3',
    title: 'Trusted Advisors',
    quote: 'The Verdant Estates team guided us through the whole selling process. Their market knowledge and expertise was invaluable, and we secured a deal that met all our expectations.',
    author: 'John Mans',
    location: 'USA, Nevada',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
];

export const mockFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I search for properties on Verdant Estates?',
    answer: 'Learn how to use our user-friendly search tools to find properties that match your criteria.',
  },
  {
    id: 'faq-2',
    question: 'What documents do I need to sell my property through Verdant Estates?',
    answer: 'Find out about the necessary documentation for listing your property with us.',
  },
  {
    id: 'faq-3',
    question: 'How can I contact a Verdant Estates agent?',
    answer: 'Discover the different ways you can get in touch with our experienced agents.',
  },
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Max Mitchell',
    role: 'Founder',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    twitter: '@maxmitchell',
  },
  {
    id: 'team-2',
    name: 'Sarah Johnson',
    role: 'Chief Real Estate Officer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    twitter: '@sarahjohnson',
  },
  {
    id: 'team-3',
    name: 'David Brown',
    role: 'Head of Property Management',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    twitter: '@davidbrown',
  },
  {
    id: 'team-4',
    name: 'Michael Turner',
    role: 'Legal Counsel',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    twitter: '@michaelturner',
  },
];

export const mockClients: ClientCaseStudy[] = [
  {
    id: 'client-1',
    name: 'ABC Corporation',
    since: 'Since 2019',
    domain: 'Commercial Real Estate',
    category: 'Luxury Retail Development',
    quote: "Verdant Estates' expertise in commercial leasing helped us expand our flagship stores into 4 new prime metro areas within 12 months. Exceptional professionalism and support throughout.",
    websiteUrl: 'https://example.com',
  },
  {
    id: 'client-2',
    name: 'GreenTech Enterprises',
    since: 'Since 2018',
    domain: 'Commercial Real Estate',
    category: 'Eco-Tech Office Spaces',
    quote: 'Verdant Estates matched us with LEED-certified, sustainable headquarters that reflect our core corporate values. Their market intelligence and negotiation skills were second to none.',
    websiteUrl: 'https://example.com',
  },
];
