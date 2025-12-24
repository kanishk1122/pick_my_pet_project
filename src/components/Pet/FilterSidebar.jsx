import { useState, useEffect } from "react";
// import { motion } from "framer-motion"; // Optional: Keep if you plan to animate
import { useSpecies } from "../../hooks/useSpecies";
import "../../styles/rangeSlider.css";

// --- Icons (Unified Stone Color) ---
const FilterIcon = () => (
  <svg
    className="w-5 h-5 text-emerald-600 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

const PawIcon = () => (
  <svg
    className="w-4 h-4 text-stone-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
    />
  </svg>
);

const TagIcon = () => (
  <svg
    className="w-4 h-4 text-stone-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
    />
  </svg>
);

const MoneyIcon = () => (
  <svg
    className="w-4 h-4 text-stone-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const FilterSidebar = ({ onFilterChange, initialFilters }) => {
  const [filters, setFilters] = useState({
    species: "",
    breed: "", // This will use the category field from backend
    type: "",
    minPrice: "0",
    maxPrice: "100000",
    ...initialFilters,
  });

  const { breeds, loading: isLoadingBreeds, getBreeds } = useSpecies();
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      ...initialFilters,
    }));
  }, [initialFilters]);

  useEffect(() => {
    getBreeds(filters.species);
  }, [filters.species, getBreeds]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "species" && { breed: "" }), // Reset breed when species changes
      ...(name === "type" &&
        value !== "paid" && { minPrice: "0", maxPrice: "100000" }), // Reset price range when switching to free
    }));
  };

  const formatPrice = (value) => {
    return `₹${parseInt(value).toLocaleString("en-IN")}`;
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [name]: value,
      };

      // Ensure minPrice doesn't exceed maxPrice
      if (name === "minPrice" && parseInt(value) > parseInt(prev.maxPrice)) {
        newFilters.maxPrice = value;
      }

      // Ensure maxPrice doesn't go below minPrice
      if (name === "maxPrice" && parseInt(value) < parseInt(prev.minPrice)) {
        newFilters.minPrice = value;
      }

      return newFilters;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  useEffect(() => {
    onFilterChange(debouncedFilters);
  }, [debouncedFilters, onFilterChange]);

  // Helper function to extract breed name and capitalize it
  const getBreedDisplayName = (breed) => {
    if (typeof breed === "string") {
      return breed.charAt(0).toUpperCase() + breed.slice(1);
    }

    if (typeof breed === "object" && breed !== null) {
      // Handle different possible breed object structures
      const name = breed.name || breed.displayName || breed;

      if (typeof name === "string") {
        return name.charAt(0).toUpperCase() + name.slice(1);
      }
    }

    return "Unknown Breed";
  };

  // Helper function to get breed value for option
  const getBreedValue = (breed) => {
    if (typeof breed === "string") {
      return breed;
    }

    if (typeof breed === "object" && breed !== null) {
      return breed.name || breed.slug || breed.displayName || breed;
    }

    return "";
  };

  return (
    <div className="w-full ">
      {/* Header */}
      <div className="flex items-center mb-6 pb-4 border-b border-stone-100">
        <FilterIcon />
        <h2 className="text-xl font-bold text-stone-800 tracking-tight">
          Filter Pets
        </h2>
      </div>

      <div className="space-y-6">
        {/* Species Selection */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-bold mb-2 text-stone-600">
            <PawIcon /> Species
          </label>
          <div className="relative">
            <select
              name="species"
              value={filters.species}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none appearance-none cursor-pointer hover:border-emerald-300"
            >
              <option value="">All Species</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="other">Other</option>
            </select>
            {/* Custom dropdown arrow styling can be added here if appearance-none is used */}
          </div>
        </div>

        {/* Breed Selection - Only shows when species is selected */}
        {filters.species && (
          <div className="animate-fade-in-down">
            <label className="flex items-center gap-2 text-sm font-bold mb-2 text-stone-600">
              <TagIcon /> Breed
            </label>
            <select
              name="breed"
              value={filters.breed}
              onChange={handleInputChange}
              disabled={isLoadingBreeds}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none appearance-none cursor-pointer hover:border-emerald-300 disabled:bg-stone-100 disabled:text-stone-400"
            >
              <option value="">All Breeds</option>
              {isLoadingBreeds ? (
                <option disabled>Loading breeds...</option>
              ) : (
                breeds.map((breed, index) => (
                  <option key={index} value={getBreedValue(breed)}>
                    {getBreedDisplayName(breed)}
                  </option>
                ))
              )}
            </select>
          </div>
        )}

        {/* Type Selection (Free/Paid) */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold mb-2 text-stone-600">
            <TagIcon /> Category
          </label>
          <select
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none appearance-none cursor-pointer hover:border-emerald-300"
          >
            <option value="">All Categories</option>
            <option value="free">Adoption (Free)</option>
            <option value="paid">Sale (Paid)</option>
          </select>
        </div>

        {/* Show price range only if type is 'paid' */}
        {filters.type !== "free" && (
          <div className="animate-fade-in-down p-4 bg-stone-50 rounded-2xl border border-stone-100">
            <label className="flex items-center gap-2 text-sm font-bold mb-4 text-stone-600">
              <MoneyIcon /> Price Range
            </label>

            <div className="space-y-5">
              <div className="flex justify-between text-xs font-bold font-mono">
                <span className="text-stone-500 bg-white px-2 py-1 rounded border border-stone-200">
                  {formatPrice(filters.minPrice)}
                </span>
                <span className="text-stone-500 bg-white px-2 py-1 rounded border border-stone-200">
                  {formatPrice(filters.maxPrice)}
                </span>
              </div>

              <div className="relative h-2 bg-stone-200 rounded-full">
                <div
                  className="absolute h-full bg-emerald-500 rounded-full opacity-80"
                  style={{
                    left: `${(filters.minPrice / 100000) * 100}%`,
                    right: `${100 - (filters.maxPrice / 100000) * 100}%`,
                  }}
                />
              </div>

              <div className="relative h-0">
                <input
                  type="range"
                  name="minPrice"
                  min="0"
                  max="100000"
                  step="1000"
                  value={filters.minPrice}
                  onChange={handleRangeChange}
                  className="absolute w-full -top-3 h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer 
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:h-5 
                  [&::-webkit-slider-thumb]:w-5 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-white 
                  [&::-webkit-slider-thumb]:border-2 
                  [&::-webkit-slider-thumb]:border-emerald-500 
                  [&::-webkit-slider-thumb]:shadow-md 
                  [&::-webkit-slider-thumb]:transition-transform 
                  [&::-webkit-slider-thumb]:hover:scale-110"
                />
                <input
                  type="range"
                  name="maxPrice"
                  min="0"
                  max="100000"
                  step="1000"
                  value={filters.maxPrice}
                  onChange={handleRangeChange}
                  className="absolute w-full -top-3 h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer 
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:h-5 
                  [&::-webkit-slider-thumb]:w-5 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-white 
                  [&::-webkit-slider-thumb]:border-2 
                  [&::-webkit-slider-thumb]:border-emerald-500 
                  [&::-webkit-slider-thumb]:shadow-md 
                  [&::-webkit-slider-thumb]:transition-transform 
                  [&::-webkit-slider-thumb]:hover:scale-110"
                />
              </div>

              {/* Manual Input Fields */}
              <div className="flex justify-between gap-2 pt-2">
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleRangeChange}
                    className="w-full pl-6 pr-2 py-2 text-sm border border-stone-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    min="0"
                    max={filters.maxPrice}
                  />
                </div>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleRangeChange}
                    className="w-full pl-6 pr-2 py-2 text-sm border border-stone-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    min={filters.minPrice}
                    max="100000"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Apply Filters Button */}
        <button
          onClick={() => onFilterChange(filters)}
          className="w-full mt-6 bg-emerald-600 brand-button "
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
