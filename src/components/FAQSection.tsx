import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import type { FAQItem } from '../types/property';

interface FAQSectionProps {
  faqs: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  return (
    <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-grey-15">
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way."
        buttonText="View All FAQs"
      />

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faqs.map((item) => (
          <div
            key={item.id}
            className="bg-grey-10 rounded-2xl p-6 sm:p-8 border border-grey-15 flex flex-col justify-between hover:border-grey-20 transition-all duration-300"
          >
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-3 line-clamp-2">
                {item.question}
              </h4>
              <p className="text-grey-60 text-sm leading-relaxed mb-6">
                {item.answer}
              </p>
              {expandedId === item.id && (
                <p className="text-grey-50 text-xs leading-relaxed mb-4 p-3 bg-grey-08 rounded-xl border border-grey-15">
                  Our comprehensive platform guides you through filtering by budget, verified agent consultations, escrow protection, and legal verification for every listed property.
                </p>
              )}
            </div>

            <div>
              <button
                onClick={() =>
                  setExpandedId((prev) => (prev === item.id ? null : item.id))
                }
                className="px-4 py-2.5 rounded-xl bg-grey-08 border border-grey-15 text-white hover:border-grey-20 text-xs font-semibold transition-all"
              >
                {expandedId === item.id ? 'Show Less' : 'Read More'}
              </button>
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
            aria-label="Previous FAQs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-grey-10 border border-grey-15 text-grey-60 hover:text-white hover:border-grey-20 transition-all active:scale-95"
            aria-label="Next FAQs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
