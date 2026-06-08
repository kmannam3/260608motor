import React from 'react';
import { Sliders, Zap, ShieldCheck } from 'lucide-react';
import { TranslationSet } from '../types';

interface WhyChooseProps {
  langSet: TranslationSet;
}

export default function WhyChoose({ langSet }: WhyChooseProps) {
  return (
    <section id="advantages" className="bg-[#131313] border-t border-[#1C1D1F] py-20 lg:py-28 relative">
      {/* Structural visual grid overlay */}
      <div 
        className="absolute inset-x-0 top-0 h-[300px] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(to bottom, #C4FF00 1px, transparent 1px)',
          backgroundSize: '100% 16px'
        }}
      ></div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[64px]">
        {/* Header Block split: left title, right description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end border-b border-[#2D2F31] pb-10 mb-16">
          <div className="lg:col-span-7 flex flex-col gap-3 text-left">
            <span className="font-mono text-[11px] font-bold tracking-[0.1em] text-[#C4FF00] uppercase block">
              {langSet.advantages.tag}
            </span>
            <h2 className="font-sans text-[32px] sm:text-[40px] font-extrabold tracking-[-0.02em] text-white leading-tight">
              {langSet.advantages.title}
            </h2>
          </div>
          <div className="lg:col-span-5 text-left lg:text-right">
            <p className="font-sans text-sm sm:text-base text-gray-400 font-medium leading-[1.65] max-w-[460px] lg:ml-auto">
              {langSet.advantages.subtitle}
            </p>
          </div>
        </div>

        {/* 3 Column Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" id="advantages-grid">
          
          {/* Card 1: Customization */}
          <div 
            className="group relative bg-[#1A1C1E] border border-[#2D2F31] p-8 lg:p-10 transition-all duration-300 hover:border-[#C4FF00] hover:translate-y-[-4px] flex flex-col gap-6 text-left overflow-hidden"
            style={{ borderRadius: '0px' }}
            id="advantage-card-custom"
          >
            {/* Real Motor Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" 
              alt="Custom Industrial Motor"
              className="absolute inset-0 w-full h-full object-cover opacity-8 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none z-0 filter grayscale"
              referrerPolicy="no-referrer"
            />
            {/* Dark contrast gradient mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1E] via-[#1A1C1E]/80 to-[#1A1C1E]/30 z-0 pointer-events-none"></div>

            {/* Top tiny lime line on highlight */}
            <div className="absolute top-0 left-0 w-[4px] h-[40px] bg-[#C4FF00] opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="w-12 h-12 bg-[#000000] border border-[#2D2F31] flex items-center justify-center text-[#C4FF00] group-hover:bg-[#C4FF00] group-hover:text-black transition-colors" style={{ borderRadius: '0px' }}>
                <Sliders size={20} strokeWidth={1.8} />
              </div>
              <span className="font-mono text-[10px] text-gray-600 font-medium tracking-[0.2em]">C_OP_01</span>
            </div>

            <div className="flex flex-col gap-3 relative z-10">
              <h3 className="font-sans text-lg lg:text-xl font-bold tracking-tight text-white group-hover:text-[#C4FF00] transition-colors">
                {langSet.advantages.list.customization.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm leading-[1.6] text-gray-400">
                {langSet.advantages.list.customization.desc}
              </p>
            </div>
          </div>

          {/* Card 2: Energy Efficiency */}
          <div 
            className="group relative bg-[#1A1C1E] border border-[#2D2F31] p-8 lg:p-10 transition-all duration-300 hover:border-[#C4FF00] hover:translate-y-[-4px] flex flex-col gap-6 text-left overflow-hidden"
            style={{ borderRadius: '0px' }}
            id="advantage-card-energy"
          >
            {/* Real Motor Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" 
              alt="Energy Efficient Copper Windings"
              className="absolute inset-0 w-full h-full object-cover opacity-8 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none z-0 filter grayscale"
              referrerPolicy="no-referrer"
            />
            {/* Dark contrast gradient mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1E] via-[#1A1C1E]/80 to-[#1A1C1E]/30 z-0 pointer-events-none"></div>

            {/* Top tiny lime line on highlight */}
            <div className="absolute top-0 left-0 w-[4px] h-[40px] bg-[#C4FF00] opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="w-12 h-12 bg-[#000000] border border-[#2D2F31] flex items-center justify-center text-[#C4FF00] group-hover:bg-[#C4FF00] group-hover:text-black transition-colors" style={{ borderRadius: '0px' }}>
                <Zap size={20} strokeWidth={1.8} />
              </div>
              <span className="font-mono text-[10px] text-gray-600 font-medium tracking-[0.2em]">C_OP_02</span>
            </div>

            <div className="flex flex-col gap-3 relative z-10">
              <h3 className="font-sans text-lg lg:text-xl font-bold tracking-tight text-white group-hover:text-[#C4FF00] transition-colors">
                {langSet.advantages.list.energy.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm leading-[1.6] text-gray-400">
                {langSet.advantages.list.energy.desc}
              </p>
            </div>
          </div>

          {/* Card 3: Reliability */}
          <div 
            className="group relative bg-[#1A1C1E] border border-[#2D2F31] p-8 lg:p-10 transition-all duration-300 hover:border-[#C4FF00] hover:translate-y-[-4px] flex flex-col gap-6 text-left overflow-hidden"
            style={{ borderRadius: '0px' }}
            id="advantage-card-reliability"
          >
            {/* Real Motor Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80" 
              alt="Testing Mechanical Durability"
              className="absolute inset-0 w-full h-full object-cover opacity-8 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none z-0 filter grayscale"
              referrerPolicy="no-referrer"
            />
            {/* Dark contrast gradient mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1E] via-[#1A1C1E]/80 to-[#1A1C1E]/30 z-0 pointer-events-none"></div>

            {/* Top tiny lime line on highlight */}
            <div className="absolute top-0 left-0 w-[4px] h-[40px] bg-[#C4FF00] opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="w-12 h-12 bg-[#000000] border border-[#2D2F31] flex items-center justify-center text-[#C4FF00] group-hover:bg-[#C4FF00] group-hover:text-black transition-colors" style={{ borderRadius: '0px' }}>
                <ShieldCheck size={20} strokeWidth={1.8} />
              </div>
              <span className="font-mono text-[10px] text-gray-600 font-medium tracking-[0.2em]">C_OP_03</span>
            </div>

            <div className="flex flex-col gap-3 relative z-10">
              <h3 className="font-sans text-lg lg:text-xl font-bold tracking-tight text-white group-hover:text-[#C4FF00] transition-colors">
                {langSet.advantages.list.reliability.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm leading-[1.6] text-gray-400">
                {langSet.advantages.list.reliability.desc}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
