import React from "react";
import { Link } from "react-router-dom";

// --- Custom Icons ---
const LockIcon = () => (
  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CookieIcon = () => (
  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const Index = () => {
  const lastUpdated = "December 25, 2025";

  return (
    <div className="w-full min-h-screen bg-[#FDFCF8] px-4 py-12 md:py-20 font-sans">
      
      {/* --- Header --- */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-block px-4 py-1.5 rounded-full bg-stone-100 border-2 border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-wider mb-6">
          Legal & Safety
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-stone-800 font-serif mb-4">
          Privacy <span className="text-emerald-600 relative inline-block">
            Policy
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-emerald-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.6"/>
            </svg>
          </span>
        </h1>
        <p className="text-stone-500 font-medium">
          Last Updated: <span className="font-bold text-stone-800">{lastUpdated}</span>
        </p>
      </div>

      {/* --- Content Grid --- */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Intro Card */}
        <div className="bg-white rounded-[2.5rem] border-2 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-bold text-stone-800 font-serif mb-4">
            We value your trust (and your treats) 🦴
          </h2>
          <p className="text-stone-600 font-medium leading-relaxed mb-4">
            At <strong>Pick My Pet</strong>, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you visit our website or use our services to adopt, buy, or sell pets.
          </p>
          <p className="text-stone-600 font-medium leading-relaxed">
            By using our platform, you agree to the collection and use of information in accordance with this policy.
          </p>
        </div>

        {/* Collection Card */}
        <div className="bg-[#FFFDF5] rounded-[2.5rem] border-2 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-lg border-2 border-yellow-200">
              <EyeIcon />
            </div>
            <h3 className="text-xl font-bold text-stone-800 font-serif">Information We Collect</h3>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <p className="text-stone-600 font-medium"><span className="font-bold text-stone-800">Personal Data:</span> While using our Service, we may ask you to provide us with personally identifiable information such as Email address, First name and Last name, Phone number, and Address.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <p className="text-stone-600 font-medium"><span className="font-bold text-stone-800">Usage Data:</span> We may also collect information on how the Service is accessed and used, including your computer's Internet Protocol address (e.g. IP address), browser type, and version.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <p className="text-stone-600 font-medium"><span className="font-bold text-stone-800">Pet Listings:</span> Information regarding pets you list for adoption or sale, including photos and descriptions.</p>
            </li>
          </ul>
        </div>

        {/* Security Card */}
        <div className="bg-emerald-50 rounded-[2.5rem] border-2 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white rounded-lg border-2 border-emerald-200">
              <LockIcon />
            </div>
            <h3 className="text-xl font-bold text-stone-800 font-serif">Security of Data</h3>
          </div>
          <p className="text-stone-600 font-medium leading-relaxed">
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
        </div>

        {/* Cookies Card */}
        <div className="bg-white rounded-[2.5rem] border-2 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-stone-100 rounded-lg border-2 border-stone-200">
              <CookieIcon />
            </div>
            <h3 className="text-xl font-bold text-stone-800 font-serif">Cookies & Tracking</h3>
          </div>
          <p className="text-stone-600 font-medium leading-relaxed mb-4">
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-stone-100 border border-stone-300 rounded-lg text-xs font-bold text-stone-600">Session Cookies</span>
            <span className="px-3 py-1 bg-stone-100 border border-stone-300 rounded-lg text-xs font-bold text-stone-600">Preference Cookies</span>
            <span className="px-3 py-1 bg-stone-100 border border-stone-300 rounded-lg text-xs font-bold text-stone-600">Security Cookies</span>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-stone-500 font-medium mb-4">
            Have questions about your data?
          </p>
          <Link to="/contact">
            <button className="brand-button-primary bg-[#FCD34D] px-8 py-3 text-lg">
              Contact Support
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Index;