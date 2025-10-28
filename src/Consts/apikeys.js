const baseurl = "http://localhost:5000/api/";
const USERPath = "users/";
const Authpath = "auth/";

const USER = {
  Login: baseurl + Authpath + "login",
  Register: baseurl + Authpath + "register",
  Auth: baseurl + Authpath + "google-auth",
  Logout: baseurl + Authpath + "logout",
  VerifyToken: baseurl + Authpath + "verify-token",
  GetUser: baseurl + USERPath ,
  EmailConfrimgenraterZXcv: baseurl + USERPath + "confirmationgenrate/",
  EmailConfrim: baseurl + USERPath + "confirmation/",
  Update: baseurl + USERPath + "update",
  FetchUser: baseurl + USERPath + "fetch-user",
  GenerateReferralLink: (userId) =>
    `${baseurl}users/generate-referral-link/${userId}`,
  
};

export { USER };

export const ADDRESS = {
  Add: `${baseurl}address/add`,
  Get: (userId) => `${baseurl}address/${userId}`,
  Update: (addressId) => `${baseurl}address/update/${addressId}`,
  Delete: (addressId) => `${baseurl}address/delete/${addressId}`,
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
