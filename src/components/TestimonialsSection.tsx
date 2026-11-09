import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import type { Testimonial } from '../types/property';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  return (
    <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-grey-15">
      <SectionHeader
        title="What Our Clients Say"
        subtitle="Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate journey."
        buttonText="View All Testimonials"
      />

      {/* Testimonials Grid / Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-grey-10 rounded-2xl p-6 sm:p-8 border border-grey-15 flex flex-col justify-between hover:border-grey-20 transition-all duration-300"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mb-5">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Title & Quote */}
              <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                {item.title}
              </h4>
              <p className="text-grey-60 text-sm leading-relaxed mb-6">
                "{item.quote}"
              </p>
            </div>

            {/* Author details */}
            <div className="flex items-center gap-3 pt-5 border-t border-grey-15">
              <img
                src={item.avatar}
                alt={item.author}
                className="w-11 h-11 rounded-full object-cover border border-grey-15"
              />
              <div>
                <h5 className="text-sm font-semibold text-white">{item.author}</h5>
                <p className="text-xs text-grey-60">{item.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="mt-8 pt-6 border-t border-grey-15 flex items-center justify-between">
        <span className="text-xs text-grey-60">
          <strong className="text-white">
            {currentPage < 10 ? `0${currentPage}` : currentPage}
          </strong>{' '}
          of {totalPages < 10 ? `0${totalPages}` : totalPages}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-grey-10 border border-grey-15 text-grey-60 hover:text-white hover:border-grey-20 transition-all active:scale-95"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-grey-10 border border-grey-15 text-grey-60 hover:text-white hover:border-grey-20 transition-all active:scale-95"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
