import nd1 from '../../assets/images/normat_dog.png';
import nd2 from '../../assets/images/normal_dog_2.png';
import { Link } from 'react-router-dom';

const PawIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,5.5A2.5,2.5 0 0,1 14.5,8A2.5,2.5 0 0,1 12,10.5A2.5,2.5 0 0,1 9.5,8A2.5,2.5 0 0,1 12,5.5M5,8A2.5,2.5 0 0,1 7.5,10.5A2.5,2.5 0 0,1 5,13A2.5,2.5 0 0,1 2.5,10.5A2.5,2.5 0 0,1 5,8M19,8A2.5,2.5 0 0,1 21.5,10.5A2.5,2.5 0 0,1 19,13A2.5,2.5 0 0,1 16.5,10.5A2.5,2.5 0 0,1 19,8M12,13A2.5,2.5 0 0,1 14.5,15.5A2.5,2.5 0 0,1 12,18A2.5,2.5 0 0,1 9.5,15.5A2.5,2.5 0 0,1 12,13Z"/>
  </svg>
);

const HomeIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
  </svg>
);

const HeartIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
  </svg>
);

const Index = () => {
  return (
    <div className="container mx-auto px-5 my-20">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <span className="bg-[#EDEEFF] text-[#4481EB] text-sm font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-sm border border-[#4481EB]/10">
          <PawIcon /> Find Your Perfect Match
        </span>
        <h1 className="text-5xl md:text-6xl font-bold mt-8 mb-6 text-gray-900 leading-tight">
          Where Pet Love Stories
          <span className="block text-[#4481EB]">Begin</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Join thousands of happy families who&apos;ve found their perfect companions through our platform
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
        {[
          { number: "5000+", label: "Pets Adopted", icon: <PawIcon /> },
          { number: "10k+", label: "Happy Families", icon: <HeartIcon /> },
          { number: "98%", label: "Success Rate", icon: <HomeIcon /> }
        ].map((stat, index) => (
          <div 
            key={index} 
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 text-center group hover:-translate-y-1"
          >
            <div className="text-[#4481EB] mb-3 inline-flex justify-center group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-1">{stat.number}</div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Adopt Section */}
        <div className="bg-gradient-to-br from-[#4481EB] to-[#5B92F5] rounded-3xl shadow-lg hover:shadow-2xl p-10 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
          
          <div className="bg-white/20 p-5 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
            <HomeIcon />
          </div>
          
          <span className="bg-white/90 text-[#4481EB] text-xs font-bold px-5 py-2 rounded-full mb-6 inline-flex items-center gap-2 shadow-sm">
            <PawIcon /> Give a Home
          </span>
          
          <h2 className="text-4xl font-bold text-white mb-4">Adopt a Friend</h2>
          
          <p className="text-base text-white/95 mb-8 leading-relaxed max-w-md">
            Every adoption saves two lives - the pet you adopt and the one who takes their place. Start your journey of love today.
          </p>
          
          <Link 
            to={`/pets?species=&breed=&type=free&minPrice=0&maxPrice=100000&page=1`} 
            className="mt-auto bg-white text-[#4481EB] font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:bg-[#EDEEFF] hover:shadow-lg w-full max-w-xs flex items-center justify-center gap-2 group/btn"
          >
            Find Your Match
            <ArrowIcon className="group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
          
          <div className="mt-8 relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
            <img 
              src={nd1} 
              className="relative w-40 h-40 object-cover rounded-full shadow-xl border-4 border-white/50" 
              alt="A friendly dog available for adoption" 
            />
          </div>
        </div>

        {/* Buy/Sell Section */}
        <div className="bg-gradient-to-br from-white to-[#EDEEFF] rounded-3xl shadow-lg hover:shadow-2xl p-10 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden group">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#4481EB]/5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#4481EB]/5 rounded-full -ml-16 -mb-16"></div>
          
          <div className="bg-[#EDEEFF] p-5 rounded-2xl mb-4 text-[#4481EB] group-hover:scale-110 transition-transform duration-300">
            <HeartIcon />
          </div>
          
          <span className="bg-[#4481EB]/10 text-[#4481EB] text-xs font-bold px-5 py-2 rounded-full mb-6 inline-flex items-center gap-2 border border-[#4481EB]/20">
            <PawIcon /> Connect Hearts
          </span>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Buy or Rehome</h2>
          
          <p className="text-base text-gray-700 mb-8 leading-relaxed max-w-md">
            Whether you're expanding your family or helping a pet find their forever home, we ensure safe and loving transitions.
          </p>
          
          <Link 
            to='/pets?species=&breed=&type=paid&minPrice=0&maxPrice=100000&page=1' 
            className="mt-auto bg-[#4481EB] text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:bg-[#3670DA] hover:shadow-lg w-full max-w-xs flex items-center justify-center gap-2 group/btn"
          >
            Explore Options
            <ArrowIcon className="group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
          
          <div className="mt-8 relative">
            <div className="absolute inset-0 bg-[#4481EB]/10 rounded-full blur-xl"></div>
            <img 
              src={nd2} 
              className="relative w-40 h-40 object-cover rounded-full shadow-xl border-4 border-[#4481EB]/20" 
              alt="A cute dog for sale" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;