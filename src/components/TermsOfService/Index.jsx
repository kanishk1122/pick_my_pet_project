import React from "react";
import { Link } from "react-router-dom";

// --- Custom Icons ---
const ScrollIcon = () => (
  <svg className="w-6 h-6 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const UserCheckIcon = () => (
  <svg className="w-6 h-6 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BanIcon = () => (
  <svg className="w-6 h-6 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

const Index = () => {
  const lastUpdated = "December 25, 2025";

  return (
    <div className="w-full min-h-screen bg-[#FDFCF8] px-4 py-12 md:py-20 font-sans">
      
      {/* --- Header --- */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-block px-4 py-1.5 rounded-full bg-stone-100 border-2 border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-wider mb-6">
          The Rules of the House
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-stone-800 font-serif mb-4">
          Terms of <span className="text-emerald-600 relative inline-block">
            Service
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-emerald-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.6"/>
            </svg>
          </span>
        </h1>
        <p className="text-stone-500 font-medium">
          Effective Date: <span className="font-bold text-stone-800">{lastUpdated}</span>
        </p>
      </div>

      {/* --- Content Grid --- */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Intro Card */}
        <div className="bg-white rounded-[2.5rem] border-2 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 rounded-lg border-2 border-emerald-200">
              <ScrollIcon />
            </div>
            <h2 className="text-2xl font-bold text-stone-800 font-serif">Welcome to Pick My Pet</h2>
          </div>
          <p className="text-stone-600 font-medium leading-relaxed mb-4">
            These Terms of Service ("Terms") govern your use of the Pick My Pet website and services. By accessing or using our platform, you agree to be bound by these Terms.
          </p>
          <p className="text-stone-600 font-medium leading-relaxed">
            If you do not agree to these Terms, please do not use our services (but we'll miss you!).
          </p>
        </div>

        {/* User Responsibilities */}
        <div className="bg-[#FFFDF5] rounded-[2.5rem] border-2 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-lg border-2 border-yellow-200">
              <UserCheckIcon />
            </div>
            <h3 className="text-xl font-bold text-stone-800 font-serif">Your Responsibilities</h3>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <p className="text-stone-600 font-medium"><span className="font-bold text-stone-800">Accuracy:</span> You agree to provide accurate, current, and complete information during the registration and listing process.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <p className="text-stone-600 font-medium"><span className="font-bold text-stone-800">Pet Welfare:</span> If you are listing a pet, you warrant that the animal is healthy (unless stated otherwise) and treated with care.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <p className="text-stone-600 font-medium"><span className="font-bold text-stone-800">Security:</span> You are responsible for safeguarding your account password and for any activities or actions under your account.</p>
            </li>
          </ul>
        </div>

        {/* Prohibited Activities */}
        <div className="bg-stone-50 rounded-[2.5rem] border-2 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 rounded-lg border-2 border-red-200">
              <BanIcon />
            </div>
            <h3 className="text-xl font-bold text-stone-800 font-serif">Prohibited Activities</h3>
          </div>
          <p className="text-stone-600 font-medium leading-relaxed mb-4">
            To keep our community safe, you agree NOT to:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Post false or misleading listings", "Harass or abuse other users", "Use the service for puppy mills", "Distribute spam or viruses"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-stone-200 text-stone-600 text-sm font-bold shadow-sm">
                    <span className="text-red-500">✕</span> {item}
                </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="bg-white rounded-[2.5rem] border-2 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-bold text-stone-800 font-serif mb-4">Limitation of Liability</h3>
          <p className="text-stone-600 font-medium leading-relaxed">
            Pick My Pet acts as a venue to connect pet owners and adopters. We do not own, sell, or house the pets listed. We are not responsible for the conduct of any user or the condition of any pet. Always exercise caution and common sense.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-stone-500 font-medium mb-4">
            Questions about these terms?
          </p>
          <Link to="/contact">
            <button className="brand-button-primary bg-[#FCD34D] px-8 py-3 text-lg">
              Contact Legal Team
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Index;