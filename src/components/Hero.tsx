import React from 'react';
import { motion } from 'motion/react';
import { TranslationSet } from '../types';

interface HeroProps {
  langSet: TranslationSet;
}

export default function Hero({ langSet }: HeroProps) {
  const handleScrollToForm = () => {
    const form = document.getElementById('consulting');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToProducts = () => {
    const products = document.getElementById('products');
    if (products) {
      products.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-72px)] flex items-center bg-[#000000] overflow-hidden py-16 lg:py-24">
      {/* Background Video with instant loading and seamless replay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-80"
          id="hero-bg-video"
        >
          <source src="https://res.cloudinary.com/dw5ce5zsh/video/upload/v1780972637/20260609_%EB%AA%A8%ED%84%B0_baq4qh.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      {/* Background Technical Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C4FF00 1px, transparent 1px),
            linear-gradient(to bottom, #C4FF00 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
        id="hero-grid"
      ></div>

      {/* Visual Dot Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-radial-at-c from-transparent via-[#000000]/80 to-[#000000]"></div>

      <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-[64px] relative z-10">
        
        {/* Text Content */}
        <div className="max-w-[800px] flex flex-col gap-6 lg:gap-8 text-left py-12">
          
          {/* Label with Green Bar */}
          <div className="flex items-center gap-3" id="hero-tag">
            <span className="w-1 h-5 bg-[#C4FF00]" style={{ borderRadius: '0px' }}></span>
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.15em] text-[#C4FF00] uppercase">
              {langSet.hero.tag}
            </span>
          </div>

          {/* Core Headline */}
          <div className="flex flex-col gap-3" id="hero-headline">
            <h1 className="font-sans text-[36px] sm:text-[44px] lg:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.2] text-white">
              {langSet.hero.titleLine1.split('\n').map((line, idx) => (
                <span key={idx} className="block mb-1 sm:mb-2">
                  {line}
                </span>
              ))}
              <span className="text-[#C4FF00] italic font-black block mb-1 sm:mb-2">
                {langSet.hero.titleHighlight}
              </span>
              <span className="block">
                {langSet.hero.titleLine2}
              </span>
            </h1>
          </div>

          {/* Subheading Description */}
          <p className="font-sans text-sm sm:text-base lg:text-[17px] font-normal leading-[1.65] text-gray-400 max-w-[620px] lg:max-w-[560px]" id="hero-subheading">
            {langSet.hero.subtitle}
          </p>

          {/* Buttons Area */}
          <div className="flex flex-col sm:flex-row gap-4" id="hero-actions">
            <button
              onClick={handleScrollToForm}
              className="bg-[#C4FF00] cursor-pointer hover:bg-white text-black font-sans text-xs sm:text-[13px] font-extrabold tracking-wider px-8 py-4 uppercase transition-all duration-300 text-center active:scale-[0.98]"
              style={{ borderRadius: '0px' }}
              id="hero-cta-primary"
            >
              {langSet.hero.ctaPrimary}
            </button>
            <button
              onClick={handleScrollToProducts}
              className="border border-white/40 cursor-pointer hover:border-[#C4FF00] hover:text-[#C4FF00] text-white font-sans text-xs sm:text-[13px] font-bold tracking-wider px-8 py-4 uppercase transition-all duration-300 text-center bg-transparent active:scale-[0.98]"
              style={{ borderRadius: '0px' }}
              id="hero-cta-secondary"
            >
              {langSet.hero.ctaSecondary}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
