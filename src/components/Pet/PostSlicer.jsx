import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaTh,
  FaList,
  FaSort,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { SLICER } from "../../Consts/apikeys";

const PostSlicer = ({
  pageInfo,
  onSortChange,
  onViewModeChange,
  onPageSizeChange,
  currentSort = "newest",
  currentViewMode = "grid",
  currentPageSize = 12,
}) => {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const sortOptions = SLICER.SORT_OPTIONS.map((opt) => {
    switch (opt.value) {
      case "newest":
      case "price-high":
        return { ...opt, icon: FaSortAmountDown };
      case "oldest":
      case "price-low":
        return { ...opt, icon: FaSortAmountUp };
      default:
        return { ...opt, icon: FaSort };
    }
  });

  const pageSizeOptions = SLICER.PAGE_SIZE_OPTIONS;

  const getCurrentSortLabel = () => {
    const option = sortOptions.find((opt) => opt.value === currentSort);
    return option ? option.label : "Sort By";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white"
    >
      <div className="px-4 md:px-6 py-4 md:py-5">
        {/* Top Row - Results and Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          {/* Results Info */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <div className="text-sm md:text-base text-gray-600">
              <span className="font-bold text-lg md:text-xl text-green-600">
                {pageInfo?.totalPosts || 0}
              </span>{" "}
              <span className="hidden sm:inline">pets found</span>
              <span className="sm:hidden">pets</span>
            </div>
            <div className="text-xs md:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Page {pageInfo?.currentPage || 1} of {pageInfo?.totalPages || 1}
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full lg:w-auto">
            {/* Page Size Selector */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <label className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
                Show:
              </label>
              <select
                value={currentPageSize}
                onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
                className="bg-white border border-gray-300 rounded-md px-2 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex-1 lg:flex-initial">
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="w-full lg:w-auto flex items-center justify-between gap-2 px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FaSort className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
                  <span className="truncate max-w-[120px] md:max-w-none">
                    {getCurrentSortLabel()}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    sortDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {sortDropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setSortDropdownOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl z-20 overflow-hidden"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => {
                        const IconComponent = option.icon;
                        return (
                          <button
                            key={option.value}
                            onClick={() => {
                              onSortChange(option.value);
                              setSortDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                              currentSort === option.value
                                ? "bg-green-50 text-green-700 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <IconComponent
                              className={`w-4 h-4 ${
                                currentSort === option.value
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            />
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-50 rounded-lg overflow-hidden border border-gray-300">
              <button
                onClick={() => onViewModeChange(SLICER.VIEW_MODES.GRID)}
                className={`p-2 md:p-2.5 transition-all ${
                  currentViewMode === SLICER.VIEW_MODES.GRID
                    ? "bg-green-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
                title="Grid View"
              >
                <FaTh className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange(SLICER.VIEW_MODES.LIST)}
                className={`p-2 md:p-2.5 border-l border-gray-300 transition-all ${
                  currentViewMode === SLICER.VIEW_MODES.LIST
                    ? "bg-green-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
                title="List View"
              >
                <FaList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500 self-center hidden sm:block">
            Quick filters:
          </span>
          <button
            onClick={() => onSortChange("newest")}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              currentSort === "newest"
                ? "bg-green-500 text-white border-green-600 shadow-md"
                : "bg-white text-gray-600 border-gray-300 hover:border-green-300 hover:bg-green-50"
            }`}
          >
            ✨ Latest
          </button>
          <button
            onClick={() => onSortChange("price-low")}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              currentSort === "price-low"
                ? "bg-green-500 text-white border-green-600 shadow-md"
                : "bg-white text-gray-600 border-gray-300 hover:border-green-300 hover:bg-green-50"
            }`}
          >
            💰 Budget
          </button>
        </div>
      </div>
    </motion.div>
  );
};

PostSlicer.propTypes = {
  pageInfo: PropTypes.shape({
    totalPosts: PropTypes.number,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
  }),
  onSortChange: PropTypes.func.isRequired,
  onViewModeChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  currentSort: PropTypes.string,
  currentViewMode: PropTypes.string,
  currentPageSize: PropTypes.number,
};

export default PostSlicer;
