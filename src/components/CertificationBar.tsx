import React from 'react';
import { Award, ShieldAlert, CheckCircle2, Cpu, Globe, Scale } from 'lucide-react';

export default function CertificationBar() {
  const certifications = [
    { text: 'ISO 9001:2015', icon: Award },
    { text: 'CE CERTIFIED', icon: CheckCircle2 },
    { text: 'KS-CERTIFIED', icon: Scale },
    { text: 'IEC 60034 COMPLIANT', icon: Cpu },
    { text: 'ISO 14001', icon: Globe },
    { text: 'GLOBAL TRADEMARK', icon: ShieldAlert },
  ];

  return (
    <section className="bg-[#0A0B0C] border-y border-[#2D2F31] py-8 overflow-hidden select-none" id="certifications-bar">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[64px]">
        {/* Horizontal scroll on mobile, static flex grid on desktop */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-6 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none">
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <div 
                key={index} 
                className="flex items-center gap-2.5 shrink-0 hover:text-[#C4FF00] transition-colors duration-200"
                id={`cert-item-${index}`}
              >
                <div className="text-[#C4FF00] opacity-80 group-hover:opacity-100">
                  <IconComponent size={14} strokeWidth={2} />
                </div>
                <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.1em] text-gray-400 select-all">
                  {cert.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
