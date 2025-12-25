import React from "react";
import { Link } from "react-router-dom";
import aboutImage from "../../assets/images/about_hero.jpg"; // Make sure to have a cute image here
import missionImage from "../../assets/images/mission_dog.jpg"; // Another cute image

// --- Custom Icons ---
const HeartHandIcon = () => (
  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const Index = () => {
  return (
    <div className="w-full min-h-screen bg-[#FDFCF8] px-4 pb-20">
      
      {/* --- Hero Section --- */}
      <div className="max-w-7xl mx-auto pt-8 md:pt-16 mb-24">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FCD34D] border-2 border-black text-stone-900 text-xs font-bold uppercase tracking-wider mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-stone-800 font-serif mb-6 leading-tight">
              We Help Pets Find <br/>
              <span className="text-emerald-600 relative inline-block">
                Forever Homes
                <svg className="absolute w-full h-3 -bottom-2 left-0 text-emerald-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-medium leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              At <span className="font-bold text-stone-800">Pick My Pet</span>, we bridge the gap between furry friends and loving families. Whether through adoption or responsible rehoming, we ensure every tail finds a happy wag.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/pets">
                <button className="brand-button-accent text-lg px-8 py-4">
                  Browse Pets
                </button>
              </Link>
              <button className="brand-button bg-white text-lg px-8 py-4">
                Contact Us
              </button>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="flex-1 w-full max-w-md lg:max-w-full">
            <div className="relative aspect-square md:aspect-[4/3] rounded-[3rem] border-4 border-black overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-emerald-100">
              <img 
                src={aboutImage} 
                alt="Happy dog and owner" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Floating Decoration */}
              <div className="absolute bottom-6 right-6 bg-white p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce-slow">
                <span className="text-2xl">🐶</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Mission & Values --- */}
      <div className="max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all duration-300 group">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center border-2 border-emerald-100 mb-6 group-hover:scale-110 transition-transform">
              <HeartHandIcon />
            </div>
            <h3 className="text-2xl font-bold text-stone-800 font-serif mb-3">Compassionate Adoption</h3>
            <p className="text-stone-500 font-medium leading-relaxed">
              We champion the cause of adoption. Giving a pet a second chance at life is at the heart of what we do.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-emerald-600 p-8 rounded-[2.5rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all duration-300 text-white group">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center border-2 border-white/30 mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheckIcon />
            </div>
            <h3 className="text-2xl font-bold mb-3 font-serif">Safe & Trusted</h3>
            <p className="text-emerald-50 font-medium leading-relaxed">
              We verify listings to ensure safe environments for both pets and owners. No scams, just pure love.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FFFDF5] p-8 rounded-[2.5rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all duration-300 group">
            <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center border-2 border-yellow-200 mb-6 group-hover:scale-110 transition-transform">
              <HomeIcon />
            </div>
            <h3 className="text-2xl font-bold text-stone-800 font-serif mb-3">New Beginnings</h3>
            <p className="text-stone-500 font-medium leading-relaxed">
              From finding a breed you love to rehoming a pet due to life changes, we make the transition smooth and caring.
            </p>
          </div>

        </div>
      </div>

      {/* --- Big Statement Section --- */}
      <div className="max-w-5xl mx-auto bg-stone-900 rounded-[3rem] border-2 border-black p-8 md:p-16 text-center shadow-[12px_12px_0px_0px_#FCD34D] mb-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white font-serif mb-6">
            "A house is not a home without a pet."
          </h2>
          <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            We are more than just a marketplace; we are a community of pet lovers dedicated to the well-being of animals across the country. Join us in making tails wag.
          </p>
          <div className="inline-flex gap-2">
             <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 overflow-hidden"><img src="https://i.pravatar.cc/100?img=1" alt="user" /></div>
             <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 -ml-4 overflow-hidden"><img src="https://i.pravatar.cc/100?img=5" alt="user" /></div>
             <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 -ml-4 overflow-hidden"><img src="https://i.pravatar.cc/100?img=8" alt="user" /></div>
             <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white bg-emerald-500 text-white font-bold text-xs -ml-4">
                10k+
             </div>
          </div>
          <p className="text-stone-500 text-sm mt-3 font-bold uppercase tracking-widest">Join our Community</p>
        </div>
      </div>

      {/* --- How it Works (Simple) --- */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-800 font-serif mb-12">
          How <span className="text-emerald-600">Pick My Pet</span> Works
        </h2>
        
        <div className="relative border-l-4 border-stone-200 ml-6 md:ml-0 md:border-l-0 md:flex md:justify-between md:items-start gap-8">
          
          {[
            { step: "01", title: "Search", desc: "Browse through hundreds of pets based on species, breed, or location." },
            { step: "02", title: "Connect", desc: "Chat directly with owners or shelters to ask questions and arrange meetings." },
            { step: "03", title: "Adopt", desc: "Welcome your new best friend home and start your journey together." }
          ].map((item, idx) => (
            <div key={idx} className="mb-10 ml-8 md:ml-0 md:mb-0 relative md:flex-1 group cursor-default">
              {/* Dot for timeline (mobile) */}
              <span className="absolute -left-[42px] md:hidden w-6 h-6 bg-emerald-500 rounded-full border-4 border-white ring-2 ring-stone-200"></span>
              
              <div className="bg-white p-6 rounded-3xl border-2 border-stone-100 shadow-sm group-hover:border-emerald-400 group-hover:shadow-[4px_4px_0px_0px_#10B981] transition-all">
                <span className="block text-5xl font-black text-stone-100 mb-2 group-hover:text-emerald-100 transition-colors">
                  {item.step}
                </span>
                <h4 className="text-xl font-bold text-stone-800 mb-2">{item.title}</h4>
                <p className="text-stone-500 text-sm font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Index;