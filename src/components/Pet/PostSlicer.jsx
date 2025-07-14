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

  const sortOptions = [
    { value: "newest", label: "Newest First", icon: FaSortAmountDown },
    { value: "oldest", label: "Oldest First", icon: FaSortAmountUp },
    { value: "price-low", label: "Price: Low to High", icon: FaSortAmountUp },
    {
      value: "price-high",
      label: "Price: High to Low",
      icon: FaSortAmountDown,
    },
    { value: "title-az", label: "Title: A to Z", icon: FaSort },
    { value: "title-za", label: "Title: Z to A", icon: FaSort },
  ];

  const pageSizeOptions = [6, 12, 24, 48];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find((opt) => opt.value === currentSort);
    return option ? option.label : "Sort By";
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Results Info */}
        <div className="flex items-center gap-4">
          <div className="text-gray-600">
            <span className="font-medium text-gray-800">
              {pageInfo?.totalPosts || 0}
            </span>{" "}
            pets found
          </div>
          <div className="text-sm text-gray-500">
            Page {pageInfo?.currentPage || 1} of {pageInfo?.totalPages || 1}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Page Size Selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Show:</label>
            <select
              value={currentPageSize}
              onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <FaSort className="w-4 h-4" />
              {getCurrentSortLabel()}
              <svg
                className="w-4 h-4 ml-1"
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
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10"
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
                        className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-gray-100 ${
                          currentSort === option.value
                            ? "bg-green-50 text-green-700"
                            : "text-gray-700"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 text-sm ${
                currentViewMode === "grid"
                  ? "bg-green-500 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              title="Grid View"
            >
              <FaTh className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 text-sm border-l border-gray-300 ${
                currentViewMode === "list"
                  ? "bg-green-500 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              title="List View"
            >
              <FaList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Filter Chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onSortChange("newest")}
          className={`px-3 py-1 text-xs rounded-full border ${
            currentSort === "newest"
              ? "bg-green-100 text-green-800 border-green-300"
              : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
          }`}
        >
          Latest Posts
        </button>
        <button
          onClick={() => onSortChange("price-low")}
          className={`px-3 py-1 text-xs rounded-full border ${
            currentSort === "price-low"
              ? "bg-green-100 text-green-800 border-green-300"
              : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
          }`}
        >
          Budget Friendly
        </button>
        <button
          onClick={() => onSortChange("price-high")}
          className={`px-3 py-1 text-xs rounded-full border ${
            currentSort === "price-high"
              ? "bg-green-100 text-green-800 border-green-300"
              : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
          }`}
        >
          Premium Pets
        </button>
      </div>
    </div>
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
