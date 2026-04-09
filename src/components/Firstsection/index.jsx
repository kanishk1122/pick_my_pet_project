import nd1 from '../../assets/images/normat_dog.png';
import nd2 from '../../assets/images/normal_dog_2.png';
import { Link } from 'react-router-dom';

// --- Icons (Unified Stroke Style) ---

const PawIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5 2.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5 5.5c-2.5 0-4.5 2-4.5 4.5v2.5h9v-2.5c0-2.5-2-4.5-4.5-4.5z" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
  </svg>
);

const StarIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const Index = () => {
  return (
    <div className="container mx-auto px-5 my-12 md:my-20 font-sans">
      
      {/* Hero Section */}
      <div className="text-center mb-16 md:mb-24">
        {/* Pill Badge */}
        <span className="bg-emerald-50 text-emerald-800 text-sm font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 border-2 border-emerald-100 mb-6">
          <PawIcon /> Find Your Perfect Match
        </span>
        
        <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6 text-stone-800 leading-tight font-serif tracking-tight">
          Where Pet Love Stories <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 relative inline-block">
            Begin
            {/* Cute underline doodle */}
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-emerald-400" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.3" />
            </svg>
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Join thousands of happy families who&apos;ve found their perfect companions through our cozy platform.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
        {[
          { number: "5000+", label: "Pets Adopted", icon: <PawIcon /> },
          { number: "10k+", label: "Happy Families", icon: <HeartIcon /> },
          { number: "98%", label: "Success Rate", icon: <StarIcon /> }
        ].map((stat, index) => (
          <div 
            key={index} 
            // Neubrutalist Card Style: White BG, Black Border, Hard Shadow
            className="bg-white p-8 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-center group"
          >
            <div className="text-emerald-600 mb-4 inline-flex justify-center p-3 bg-emerald-50 rounded-full border-2 border-emerald-100 group-hover:rotate-12 transition-transform duration-300">
              {stat.icon}
            </div>
            <div className="text-4xl font-bold text-stone-800 mb-1 font-serif">{stat.number}</div>
            <div className="text-stone-500 font-bold uppercase tracking-wide text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        
        {/* Adopt Section - Theme: Emerald Green */}
        <div className="bg-emerald-600 rounded-[2.5rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-10 flex flex-col items-center text-center relative overflow-hidden group">
          
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          
          <div className="bg-white/20 p-5 rounded-2xl mb-6 text-white border-2 border-white/30 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
            <HomeIcon />
          </div>
          
          <span className="bg-emerald-800/30 text-emerald-50 border border-emerald-400/50 text-xs font-bold px-5 py-2 rounded-full mb-6 inline-flex items-center gap-2">
            <PawIcon /> Give a Home
          </span>
          
          <h2 className="text-4xl font-bold text-white mb-4 font-serif">Adopt a Friend</h2>
          
          <p className="text-base text-emerald-50 mb-10 leading-relaxed max-w-md font-medium">
            Every adoption saves two lives - the pet you adopt and the one who takes their place. Start your journey of love today.
          </p>
          
          <Link 
            to={`/pets?species=&breed=&type=free&minPrice=0&maxPrice=100000&page=1`} 
            // Brand Button Style (Inverse for dark background)
            className="mt-auto bg-white text-emerald-800 border-2 border-black font-bold py-4 px-10 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 w-full max-w-xs flex items-center justify-center gap-2"
          >
            Find Your Match
            <ArrowIcon />
          </Link>
          
          <div className="mt-10 relative">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl transform scale-110"></div>
            <img 
              src={nd1} 
              className="relative w-48 h-48 object-cover rounded-full border-4 border-white shadow-xl rotate-3 group-hover:rotate-6 transition-transform duration-500" 
              alt="Adoption dog" 
            />
          </div>
        </div>

        {/* Buy/Sell Section - Theme: Cream/Yellow */}
        <div className="bg-[#FFFDF5] rounded-[2.5rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-10 flex flex-col items-center text-center relative overflow-hidden group">
          
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-200/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>
          
          <div className="bg-white p-5 rounded-2xl mb-6 text-stone-800 border-2 border-stone-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
            <HeartIcon />
          </div>
          
          <span className="bg-stone-100 text-stone-600 border border-stone-200 text-xs font-bold px-5 py-2 rounded-full mb-6 inline-flex items-center gap-2">
            <PawIcon /> Connect Hearts
          </span>
          
          <h2 className="text-4xl font-bold text-stone-800 mb-4 font-serif">Buy or Rehome</h2>
          
          <p className="text-base text-stone-600 mb-10 leading-relaxed max-w-md font-medium">
            Whether you're expanding your family or helping a pet find their forever home, we ensure safe and loving transitions.
          </p>
          
          <Link 
            to='/pets?species=&breed=&type=paid&minPrice=0&maxPrice=100000&page=1' 
            // Brand Button Style (Standard)
            className="mt-auto bg-[#FCD34D] text-stone-900 border-2 border-black font-bold py-4 px-10 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 w-full max-w-xs flex items-center justify-center gap-2"
          >
            Explore Options
            <ArrowIcon />
          </Link>
          
          <div className="mt-10 relative">
            <div className="absolute inset-0 bg-yellow-200/50 rounded-full blur-xl transform scale-110"></div>
            <img 
              src={nd2} 
              className="relative w-48 h-48 object-cover rounded-full border-4 border-white shadow-xl -rotate-3 group-hover:-rotate-6 transition-transform duration-500" 
              alt="Sale dog" 
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Index;