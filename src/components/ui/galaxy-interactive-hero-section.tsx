"use client";

import React, { useEffect, useRef } from 'react';
import { lazy } from 'react';
import { PlayCircle } from 'lucide-react';

const Spline = lazy(() => import('@splinetool/react-spline'));
function HeroSplineBackground() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      pointerEvents: 'auto',
      overflow: 'hidden',
    }}>
      <Spline
        style={{
          width: '100%',
          height: '100vh',
          pointerEvents: 'auto',
        }}
        scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent 30%, transparent 70%, rgba(0, 0, 0, 0.8)),
            linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.9))
          `,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}


function HeroContent() {
  return (
    <div className="text-left text-white pt-16 sm:pt-24 md:pt-32 px-4 max-w-3xl">
      <div className="inline-flex items-center rounded-full border border-humanika-pink/20 bg-humanika-pink/10 px-4 py-1.5 text-sm font-medium text-humanika-pink backdrop-blur-md shadow-inner shadow-humanika-pink/20 animate-pulse mb-6">
        Periode 2025 - 2026
      </div>
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-4 leading-tight tracking-tight bg-gradient-to-r from-humanika-blue via-pink-500 to-humanika-pink bg-clip-text text-transparent">
        HUMANIKA
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-80 max-w-2xl drop-shadow-md">
        Himpunan Mahasiswa Teknik Informatika STT Wastukancana Purwakarta.
        <br />
        "Low Profile and No Talk Only".
      </p>
      <div className="flex pointer-events-auto flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
        <a href="#about" className="w-full sm:w-auto">
          <button className="bg-[#8200DB29] hover:bg-black/50 text-white font-semibold py-3 px-8 rounded-full transition duration-300 w-full sm:w-auto border border-[#322D36]" style={{ backdropFilter: 'blur(8px)' }}>
            Tentang Kami
          </button>
        </a>
        <a href="#structure" className="w-full sm:w-auto">
          <button className="pointer-events-auto bg-[#0009] border border-gray-600 hover:border-gray-400 text-gray-200 hover:text-white font-medium py-3 px-8 rounded-full transition duration-300 flex items-center justify-center w-full sm:w-auto">
            <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Lihat Struktur
          </button>
        </a>
      </div>
    </div>
  );
}

export const HeroSection = () => {
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroContentRef.current) {
        requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset;
          const maxScroll = 400;
          const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
          if (heroContentRef.current) {
            heroContentRef.current.style.opacity = opacity.toString();
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Navbar integrated directly in the main page layout, removed from here to avoid duplication */}
      
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroSplineBackground />
        </div>

        <div ref={heroContentRef} style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh',
          display: 'flex', justifyContent: 'flex-start', alignItems: 'center', zIndex: 10, pointerEvents: 'none'
        }}>
          <div className="container mx-auto px-4 md:px-12">
            <HeroContent />
          </div>
        </div>
      </div>
    </div>
  );
};
