import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Pagination from "./Pagination";
import { SLICER } from "../../Consts/apikeys";

const PetListItem = ({ pet, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <Link
      to={`/pet/${pet?.slug}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex">
        <div className="w-40 h-40 flex-shrink-0">
          <img
            src={pet.images[0]}
            alt={pet.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex flex-col justify-between">
          <div>
            <span
              className={`px-2 py-1 text-xs font-bold uppercase rounded-full ${
                pet.type === "free"
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {pet.type === "free" ? "Adoption" : "For Sale"}
            </span>
            <h3 className="text-lg font-semibold text-gray-800 mt-2 mb-1">
              {pet.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {pet.discription}
            </p>
          </div>
          <div className="text-sm">
            <span className="text-gray-700 font-medium">
              {pet.species} - {pet.category}
            </span>
            {pet.type === "paid" && (
              <span className="text-green-600 font-bold ml-4">
                ₹{pet.amount.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

PetListItem.propTypes = {
  pet: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const FilteredPetList = ({ posts, pageInfo, onPageChange, viewMode }) => {
  if (!posts || !posts.length) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 md:py-20 px-4">
        <div className="text-6xl md:text-8xl mb-4 animate-bounce">🐾</div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          No pets found
        </h3>
        <p className="text-sm md:text-base text-gray-500 max-w-md">
          Try adjusting your filters to discover more adorable pets waiting for
          a home
        </p>
      </div>
    );
  }

  return (
    <>
      {viewMode === SLICER.VIEW_MODES.LIST ? (
        <div className="space-y-3 md:space-y-4">
          {posts.map((pet, index) => (
            <PetListItem key={pet._id} pet={pet} index={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {posts.map((pet, index) => (
            <motion.div
              key={pet._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="h-full"
            >
              <Link to={`/pet/${pet.slug}`} className="block h-full group">
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col group-hover:-translate-y-2 border border-transparent hover:border-green-200">
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={pet.images[0]}
                      alt={pet.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-3 py-1.5 text-xs font-bold uppercase rounded-full shadow-lg backdrop-blur-sm ${
                          pet.type === "free"
                            ? "bg-emerald-500/95 text-white"
                            : "bg-blue-500/95 text-white"
                        }`}
                      >
                        {pet.type === "free" ? "🏡 Adopt" : "💰 Buy"}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
                      {pet.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                      {pet.discription}
                    </p>

                    {/* Category Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 text-xs font-semibold text-green-700 border border-green-200">
                        {pet.species}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 text-xs font-semibold text-blue-700 border border-blue-200">
                        {pet.category}
                      </span>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      {/* Location */}
                      {pet.address && (
                        <div className="flex items-center text-xs text-gray-500 max-w-[60%]">
                          <svg
                            className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="truncate">
                            {pet.address.city}, {pet.address.state}
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      {pet.type === "paid" && (
                        <span className="text-base md:text-lg font-bold text-green-600 ml-auto whitespace-nowrap">
                          ₹{pet.amount.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pageInfo && pageInfo.totalPages > 1 && (
        <div className="mt-8 md:mt-12">
          <Pagination
            currentPage={pageInfo.currentPage}
            totalPages={pageInfo.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
};

FilteredPetList.propTypes = {
  posts: PropTypes.array,
  pageInfo: PropTypes.shape({
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
  }),
  onPageChange: PropTypes.func.isRequired,
  viewMode: PropTypes.string,
};

FilteredPetList.defaultProps = {
  posts: [],
  pageInfo: null,
  viewMode: SLICER.VIEW_MODES.GRID,
};

export default FilteredPetList;
