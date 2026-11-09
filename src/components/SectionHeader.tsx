import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
      <div className="max-w-2xl">
        {/* Star Sparkle Cluster from Figma design */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-grey-40 text-xs">✦</span>
          <span className="text-purple-60 text-sm">✦</span>
          <span className="text-grey-40 text-xs">✦</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
          {title}
        </h2>
        <p className="text-grey-60 text-sm sm:text-base mt-2 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {buttonText && (
        <button
          onClick={onButtonClick}
          className="self-start sm:self-auto shrink-0 px-5 py-3 rounded-xl bg-grey-10 border border-grey-15 text-white hover:border-grey-20 hover:bg-grey-15 text-xs sm:text-sm font-semibold transition-all"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};
