import React from 'react';
import { Home, Landmark, Building2, Sun, ArrowUpRight } from 'lucide-react';

interface ServiceCardsProps {
  onCardClick?: (serviceId: string) => void;
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({ onCardClick }) => {
  const services = [
    {
      id: 'dream-home',
      title: 'Find Your Dream Home',
      icon: Home,
    },
    {
      id: 'property-value',
      title: 'Unlock Property Value',
      icon: Landmark,
    },
    {
      id: 'property-management',
      title: 'Effortless Property Management',
      icon: Building2,
    },
    {
      id: 'smart-investments',
      title: 'Smart Investments, Informed Decisions',
      icon: Sun,
    },
  ];

  return (
    <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 lg:-mt-14 relative z-20 mb-20">
      {/* Outer Card Container from Figma */}
      <div className="bg-grey-10 p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border border-grey-15 shadow-2xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onCardClick?.(item.id)}
                className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-grey-08 border border-grey-15 hover:border-grey-20 hover:bg-grey-10/70 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[140px] sm:min-h-[175px]"
              >
                {/* Top Row: Concentric Circular Icon + Top-Right Arrow */}
                <div className="flex items-start justify-between">
                  {/* Concentric Glowing Purple Rings */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-purple-60/20 blur-xs scale-125" />
                    <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-grey-08 border border-purple-60/40 ring-4 ring-purple-60/10 flex items-center justify-center text-purple-60 group-hover:bg-purple-60 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>

                  {/* Top-Right Arrow Indicator */}
                  <div className="text-grey-40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="mt-4 sm:mt-6 text-xs sm:text-sm font-semibold text-white group-hover:text-purple-75 transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
