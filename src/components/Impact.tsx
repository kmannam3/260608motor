import React, { useState } from 'react';
import { Network, Server, Activity } from 'lucide-react';
import { TranslationSet } from '../types';

interface ImpactProps {
  langSet: TranslationSet;
}

export default function Impact({ langSet }: ImpactProps) {
  const [activeCase, setActiveCase] = useState<number>(0);

  return (
    <section id="usecases" className="bg-[#131313] border-t border-[#2D2F31] py-20 lg:py-28 relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[64px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Wording & Active selections */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] font-bold tracking-[0.1em] text-[#C4FF00] uppercase block">
                {langSet.impact.tag}
              </span>
              <h2 className="font-sans text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold tracking-[-0.027em] text-white leading-[1.12]" style={{ whiteSpace: 'pre-line' }}>
                {langSet.impact.title}
              </h2>
            </div>

            {/* List with selection items */}
            <div className="flex flex-col gap-4" id="impact-options-list">
              
              {/* Option 1 */}
              <div 
                onClick={() => setActiveCase(0)}
                className={`p-6 border transition-all duration-300 cursor-pointer flex gap-4 text-left select-none relative ${
                  activeCase === 0 
                  ? 'bg-[#1A1C1E] border-[#C4FF00]' 
                  : 'bg-[#151515]/40 border-[#2D2F31] hover:border-white/25'
                }`}
                style={{ borderRadius: '0px' }}
                id="usecase-item-0"
              >
                <div className={`w-10 h-10 flex items-center justify-center border transition-all ${
                  activeCase === 0 ? 'bg-[#C4FF00] text-black border-transparent' : 'bg-transparent text-gray-400 border-[#2D2F31]'
                }`} style={{ borderRadius: '0px' }}>
                  <Server size={18} />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className={`font-sans text-[15px] sm:text-base font-bold ${activeCase === 0 ? 'text-white' : 'text-gray-400'}`}>
                    {langSet.impact.list.pumps.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-gray-500 font-medium">
                    {langSet.impact.list.pumps.desc}
                  </p>
                </div>
              </div>

              {/* Option 2 */}
              <div 
                onClick={() => setActiveCase(1)}
                className={`p-6 border transition-all duration-300 cursor-pointer flex gap-4 text-left select-none relative ${
                  activeCase === 1 
                  ? 'bg-[#1A1C1E] border-[#C4FF00]' 
                  : 'bg-[#151515]/40 border-[#2D2F31] hover:border-white/25'
                }`}
                style={{ borderRadius: '0px' }}
                id="usecase-item-1"
              >
                <div className={`w-10 h-10 flex items-center justify-center border transition-all ${
                  activeCase === 1 ? 'bg-[#C4FF00] text-black border-transparent' : 'bg-transparent text-gray-400 border-[#2D2F31]'
                }`} style={{ borderRadius: '0px' }}>
                  <Network size={18} />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className={`font-sans text-[15px] sm:text-base font-bold ${activeCase === 1 ? 'text-white' : 'text-gray-400'}`}>
                    {langSet.impact.list.automation.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-gray-500 font-medium">
                    {langSet.impact.list.automation.desc}
                  </p>
                </div>
              </div>

              {/* Option 3 */}
              <div 
                onClick={() => setActiveCase(2)}
                className={`p-6 border transition-all duration-300 cursor-pointer flex gap-4 text-left select-none relative ${
                  activeCase === 2 
                  ? 'bg-[#1A1C1E] border-[#C4FF00]' 
                  : 'bg-[#151515]/40 border-[#2D2F31] hover:border-white/25'
                }`}
                style={{ borderRadius: '0px' }}
                id="usecase-item-2"
              >
                <div className={`w-10 h-10 flex items-center justify-center border transition-all ${
                  activeCase === 2 ? 'bg-[#C4FF00] text-black border-transparent' : 'bg-transparent text-gray-400 border-[#2D2F31]'
                }`} style={{ borderRadius: '0px' }}>
                  <Activity size={18} />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className={`font-sans text-[15px] sm:text-base font-bold ${activeCase === 2 ? 'text-white' : 'text-gray-400'}`}>
                    {langSet.impact.list.renewable.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-gray-500 font-medium">
                    {langSet.impact.list.renewable.desc}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: 2 Parallel Custom Image/SVG Visual cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6" id="impact-visual-cards">
            
            {/* Card 1: SMART FACTORY */}
            <div className="bg-[#1A1C1E] border border-[#2D2F31] relative h-[360px] cursor-default overflow-hidden group flex flex-col justify-end p-8" style={{ borderRadius: '0px' }}>
              
              {/* Technical background grids lines */}
              <div 
                className="absolute inset-0 opacity-[0.2] transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `
                    radial-gradient(ellipse at center, rgba(196,255,0,0.15) 0%, transparent 70%),
                    linear-gradient(to right, #2D2F31 1px, transparent 1px),
                    linear-gradient(to bottom, #2D2F31 1px, transparent 1px)
                  `,
                  backgroundSize: '100% 100%, 20px 20px'
                }}
              ></div>

              {/* Dynamic SVG Factory Plant Line Blueprint Overlay inside the card */}
              <div className="absolute inset-0 py-8 px-6 flex items-center justify-center pointer-events-none opacity-40">
                <svg viewBox="0 0 160 160" className="w-[80%] h-[80%] text-gray-600">
                  {/* Isometric factory floors lines */}
                  <polygon points="80,20 140,55 80,90 20,55" fill="none" stroke="#2D2F31" strokeWidth="1" />
                  <polygon points="80,70 140,105 80,140 20,105" fill="none" stroke="#2D2F31" strokeWidth="1" />
                  
                  {/* Vertical pillar support connections */}
                  <line x1="20" y1="55" x2="20" y2="105" stroke="#2D2F31" strokeWidth="0.8" />
                  <line x1="140" y1="55" x2="140" y2="105" stroke="#2D2F31" strokeWidth="0.8" />
                  <line x1="80" y1="90" x2="80" y2="140" stroke="#C4FF00" strokeWidth="1.2" strokeOpacity="0.8" />
                  
                  {/* Circular assembly nodes */}
                  <circle cx="80" cy="55" r="5" fill="#C4FF00" />
                  <circle cx="110" cy="72" r="3" fill="#2D2F31" />
                  <circle cx="50" cy="72" r="3" fill="#2D2F31" />
                  {/* Robot Arms schematic */}
                  <path d="M80,55 L80,35 L100,28" fill="none" stroke="#C4FF00" strokeWidth="1.5" />
                  
                  {/* Dynamic pulse node depending on selection */}
                  <circle cx="80" cy="72" r="16" fill="none" stroke="#C4FF00" strokeWidth="0.5" strokeDasharray="3 3" className="animate-spin-slow" />
                </svg>
              </div>

              {/* Dark Gradient bottom cover to enhance readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>

              {/* Front Text Overlay */}
              <div className="relative z-10 flex flex-col gap-2">
                <span className="font-mono text-[9px] text-[#C4FF00] font-bold tracking-[0.25em]">SYS_INTEGRATION</span>
                <h3 className="font-sans text-xl font-extrabold text-white tracking-wide uppercase">
                  {langSet.impact.smartFactory}
                </h3>
              </div>
            </div>

            {/* Card 2: INFRASTRUCTURE */}
            <div className="bg-[#1A1C1E] border border-[#2D2F31] relative h-[360px] cursor-default overflow-hidden group flex flex-col justify-end p-8" style={{ borderRadius: '0px' }}>
              
              {/* Technical background grids lines */}
              <div 
                className="absolute inset-0 opacity-[0.2] transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `
                    radial-gradient(ellipse at center, rgba(196,255,0,0.1) 0%, transparent 70%),
                    linear-gradient(to right, #2D2F31 1px, transparent 1px),
                    linear-gradient(to bottom, #2D2F31 1px, transparent 1px)
                  `,
                  backgroundSize: '100% 100%, 20px 20px'
                }}
              ></div>

              {/* Dynamic SVG Pipelines / Turbine infrastructure map */}
              <div className="absolute inset-0 py-8 px-6 flex items-center justify-center pointer-events-none opacity-40">
                <svg viewBox="0 0 160 160" className="w-[80%] h-[80%] text-gray-600">
                  {/* Heavy cylinders pipelines */}
                  <rect x="30" y="30" width="12" height="110" fill="none" stroke="#2D2F31" strokeWidth="1" />
                  <rect x="110" y="20" width="16" height="120" fill="none" stroke="#2D2F31" strokeWidth="1" />
                  
                  {/* Interconnected crossing valves */}
                  <line x1="42" y1="60" x2="110" y2="60" stroke="#C4FF00" strokeWidth="1.5" strokeOpacity="0.8" />
                  <line x1="42" y1="100" x2="110" y2="100" stroke="#2D2F31" strokeWidth="1.2" />
                  
                  {/* Bolted valve rings */}
                  <rect x="68" y="54" width="12" height="12" fill="#1A1C1E" stroke="#C4FF00" strokeWidth="1" />
                  <circle cx="74" cy="60" r="2.5" fill="#C4FF00" />
                  
                  {/* Flow gauge */}
                  <circle cx="118" cy="80" r="10" fill="none" stroke="#2D2F31" strokeWidth="1" />
                  <line x1="118" y1="80" x2="124" y2="76" stroke="#2D2F31" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Dark Gradient bottom cover */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>

              {/* Front Text Overlay */}
              <div className="relative z-10 flex flex-col gap-2">
                <span className="font-mono text-[9px] text-[#C4FF00] font-bold tracking-[0.25em]">EXT_FACILITIES</span>
                <h3 className="font-sans text-xl font-extrabold text-white tracking-wide uppercase">
                  {langSet.impact.infrastructure}
                </h3>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
