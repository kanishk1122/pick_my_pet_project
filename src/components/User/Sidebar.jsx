import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const data = [
  {
    title: "Personal info",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"></path>
      </svg>
    ),
    link: "/user/",
  },
  {
    title: "Update Profile",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
      >
        <path d="M19.29,2.265l2.444,2.444L14.444,12H12V9.556L19.29,2.265z M21.377,0.179l-1.222,1.222l2.444,2.444l1.222-1.222c0.239-0.239,0.239-0.626,0-0.864l-1.58-1.58C22.002-0.06,21.615-0.06,21.377,0.179z" />
        <path d="M19.001,10.272L19.002,19H5V9h4.728l2-2H5V5h8.728l2-2H5C3.897,3,3,3.897,3,5v14c0,1.103,0.897,2,2,2h14c1.103,0,2-0.897,2-2V8.272L19.001,10.272z" />
        <path d="M14.732 4L4 4 4 8 10.732 8z" opacity=".3" />
      </svg>
    ),
    link: "setting",
  },
  {
    title: "Manage Address",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
      >
        <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1 0.9 2 2 2h16c1.1 0 2-0.9 2-2V6C22 4.9 21.1 4 20 4zM20 18H4V6h16V18z"></path>
        <path d="M12 8c-1.1 0-2 0.9-2 2s0.9 2 2 2s2-0.9 2-2S13.1 8 12 8zM12 11c-0.6 0-1-0.4-1-1s0.4-1 1-1s1 0.4 1 1S12.6 11 12 11z"></path>
      </svg>
    ),
    link: "address",
  },
  {
    title: "My Posts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
      </svg>
    ),
    link: "posts",
  },
  {
    title: "My Referal",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 10a1 1 0 112 0v3a1 1 0 11-2 0V9a1 1 0 011-1h3a1 1 0 110 2H9a1 1 0 01-1-1z" />
      </svg>
    ),
    link: "refer",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (link) => {
    // Check if current path matches the link
    const currentPath = location.pathname;
    const fullLink = link.startsWith('/') ? link : `/user/${link}`;
    
    // Exact match for root user path
    if (fullLink === '/user/' && currentPath === '/user/') {
      return true;
    }
    
    // For other routes, check if path includes the link
    return currentPath.includes(link) && fullLink !== '/user/';
  };

  return (
    <div className="w-full h-full md:pt-10">
      {/* Mobile Horizontal Scroll */}
      <ul className="w-full flex md:flex-col gap-3 px-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 md:pt-2 scrollbar-hide">
        {data.map((item, index) => {
          const active = isActive(item.link);
          
          return (
            <li key={item.title} className="flex-shrink-0 md:flex-shrink">
              <button
                onClick={() => navigate(`${item.link}`)}
                className={`
                  group relative w-full h-full flex justify-center md:justify-start gap-3 items-center px-4 py-3 md:py-3.5 rounded-xl
                  font-medium transition-all duration-300 whitespace-nowrap
                  ${
                    active
                      ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg scale-105 md:scale-100"
                      : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 hover:text-emerald-700 hover:shadow-md border border-gray-200 hover:border-emerald-300"
                  }
                `}
              >
                {/* Icon */}
                <span className={`
                  transition-transform duration-300
                  ${active ? "scale-110" : "group-hover:scale-110"}
                `}>
                  {item.icon}
                </span>

                {/* Title */}
                <span className="hidden md:inline text-sm font-semibold">
                  {item.title}
                </span>

                {/* Active Indicator for Desktop */}
                {active && (
                  <span className="hidden md:block absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse" />
                )}

                {/* Mobile Title Tooltip */}
                <span className="md:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {item.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Active Page Indicator for Mobile */}
      <div className="md:hidden mt-3 px-3">
        <div className="text-center">
          <span className="text-sm font-semibold text-gray-700">
            {data.find(item => isActive(item.link))?.title || "Personal info"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// Add this to your global CSS file to hide scrollbar
// .scrollbar-hide::-webkit-scrollbar {
//   display: none;
// }
// .scrollbar-hide {
//   -ms-overflow-style: none;
//   scrollbar-width: none;
// }