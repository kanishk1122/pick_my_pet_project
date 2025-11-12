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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <p className="text-red-500 text-lg">Error loading pets: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">
            Find Your Perfect Pet 🐾
          </h1>
          <p className="text-base md:text-lg opacity-90">
            Browse through our collection of adorable pets waiting for a loving
            home
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Hidden on mobile by default, shown in modal */}
          <div className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="sticky top-6 bg-white rounded-2xl shadow-lg p-6">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                loading={loading}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => {
                  // TODO: Implement mobile filter modal
                  alert("Mobile filter coming soon!");
                }}
                className="w-full bg-white rounded-xl shadow-md px-4 py-3 flex items-center justify-center gap-2 text-gray-700 font-medium hover:shadow-lg transition-shadow"
              >
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
                Filters
              </button>
            </div>

            {/* Post Slicer */}
            <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
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
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading adorable pets...</p>
                </div>
              </div>
            )}

            {/* Pet List */}
            {!loading && (
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
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
