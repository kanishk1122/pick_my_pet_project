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
      <div className="text-center py-8">
        <p className="text-red-500">Error loading pets: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                loading={loading}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Post Slicer */}
            <div className="mb-6">
              <PostSlicer
                filters={filters}
                onSortChange={handleSortChange}
                onPageSizeChange={handlePageSizeChange}
                onViewModeChange={handleViewModeChange}
                pageInfo={pageInfo}
                viewMode={viewMode}
                loading={loading}
              />
            </div>

            {/* Pet List */}
            <FilteredPetList
              posts={posts}
              pageInfo={pageInfo}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetList;
