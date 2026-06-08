import React from 'react';
import { Language, TranslationSet } from '../types';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  langSet: TranslationSet;
}

export default function Header({ currentLanguage, onLanguageChange, langSet }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#000000]/95 backdrop-blur-md border-b border-[#2D2F31] transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[64px] h-[72px] flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 cursor-pointer group"
          id="header-logo"
        >
          <span className="font-sans text-[22px] font-extrabold tracking-[-0.05em] text-[#C4FF00] hover:opacity-90">
            motor
          </span>
          <span className="w-1.5 h-1.5 bg-[#C4FF00] rounded-sm animate-pulse-slow"></span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-11">
          <button 
            onClick={() => scrollToSection('products')}
            className="font-sans text-xs font-semibold tracking-wider text-gray-300 hover:text-[#C4FF00] uppercase transition-colors"
            id="nav-products"
          >
            {langSet.header.products}
          </button>
          <button 
            onClick={() => scrollToSection('products')}
            className="font-sans text-xs font-semibold tracking-wider text-gray-300 hover:text-[#C4FF00] uppercase transition-colors"
            id="nav-motor-tape"
          >
            MOTOR TAPE
          </button>
          <button 
            onClick={() => scrollToSection('advantages')}
            className="font-sans text-xs font-semibold tracking-wider text-gray-300 hover:text-[#C4FF00] uppercase transition-colors"
            id="nav-strengths"
          >
            {langSet.header.strengths}
          </button>
          <button 
            onClick={() => scrollToSection('usecases')}
            className="font-sans text-xs font-semibold tracking-wider text-gray-300 hover:text-[#C4FF00] uppercase transition-colors"
            id="nav-applications"
          >
            {langSet.header.applications}
          </button>
          <button 
            onClick={() => scrollToSection('consulting')}
            className="font-sans text-xs font-semibold tracking-wider text-gray-300 hover:text-[#C4FF00] uppercase transition-colors"
            id="nav-contact"
          >
            {langSet.header.contact}
          </button>
        </nav>

        {/* Right side alignment (Language Selector only) */}
        <div className="flex items-center">
          {/* Language Selector */}
          <div className="flex items-center select-none" id="lang-selector">
          <div className="flex bg-[#1A1C1E] border border-[#2D2F31] p-0.5" style={{ borderRadius: '0px' }}>
            <button
              onClick={() => onLanguageChange('KO')}
              className={`px-3 py-1 text-[11px] font-mono font-bold tracking-wider cursor-pointer transition-all duration-200 ${
                currentLanguage === 'KO'
                  ? 'bg-[#C4FF00] text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
              style={{ borderRadius: '0px' }}
              id="lang-btn-ko"
            >
              KO
            </button>
            <button
              onClick={() => onLanguageChange('EN')}
              className={`px-3 py-1 text-[11px] font-mono font-bold tracking-wider cursor-pointer transition-all duration-200 ${
                currentLanguage === 'EN'
                  ? 'bg-[#C4FF00] text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
              style={{ borderRadius: '0px' }}
              id="lang-btn-en"
            >
              EN
            </button>
          </div>
        </div>
        </div>
      </div>
    </header>
  );
}
