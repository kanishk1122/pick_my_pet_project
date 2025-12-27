import { useState, useEffect } from "react";
import AddressItem from "./User/AddressItem";
import { motion } from "framer-motion";
import AddressForm from "./User/UpdateAddress";
import { useSwal } from "@utils/Customswal.jsx";
import { useSpecies } from "@hooks/useSpecies";
import { useAddresses } from "@hooks/useAddresses";
import { usePosts } from "@hooks/usePosts";

// --- Icons ---
const UploadIcon = () => (
  <svg
    className="w-8 h-8 text-emerald-500 mb-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const CreatePost = () => {
  const Swal = useSwal();
  const {
    species,
    hierarchy: speciesHierarchy,
    breeds: availableBreeds,
    loading: isLoadingSpecies,
    getSpeciesHierarchy,
    getBreeds,
  } = useSpecies();
  const { addresses, getAddresses } = useAddresses();
  const { createPost, loading: isSubmitting } = usePosts();

  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoadingBreeds, setIsLoadingBreeds] = useState(false);
  const [formData, setFormData] = useState({
    petName: "",
    species: "",
    breed: "",
    ageValue: "",
    ageUnit: "months",
    description: "",
    price: "",
    isNegotiable: false,
    useUserAddress: true,
    address: {
      country: "",
      city: "",
      zip: "",
      district: "",
      street: "",
      building: "",
      floor: "",
      location: "",
    },
  });

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    getSpeciesHierarchy();
    getAddresses();
  }, [getSpeciesHierarchy, getAddresses]);

  useEffect(() => {
    const fetchBreedsForSpecies = async () => {
      if (formData.species) {
        const selectedSpeciesData = speciesHierarchy.find(
          (s) => s.name === formData.species
        );

        if (selectedSpeciesData && selectedSpeciesData.breeds) {
          // Breeds are already in hierarchy, no need to fetch
        } else {
          setIsLoadingBreeds(true);
          await getBreeds(formData.species);
          setIsLoadingBreeds(false);
        }
      } else {
        getBreeds(null); // Clear breeds
      }
    };
    fetchBreedsForSpecies();
  }, [formData.species, speciesHierarchy, getBreeds]);

  useEffect(() => {
    if (formData.species) {
      const selectedSpeciesData = speciesHierarchy.find(
        (s) => s.name === formData.species
      );
      if (selectedSpeciesData?.breeds) {
        setFormData((prev) => ({ ...prev, breed: "" }));
      }
    }
  }, [availableBreeds, formData.species, speciesHierarchy]);

  // Compress Image Function
  const compressImage = (imageDataUrl) => {
    return new Promise((resolve) => {
      const maxWidth = 1200;
      const maxHeight = 1200;
      const quality = 0.7;

      const img = new Image();
      img.onload = function () {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      };

      img.src = imageDataUrl;
    });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + selectedImages.length > 5) {
      Swal.fire("Error", "You can upload a maximum of 5 images.", "error");
      return;
    }

    if (files.length > 0) {
      setUploadProgress(10);
    }

    let processed = 0;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const compressedImage = await compressImage(reader.result);
          setSelectedImages((prevImages) => [...prevImages, compressedImage]);

          processed++;
          setUploadProgress(Math.round((processed / files.length) * 90) + 10);

          if (processed === files.length) {
            setTimeout(() => {
              setUploadProgress(0);
            }, 500);
          }
        } catch (error) {
          console.error("Error compressing image:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "There was an error processing your image. Please try another image.",
          });

          processed++;
          if (processed === files.length) {
            setUploadProgress(0);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, imgIndex) => imgIndex !== index)
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "species") {
      setFormData((prev) => ({
        ...prev,
        breed: "",
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "species" ? { breed: "" } : {}),
    }));
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setShowNewAddressForm(false);
  };

  const handleNewAddressSubmit = async () => {
    await getAddresses();
    setShowNewAddressForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      if (!formData.species) throw new Error("Please select a species");
      if (!formData.breed) throw new Error("Please select a breed");
      if (formData.petName.length < 3)
        throw new Error("Pet name must be at least 3 characters long");
      if (formData.description.length < 20)
        throw new Error("Description must be at least 20 characters long");
      if (!selectedAddress) throw new Error("Please select an address");
      if (selectedImages.length === 0)
        throw new Error("Please upload at least one image");

      const phoneRegex =
        /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
      const linkRegex = /(https?:\/\/[^\s]+)/g;

      if (
        phoneRegex.test(formData.petName) ||
        linkRegex.test(formData.petName)
      ) {
        throw new Error("Pet name cannot contain phone numbers or links.");
      }

      phoneRegex.lastIndex = 0;
      linkRegex.lastIndex = 0;

      if (
        phoneRegex.test(formData.description) ||
        linkRegex.test(formData.description)
      ) {
        throw new Error("Description cannot contain phone numbers or links.");
      }

      if (
        formData.ageValue &&
        (isNaN(formData.ageValue) || formData.ageValue < 0)
      ) {
        throw new Error("Age must be a positive number");
      }

      setUploadProgress(10);

      let compressedImages = [];
      for (let i = 0; i < selectedImages.length; i++) {
        setUploadProgress(10 + Math.round((i / selectedImages.length) * 20));
        if (selectedImages[i].length > 1000000) {
          const recompressed = await compressImage(selectedImages[i]);
          compressedImages.push(recompressed);
        } else {
          compressedImages.push(selectedImages[i]);
        }
      }

      setUploadProgress(30);

      const postData = {
        title: formData.petName,
        discription: formData.description,
        amount: formData.price || 0,
        type: formData.price > 0 ? "paid" : "free",
        category: formData.breed,
        species: formData.species,
        addressId: selectedAddress._id,
        images: compressedImages,
        age: formData.ageValue
          ? {
              value: Number(formData.ageValue),
              unit: formData.ageUnit,
            }
          : undefined,
        isNegotiable: formData.isNegotiable,
      };

      setUploadProgress(40);

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.floor(Math.random() * 5) + 1;
          return newProgress < 95 ? newProgress : 95;
        });
      }, 500);

      const result = await createPost(postData);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.meta.requestStatus === "fulfilled") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your pet listing has been created successfully.",
          confirmButtonColor: "#10B981",
        });
        setFormData({
          petName: "",
          species: "",
          breed: "",
          ageValue: "",
          ageUnit: "months",
          description: "",
          price: "",
          isNegotiable: false,
          useUserAddress: true,
          address: {
            country: "",
            city: "",
            zip: "",
            district: "",
            street: "",
            building: "",
            floor: "",
            location: "",
          },
        });
        setSelectedImages([]);
        setSelectedAddress(null);
      } else {
        const errorMessage =
          result.payload?.message ||
          "An unexpected error occurred during post creation.";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      let errorMessage = "Failed to create pet listing";

      if (error.message === "Network Error" || error.code === "ECONNABORTED") {
        errorMessage =
          "The upload timed out. Please try with smaller or fewer images.";
      } else if (error.response?.status === 413) {
        errorMessage =
          "The images are too large. Please use smaller images or fewer images.";
      } else {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setUploadProgress(0);
    }
  };

  const ageInputSection = (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-bold text-stone-600 mb-2 uppercase tracking-wide">
          Age Value
        </label>
        <input
          type="number"
          name="ageValue"
          value={formData.ageValue}
          onChange={handleInputChange}
          min="0"
          placeholder="e.g. 2"
          className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-700 focus:border-emerald-500 focus:outline-none focus:ring-0 transition-all font-bold placeholder-stone-400"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-stone-600 mb-2 uppercase tracking-wide">
          Age Unit
        </label>
        <div className="relative">
          <select
            name="ageUnit"
            value={formData.ageUnit}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-700 focus:border-emerald-500 focus:outline-none focus:ring-0 transition-all font-bold appearance-none cursor-pointer"
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-stone-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  const speciesAndBreedSection = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label className="block text-sm font-bold text-stone-600 mb-2 uppercase tracking-wide">
          Species
        </label>
        <div className="relative">
          <select
            name="species"
            value={formData.species}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-700 focus:border-emerald-500 focus:outline-none focus:ring-0 transition-all font-bold appearance-none cursor-pointer"
            required
            disabled={isLoadingSpecies}
          >
            <option value="">Select Species</option>
            {(species || []).map((item) => (
              <option key={item._id || item.name} value={item.name}>
                {item.icon && `${item.icon} `}
                {item.displayName || item.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-stone-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        {isLoadingSpecies && (
          <div className="mt-1 text-xs font-bold text-stone-400">
            Loading species...
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: formData.species ? 1 : 0.5 }}
        animate={{ opacity: formData.species ? 1 : 0.5 }}
        className={!formData.species ? "pointer-events-none grayscale" : ""}
      >
        <label className="block text-sm font-bold text-stone-600 mb-2 uppercase tracking-wide">
          Breed
        </label>
        <div className="relative">
          <select
            name="breed"
            value={formData.breed}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-700 focus:border-emerald-500 focus:outline-none focus:ring-0 transition-all font-bold appearance-none cursor-pointer"
            required
            disabled={isLoadingBreeds || !formData.species}
          >
            <option value="">Select Breed</option>
            {(availableBreeds || []).map((breed) => (
              <option key={breed._id || breed.name} value={breed.name}>
                {breed.name.charAt(0).toUpperCase() + breed.name.slice(1)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-stone-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        {isLoadingBreeds && (
          <div className="mt-1 text-xs font-bold text-stone-400">
            Loading breeds...
          </div>
        )}
        {availableBreeds.length === 0 &&
          formData.species &&
          !isLoadingBreeds && (
            <div className="mt-1 text-xs font-bold text-amber-500">
              No breeds found. You can continue with a custom breed.
            </div>
          )}
      </motion.div>
    </div>
  );

  const renderLoadingOverlay = () => {
    if (!isSubmitting) return null;

    return (
      <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-[2rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-96 text-center">
          <div className="mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full mx-auto"
            />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-stone-800 font-serif">
            Creating Post...
          </h3>
          <p className="text-stone-500 mb-6 font-medium">
            Please wait while we upload your images and create your listing.
          </p>

          <div className="w-full bg-stone-100 rounded-full h-4 border border-stone-200 overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm font-bold text-emerald-600 mt-2">
            {uploadProgress}% complete
          </p>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Padding top added for fixed navbar
      className="min-h-screen pt-4 pb-20 px-4 w-full max-w-5xl mx-auto"
    >
      {renderLoadingOverlay()}

      {/* Main Card - Neubrutalist Style */}
      <div className="w-full bg-white rounded-[2.5rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 font-serif mb-2">
            Create New Listing
          </h1>
          <p className="text-stone-500 font-medium">
            Share your pet with the world and find them a loving home.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Image Upload Section */}
          <div className="mb-10 bg-stone-50 rounded-3xl p-6 border-2 border-stone-100 border-dashed">
            <p className="text-stone-700 mb-4 font-bold text-lg">
              Upload Pet Images{" "}
              <span className="text-stone-400 text-sm font-normal">
                (Max 5)
              </span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {selectedImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group aspect-square"
                >
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded-2xl border-2 border-stone-200 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-white border-2 border-black text-red-500 rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <TrashIcon />
                  </button>
                </motion.div>
              ))}
              {selectedImages.length < 5 && (
                <label className="aspect-square border-2 border-dashed border-emerald-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 hover:border-emerald-500 transition-all group">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div className="bg-emerald-100 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                    <UploadIcon />
                  </div>
                  <span className="text-emerald-600 font-bold text-sm">
                    Add Photo
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Pet Details Section */}
          <div className="space-y-6 mb-10">
            <div>
              <label className="block text-sm font-bold text-stone-600 mb-2 uppercase tracking-wide">
                Pet Name
              </label>
              <input
                type="text"
                name="petName"
                value={formData.petName}
                onChange={handleInputChange}
                placeholder="What is their name?"
                className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-700 focus:border-emerald-500 focus:outline-none focus:ring-0 transition-all font-bold placeholder-stone-400"
              />
            </div>

            {speciesAndBreedSection}

            {ageInputSection}

            <div>
              <label className="block text-sm font-bold text-stone-600 mb-2 uppercase tracking-wide">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-700 focus:border-emerald-500 focus:outline-none focus:ring-0 transition-all font-medium placeholder-stone-400"
                placeholder="Tell us about your pet's personality, habits, and any special needs..."
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-stone-600 mb-2 uppercase tracking-wide">
                  Price (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-700 focus:border-emerald-500 focus:outline-none focus:ring-0 transition-all font-bold placeholder-stone-400"
                  />
                </div>
              </div>

              <div className="flex items-center pt-8">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="isNegotiable"
                      checked={formData.isNegotiable}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
                  </div>
                  <span className="text-sm font-bold text-stone-600 group-hover:text-emerald-600 transition-colors">
                    Price is Negotiable
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="mb-10 pt-8 border-t-2 border-stone-100">
            <h3 className="text-xl font-bold mb-6 text-stone-800 font-serif">
              Location Details
            </h3>

            {addresses && addresses.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <motion.div
                      key={address._id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddressSelect(address)}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 ${
                        selectedAddress && selectedAddress._id === address._id
                          ? "border-emerald-500 bg-emerald-50 shadow-sm"
                          : "border-stone-200 bg-white hover:border-emerald-200"
                      }`}
                    >
                      <AddressItem
                        address={address}
                        isSelected={
                          selectedAddress && selectedAddress._id === address._id
                        }
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200">
                <p className="text-stone-500 font-medium mb-4">
                  No addresses found.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowNewAddressForm(!showNewAddressForm)}
              className="mt-6 w-full py-3 rounded-xl border-2 border-dashed border-stone-300 text-stone-500 font-bold hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
            >
              {showNewAddressForm
                ? "Cancel Adding Address"
                : "+ Add New Address"}
            </button>

            {showNewAddressForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 bg-stone-50 p-6 rounded-3xl border-2 border-stone-100"
              >
                <AddressForm onAddressAdded={handleNewAddressSubmit} />
              </motion.div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t-2 border-stone-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`brand-button-accent w-full md:w-auto text-lg ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed shadow-none translate-y-[2px]"
                  : ""
              }`}
            >
              {isSubmitting ? "Creating..." : "Create Listing"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreatePost;
