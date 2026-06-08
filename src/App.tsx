import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { translations } from './translations';
import { getPopups } from './firebase';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import Products from './components/Products';
import Impact from './components/Impact';
import CertificationBar from './components/CertificationBar';
import ConsultingForm from './components/ConsultingForm';
import Location from './components/Location';
import AdminDashboard from './components/AdminDashboard';
import { Megaphone, X } from 'lucide-react';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('KO');
  const [isAdminPage, setIsAdminPage] = useState(
    window.location.pathname === '/admin' || 
    window.location.pathname === '/management' || 
    window.location.hash === '#admin' || 
    window.location.hash === '#management'
  );
  
  // Dynamic Popup integration states
  const [activePopup, setActivePopup] = useState<any | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const langSet = translations[currentLanguage];

  // URL / Hash change event listener for Single Page Micro-Routing
  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminPage(
        window.location.pathname === '/admin' || 
        window.location.pathname === '/management' || 
        window.location.hash === '#admin' || 
        window.location.hash === '#management'
      );
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Sync and fetch active popups registered by administrator from firestore
  useEffect(() => {
    const fetchRealtimePopup = async () => {
      try {
        const pops = await getPopups();
        const activeOne = pops.find((p: any) => p.isActive === true);
        if (activeOne) {
          const isClosed = localStorage.getItem(`popup_closed_${activeOne.id}`);
          if (!isClosed) {
            setActivePopup(activeOne);
            setShowPopup(true);
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic campaign popups', err);
      }
    };

    if (!isAdminPage) {
      fetchRealtimePopup();
    }
  }, [isAdminPage]);

  // Handle closing campaign popup temporarily
  const handleClosePopup = () => {
    if (activePopup) {
      localStorage.setItem(`popup_closed_${activePopup.id}`, 'true');
    }
    setShowPopup(false);
  };

  // IF ROUTED TO ADMINISTRATIVE INTERFACE
  if (isAdminPage) {
    return <AdminDashboard />;
  }

  // STANDARD VISITOR SCREEN
  return (
    <div className="min-h-screen bg-[#000000] text-gray-200 selection:bg-[#C4FF00] selection:text-black antialiased font-sans flex flex-col relative">
      
      {/* 1. Dynamic Public Popup Modal Overlay (Firebase Storage / Firestore connected) */}
      {showPopup && activePopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none font-sans" id="campaign-popup-overlay">
          <div className="w-full max-w-lg bg-[#0C0D0F] border-2 border-[#C4FF00] p-6 lg:p-8 relative flex flex-col">
            
            {/* Close Cross */}
            <button 
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              id="close-popup-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Campaign Header */}
            <div className="flex items-center gap-2 mb-4">
              <Megaphone className="w-5 h-5 text-[#C4FF00] animate-bounce-slow" />
              <span className="font-mono text-xs font-bold tracking-widest text-[#C4FF00] uppercase">SPECIAL NOTICE</span>
            </div>

            {/* Main content */}
            <h3 className="font-sans text-lg font-extrabold text-white mb-3" id="popup-title">
              {activePopup.title}
            </h3>

            {activePopup.imageUrl && (
              <div className="w-full max-h-[220px] bg-black/40 border border-gray-800 p-1 mb-4 overflow-hidden flex items-center justify-center">
                <img 
                  src={activePopup.imageUrl} 
                  alt="Special notice skin" 
                  className="max-h-[200px] max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <p className="font-sans text-sm text-gray-300 leading-relaxed whitespace-pre-wrap mb-6" id="popup-content">
              {activePopup.content}
            </p>

            {/* Accept / close bar */}
            <div className="border-t border-[#1C1D1F] pt-4 flex justify-between items-center bg-[#0C0D0F]">
              <button
                onClick={handleClosePopup}
                className="font-sans text-[11px] font-bold text-gray-500 hover:text-gray-300 transition-colors uppercase cursor-pointer"
              >
                다시 보지 않기 (LocalStorage)
              </button>
              
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2 bg-[#C4FF00] text-black font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                id="popup-confirm-btn"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Sticky Navigation Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        langSet={langSet}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* 3. Hero Presentation Block */}
        <Hero langSet={langSet} />

        {/* 4. Strengths Grid Module */}
        <WhyChoose langSet={langSet} />

        {/* 5. Precision Products Section */}
        <Products langSet={langSet} />

        {/* 6. Real World Impact Cases */}
        <Impact langSet={langSet} />

        {/* 7. Certification Metadata Bar */}
        <CertificationBar />

        {/* 8. Catalog Request Diagnostic Form */}
        <ConsultingForm langSet={langSet} />

        {/* 9. Direction and GPS Location */}
        <Location langSet={langSet} />
      </main>

      {/* 10. Minimalist Heavy Industry Footer */}
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
