import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSpecies } from "../../hooks/useSpecies";
import "../../styles/rangeSlider.css";

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

  // const handlePriceChange = useCallback((e) => {
  //   const { name, value } = e.target;
  //   setFilters(prev => {
  //     const newFilters = {
  //       ...prev,
  //       [name]: value
  //     };

  //     // Ensure minPrice doesn't exceed maxPrice
  //     if (name === 'minPrice' && parseInt(value) > parseInt(prev.maxPrice)) {
  //       newFilters.maxPrice = value;
  //     }

  //     // Ensure maxPrice doesn't go below minPrice
  //     if (name === 'maxPrice' && parseInt(value) < parseInt(prev.minPrice)) {
  //       newFilters.minPrice = value;
  //     }

  //     return newFilters;
  //   });
  // }, []);

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
    <div className="w-full">
      <div className="flex items-center justify-center mb-6 pb-4 border-b-2 border-green-200">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
          🔍 Filter Pets
        </h2>
      </div>
      <div className="space-y-4">
        {/* Species Selection */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Species
          </label>
          <select
            name="species"
            value={filters.species}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none bg-white hover:border-green-300"
          >
            <option value="">All Species</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Breed Selection - Only shows when species is selected */}
        {filters.species && (
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Breed
            </label>
            <select
              name="breed"
              value={filters.breed}
              onChange={handleInputChange}
              disabled={isLoadingBreeds}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none bg-white hover:border-green-300 disabled:bg-gray-100"
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
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Category
          </label>
          <select
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none bg-white hover:border-green-300"
          >
            <option value="">All Categories</option>
            <option value="free">Adoption</option>
            <option value="paid">Sale</option>
          </select>
        </div>

        {/* Show price range only if type is 'paid' */}
        {filters.type !== "free" && (
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">
              Price Range
            </label>
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span className="text-green-600">
                  {formatPrice(filters.minPrice)}
                </span>
                <span className="text-blue-600">
                  {formatPrice(filters.maxPrice)}
                </span>
              </div>
              <div className="relative h-1 bg-gray-200 rounded-full">
                <div
                  className="absolute h-full bg-green-500 rounded-full"
                  style={{
                    left: `${(filters.minPrice / 100000) * 100}%`,
                    right: `${100 - (filters.maxPrice / 100000) * 100}%`,
                  }}
                />
              </div>
              <div className="relative">
                <input
                  type="range"
                  name="minPrice"
                  min="0"
                  max="100000"
                  step="1000"
                  value={filters.minPrice}
                  onChange={handleRangeChange}
                  className="absolute w-full -top-1 h-1 appearance-none bg-transparent pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500"
                />
                <input
                  type="range"
                  name="maxPrice"
                  min="0"
                  max="100000"
                  step="1000"
                  value={filters.maxPrice}
                  onChange={handleRangeChange}
                  className="absolute w-full -top-1 h-1 appearance-none bg-transparent pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500"
                />
              </div>
              <div className="flex justify-between mt-4">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleRangeChange}
                  className="w-24 px-2 py-1 text-sm border rounded"
                  min="0"
                  max={filters.maxPrice}
                />
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleRangeChange}
                  className="w-24 px-2 py-1 text-sm border rounded"
                  min={filters.minPrice}
                  max="100000"
                />
              </div>
            </div>
          </div>
        )}

        {/* Apply Filters Button */}
        <button
          onClick={() => onFilterChange(filters)}
          className="w-full mt-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
