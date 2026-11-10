import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionHeader } from './SectionHeader';
import { CTABanner } from './CTABanner';
import { mockTeamMembers, mockClients } from '../data/mockProperties';
import {
  Star,
  Award,
  Users,
  ShieldCheck,
  Send,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface AboutPageProps {
  onExploreProperties?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onExploreProperties }) => {
  const navigate = useNavigate();
  const [clientPage, setClientPage] = useState(1);
  const totalClientPages = 10;
  const [helloMessageSent, setHelloMessageSent] = useState<string | null>(null);

  const handleExplore = () => {
    if (onExploreProperties) {
      onExploreProperties();
    } else {
      navigate('/properties');
    }
  };

  const values = [
    {
      id: 'trust',
      title: 'Trust',
      icon: Star,
      description:
        'Trust is the cornerstone of every relationship we build. We approach every deal with absolute integrity, transparency, and honesty.',
    },
    {
      id: 'excellence',
      title: 'Excellence',
      icon: Award,
      description:
        'We strive for excellence in everything we do, delivering outstanding results, market analysis, and premium service for our clients.',
    },
    {
      id: 'client-centric',
      title: 'Client-Centric',
      icon: Users,
      description:
        'Your goals and dreams are at the heart of our mission. We provide personalized services tailored to your unique aspirations and lifestyle.',
    },
    {
      id: 'commitment',
      title: 'Our Commitment',
      icon: ShieldCheck,
      description:
        'We are dedicated to providing you with the highest level of service, professional guidance, and continuous support through every transaction.',
    },
  ];

  const achievements = [
    {
      id: 'achieve-1',
      title: '3+ Years of Excellence',
      description:
        'With over three years in the industry, we have amassed a wealth of knowledge and experience, becoming a go-to resource for all things real estate.',
    },
    {
      id: 'achieve-2',
      title: 'Happy Clients',
      description:
        'Our greatest achievement is the satisfaction of our clients. Their success stories and positive feedback fuel our passion for what we do.',
    },
    {
      id: 'achieve-3',
      title: 'Industry Recognition',
      description:
        'We have earned the respect of our peers and industry leaders, garnering accolades and awards that reflect our commitment to excellence.',
    },
  ];

  const steps = [
    {
      step: 'Step 01',
      title: 'Discover a World of Possibilities',
      description:
        'Your journey begins with exploring our carefully curated listings. Use our intuitive search filters to discover properties that align with your lifestyle, preferences, and budget.',
    },
    {
      step: 'Step 02',
      title: 'Narrowing Down Your Choices',
      description:
        'Once you’ve found properties that catch your eye, save them to your favorites or request detailed information packets to compare features, locations, and pricing.',
    },
    {
      step: 'Step 03',
      title: 'Personalized Guidance',
      description:
        'Have questions about a listing? Connect directly with our knowledgeable agents who provide expert insights, schedule private tours, and guide your decisions.',
    },
    {
      step: 'Step 04',
      title: 'See It for Yourself',
      description:
        'Arrange in-person or virtual walkthroughs of your top selections. Experience the neighborhoods, ambiance, and craftsmanship firsthand before making a commitment.',
    },
    {
      step: 'Step 05',
      title: 'Making Informed Decisions',
      description:
        'Before submitting an offer, our team provides comprehensive market analysis, property valuation reports, and neighborhood data to ensure your investment is sound.',
    },
    {
      step: 'Step 06',
      title: 'Getting the Best Deal',
      description:
        'We’ll help you negotiate favorable terms and navigate the closing process with total transparency, escrow protection, and legal verification.',
    },
  ];

  const handleSayHello = (memberName: string) => {
    setHelloMessageSent(memberName);
    setTimeout(() => setHelloMessageSent(null), 3000);
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO / OUR JOURNEY */}
      <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 border-b border-grey-15">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Text & Stats */}
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="text-grey-40 text-xs">✦</span>
                <span className="text-purple-60 text-sm">✦</span>
                <span className="text-grey-40 text-xs">✦</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Our Journey
              </h1>
              <p className="text-grey-60 text-sm sm:text-base mt-4 leading-relaxed">
                Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary. Over the years, we've expanded our reach, forged valuable partnerships, and gained the trust of countless clients.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-grey-15">
              <div className="p-4 sm:p-5 rounded-2xl bg-grey-10 border border-grey-15">
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                  200+
                </span>
                <span className="text-xs text-grey-60 mt-1 block">
                  Happy Customers
                </span>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-grey-10 border border-grey-15">
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                  10k+
                </span>
                <span className="text-xs text-grey-60 mt-1 block">
                  Properties For Clients
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-4 sm:p-5 rounded-2xl bg-grey-10 border border-grey-15">
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                  16+
                </span>
                <span className="text-xs text-grey-60 mt-1 block">
                  Years of Experience
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Container with Model House Asset */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="w-full rounded-3xl border border-grey-15 bg-gradient-to-tr from-grey-10 via-grey-10 to-purple-90/10 p-6 sm:p-10 relative overflow-hidden shadow-2xl flex items-center justify-center">
              {/* Subtle ambient lighting */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-60/20 rounded-full blur-3xl pointer-events-none" />

              <img
                src="/about-hero-hand-transparent.png"
                alt="Hand holding architectural house model"
                className="relative z-10 w-full max-w-md h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR VALUES */}
      <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-grey-15">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
          {/* Left Heading */}
          <div className="w-full lg:w-1/3 space-y-3">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-grey-40 text-xs">✦</span>
              <span className="text-purple-60 text-sm">✦</span>
              <span className="text-grey-40 text-xs">✦</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Our Values
            </h2>
            <p className="text-grey-60 text-sm sm:text-base leading-relaxed">
              Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary.
            </p>
          </div>

          {/* Right 2x2 Values Card Container */}
          <div className="w-full lg:w-2/3 p-4 sm:p-8 rounded-3xl bg-grey-10 border border-grey-15 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {values.map((val) => {
                const Icon = val.icon;
                return (
                  <div key={val.id} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-grey-08 border border-purple-60/40 ring-4 ring-purple-60/10 flex items-center justify-center text-purple-60">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {val.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-grey-60 leading-relaxed pl-1">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR ACHIEVEMENTS */}
      <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-grey-15">
        <SectionHeader
          title="Our Achievements"
          subtitle="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="bg-grey-10 rounded-2xl p-6 sm:p-8 border border-grey-15 hover:border-grey-20 transition-all duration-300"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-grey-60 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NAVIGATING THE VERDANT EXPERIENCE */}
      <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-grey-15">
        <SectionHeader
          title="Navigating the Verdant Experience"
          subtitle="At Verdant Estates, we've designed a straightforward process to guide you through your real estate journey, from discovering properties to closing the deal."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((st) => (
            <div
              key={st.step}
              className="group relative bg-grey-10 rounded-2xl p-6 sm:p-8 border border-grey-15 hover:border-purple-60/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Subtle purple gradient highlight top line */}
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-purple-60/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <span className="text-xs font-semibold text-purple-75 tracking-wider uppercase block mb-3">
                  {st.step}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mb-3 leading-snug">
                  {st.title}
                </h4>
                <p className="text-sm text-grey-60 leading-relaxed">
                  {st.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MEET THE VERDANT TEAM */}
      <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-grey-15">
        <SectionHeader
          title="Meet the Verdant Team"
          subtitle="At Verdant Estates, our success is driven by the dedication and expertise of our team. Meet the passionate individuals working behind the scenes."
        />

        {/* 4 Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTeamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-grey-10 rounded-2xl p-4 sm:p-5 border border-grey-15 hover:border-grey-20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image container with Twitter badge */}
                <div className="relative aspect-[4/4] rounded-xl overflow-hidden bg-grey-08 mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Twitter / Social Badge */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 p-2 rounded-full bg-purple-60 text-white shadow-md">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                </div>

                {/* Name & Role */}
                <div className="text-center my-2">
                  <h4 className="text-base font-bold text-white">{member.name}</h4>
                  <p className="text-xs text-grey-60 mt-0.5">{member.role}</p>
                </div>
              </div>

              {/* "Say Hello 👋" Action pill */}
              <div className="mt-4 pt-3 border-t border-grey-15">
                <button
                  onClick={() => handleSayHello(member.name)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-grey-08 border border-grey-15 hover:border-purple-60/50 text-xs font-medium text-white transition-all cursor-pointer group"
                >
                  <span>Say Hello 👋</span>
                  <div className="w-6 h-6 rounded-full bg-purple-60 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <Send className="w-3 h-3" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {helloMessageSent && (
          <div className="mt-4 p-3 bg-purple-60/15 border border-purple-60/30 text-purple-75 rounded-xl text-center text-xs font-semibold animate-fadeIn max-w-md mx-auto">
            ✓ Message sent to {helloMessageSent}!
          </div>
        )}
      </section>

      {/* 6. OUR VALUED CLIENTS */}
      <section className="w-full max-w-[1280px] 2xl:max-w-[1596px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <SectionHeader
          title="Our Valued Clients"
          subtitle="At Verdant Estates, we have had the privilege of working with a diverse range of clients across various industries. Here are some of the clients we've served."
        />

        {/* 2 Case Study Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {mockClients.map((client) => (
            <div
              key={client.id}
              className="bg-grey-10 rounded-2xl p-6 sm:p-8 border border-grey-15 hover:border-grey-20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Row: Since, Company Name, Visit Website */}
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-grey-15">
                  <div>
                    <span className="text-xs text-grey-60 font-medium block">
                      {client.since}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      {client.name}
                    </h3>
                  </div>

                  <a
                    href={client.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-grey-08 border border-grey-15 text-white hover:border-grey-20 text-xs font-semibold transition-all"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-grey-40" />
                  </a>
                </div>

                {/* Details Grid: Domain & Category */}
                <div className="grid grid-cols-2 gap-4 py-5 border-b border-grey-15">
                  <div>
                    <span className="text-xs text-grey-60 block">Domain</span>
                    <span className="text-sm font-semibold text-white mt-0.5 block">
                      {client.domain}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-grey-60 block">Category</span>
                    <span className="text-sm font-semibold text-white mt-0.5 block">
                      {client.category}
                    </span>
                  </div>
                </div>

                {/* Quote Box */}
                <div className="mt-5 p-5 rounded-xl bg-grey-08 border border-grey-15 space-y-2">
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <span>What They Said</span>
                    <span>💬</span>
                  </span>
                  <p className="text-xs sm:text-sm text-grey-60 leading-relaxed italic">
                    "{client.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-10 pt-6 border-t border-grey-15 flex items-center justify-between">
          <span className="text-xs text-grey-60">
            <strong className="text-white">
              {clientPage < 10 ? `0${clientPage}` : clientPage}
            </strong>{' '}
            of {totalClientPages < 10 ? `0${totalClientPages}` : totalClientPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setClientPage((prev) => (prev > 1 ? prev - 1 : totalClientPages))
              }
              className="p-2.5 rounded-full bg-grey-10 border border-grey-15 text-grey-60 hover:text-white hover:border-grey-20 transition-all active:scale-95 cursor-pointer"
              aria-label="Previous clients"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setClientPage((prev) => (prev < totalClientPages ? prev + 1 : 1))
              }
              className="p-2.5 rounded-full bg-grey-10 border border-grey-15 text-grey-60 hover:text-white hover:border-grey-20 transition-all active:scale-95 cursor-pointer"
              aria-label="Next clients"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <CTABanner onExploreClick={handleExplore} />
    </div>
  );
};
