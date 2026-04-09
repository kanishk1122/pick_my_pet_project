import React from "react";
import { Link } from "react-router-dom";

// --- Custom Icons ---
const AdoptIcon = () => (
  <svg className="w-10 h-10 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const RehomeIcon = () => (
  <svg className="w-10 h-10 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const VerifyIcon = () => (
  <svg className="w-10 h-10 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CommunityIcon = () => (
  <svg className="w-10 h-10 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const Index = () => {
  const services = [
    {
      title: "Pet Adoption",
      description: "Browse hundreds of pets waiting for a loving home. Filter by breed, age, and location to find your perfect match.",
      icon: <AdoptIcon />,
      color: "bg-[#A7F3D0]", // Light Emerald
      link: "/pets?type=free",
      btnText: "Adopt Now"
    },
    {
      title: "Rehoming & Sales",
      description: "Need to find a new home for your pet? List them safely on our platform and connect with verified buyers or adopters.",
      icon: <RehomeIcon />,
      color: "bg-[#FDE68A]", // Light Yellow
      link: "/create-post",
      btnText: "List a Pet"
    },
    {
      title: "Verified Listings",
      description: "Safety first. We manually review listings and verify users to ensure a scam-free environment for everyone.",
      icon: <VerifyIcon />,
      color: "bg-[#BAE6FD]", // Light Blue
      link: "/about-us",
      btnText: "Learn More"
    },
    {
      title: "Pet Community",
      description: "Join a growing community of pet lovers. Share stories, get advice, and connect with local pet owners.",
      icon: <CommunityIcon />,
      color: "bg-[#FBCFE8]", // Light Pink
      link: "/community",
      btnText: "Join Us"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FDFCF8] px-4 py-12 md:py-20">
      
      {/* --- Header Section --- */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-wider mb-6">
          What We Do
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-stone-800 font-serif mb-6">
          Everything Your Pet <br />
          <span className="relative inline-block text-emerald-600">
            Needs & More
            <svg className="absolute w-full h-3 -bottom-2 left-0 text-emerald-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
        </h1>
        <p className="text-lg text-stone-500 max-w-2xl mx-auto font-medium">
          Whether you are looking to welcome a new family member or find a safe home for one, we are here to make the process simple, safe, and sweet.
        </p>
      </div>

      {/* --- Index Grid --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-24">
        {services.map((service, index) => (
          <div 
            key={index}
            className="bg-white rounded-[2.5rem] border-2 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col items-start"
          >
            {/* Icon Box */}
            <div className={`w-20 h-20 rounded-2xl border-2 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${service.color}`}>
              {service.icon}
            </div>
            
            <h3 className="text-2xl font-bold text-stone-800 font-serif mb-3">
              {service.title}
            </h3>
            
            <p className="text-stone-500 font-medium mb-8 leading-relaxed flex-grow">
              {service.description}
            </p>
            
            <Link to={service.link} className="w-full sm:w-auto">
              <button className="flex items-center gap-2 font-bold text-stone-800 border-b-2 border-black pb-1 hover:text-emerald-600 hover:border-emerald-500 transition-colors group">
                {service.btnText}
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* --- Why Choose Us Section --- */}
      <div className="max-w-7xl mx-auto bg-stone-900 rounded-[3rem] p-8 md:p-16 border-2 border-black shadow-[12px_12px_0px_0px_#10B981] relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full filter blur-[80px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full filter blur-[80px] opacity-20"></div>

        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white font-serif mb-12">
            Why <span className="text-emerald-400">Pick My Pet?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Feature 1 */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">🛡️</div>
              <h4 className="text-xl font-bold text-white mb-2">Verified Trust</h4>
              <p className="text-stone-400 text-sm">Every listing is screened to ensure safety for pets and people.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-xl font-bold text-white mb-2">Fast Connections</h4>
              <p className="text-stone-400 text-sm">Direct chat features let you connect with owners instantly.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">💖</div>
              <h4 className="text-xl font-bold text-white mb-2">Community First</h4>
              <p className="text-stone-400 text-sm">We are built by pet lovers, for pet lovers. 100% Love.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Index;