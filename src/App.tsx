import React, { useState } from 'react';
import { Language } from './types';
import { translations } from './translations';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import Products from './components/Products';
import Impact from './components/Impact';
import CertificationBar from './components/CertificationBar';
import ConsultingForm from './components/ConsultingForm';
import Location from './components/Location';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('KO');
  const langSet = translations[currentLanguage];

  return (
    <div className="min-h-screen bg-[#000000] text-gray-200 selection:bg-[#C4FF00] selection:text-black antialiased font-sans flex flex-col">
      {/* 1. Sticky Navigation Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        langSet={langSet}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* 2. Hero Presentation Block */}
        <Hero langSet={langSet} />

        {/* 3. Strengths Grid Module */}
        <WhyChoose langSet={langSet} />

        {/* 4. Precision Products Section */}
        <Products langSet={langSet} />

        {/* 5. Real World Impact Cases */}
        <Impact langSet={langSet} />

        {/* 6. Certification Metadata Bar */}
        <CertificationBar />

        {/* 7. Catalog Request Diagnostic Form */}
        <ConsultingForm langSet={langSet} />

        {/* 8. Direction and GPS Location */}
        <Location langSet={langSet} />
      </main>

      {/* 9. Minimalist Heavy Industry Footer */}
      <footer className="bg-[#0A0B0C] border-t border-[#1C1D1F] py-14 lg:py-18 text-left select-none">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[64px] flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          
          {/* Corporate Profile Address lines */}
          <div className="flex flex-col gap-4 max-w-[600px]" id="footer-logo-profile">
            <div className="flex items-center gap-1.5" id="footer-brand">
              <span className="font-sans text-[20px] font-black tracking-[-0.05em] text-[#C4FF00]">
                motor
              </span>
              <span className="w-1.5 h-1.5 bg-[#C4FF00]" style={{ borderRadius: '0px' }}></span>
            </div>
            
            <p className="font-sans text-xs text-gray-500 leading-relaxed font-medium">
              (주) 모터 (MOTOR Co., Ltd.) | 대표이사: 홍길동 | 등록번호: 123-45-67890 <br className="hidden sm:inline" />
              주소: 서울특별시 강남구 테헤란로 123, 모터 타워 15층 | 전화번호: 02-123-4567 | 이메일: contact@motor-industrial.com
            </p>
            
            <span className="font-mono text-[10px] text-gray-600 font-semibold tracking-wider">
              © {new Date().getFullYear()} MOTOR CUSTOM MANUFACTURING. ALL RIGHTS RESERVED.
            </span>
          </div>

          {/* Legal / Policy links */}
          <div className="flex flex-row md:flex-col gap-6 md:gap-3 text-left md:text-right" id="footer-legal-links">
            <a href="#location" className="font-mono text-[11px] font-bold tracking-wider text-gray-400 hover:text-[#C4FF00] uppercase transition-colors">
              Legal Notice
            </a>
            <a href="#consulting" className="font-mono text-[11px] font-bold tracking-wider text-gray-400 hover:text-[#C4FF00] uppercase transition-colors">
              Privacy Policy
            </a>
            <a href="#advantages" className="font-mono text-[11px] font-bold tracking-wider text-gray-400 hover:text-[#C4FF00] uppercase transition-colors">
              Certifications
            </a>
            <a href="#usecases" className="font-mono text-[11px] font-bold tracking-wider text-gray-400 hover:text-[#C4FF00] uppercase transition-colors">
              Global Network
            </a>
          </div>

        </div>
      </footer>
    </div>
  );
}
