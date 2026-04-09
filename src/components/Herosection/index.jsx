import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import herosectionvideo from '../../assets/video/herosectionvideo.mp4'; // Make sure path is correct
import img1 from '../../assets/images/herosectionvideo.jpg'; // Make sure path is correct

// Icons
const PawIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5 2.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5 5.5c-2.5 0-4.5 2-4.5 4.5v2.5h9v-2.5c0-2.5-2-4.5-4.5-4.5z" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    // Container set to h-[80vh] for a nice large banner
    <div className="w-[80vw] mx-auto h-[80vh] min-h-[600px] relative">
      
      {/* Neubrutalist Card Container */}
      <div className="relative w-full h-full rounded-[2.5rem] border-2 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-stone-900 group">
        
        {/* --- Video Background --- */}
        <div className="absolute inset-0 w-full h-full">
          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
          
          <video
            src={herosectionvideo}
            autoPlay
            loop
            muted
            playsInline
            className={`object-cover h-full w-full transition-opacity duration-700 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setIsVideoLoaded(false)}
          />
          
          {/* Fallback Image */}
          {!isVideoLoaded && (
            <img
              src={img1}
              alt="Hero Background"
              className="absolute inset-0 object-cover h-full w-full"
            />
          )}
        </div>

        {/* --- Content Overlay --- */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-1.5 bg-[#34D399] text-white text-xs font-bold uppercase tracking-wider rounded-full border-2 border-black mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <PawIcon />
              The Pawsome Life
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-md">
              Unconditional <br />
              <span className="text-[#FCD34D]">Love Awaits.</span>
            </h1>

            {/* Description Glass Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl mb-8 max-w-lg">
              <p className="text-lg text-white/90 font-medium leading-relaxed">
                Connect with furry friends looking for a forever home. Start your journey with trust, joy, and a whole lot of tail wags.
              </p>
            </div>

            {/* CTA Buttons using brand-button class */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/pets">
                <button className="brand-button-primary w-full sm:w-auto text-lg">
                  Find a Pet
                  <PlayIcon />
                </button>
              </Link>
              
              <button className="brand-button w-full sm:w-auto text-lg">
                How it Works
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;