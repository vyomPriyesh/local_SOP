// export let serviceUrl = "https://api.closingq.com/api";
// export let serviceUrl = "http://192.168.29.213:5000/api";
const serviceUrl = import.meta.env.VITE_APP_BASEURL;

const urlChange = true;

const getCountryStateUrl = (countryId) => `${urlChange ? serviceUrl : serviceUrl}/country/${countryId}`;
const getCountryCityUrl = (StateId) => `${urlChange ? serviceUrl : serviceUrl}/state/${StateId}`;
const getUsefulCounite = (useId) => `${urlChange ? serviceUrl : serviceUrl}/useful-link/${useId}`
const getListingDetails = (listingId) => 
  `${urlChange ? serviceUrl : serviceUrl}/listing/${listingId}`;
const ListingReview = (listingId) => 
  `${urlChange ? serviceUrl : serviceUrl}/listing/add-comment/${listingId}`;
const getListingReview = (listingId) => 
  `${urlChange ? serviceUrl : serviceUrl}/listing/comment/${listingId}`;
export const API_URLS = {
  AuthApi: {
    Login: `${urlChange ? serviceUrl : serviceUrl}/login`,
    Logout: `${urlChange ? serviceUrl : serviceUrl}/logout`,
    Register: `${urlChange ? serviceUrl : serviceUrl}/register`,
    Send_otp: `${urlChange ? serviceUrl : serviceUrl}/send-otp`,
    Verify_otp: `${urlChange ? serviceUrl : serviceUrl}/verify-otp`,
    Change_Password: `${urlChange ? serviceUrl : serviceUrl}/change-password`,
    check_email: `${urlChange ? serviceUrl : serviceUrl}/check-email`
  },
    DropdownApi: {
      Country: `${urlChange ? serviceUrl : serviceUrl}/country`,
      //Country_state: `${urlChange ? serviceUrl : serviceUrl}/country/231`,
      getCountryStateUrl,
      State: `${urlChange ? serviceUrl : serviceUrl}/state`,
      usefulState: `${urlChange ? serviceUrl : serviceUrl}/useful-link`,
      getCountryCityUrl,
      getUsefulCounite
    },
  ProfileApi: {
    select_Profile: `${urlChange ? serviceUrl : serviceUrl}/profile`,
    Update_Profile: `${urlChange ? serviceUrl : serviceUrl}/profile`,
  },
  addlistingApi: {
    AddTitleAbstractor: `${urlChange ? serviceUrl : serviceUrl}/add-listing`,
  
  },
  ListingApi: {
    Listing: `${urlChange ? serviceUrl : serviceUrl}/listing`,
    getListingDetails,
    ListingReview,
    getListingReview
  
  },
};
