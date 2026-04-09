import React from "react";
import Sidebar from "./Sidebar.jsx";
import Profileroutes from "./Profileroutes.jsx"; // Nested routes
import ReferralLink from "./ReferralLink.jsx";

const Index = () => {
  const userId = "user-id-from-context-or-props"; // Replace with actual user ID

  return (
    <div className="h-fit flex flex-col md:flex-row -mb-6 bg-white rounded-t-[30px] mt-20 gap-2 border-y-2 border-black">
      {/* Sidebar */}
      <div className="w-full md:w-[260px] md:min-w-[260px] md:border-r border-b md:border-b-0 border-black py-4 max-md:hidden">
        <Sidebar />
      </div>

      {/* Main Content: Nested Routes */}
      <div className="w-full md:w-[calc(100%-260px)] p-5">
        <Profileroutes />
      </div>
       <div className="w-full md:w-[260px] md:min-w-[260px] md:border-r border-b md:border-b-0 border-black py-4 hidden bottom-0 right-0 bg-white max-md:flex max-md:fixed bottom:0 ">
        <Sidebar />
      </div>
    </div>
  );
};

export default Index;
