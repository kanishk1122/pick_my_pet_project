import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePosts, usePostFilters } from "../../hooks/usePosts";
import FilterSidebar from "./FilterSidebar";
import FilteredPetList from "./FilteredPetList";
import PostSlicer from "@store/slices/PostSlicer"; // Adjust the import path as needed

const PetList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Redux hooks
  const { posts, loading, error, pageInfo, viewMode, fetchPosts, setViewMode } =
    usePosts();
  const {
    filters,
    updateFiltersFromURL,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    handlePageSizeChange,
  } = usePostFilters(navigate, location);

  // Initialize filters from URL on mount
  useEffect(() => {
    updateFiltersFromURL();
  }, [updateFiltersFromURL]);

  // Fetch posts when filters change
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(searchParams.entries());

    if (!params.page) {
      params.page = "1";
    }
    if (!params.limit) {
      params.limit = pageInfo.limit.toString();
    }

    fetchPosts(params);
  }, [location.search, fetchPosts, pageInfo.limit]);

  return (
    <div className="flex bg-white rounded-t-2xl border-t-4 border-black min-h-screen overflow-hidden">
      <FilterSidebar
        onFilterChange={handleFilterChange}
        initialFilters={Object.fromEntries(
          new URLSearchParams(location.search)
        )}
      />
      <div className="flex-1 flex flex-col">
        <div className="px-8 pt-8 pb-4">
          <h1 className="text-4xl font-bold mb-4 text-center text-green-600">
            Find Your Perfect Pet
          </h1>
        </div>

        {error && (
          <div className="px-8 mb-4">
            <div className="text-red-600 text-center bg-red-50 border border-red-200 rounded-lg p-4">
              {error}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            {posts.length === 0 ? (
              <div className="flex-1 flex justify-center items-center">
                <div className="text-center text-gray-600">
                  <div className="text-6xl mb-4">🐾</div>
                  <div className="text-xl font-medium mb-2">
                    No pets found matching your criteria
                  </div>
                  <div className="text-gray-500">
                    Try adjusting your filters or search terms
                  </div>
                </div>
              </div>
            ) : (
              <>
                <PostSlicer
                  pageInfo={pageInfo}
                  onSortChange={handleSortChange}
                  onViewModeChange={setViewMode}
                  onPageSizeChange={handlePageSizeChange}
                  currentSort={filters.sortBy}
                  currentViewMode={viewMode}
                  currentPageSize={pageInfo.limit}
                />
                <div className="flex-1 p-8 pt-4">
                  <FilteredPetList
                    pets={posts}
                    pageInfo={pageInfo}
                    onPageChange={handlePageChange}
                    viewMode={viewMode}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(PetList);
