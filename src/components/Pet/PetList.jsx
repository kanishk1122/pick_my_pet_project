import { useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchPosts,
  setFilters,
  setViewMode,
} from "../../store/slices/postSlice";
import FilterSidebar from "./FilterSidebar";
import FilteredPetList from "./FilteredPetList";
import PostSlicer from "./PostSlicer";

// --- Icons (Unified Stone Color) ---
const FilterIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

const SadFaceIcon = () => (
  <svg
    className="w-16 h-16 text-stone-300 mx-auto mb-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PetList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const hasInitialized = useRef(false);

  // Redux state
  const posts = useAppSelector((state) => state.posts.posts);
  const loading = useAppSelector((state) => state.posts.loading);
  const error = useAppSelector((state) => state.posts.error);
  const pageInfo = useAppSelector((state) => state.posts.pageInfo);
  const filters = useAppSelector((state) => state.posts.filters);
  const viewMode = useAppSelector((state) => state.posts.viewMode);

  // Memoized handlers
  const handleFilterChange = useCallback(
    (newFilters) => {
      const queryParams = new URLSearchParams({
        ...newFilters,
        page: "1",
      });
      navigate(`${location.pathname}?${queryParams.toString()}`);
    },
    [navigate, location.pathname]
  );

  const handleSortChange = useCallback(
    (sortBy) => {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set("sort", sortBy);
      queryParams.set("page", "1");
      navigate(`${location.pathname}?${queryParams.toString()}`);
    },
    [navigate, location.pathname, location.search]
  );

  const handlePageChange = useCallback(
    (page) => {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set("page", page.toString());
      navigate(`${location.pathname}?${queryParams.toString()}`);
    },
    [navigate, location.pathname, location.search]
  );

  const handlePageSizeChange = useCallback(
    (size) => {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set("limit", size.toString());
      queryParams.set("page", "1");
      navigate(`${location.pathname}?${queryParams.toString()}`);
    },
    [navigate, location.pathname, location.search]
  );

  const handleViewModeChange = useCallback(
    (mode) => {
      dispatch(setViewMode(mode));
    },
    [dispatch]
  );

  // Single effect to handle URL changes and fetch posts
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(searchParams.entries());

    // Set defaults
    if (!params.page) {
      params.page = "1";
    }
    if (!params.limit) {
      params.limit = "12";
    }

    // Update filters from URL on first load
    if (!hasInitialized.current) {
      const urlFilters = {
        species: params.species || "",
        breed: params.breed || "",
        type: params.type || "",
        minPrice: params.minPrice || "0",
        maxPrice: params.maxPrice || "100000",
        sortBy: params.sort || "newest",
        page: parseInt(params.page) || 1,
      };
      dispatch(setFilters(urlFilters));
      hasInitialized.current = true;
    }

    // Fetch posts
    dispatch(fetchPosts(params));
  }, [location.search, dispatch]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center px-4">
        <div className="text-center bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm max-w-md w-full">
          <SadFaceIcon />
          <h3 className="text-xl font-bold text-stone-800 font-serif mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-stone-500 mb-6 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    // Global Background: Cream/Off-white
    <div className="min-h-screen bg-[#FDFCF8]">
      {/* Hero Section: Solid Sage Green with soft rounded bottom */}
      <div className="bg-emerald-600 text-white py-12 md:py-16 px-4 rounded-b-[2.5rem] shadow-sm mb-8">
        <div className="container mx-auto text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 font-serif tracking-wide">
            Find Your Perfect Companion 🐾
          </h1>
          <p className="text-base md:text-lg text-emerald-50 max-w-2xl font-medium opacity-90">
            Browse through our collection of adorable pets waiting for a loving
            home.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-72 flex-shrink-0">
            {/* Sidebar Container: White with Stone Border & Bubbly Corners */}
            <div className="sticky top-6 bg-white border border-stone-200 rounded-[2rem] p-6 shadow-sm">
              <FilterSidebar
                initialFilters={filters}
                onFilterChange={handleFilterChange}
                loading={loading}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => {
                  alert("Mobile filter coming soon!");
                }}
                className="w-full bg-white border border-stone-200 rounded-2xl p-4 flex items-center justify-center gap-2 text-stone-600 font-bold hover:border-emerald-400 hover:text-emerald-600 transition-all shadow-sm"
              >
                <FilterIcon />
                Filters & Sort
              </button>
            </div>

            {/* Post Slicer (Control Bar) Container */}
            <div className="bg-white border border-stone-200 rounded-[1.5rem] mb-6 shadow-sm overflow-hidden p-1">
              <PostSlicer
                currentSort={filters.sortBy}
                currentViewMode={viewMode}
                currentPageSize={pageInfo.limit}
                onSortChange={handleSortChange}
                onPageSizeChange={handlePageSizeChange}
                onViewModeChange={handleViewModeChange}
                pageInfo={pageInfo}
              />
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-24 bg-white border border-dashed border-stone-200 rounded-[2.5rem]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600 mx-auto mb-4"></div>
                  <p className="text-stone-500 font-medium animate-pulse">
                    Looking for friends...
                  </p>
                </div>
              </div>
            )}

            {/* Pet List Container */}
            {!loading && (
              <div className="bg-white border border-stone-200 rounded-[2.5rem] p-4 md:p-8 min-h-[600px] shadow-sm">
                <FilteredPetList
                  posts={posts}
                  viewMode={viewMode}
                  pageInfo={pageInfo}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetList;