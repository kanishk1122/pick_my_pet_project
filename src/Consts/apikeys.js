const baseurl = "http://localhost:5000/api/";
const USERPath = "users/";
const Authpath = "auth/";

const USER = {
  Login: baseurl + Authpath + "login",
  Register: baseurl + Authpath + "register",
  Auth: baseurl + Authpath + "google-auth",
  Logout: baseurl + Authpath + "logout",
  VerifyToken: baseurl + Authpath + "verify-token",
  GetUser: baseurl + USERPath,
  EmailConfrimgenraterZXcv: baseurl + USERPath + "confirmationgenrate/",
  EmailConfrim: baseurl + USERPath + "confirmation/",
  Update: baseurl + USERPath + "profile/me",
  FetchUser: baseurl + USERPath + "fetch-user",
  GenerateReferralLink: (userId) =>
    `${baseurl}users/generate-referral-link/${userId}`,
};

export { USER };

const addressBaseUrl = `${baseurl}addresses`;

export const ADDRESS = {
  Add: addressBaseUrl,
  Get: addressBaseUrl,
  Update: (addressId) => `${addressBaseUrl}/${addressId}`,
  Delete: (addressId) => `${addressBaseUrl}/${addressId}`,
};

const postBaseUrl = `${baseurl}posts`;

export const POST = {
  Base: postBaseUrl,
  Create: postBaseUrl,
  GetAll: postBaseUrl,
  GetOne: (id) => `${postBaseUrl}/${id}`,
  Update: (id) => `${postBaseUrl}/${id}`,
  Delete: (id) => `${postBaseUrl}/${id}`,
  GetUserPosts: `${postBaseUrl}/user-posts`,
  Filter: `${postBaseUrl}/filter`,
  GetFree: `${postBaseUrl}/free`, // Assuming this is a filter
  GetPaid: `${postBaseUrl}/paid`, // Assuming this is a filter
  Breeds: (species) => `${baseurl}breeds/species/${species}`,
  GetSpecies: `${baseurl}species`,
  GetBreeds: `${baseurl}breeds`,
  SpeciesHierarchy: `${baseurl}species/hierarchy`,
  GetPostById: (id) => `${postBaseUrl}/${id}`,
  GetPostBySlug: (slug) => `${postBaseUrl}/slug/${slug}`,
};

export const SLICER = {
  SORT_OPTIONS: [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "title-az", label: "Title: A to Z" },
    { value: "title-za", label: "Title: Z to A" },
  ],
  PAGE_SIZE_OPTIONS: [6, 12, 24, 48],
  VIEW_MODES: {
    GRID: "grid",
    LIST: "list",
  },
};
