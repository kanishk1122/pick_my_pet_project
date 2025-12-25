import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Deafultpage from "../components/Deafultpage";
import Navbar from "../components/Navbar";
import Home from "../components/Home.jsx";
import Auth from "../components/auth/Auth.jsx";
import User from "../components/User/index.jsx";
import CreatePost from "../components/CreatePost.jsx";
import PetList from "../components/Pet/PetList.jsx";
import FreePetList from "../components/Pet/FreePetList.jsx";
import PaidPetList from "../components/Pet/PaidPetList.jsx";
import PetViewer from "../components/Pet/PetViewer.jsx";
import FilteredPetList from "../components/Pet/FilteredPetList.jsx";
import {USER} from  "../Consts/apikeys.js"



function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from backend
    async function fetchUser() {
      const response = await axios.get(USER.GetUser);
      setUser(response.data);
    }
    fetchUser();
  }, []);

  const handlePetInfoAccess = async (petId) => {
    if (user.coins >= 10) {
      await axios.post("/api/coins/deduct-coins", {
        userId: user._id,
        amount: 10,
      });
      // Redirect to pet info page
      window.location.href = `/pet/${petId}`;
    } else {
      alert("Not enough coins to access pet info.");
    }
  };

  return (
    <Routes>
      {/* Routes with Navbar */}
      <Route
        path="*"
        element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route className="mt-20" path="/user/*" element={<User />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/pets" element={<PetList />} />
              <Route path="/pets/filter" element={<FilteredPetList />} />
              <Route
                path="/pet/:slug"
                element={<PetViewer onAccess={handlePetInfoAccess} />}
              />
              <Route path="/pets/loving-companions" element={<FreePetList />} />
              <Route path="/pets/companion-pets" element={<PaidPetList />} />
            </Routes>
          </MainLayout>
        }
      />

      {/* Routes without Navbar */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/default" element={<Deafultpage />} />
    </Routes>
  );
}

// Main layout with Navbar
const MainLayout = ({ children }) => {
  return (
    // 1. Global Theme Background (Cream) & Text Color
    // overflow-x-hidden prevents horizontal scrollbars from animations
    <div className="min-h-screen w-full bg-[#FDFCF8] text-stone-800 font-sans selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden relative">
      
      {/* 2. Floating Header Container */}
      {/* pointer-events-none allows clicking on the page 'through' the empty space on sides of the navbar */}
      <header className="fixed top-0 left-0 w-full z-[9999] pt-4 md:pt-6 px-0 sm:px-4 flex justify-center pointer-events-none">
        {/* Restore pointer-events so the Navbar itself is clickable */}
        <div className="w-full pointer-events-auto">
          <Navbar />
        </div>
      </header>

      {/* 3. Main Content Area */}
      {/* Added enough top padding (pt-32) so the first section isn't hidden behind the floating navbar */}
      <main className="w-full pt-32 md:pt-36 pb-12 mx-auto">
        {children}
      </main>

    </div>
  );
};

export default App;
