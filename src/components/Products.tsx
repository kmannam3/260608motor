import React from 'react';
import { TranslationSet } from '../types';

interface ProductsProps {
  langSet: TranslationSet;
}

export default function Products({ langSet }: ProductsProps) {
  const handleScrollToForm = () => {
    const el = document.getElementById('consulting');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="bg-[#000000] border-t border-[#2D2F31] py-20 lg:py-28 relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[64px]">
        
        {/* Title Block */}
        <div className="flex flex-col gap-3 text-left mb-16">
          <span className="font-mono text-[11px] font-bold tracking-[0.1em] text-[#C4FF00] uppercase block">
            {langSet.products.tag}
          </span>
          <h2 className="font-sans text-[32px] sm:text-[40px] font-extrabold tracking-[-0.02em] text-white">
            {langSet.products.title}
          </h2>
        </div>

        {/* 3 Column Grid for Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Product 1: LV/HV Motors */}
          <div className="bg-[#1A1C1E] border border-[#2D2F31] flex flex-col group h-full hover:border-[#C4FF00] transition-colors duration-300 relative overflow-hidden" style={{ borderRadius: '0px' }}>
            {/* Image container with 10px technical grid background */}
            <div 
              className="h-[210px] w-full border-b border-[#2D2F31] relative flex items-center justify-center overflow-hidden bg-[#0A0B0C]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(196,255,0,0.025) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(196,255,0,0.025) 1px, transparent 1px)
                `,
                backgroundSize: '10px 10px'
              }}
            >
              {/* Real Motor Background Image */}
              <img 
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80" 
                alt="LV/HV Motor Real Details"
                className="absolute inset-0 w-full h-full object-cover opacity-12 group-hover:opacity-25 transition-all duration-500 pointer-events-none mix-blend-screen filter grayscale z-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0C] via-transparent to-[#0A0B0C]/40 z-0 pointer-events-none"></div>

              {/* LV/HV Motor SVG schematic */}
              <svg viewBox="0 0 200 120" className="w-[60%] h-[60%] filter drop-shadow-[0_0_8px_rgba(255,255,255,0.05)] text-gray-500 relative z-10">
                {/* Motor Main Cylinder body */}
                <rect x="50" y="30" width="90" height="60" fill="#2d3033" stroke="#5C6065" strokeWidth="1.5" />
                {/* Fins representing heat dissipation */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={i} x1={58 + i * 10} y1="20" x2={58 + i * 10} y2="100" stroke="#4C5055" strokeWidth="1.5" />
                ))}
                <rect x="50" y="24" width="90" height="6" fill="#1C1E20" stroke="#4C5055" strokeWidth="1" />
                <rect x="50" y="90" width="90" height="6" fill="#1C1E20" stroke="#4C5055" strokeWidth="1" />
                
                {/* Shaft extending left & right */}
                <rect x="20" y="54" width="30" height="12" fill="#5C6065" stroke="#7C8085" strokeWidth="1" />
                <rect x="140" y="52" width="16" height="16" fill="#3D4043" stroke="#5C6065" strokeWidth="1.5" />
                <circle cx="148" cy="60" r="4" fill="#C4FF00" />

                {/* Base Mounting Feet */}
                <rect x="40" y="96" width="16" height="10" fill="#1A1C1E" stroke="#5C6065" strokeWidth="1" />
                <rect x="134" y="96" width="16" height="10" fill="#1A1C1E" stroke="#5C6065" strokeWidth="1" />
                {/* Connection Box at top */}
                <rect x="80" y="14" width="30" height="10" fill="#1C1E20" stroke="#C4FF00" strokeWidth="1" />
                <circle cx="95" cy="19" r="2" fill="#C4FF00" />
              </svg>
              {/* Label metadata watermark */}
              <span className="absolute bottom-3 left-4 font-mono text-[9px] text-[#C4FF00]/40 font-bold tracking-widest relative z-10">CAD_REF_MOD_X1</span>
            </div>

            {/* Content area */}
            <div className="p-8 flex flex-col justify-between flex-grow text-left relative z-10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-lg lg:text-xl font-extrabold text-white group-hover:text-[#C4FF00] transition-colors" id="products-lvhv-title">
                    {langSet.products.list.lvhv.title}
                  </h3>
                  <span className="border border-[#C4FF00]/30 font-mono text-[9px] text-[#C4FF00] px-2 py-0.5" style={{ borderRadius: '0px' }}>
                    {langSet.products.list.lvhv.tag}
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-[1.6]">
                  {langSet.products.list.lvhv.desc}
                </p>
              </div>

              <div className="pt-8">
                <button
                  onClick={handleScrollToForm}
                  className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-[11px] font-bold text-[#C4FF00] tracking-wider uppercase bg-transparent border-none p-0 hover:text-white transition-colors"
                >
                  {langSet.products.specsLink} <span className="text-sm font-sans">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product 2: Explosion Proof */}
          <div className="bg-[#1A1C1E] border border-[#2D2F31] flex flex-col group h-full hover:border-[#C4FF00] transition-colors duration-300 relative overflow-hidden" style={{ borderRadius: '0px' }}>
            {/* Image container with 10px technical grid background */}
            <div 
              className="h-[210px] w-full border-b border-[#2D2F31] relative flex items-center justify-center overflow-hidden bg-[#0A0B0C]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(196,255,0,0.025) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(196,255,0,0.025) 1px, transparent 1px)
                `,
                backgroundSize: '10px 10px'
              }}
            >
              {/* Real Motor Background Image */}
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80" 
                alt="Explosion Proof Heavy Armour Details"
                className="absolute inset-0 w-full h-full object-cover opacity-12 group-hover:opacity-25 transition-all duration-500 pointer-events-none mix-blend-screen filter grayscale z-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0C] via-transparent to-[#0A0B0C]/40 z-0 pointer-events-none"></div>

              {/* Explosion Proof Motor SVG */}
              <svg viewBox="0 0 200 120" className="w-[60%] h-[60%] filter drop-shadow-[0_0_8px_rgba(196,255,0,0.05)] relative z-10">
                {/* Armored body base design */}
                <rect x="44" y="34" width="102" height="54" fill="#202224" stroke="#505459" strokeWidth="1.5" />
                {/* Bolted heavy flange lines */}
                <line x1="44" y1="34" x2="44" y2="88" stroke="#F39C12" strokeWidth="3" />
                <line x1="146" y1="34" x2="146" y2="88" stroke="#F39C12" strokeWidth="3" />
                {/* Armored reinforcement bars */}
                <rect x="56" y="38" width="78" height="8" rx="1" fill="#151718" stroke="#404448" strokeWidth="1" />
                <rect x="56" y="74" width="78" height="8" rx="1" fill="#151718" stroke="#404448" strokeWidth="1" />
                
                {/* Thick shaft */}
                <rect x="15" y="55" width="30" height="10" fill="#505459" stroke="#707479" strokeWidth="1" />
                
                {/* Heavy Terminal connection dome (ATEX certified box) */}
                <polygon points="80,18 110,18 116,34 74,34" fill="#2C3E50" stroke="#F39C12" strokeWidth="1.5" />
                <circle cx="95" cy="26" r="3" fill="#F39C12" />

                {/* Ex yellow hazard strips */}
                <line x1="82" y1="21" x2="90" y2="29" stroke="#F39C12" strokeWidth="1.5" />
                <line x1="92" y1="21" x2="100" y2="29" stroke="#F39C12" strokeWidth="1.5" />
              </svg>
              <span className="absolute bottom-3 left-4 font-mono text-[9px] text-[#C4FF00]/40 font-bold tracking-widest relative z-10">ATEX_CERT_P02</span>
            </div>

            {/* Content area */}
            <div className="p-8 flex flex-col justify-between flex-grow text-left relative z-10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-lg lg:text-xl font-extrabold text-white group-hover:text-[#C4FF00] transition-colors" id="products-explosion-title">
                    {langSet.products.list.explosion.title}
                  </h3>
                  <span className="border border-[#C4FF00]/30 font-mono text-[9px] text-[#C4FF00] px-2 py-0.5" style={{ borderRadius: '0px' }}>
                    {langSet.products.list.explosion.tag}
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-[1.6]">
                  {langSet.products.list.explosion.desc}
                </p>
              </div>

              <div className="pt-8">
                <button
                  onClick={handleScrollToForm}
                  className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-[11px] font-bold text-[#C4FF00] tracking-wider uppercase bg-transparent border-none p-0 hover:text-white transition-colors"
                >
                  {langSet.products.specsLink} <span className="text-sm font-sans">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product 3: Permanent Magnet */}
          <div className="bg-[#1A1C1E] border border-[#2D2F31] flex flex-col group h-full hover:border-[#C4FF00] transition-colors duration-300 relative overflow-hidden" style={{ borderRadius: '0px' }}>
            {/* Image container with 10px technical grid background */}
            <div 
              className="h-[210px] w-full border-b border-[#2D2F31] relative flex items-center justify-center overflow-hidden bg-[#0A0B0C]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(196,255,0,0.025) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(196,255,0,0.025) 1px, transparent 1px)
                `,
                backgroundSize: '10px 10px'
              }}
            >
              {/* Real Motor Background Image */}
              <img 
                src="https://images.unsplash.com/photo-1610513320995-1ad4b1017902?auto=format&fit=crop&w=500&q=80" 
                alt="Permanent Magnet Compact Core Details"
                className="absolute inset-0 w-full h-full object-cover opacity-12 group-hover:opacity-25 transition-all duration-500 pointer-events-none mix-blend-screen filter grayscale z-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0C] via-transparent to-[#0A0B0C]/40 z-0 pointer-events-none"></div>

              {/* Permanent Magnet Synchronous Motor SVG */}
              <svg viewBox="0 0 200 120" className="w-[60%] h-[60%] filter drop-shadow-[0_0_10px_rgba(196,255,0,0.1)] relative z-10">
                {/* Round style compact design */}
                <circle cx="100" cy="60" r="42" fill="#1F2022" stroke="#4C5055" strokeWidth="1.5" />
                <circle cx="100" cy="60" r="32" fill="#2A2C2E" stroke="#C4FF00" strokeWidth="1" strokeDasharray="10 5" />
                
                {/* Radial PM poles blocks */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 45 * Math.PI) / 180;
                  const x = 100 + Math.cos(angle) * 32;
                  const y = 60 + Math.sin(angle) * 32;
                  return (
                    <circle key={i} cx={x} cy={y} r="2.5" fill="#C4FF00" />
                  );
                })}

                {/* Core Shaft */}
                <circle cx="100" cy="60" r="14" fill="#0E0F10" stroke="#7C8085" strokeWidth="1.5" />
                <rect x="97" y="55" width="6" height="10" fill="#7C8085" />
                <circle cx="100" cy="60" r="4" fill="#C4FF00" />

                {/* Mounting Base bracket */}
                <rect x="76" y="96" width="48" height="6" fill="#1C1D1F" stroke="#4C5055" strokeWidth="1" />
              </svg>
              <span className="absolute bottom-3 left-4 font-mono text-[9px] text-[#C4FF00]/40 font-bold tracking-widest relative z-10">PM_ULTRA_S03</span>
            </div>

            {/* Content area */}
            <div className="p-8 flex flex-col justify-between flex-grow text-left relative z-10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-lg lg:text-xl font-extrabold text-white group-hover:text-[#C4FF00] transition-colors" id="products-pm-title">
                    {langSet.products.list.pm.title}
                  </h3>
                  <span className="border border-[#C4FF00]/30 font-mono text-[9px] text-[#C4FF00] px-2 py-0.5" style={{ borderRadius: '0px' }}>
                    {langSet.products.list.pm.tag}
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-[1.6]">
                  {langSet.products.list.pm.desc}
                </p>
              </div>

              <div className="pt-8">
                <button
                  onClick={handleScrollToForm}
                  className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-[11px] font-bold text-[#C4FF00] tracking-wider uppercase bg-transparent border-none p-0 hover:text-white transition-colors"
                >
                  {langSet.products.specsLink} <span className="text-sm font-sans">→</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
