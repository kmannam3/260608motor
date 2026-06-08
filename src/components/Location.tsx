import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { TranslationSet } from '../types';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

interface LocationProps {
  langSet: TranslationSet;
}

export default function Location({ langSet }: LocationProps) {
  const apiKey = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
  const hasValidKey = !!apiKey && apiKey !== 'MY_GOOGLE_MAPS_KEY' && apiKey !== '';
  
  const position = { lat: 37.5029, lng: 127.0284 };
  const [mapError, setMapError] = useState(false);

  const darkMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#1a1c1e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#131313" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#8e9194" }] },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#C4FF00", opacity: 0.5 }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#222426" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#2d2f31" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#5a5d61" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#111213" }],
    },
  ];

  return (
    <section id="location" className="bg-[#131313] border-t border-[#2D2F31] py-20 lg:py-28 relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[64px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Direct Address with Icons */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] font-bold tracking-[0.1em] text-[#C4FF00] uppercase block">
                {langSet.location.tag}
              </span>
              <h2 className="font-sans text-[28px] sm:text-[34px] font-extrabold tracking-[-0.022em] text-white">
                {langSet.location.title}
              </h2>
            </div>

            {/* Address fields */}
            <div className="flex flex-col gap-6" id="location-details-list">
              
              {/* Address */}
              <div className="flex gap-4 items-start" id="loc-address">
                <div className="w-10 h-10 border border-[#2D2F31] bg-[#1A1C1E] flex items-center justify-center text-[#C4FF00] shrink-0" style={{ borderRadius: '0px' }}>
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <span className="font-mono text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                    {langSet.location.addressLabel}
                  </span>
                  <span className="font-sans text-sm sm:text-base text-gray-200">
                    {langSet.location.addressVal}
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start" id="loc-phone">
                <div className="w-10 h-10 border border-[#2D2F31] bg-[#1A1C1E] flex items-center justify-center text-[#C4FF00] shrink-0" style={{ borderRadius: '0px' }}>
                  <Phone size={16} />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <span className="font-mono text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                    {langSet.location.phoneLabel}
                  </span>
                  <span className="font-sans text-sm sm:text-base text-gray-200">
                    {langSet.location.phoneVal}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start" id="loc-email">
                <div className="w-10 h-10 border border-[#2D2F31] bg-[#1A1C1E] flex items-center justify-center text-[#C4FF00] shrink-0" style={{ borderRadius: '0px' }}>
                  <Mail size={16} />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <span className="font-mono text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                    {langSet.location.emailLabel}
                  </span>
                  <a href={`mailto:${langSet.location.emailVal}`} className="font-sans text-sm sm:text-base text-gray-200 hover:text-[#C4FF00] transition-colors">
                    {langSet.location.emailVal}
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Google Map Block */}
          <div className="lg:col-span-7" id="location-map">
            <div 
              className="bg-[#1A1C1E] border border-[#2D2F31] relative h-[380px] overflow-hidden group"
              style={{ borderRadius: '0px' }}
            >
              {hasValidKey ? (
                <APIProvider apiKey={apiKey}>
                  <Map
                    style={{ width: '100%', height: '100%' }}
                    defaultCenter={position}
                    defaultZoom={15}
                    gestureHandling={'cooperative'}
                    disableDefaultUI={false}
                    options={{
                      styles: darkMapStyle,
                      streetViewControl: false,
                      mapTypeControl: false,
                    }}
                  >
                    <AdvancedMarker position={position}>
                      <Pin 
                        background={'#C4FF00'} 
                        borderColor={'#000000'} 
                        glyphColor={'#000000'}
                      />
                    </AdvancedMarker>
                  </Map>
                </APIProvider>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none bg-[#111213]">
                  {/* Grid Lines Overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, #C4FF00 1px, transparent 1px),
                        linear-gradient(to bottom, #C4FF00 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }}
                  ></div>

                  {/* CAD style instructions */}
                  <div className="relative z-10 flex flex-col items-center gap-4 max-w-[420px]">
                    <div className="w-12 h-12 border border-[#C4FF00]/40 flex items-center justify-center text-[#C4FF00] mb-2 animate-pulse">
                      <MapPin size={24} />
                    </div>
                    <h3 className="font-sans text-[15px] font-extrabold text-[#C4FF00] tracking-wider uppercase">
                      Interactive Google Map Setup
                    </h3>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed">
                      구글맵을 연동하시려면 AI Studio 설정의 Secrets 패널에서 <code className="text-white bg-white/5 px-1 py-0.5 font-mono">GOOGLE_MAPS_PLATFORM_KEY</code> 환경변수를 입력해주십시오.
                    </p>
                    <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-1">
                      HQ Location: Teheran-ro 123 (Seoul, South Korea)
                    </p>
                    <div className="border border-[#C4FF00]/20 bg-black/60 px-4 py-2 font-mono text-[10px] text-gray-300 mt-2">
                       LAT: 37.5029 / LNG: 127.0284
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom control feedback telemetry line */}
              <div className="absolute bottom-0 inset-x-0 bg-[#0E0F10] border-t border-[#2D2F31] px-5 py-2.5 flex items-center justify-between text-left z-10 pointer-events-none">
                <span className="font-mono text-[9px] text-[#C4FF00] font-bold tracking-wider">LOC_COORDS: GPS_37.5029_127.0284</span>
                <span className="font-mono text-[9px] text-gray-500 font-bold uppercase">{hasValidKey ? "LIVE_GMAPS_BOUND" : "CAD_SYS_ACTIVE"}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
