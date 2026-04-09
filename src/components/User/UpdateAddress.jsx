import { useState, useEffect, useRef } from "react";
import { useSwal } from "@utils/Customswal.jsx";
import { useUser } from "../../utils/Usercontext";
import { useAddresses } from "../../hooks/useAddresses";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const UpdateAddress = () => {
  const Swal = useSwal();
  const { user } = useUser();
  const {
    addresses,
    pagination,
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    loading,
  } = useAddresses();

  const initialFormState = {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    landmark: "",
    isDefault: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const mapRef = useRef();

  useEffect(() => {
    getAddresses(currentPage);
  }, [getAddresses, currentPage]);

  const handleEdit = (address) => {
    setEditingId(address._id);
    setFormData({
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      landmark: address.landmark || "",
      isDefault: address.isDefault,
    });
    // Scroll to form on mobile
    if (window.innerWidth < 768) {
      setTimeout(() => {
        document
          .querySelector(".address-form")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const deleteResult = await deleteAddress(id);
      if (deleteResult.meta.requestStatus === "fulfilled") {
        Swal.fire("Deleted!", "Your address has been deleted.", "success");
      } else {
        Swal.fire("Error!", "Failed to delete address.", "error");
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setSelectedPosition([lat, lng]);
        map.flyTo(e.latlng, map.getZoom());
        reverseGeocode([lat, lng]);
      },
    });

    return selectedPosition === null ? null : (
      <Marker position={selectedPosition}></Marker>
    );
  };

  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  const reverseGeocode = async (coords) => {
    const [lat, lon] = coords;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      if (!response.ok) throw new Error("Reverse geocoding failed");
      const data = await response.json();
      if (data && data.address) {
        const { address } = data;
        setFormData((prev) => ({
          ...prev,
          street: address.road || "",
          city: address.city || address.town || address.village || "",
          state: address.state || "",
          postalCode: address.postcode || "",
          country: address.country || "India",
        }));
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Could not fetch address for the location.", "error");
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      Swal.fire(
        "Geolocation Not Supported",
        "Your browser does not support geolocation.",
        "error"
      );
      return;
    }

    // Geolocation API is blocked on insecure origins in most modern browsers.
    if (
      window.location.protocol !== "https:" &&
      window.location.hostname !== "localhost"
    ) {
      Swal.fire(
        "Secure Connection Required",
        "Getting your location automatically only works on a secure (HTTPS) connection. This feature will work when the site is deployed. For now, please select your location manually on the map.",
        "warning"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setSelectedPosition([latitude, longitude]);
        if (mapRef.current) {
          mapRef.current.flyTo([latitude, longitude], 15);
        }
        reverseGeocode([latitude, longitude]);
      },
      (error) => {
        console.error("Geolocation error:", error);
        let message = "Could not get current location. Please try again.";
        if (error.code === error.PERMISSION_DENIED) {
          message =
            "Location access was denied. To use this feature, please enable location permissions for this site in your browser settings.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message = "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
          message = "The request to get user location timed out.";
        }
        Swal.fire("Error", message, "error");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPosition) {
      Swal.fire("Error!", "Please select a location on the map.", "error");
      return;
    }
    setIsSubmitting(true);

    try {
      const [lon, lat] = selectedPosition;
      // 2. Prepare the data for the backend
      const addressData = {
        ...formData,
        location: {
          type: "Point",
          coordinates: [parseFloat(lat), parseFloat(lon)],
        },
      };

      // 3. Dispatch the action
      const action = editingId
        ? updateAddress(editingId, addressData)
        : addAddress(addressData);

      const result = await action;

      if (result.meta.requestStatus === "fulfilled") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Address ${editingId ? "updated" : "added"} successfully`,
        });
        cancelEdit();
      } else {
        throw new Error(result.payload || "Failed to save address");
      }
    } catch (error) {
      console.error("Address submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to save address",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 py-6 md:py-12 px-3 sm:px-4 relative overflow-hidden rounded-xl md:rounded-3xl">
      {/* Noise Effect Overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Background Elements - Hidden on mobile for performance */}
      <div className="hidden md:block absolute top-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="hidden md:block absolute bottom-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative bg-white/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl max-w-5xl mx-auto shadow-xl border border-white/50">
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center">
          <div className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full mb-3 md:mb-4 shadow-lg text-sm md:text-base">
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
            </svg>
            <span className="font-semibold">Address Management</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Manage Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">
              Addresses
            </span>
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Keep your delivery locations up to date
          </p>
        </div>

        {/* Saved Addresses List */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full" />
            Saved Addresses
          </h3>

          {loading && (
            <div className="flex items-center justify-center py-8 md:py-12">
              <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-4 border-emerald-500 border-t-transparent" />
            </div>
          )}

          {!loading && addresses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className={`group relative p-4 md:p-6 rounded-xl md:rounded-2xl transition-all duration-300 ${
                    editingId === address._id
                      ? "bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-500 shadow-lg md:scale-105"
                      : "bg-white border-2 border-gray-100 hover:border-emerald-200 hover:shadow-md"
                  }`}
                >
                  {/* Default Badge */}
                  {address.isDefault && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold px-2 md:px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                      </svg>
                      <span className="hidden sm:inline">Default</span>
                    </div>
                  )}

                  {/* Address Content */}
                  <div className="mb-3 md:mb-4">
                    <div className="flex items-start gap-2 md:gap-3 mb-2">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 flex-shrink-0 mt-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-900 leading-relaxed text-sm md:text-base">
                          {address.street}
                        </p>
                        {address.landmark && (
                          <p className="text-xs md:text-sm text-gray-600 mt-1">
                            Near {address.landmark}
                          </p>
                        )}
                        <p className="text-xs md:text-sm text-gray-600 mt-1">
                          {address.city}, {address.state} - {address.postalCode}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {address.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(address)}
                      className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg md:rounded-xl hover:shadow-lg transition-all duration-300 font-medium text-xs md:text-sm"
                    >
                      <svg
                        className="w-3.5 h-3.5 md:w-4 md:h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(address._id)}
                      className="px-3 md:px-4 py-2 bg-red-50 text-red-600 rounded-lg md:rounded-xl hover:bg-red-100 transition-all duration-300 font-medium text-xs md:text-sm border border-red-200"
                    >
                      <svg
                        className="w-3.5 h-3.5 md:w-4 md:h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center py-12 md:py-16 bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-xl md:rounded-2xl border-2 border-dashed border-gray-200">
                <svg
                  className="w-12 h-12 md:w-16 md:h-16 mx-auto text-gray-400 mb-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                </svg>
                <p className="text-gray-600 font-medium text-sm md:text-base">
                  No saved addresses found
                </p>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Add your first address below
                </p>
              </div>
            )
          )}
        </div>

        {/* Pagination Controls */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8 mb-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, pagination.totalPages)
                )
              }
              disabled={currentPage === pagination.totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Address Form */}
        <div className="address-form bg-gradient-to-br from-emerald-50/50 to-green-50/50 p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl border border-emerald-100">
          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full" />
            {editingId ? "Edit Address" : "Add New Address"}
          </h3>

          <div className="mb-4">
            <label className="block text-xs md:text-sm font-semibold mb-1.5 md:mb-2 text-gray-700">
              Select Location on Map
            </label>
            <div className="h-64 w-full rounded-lg overflow-hidden border-2 border-gray-200">
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                style={{ height: "100%", width: "100%" }}
                whenCreated={(mapInstance) => {
                  mapRef.current = mapInstance;
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
                {selectedPosition && (
                  <ChangeView center={selectedPosition} zoom={15} />
                )}
              </MapContainer>
            </div>
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Use My Current Location
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Street Address */}
            <div className="form-group">
              <label className="block text-xs md:text-sm font-semibold mb-1.5 md:mb-2 text-gray-700">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full p-3 md:p-4 text-sm md:text-base bg-white border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-emerald-500 focus:ring-0 transition-all outline-none hover:border-emerald-300"
                placeholder="Enter your street address"
                required
              />
            </div>

            {/* Landmark */}
            <div className="form-group">
              <label className="block text-xs md:text-sm font-semibold mb-1.5 md:mb-2 text-gray-700">
                Landmark
              </label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                className="w-full p-3 md:p-4 text-sm md:text-base bg-white border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-emerald-500 focus:ring-0 transition-all outline-none hover:border-emerald-300"
                placeholder="Enter nearby landmark (optional)"
              />
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="form-group">
                <label className="block text-xs md:text-sm font-semibold mb-1.5 md:mb-2 text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 md:p-4 text-sm md:text-base bg-white border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-emerald-500 focus:ring-0 transition-all outline-none hover:border-emerald-300"
                  placeholder="Enter city"
                  required
                />
              </div>
              <div className="form-group">
                <label className="block text-xs md:text-sm font-semibold mb-1.5 md:mb-2 text-gray-700">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-3 md:p-4 text-sm md:text-base bg-white border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-emerald-500 focus:ring-0 transition-all outline-none hover:border-emerald-300"
                  placeholder="Enter state"
                  required
                />
              </div>
            </div>

            {/* Postal Code and Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="form-group">
                <label className="block text-xs md:text-sm font-semibold mb-1.5 md:mb-2 text-gray-700">
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full p-3 md:p-4 text-sm md:text-base bg-white border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-emerald-500 focus:ring-0 transition-all outline-none hover:border-emerald-300"
                  placeholder="Enter postal code"
                  required
                  maxLength="6"
                />
              </div>
              <div className="form-group">
                <label className="block text-xs md:text-sm font-semibold mb-1.5 md:mb-2 text-gray-700">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-3 md:p-4 text-sm md:text-base bg-white border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-emerald-500 focus:ring-0 transition-all outline-none hover:border-emerald-300"
                  placeholder="Enter country"
                  required
                />
              </div>
            </div>

            {/* Default Address Toggle */}
            <div className="bg-white p-3 md:p-4 rounded-lg md:rounded-xl border-2 border-gray-200">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-emerald-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block text-sm md:text-base">
                      Set as default address
                    </span>
                    <span className="text-xs md:text-sm text-gray-500">
                      Use this address for future orders
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 md:w-14 md:h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] md:after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 md:after:h-6 md:after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-green-600 shadow-inner flex-shrink-0" />
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex-1 h-12 md:h-14 flex gap-2 md:gap-3 justify-center items-center text-white bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:shadow-xl focus:ring-4 focus:outline-none focus:ring-emerald-300 font-bold rounded-lg md:rounded-xl text-sm md:text-base px-6 transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{editingId ? "Updating..." : "Adding..."}</span>
                  </>
                ) : (
                  <>
                    <span>{editingId ? "Update Address" : "Add Address"}</span>
                    <svg
                      className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="h-12 md:h-14 px-6 md:px-8 rounded-lg md:rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-sm md:text-base"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAddress;
