import React from "react";
import { Link } from "react-router-dom";

// --- Custom Icons ---
const SearchIcon = () => (
  <svg className="w-6 h-6 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-8 h-8 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const PawIcon = () => (
  <svg className="w-8 h-8 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-8 h-8 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const WalletIcon = () => (
  <svg className="w-8 h-8 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const Index = () => {
  const topics = [
    {
      title: "Account & Profile",
      desc: "Managing your settings, profile picture, and login issues.",
      icon: <UserIcon />,
      color: "bg-emerald-100",
      link: "/faq"
    },
    {
      title: "Adoption Process",
      desc: "How to contact owners, adoption fees, and meeting pets.",
      icon: <PawIcon />,
      color: "bg-yellow-100",
      link: "/faq"
    },
    {
      title: "Safety & Trust",
      desc: "Reporting scams, verifying users, and safe meeting tips.",
      icon: <ShieldIcon />,
      color: "bg-blue-100",
      link: "/privacy-policy"
    },
    {
      title: "Billing & Payments",
      desc: "Listing fees for sellers and premium features.",
      icon: <WalletIcon />,
      color: "bg-red-100",
      link: "/faq"
    }
  ];

  const popularArticles = [
    "How to spot a fake pet listing",
    "Tips for first-time pet owners",
    "Resetting your password",
    "Community guidelines for posting"
  ];

  return (
    <div className="w-full min-h-screen bg-[#FDFCF8] px-4 py-12 md:py-20 font-sans">
      
      {/* --- Hero Search Section --- */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-wider mb-6">
          Help Center
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-stone-800 font-serif mb-8">
          How can we <span className="text-emerald-600">help you?</span>
        </h1>
        
        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto group">
          <input 
            type="text" 
            placeholder="Search for answers (e.g., 'adopt a dog')" 
            className="w-full pl-14 pr-6 py-5 bg-white border-2 border-black rounded-2xl text-lg font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:shadow-[6px_6px_0px_0px_#FCD34D] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
        </div>
      </div>

      {/* --- Browse Topics --- */}
      <div className="max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-stone-800 font-serif mb-8 ml-2">Browse Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {topics.map((topic, index) => (
            <Link to={topic.link} key={index}>
              <div className="bg-white rounded-[2rem] border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-start gap-6 group">
                <div className={`w-16 h-16 rounded-2xl border-2 border-black flex items-center justify-center flex-shrink-0 ${topic.color} group-hover:scale-110 transition-transform duration-300`}>
                  {topic.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-emerald-700 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-stone-500 font-medium leading-relaxed">
                    {topic.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* --- Popular Articles & CTA --- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Popular Articles List */}
        <div className="lg:col-span-2 bg-[#FFFDF5] rounded-[2.5rem] border-2 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-bold text-stone-800 font-serif mb-6">Popular Articles</h3>
          <div className="space-y-4">
            {popularArticles.map((article, idx) => (
              <Link to="/blog" key={idx} className="block">
                <div className="flex items-center justify-between p-4 bg-white border-2 border-stone-200 rounded-xl hover:border-emerald-400 hover:shadow-sm transition-all group">
                  <span className="font-bold text-stone-700 group-hover:text-emerald-700">{article}</span>
                  <ArrowRightIcon />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact CTA Card */}
        <div className="lg:col-span-1 bg-stone-900 rounded-[2.5rem] border-2 border-black p-8 md:p-10 text-center shadow-[8px_8px_0px_0px_#10B981] flex flex-col justify-center items-center relative overflow-hidden">
          {/* Decor */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
          
          <h3 className="text-2xl font-bold text-white font-serif mb-4 relative z-10">
            Can't find an answer?
          </h3>
          <p className="text-stone-400 mb-8 font-medium relative z-10">
            Our friendly support team is here to help you with any questions.
          </p>
          <Link to="/contact" className="w-full relative z-10">
            <button className="w-full bg-[#FCD34D] text-stone-900 py-3.5 rounded-xl font-bold border-2 border-black hover:bg-[#fbbf24] transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
              Contact Support
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Index;