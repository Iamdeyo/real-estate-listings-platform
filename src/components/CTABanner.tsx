import React from 'react';

interface CTABannerProps {
  onExploreClick: () => void;
}

export const CTABanner: React.FC<CTABannerProps> = ({ onExploreClick }) => {
  return (
    <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-grey-10 border border-grey-15 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
        {/* Subtle background abstract pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#703BF7_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative z-10 max-w-2xl space-y-4 text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
            Start Your Real Estate Journey Today
          </h2>
          <p className="text-grey-60 text-sm sm:text-base leading-relaxed">
            Your dream property is just a click away. Whether you're looking for a new home, strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance.
          </p>
        </div>

        <div className="relative z-10 shrink-0 w-full lg:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full lg:w-auto px-8 py-4 rounded-xl bg-purple-60 hover:bg-purple-65 text-white font-semibold text-sm transition-all shadow-xl shadow-purple-60/25 active:scale-95"
          >
            Explore Properties
          </button>
        </div>
      </div>
    </section>
  );
};
