import React, { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { TranslationSet } from '../types';

interface LocationProps {
  langSet: TranslationSet;
}

export default function Location({ langSet }: LocationProps) {
  const position: [number, number] = [37.5029, 127.0284];
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapContainerRef.current) return;

    // Safely remove existing map instance to cleanly reinitialize
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch (err) {
        console.error("Error removing old map instance:", err);
      }
      mapInstanceRef.current = null;
    }

    try {
      // Initialize Leaflet Map
      const map = L.map(mapContainerRef.current, {
        center: position,
        zoom: 15,
        zoomControl: false, // Disabling default to position at topright
        attributionControl: false
      });

      mapInstanceRef.current = map;

      // Add CartoDB Dark Matter tile layer for map theme
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        subdomains: 'abcd'
      }).addTo(map);

      // Custom Zoom Control at the top right
      L.control.zoom({
        position: 'topright'
      }).addTo(map);

      // Custom high-tech glowing marker
      const customIcon = L.divIcon({
        html: `
          <div style="position: relative; width: 32px; height: 32px;">
            <div style="position: absolute; inset: 0; background-color: rgba(196, 255, 0, 0.4); border-radius: 50%; transform: scale(1); animation: leafletPulse 2.2s infinite ease-out;"></div>
            <div style="position: absolute; left: 8px; top: 8px; width: 16px; height: 16px; background-color: #C4FF00; border: 2.5px solid #000000; border-radius: 50%; box-shadow: 0 0 10px rgba(196, 255, 0, 0.9);"></div>
          </div>
          <style>
            @keyframes leafletPulse {
              0% { transform: scale(0.4); opacity: 1; }
              100% { transform: scale(1.7); opacity: 0; }
            }
            .leaflet-popup-content-wrapper {
              background: #1A1C1E !important;
              color: #ffffff !important;
              border: 1px solid #C4FF00 !important;
              border-radius: 0px !important;
              font-family: inherit !important;
              box-shadow: 0 4px 15px rgba(0,0,0,0.6) !important;
            }
            .leaflet-popup-tip {
              background: #1A1C1E !important;
              border: 1px solid #C4FF00 !important;
            }
            .leaflet-popup-close-button {
              color: #C4FF00 !important;
              font-family: monospace !important;
            }
          </style>
        `,
        className: 'custom-leaflet-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      // Bind Marker and Open Popup
      const marker = L.marker(position, { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; line-height: 1.5; padding: 4px 4px; text-align: left;">
          <strong style="color: #C4FF00; font-size: 13px; font-weight: 700; display: block; margin-bottom: 4px; font-family: monospace; letter-spacing: 0.5px;">
            motor • MANAGEMENT
          </strong>
          <span style="color: #E2E8F0; display: block; word-break: keep-all;">
            ${langSet.location.addressVal}
          </span>
        </div>
      `, {
        closeButton: true,
        autoClose: false,
        offset: [0, -4]
      }).openPopup();

    } catch (e) {
      console.error("Error setting up Leaflet Map:", e);
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (err) {
          console.error("Error destroying map instance in cleanup:", err);
        }
        mapInstanceRef.current = null;
      }
    };
  }, [langSet]);

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

          {/* Right Column: Leaflet Map Block */}
          <div className="lg:col-span-7" id="location-map">
            <div 
              className="bg-[#1A1C1E] border border-[#2D2F31] relative h-[380px] overflow-hidden group"
              style={{ borderRadius: '0px' }}
            >
              {/* Map Container Element */}
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              {/* Bottom control feedback telemetry line */}
              <div className="absolute bottom-0 inset-x-0 bg-[#0E0F10] border-t border-[#2D2F31] px-5 py-2.5 flex items-center justify-between text-left z-10 pointer-events-none">
                <span className="font-mono text-[9px] text-[#C4FF00] font-bold tracking-wider">LOC_COORDS: GPS_37.5029_127.0284</span>
                <span className="font-mono text-[9px] text-gray-400 font-bold uppercase">LIVE_OSM_LEAFLET_ACTIVE</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
