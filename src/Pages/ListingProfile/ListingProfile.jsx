import React, { useState, useEffect } from "react";
import Navbar from "../../Components/TopHeader/NavBar";
import TopHeader from "../../Components/TopHeader/TopHeader";
import Footer from "../../Components/Footer/Footer";
import Profile from "../../Images/fcd540feb4463083a64ff0ff7a375a38.jpg";
import { PiPencilLineBold } from "react-icons/pi";
import { HiArrowLeft } from "react-icons/hi";
import { Navigate, useNavigate } from "react-router";
import { LuCircleUserRound } from "react-icons/lu";
import { PiLockKey } from "react-icons/pi";
import { PiBuildings } from "react-icons/pi";
import { NormalInputField } from "../../Components/Input/Input";
import bgImage from "./../../Images/office.jpg";
import { showToast } from "../../Common/toastService";
import { apiRequestPost, apiRequestGet } from "../../Common/Common";
import { API_URLS } from "../../Apis/api";
import Dropdown from "../../Components/Dropdown/Dropdown";
const { ProfileApi, AuthApi } = API_URLS;

const businessTypes = [
  "Title Abstractor",
  "Title Company",
  "Real Estate Agent",
  "Real Estate Attorney",
  "Appraisal Company",
  "Surveyor Company",
];


export default function ListingProfile() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");

  const [address1, setAddress1] = useState("");
  // const [address2, setAddress2] = useState("");

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  // const [country, setCountry] = useState("");

  const [email, setEmail] = useState("");
  const [phonenumeber, setPhonenumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Freya",
    lastName: "Reed",
    businessName: "Real Title Service",
    businessAddress: "1649 Colorado Blvd. Los Angeles, CA 90041",
    yearEstablished: "1995",
    websiteURL: "https://realtitleserivce.common",
    Phone: "213-214-0626",
    Email: "Info@realtitleservicesinc.com",
    states: "Alaska, Alabama, Arkansas",
    counite: "Adams, Allen, Bartholomew",
    Affiliations: "First American, Fidelity National, Stewart, Old Republic",
    Industry: "ALTA, TLTA",
    turnaround: "24 Hours",
    services:
      "Title Searches, Title Insurance, Escrow Services, Closing & Settlement Services..",
    WorkingHours: "Monday To Friday: 09:00 AM  |  Saturday & Sunday: Closed",
    estateworks: "Residential, Commercial ",
    clients: "Mortgage Lenders, Real Estate Agents, Home Buyers & Sellers, Law Firms...",
    transactions: "100",
    testimonials: "-",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [selected, setSelected] = useState("profile");

  const [userList, setUserList] = useState([]);
  console.log("userList", userList);

  const getCountryName = async (code) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const countries = await response.json();

      const country = countries.find(
        (c) => `+${code}` === (c.idd?.root || "") + (c.idd?.suffixes?.[0] || "")
      );
      setCountryName(country.name.common);
      return country ? country.name.common : "Unknown";
    } catch (error) {
      console.error("Error fetching country name:", error);
      return "Unknown";
    }
  };

  getCountryName("91").then(console.log);

  useEffect(() => {
    if (userList?.country_code) {
      getCountryName(userList.country_code).then(setCountryName);
    }
  }, [userList.country_code]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const AUTHTOKEN = localStorage.getItem("AUTHTOKEN");
      if (!AUTHTOKEN) {
        showToast("Invalid token");
        return;
      }

      const response = await apiRequestGet(
        ProfileApi.select_Profile,
        AUTHTOKEN
      );

      if (response && response.data.result) {
        setUserList(response.data.result);
        setFirstName(response.data.result.first_name);
        setLastName(response.data.result.last_name);
        setEmail(response.data.result.email);
        setPhonenumber(response.data.result.phone);
        setCountryCode(response.data.result.country_code);
        setBusinessType(response.data.result.business_type);
        setAddress1(response.data.result.address_1);
        // setAddress2(response.data.result.address_2);
        setCity(response.data.result.city);
        setState(response.data.result.state.name);
        setZipCode(response.data.result.pin_code);
        setCompanyName(response.data.result.company_name);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const AUTHTOKEN = localStorage.getItem("AUTHTOKEN");
      if (!AUTHTOKEN) {
        showToast("Invalid token");
        return;
      }

      const payload = {
        password: newPassword,
        old_password: currentPassword,
      };
      const response = await apiRequestPost(
        AuthApi.Change_Password,
        payload,
        AUTHTOKEN
      );

      if (response && response.success) {
        setSelected("profile");
        showToast(response);
      } else {
        console.error("Failed to send OTP for phone:", response?.message);
        showToast(response);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleRegister = async () => {
    console.log("aaa");
    const AUTHTOKEN = localStorage.getItem("AUTHTOKEN");
    if (!AUTHTOKEN) {
      showToast("Invalid token");
      return;
    }

    if (
      !firstName ||
      !lastName ||
      !companyName ||
      !businessType ||
      !state ||
      !city ||
      !address1 ||
      // !address2 ||
      !zipCode ||
      !email ||
      !phonenumeber
    ) {
      showToast({
        message: "Please fill all required fields.",
        success: false,
      });
      return;
    }
    const payload = {
      first_name: firstName,
      last_name: lastName,
      company_name: companyName,
      business_type: businessType,
      state_id: state,
      city: city,
      address_1: address1,
      // address_2: address2,
      pin_code: zipCode,
      email: email,
      country_code: countryCode,
      phone: phonenumeber,
    };

    try {
      const response = await apiRequestPost(
        ProfileApi.Update_Profile,
        payload,
        AUTHTOKEN
      );
      if (response && response.success) {
        setSelected("profile");
        showToast(response);
      } else {
        showToast(response);
      }
    } catch (error) {
      console.error("Error registering:", error);
      showToast({ message: "Registration failed.", success: false });
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = async() => {
    
    localStorage.removeItem("AUTHTOKEN");
    localStorage.removeItem("FIRSTNAME");
    localStorage.removeItem("LASTNAME");
    localStorage.removeItem("PASSWORD");
    localStorage.removeItem("USERID");
    
    navigate('/Signin')
    
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="block lg:hidden">
        <TopHeader />
      </div>
      <div className="flex items-center gap-3 mt-3">
        {/* Left Arrow */}
        <HiArrowLeft
          className="text-[40px] rounded-xl text-gray-600 cursor-pointer ms-10 border p-2"
          onClick={() => navigate("/Listing")}
        />

        {/* Centered Text with Breadcrumb */}
        <div className="flex flex-col items-center flex-1">
          <p className="text-[32px] font-semibold">My Profile</p>

          {/* Breadcrumb */}
          <p className="text-gray-500 text-[18px] mt-1">
            <span className="text-gray-600">Listing</span>
            <span className="mx-2 text-gray-400"> &gt; </span>
            <span className="text-gray-600">My Profile</span>
          </p>
        </div>
      </div>

      <div className="relative mt-[20px] mx-8 mb-3">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-[15px]"
          style={{
            backgroundImage: `url(${bgImage})`,
            height: "300px",
          }}
        ></div>

        {/* Content Container */}
        <div className="relative  z-10 mx-auto md:px-8 py-[180px] pb-[30px]  rounded-t-2xl ">
          {/* Agent Profile & Details */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-[32px] ">
            {/* Agent Profile */}
            <div className="bg-white p-6 rounded-[30px] shadow-[0px_0px_56px_0px_rgba(0,0,0,0.05)] xl:col-span-4 2xl:col-span-3 xl:h-[730px] ">
              <div className="flex flex-col hidden xl:block  bg-white  rounded-[20px] ">
                <div className="flex flex-col items-center relative">
                  {/* Circular Profile Image */}
                  <div className="relative">
                    <img
                      src={Profile}
                      alt="Profile"
                      className="w-[240px] h-[240px] object-cover rounded-full border-4 border-white "
                    />
                    {/* Edit Icon */}
                    <PiPencilLineBold
                      onClick={() => setSelected("profile_update")}
                      className="absolute top-[-10px] right-[-50px] text-gray-600 text-[22px] cursor-pointer hover:text-gray-900"
                    />
                  </div>
                </div>

                <div className=" mt-4">
                  <p className="text-[32px] font-bold text-[#020C16] max-[1440px]:text-[24px]">
                    {userList.first_name} {userList.last_name}
                  </p>
                  <h2 className="mt-2 text-[20px] font-medium text-gray-600 max-[1440px]:text-[16px]">
                    {userList.city}, {userList.state?.name}, {countryName}
                  </h2>
                  <span className="inline-block mt-4 pb-10">
                    <p className="text-[18px] font-normal rounded-[10px] bg-blue-500 text-white py-2 px-6 max-[1440px]:text-[14px]">
                      {userList.business_type}
                    </p>
                  </span>

                  {/* Profile Options */}
                  <div className="border-t pt-6 text-[18px]  max-[1440px]:text-[14px]">
                    <button
                      className={`w-full flex gap-3 items-center text-start rounded-[10px] py-3 px-6 mt-4 ${
                        selected === "profile" || selected === "profile_update"
                          ? "bg-[#1079E0] text-white"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelected("profile")}
                    >
                      {/* profile_update */}
                      <LuCircleUserRound className="text-[22px]" /> My Profile
                    </button>
                    <button
                      className={`w-full flex gap-3 items-center text-start rounded-[10px] py-3 px-6 mt-4 ${
                        selected === "security"
                          ? "bg-[#1079E0] text-white"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelected("security")}
                    >
                      <PiLockKey className="text-[22px]" /> Security
                    </button>
                    {/* <button
                      className={`w-full flex gap-3 items-center text-start rounded-[10px] py-3 px-6 mt-4 ${
                        selected === "company"
                          ? "bg-[#1079E0] text-white"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelected("company")}
                    >
                      <PiBuildings className="text-[22px]" /> My Company
                    </button> */}
                    <button
                      className="w-full flex gap-3 justify-center items-center text-start rounded-[10px] py-3 px-6 mt-4 bg-[#33BA33] text-[#FFFFFF]"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col xl:hidden ">
                <div className="sm:flex text-center sm:text-start  sm:pb-6">
                  <div className="flex flex-col items-center relative">
                    {/* Circular Profile Image */}
                    <div className="relative">
                      <img
                        src={Profile} // Yahan apni image ka path lagayein
                        alt="Profile"
                        className="w-[240px] h-[240px] object-cover rounded-full border-4 border-white"
                      />
                      {/* Edit Icon */}
                      <PiPencilLineBold
                        onClick={() => setSelected("profile_update")}
                        className="absolute top-0 right-[-5px] text-gray-600 text-[22px] cursor-pointer hover:text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="ml-6 lg:ml-10">
                    <p className="text-[32px] font-bold text-[#020C16]  max-[1440px]:text-[24px] ">
                      {userList.first_name} {userList.last_name}
                    </p>
                    <h2 className="mt-2 text-[20px] font-medium text-gray-600 max-[1440px]:text-[16px] ">
                      {userList.city}, {userList.state?.name}, {countryName}
                    </h2>
                    <span className="inline-block mt-4 mb-6">
                      <p className="text-[18px] font-normal rounded-[10px] bg-blue-500 text-white py-2 px-6 max-[1440px]:text-[14px]">
                        {userList.business_type}
                      </p>
                    </span>

                    {/* Buttons Section */}
                    <div className="border-t flex flex-col pt-3 text-[18px] max-[1440px]:text-[14px]">
                      <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-0 mt-4  max-[1440px]:gap-2">
                        <button
                          className={`flex items-center gap-2 text-start rounded-[10px] py-2 px-5 ${
                            selected === "profile" ||
                            selected === "profile_update"
                              ? "bg-[#1079E0] text-white"
                              : "bg-white text-gray-600 hover:bg-gray-200"
                          }`}
                          onClick={() => setSelected("profile")}
                        >
                          <LuCircleUserRound className="text-[22px]" /> My
                          Profile
                        </button>

                        <button
                          className={`flex items-center gap-2 text-start rounded-[10px] py-2 px-5 ${
                            selected === "security"
                              ? "bg-[#1079E0] text-white"
                              : "bg-white text-gray-600 hover:bg-gray-200"
                          }`}
                          onClick={() => setSelected("security")}
                        >
                          <PiLockKey className="text-[22px]" /> Security
                        </button>

                        {/* <button
                          className={`flex items-center gap-2 text-start rounded-[10px] py-2 px-5 ${
                            selected === "company"
                              ? "bg-[#1079E0] text-white"
                              : "bg-white text-gray-600 hover:bg-gray-200"
                          }`}
                          onClick={() => setSelected("company")}
                        >
                          {" "}
                          <PiBuildings className="text-[22px]" /> My Company
                        </button> */}
                        <button
                          className="w-full flex gap-3 justify-center items-center text-start rounded-[10px] py-3 px-6 mt-4 bg-[#33BA33] text-[#FFFFFF]"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Stats & Services */}
            {(selected === "profile" || selected === "company") && (
              <div className="bg-white rounded-[30px] shadow-[0px_0px_56px_0px_rgba(0,0,0,0.05)] xl:col-span-8 2xl:col-span-9 pb-3">
                {/* box-shadow: 0px 0px 56px 0px rgba(0, 0, 0, 0.05); */}
                {/* Personal Information */}
                <div className="bg-[#F7FBFE] px-[32px] py-[20px] text-[30px] font-semibold rounded-t-[30px] border-b  max-[1440px]:text-[22px]">
                  Personal Information
                </div>
                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[18px]  max-[1440px]:text-[16px]">
                  <div>
                    <p className="text-gray-500">First Name</p>
                    <p className="font-medium text-[20px] mt-2  max-[1440px]:text-[18px]">
                      {userList.first_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Name</p>
                    <p className="font-medium text-[20px] mt-2 max-[1440px]:text-[18px]">
                      {userList.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email Address</p>
                    <p className="font-medium text-[20px] mt-2 max-[1440px]:text-[18px]">
                      {userList.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium text-[20px] mt-2 max-[1440px]:text-[18px]">
                      +{userList.country_code} {userList.phone}
                    </p>
                  </div>
                  {/* <div className="sm:col-span-2">
                    <p className="text-gray-500">Position</p>
                    <p className="font-medium text-[20px] mt-2 max-[1440px]:text-[18px]">
                      {userList.business_type}
                    </p>
                  </div> */}
                </div>

                {/* Address Section */}
                <div className="bg-[#F7FBFE] px-[32px] py-[20px] text-[30px] font-semibold border-t border-b  max-[1440px]:text-[22px]">
                  Address
                </div>
                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[18px]  max-[1440px]:text-[16px]">
                  <div>
                    <p className="text-gray-500">Address</p>
                    <p className="font-medium text-[20px] mt-2 max-[1440px]:text-[18px]">
                      {userList.address_1}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">City</p>
                    <p className="font-medium text-[20px] mt-2 max-[1440px]:text-[18px]">
                      {userList.city}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">State</p>
                    <p className="font-medium text-[20px] mt-2 max-[1440px]:text-[18px]">
                      {userList.state}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Zip Code</p>
                    <p className="font-medium text-[20px] mt-2 max-[1440px]:text-[18px]">
                      {userList.pin_code}
                    </p>
                  </div>
                  {/* <div className="sm:col-span-2">
                    <p className="text-gray-500">Country</p>
                    <p className="font-medium text-[20px] mt-2 max-[1440px]:text-[18px]">
                      {countryName}
                    </p>
                  </div> */}
                </div>

                {/* Company Details Section */}
                <div className="bg-[#F7FBFE] px-[32px] py-[20px] text-[30px] font-semibold border-t border-b  max-[1440px]:text-[22px]">
                  Company Details
                </div>
                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[18px]  max-[1440px]:text-[16px]">
                  <div className="col-span-2 ">
                    <p className="text-gray-500 ">Company Name</p>
                    <p className="font-medium text-[20px] mt-2 max-[1440px]:text-[18px]">
                      {userList.company_name}
                    </p>
                  </div>
                  <div className="col-span-2 mt-7">
                    <p className="text-gray-500 ">Business Type</p>
                    <p className="font-medium text-[20px] mt-2 max-[1440px]:text-[18px]">
                      {userList.business_type}
                    </p>
                  </div>
                </div>

                <div className="bg-[#F7FBFE] px-[32px] py-[20px] text-[30px] font-semibold border-t border-b  max-[1440px]:text-[22px]">
                  Listing Details
                </div>
                <div className=" px-[32px] flex justify-between">
                  <h2 className="text-[24px] font-bold mt-4 mb-2">
                    Real Title Service
                  </h2>
                  <div className="flex gap-[15px]">
                    <p className="text-[18px] font-normal rounded-[10px] bg-blue-500 text-white mt-4 py-2 px-6 max-[1440px]:text-[14px]">
                      {userList.business_type}
                    </p>
                    <div className="mt-4 border border-gray-300 rounded-[10px]">
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-[#737B8C] px-4 py-2 rounded-md flex items-center gap-[10px]"
                      >
                        <PiPencilLineBold />
                        {isEditing ? "Save" : "Edit"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border mx-[30px] my-[30px] px-[20px] py-[20px] rounded-[10px]">
                  <h2 className="text-[20px] font-bold mb-2">
                    Basic Company Information
                  </h2>

                  <div className="grid grid-cols-2 gap-[30px]">
                    {["firstName", "lastName"].map((field) => (
                      <div key={field}>
                        <label className="text-[16px] text-[#737B8C]">
                          {field === "firstName" ? "First Name" : "Last Name"}
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                          />
                        ) : (
                          <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                            {formData[field]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <label className="text-[16px] text-[#737B8C]">
                      Business Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                      />
                    ) : (
                      <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                        {formData.businessName}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-[30px] mt-4">
                    {["businessAddress", "yearEstablished"].map((field) => (
                      <div key={field}>
                        <label className="text-[16px] text-[#737B8C]">
                          {field === "businessAddress"
                            ? "Business Address"
                            : "Year Established"}
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                          />
                        ) : (
                          <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                            {formData[field]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <label className="text-[16px] text-[#737B8C]">
                      Website URL
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="websiteURL"
                        value={formData.websiteURL}
                        onChange={handleChange}
                        className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                      />
                    ) : (
                      <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                        {formData.websiteURL}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-[30px] mt-4">
                    {["Phone", "Email"].map((field) => (
                      <div key={field}>
                        <label className="text-[16px] text-[#737B8C]">
                          {field === "Phone" ? "Phone" : "Email"}
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                          />
                        ) : (
                          <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                            {formData[field]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border mx-[30px] my-[30px] px-[20px] py-[20px] rounded-[10px]">
                  <h2 className="text-[20px] font-bold mb-2">
                    Business Credentials & Compliance
                  </h2>

                  <div className="grid grid-cols-2 gap-[30px]">
                    <div>
                      <label className="text-[16px] text-[#737B8C]">
                        What states do you serve?
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="state"
                          value={formData.states}
                          onChange={handleChange}
                          className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                        />
                      ) : (
                        <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                          {formData.states}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-[16px] text-[#737B8C]">
                        What counite do you serve?
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="counite"
                          value={formData.counite}
                          onChange={handleChange}
                          className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                        />
                      ) : (
                        <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                          {formData.counite}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-[16px] text-[#737B8C]">
                      Underwriter Affiliations
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="businessNAffiliationsame"
                        value={formData.Affiliations}
                        onChange={handleChange}
                        className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                      />
                    ) : (
                      <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                        {formData.Affiliations}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="text-[16px] text-[#737B8C]">
                      Industry Memberships
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="Industry"
                        value={formData.Industry}
                        onChange={handleChange}
                        className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                      />
                    ) : (
                      <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                        {formData.Industry}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border mx-[30px] my-[30px] px-[20px] py-[20px] rounded-[10px]">
                  <h2 className="text-[20px] font-bold mb-2">
                    Service Offered
                  </h2>

                  <div className="mt-4">
                    <label className="text-[16px] text-[#737B8C]">
                      What is your average turnaround time for title commitments?
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="businessNAffiliationsame"
                        value={formData.turnaround}
                        onChange={handleChange}
                        className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                      />
                    ) : (
                      <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                        {formData.turnaround}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="text-[16px] text-[#737B8C]">
                      What services does your title company provide?
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="businessNAffiliationsame"
                        value={formData.services}
                        onChange={handleChange}
                        className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                      />
                    ) : (
                      <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                        {formData.services}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="text-[16px] text-[#737B8C]">
                      Working Hours
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="Industry"
                        value={formData.WorkingHours}
                        onChange={handleChange}
                        className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                      />
                    ) : (
                      <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                        {formData.WorkingHours}
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <label className="text-[16px] text-[#737B8C]">
                    Types of real estate works?
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="Industry"
                        value={formData.estateworks}
                        onChange={handleChange}
                        className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                      />
                    ) : (
                      <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                        {formData.estateworks}
                      </div>
                    )}
                  </div>
                </div>
                <div className="border mx-[30px] my-[30px] px-[20px] py-[20px] rounded-[10px]">
                  <h2 className="text-[20px] font-bold mb-2">
                    Client & Transaction Details
                  </h2>

                  <div className="mt-4">
                    <label className="text-[16px] text-[#737B8C]">
                      What types of clients do you serve?
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="businessNAffiliationsame"
                        value={formData.clients}
                        onChange={handleChange}
                        className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                      />
                    ) : (
                      <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                        {formData.clients}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="text-[16px] text-[#737B8C]">
                      How many transactions do you typically handle per month?
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="businessNAffiliationsame"
                        value={formData.transactions}
                        onChange={handleChange}
                        className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                      />
                    ) : (
                      <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                        {formData.transactions}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="text-[16px] text-[#737B8C]">
                    Do you have client testimonials or reviews to share?
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="Industry"
                        value={formData.testimonials}
                        onChange={handleChange}
                        className="border p-4 rounded-[15px] font-semibold w-full text-[18px]"
                      />
                    ) : (
                      <div className="bg-[#EAF1F6] p-4 rounded-[15px] font-semibold text-[18px]">
                        {formData.testimonials}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {selected === "security" && (
              <div className="bg-white rounded-[30px] shadow-[0px_0px_56px_0px_rgba(0,0,0,0.05)] xl:col-span-8 2xl:col-span-9 pb-3">
                {/* Personal Information */}
                <div className="bg-[#F7FBFE] px-[32px] py-[20px] text-[30px] font-semibold rounded-t-[30px] border-b max-[1440px]:text-[22px]">
                  Change Password
                </div>
                <div className="p-8 grid grid-cols-1 text-[18px] max-[1440px]:text-[16px]">
                  <div>
                    <p className="text-gray-500">
                      Current Password <span className="text-red-500">*</span>
                    </p>
                    <NormalInputField
                      type="text"
                      placeholder="Enter Your Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="bg-[#F7FBFE] px-[32px] py-[20px] text-[30px] font-semibold border-b max-[1440px]:text-[22px]">
                  New Password
                </div>
                <div className="p-8 grid grid-cols-1 text-[18px]  gap-6 max-[1440px]:text-[16px]">
                  <div>
                    <p className="text-gray-500">
                      New Password <span className="text-red-500">*</span>
                    </p>
                    <NormalInputField
                      type="text"
                      placeholder="Enter Your Current Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-gray-500">
                      Confirm Password <span className="text-red-500">*</span>
                    </p>
                    <NormalInputField
                      type="text"
                      placeholder="Enter Your Current Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 w-full max-w-[300px]  h-[56px] mx-auto rounded-[10px] max-[1440px]:w-[200px] max-[1440px]:h-[40px] ">
                  <button
                    className="bg-[#1079E0] text-white rounded-lg w-full p-[16px] max-[1440px]:p-[0px]  flex items-center justify-center cursor-pointer"
                    onClick={handleChangePassword}
                    // disabled={loading}
                  >
                    Save Changes
                    {/* <PiSignInBold /> */}
                  </button>
                </div>
              </div>
            )}
            {selected === "profile_update" && (
              <div className="bg-white rounded-[30px] shadow-[0px_0px_56px_0px_rgba(0,0,0,0.05)] xl:col-span-8 2xl:col-span-9 pb-3">
                {/* box-shadow: 0px 0px 56px 0px rgba(0, 0, 0, 0.05); */}
                {/* Personal Information */}
                <div className="bg-[#F7FBFE] px-[32px] py-[20px] text-[30px] font-semibold rounded-t-[30px] border-b  max-[1440px]:text-[22px]">
                  Personal Information
                </div>
                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[18px]  max-[1440px]:text-[16px]">
                  <div>
                    <p className="text-gray-500">First Name</p>
                    <NormalInputField
                      type="text"
                      placeholder="Enter Your First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-gray-500">Last Name</p>
                    <NormalInputField
                      type="text"
                      placeholder="Enter Your Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-gray-500">Email Address</p>
                    <NormalInputField
                      type="text"
                      placeholder="Enter Your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <NormalInputField
                      type="text"
                      placeholder="Enter Your Phone Number"
                      value={phonenumeber}
                      onChange={(e) => setPhonenumber(e.target.value)}
                    />
                  </div>
                </div>

                {/* Address Section */}
                <div className="bg-[#F7FBFE] px-[32px] py-[20px] text-[30px] font-semibold border-t border-b  max-[1440px]:text-[22px]">
                  Address
                </div>
                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[18px]  max-[1440px]:text-[16px]">
                  <div>
                    <p className="text-gray-500">Address</p>
                    <NormalInputField
                      type="text"
                      placeholder="Enter Your Address"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-gray-500">City</p>
                    <NormalInputField
                      type="text"
                      placeholder="Enter Your City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-gray-500">State</p>
                    <NormalInputField
                      type="text"
                      placeholder="Enter Your State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-gray-500">Zip Code</p>
                    <NormalInputField
                      type="text"
                      placeholder="Enter Your Zip Code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                </div>

                {/* Company Details Section */}
                <div className="bg-[#F7FBFE] px-[32px] py-[20px] text-[30px] font-semibold border-t border-b  max-[1440px]:text-[22px]">
                  Company Details
                </div>
                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[18px]  max-[1440px]:text-[16px]">
                  <div className="col-span-2 ">
                    <p className="text-gray-500 ">Company Name</p>
                    <NormalInputField
                      type="text"
                      placeholder="Enter Your Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2 mt-7">
                    <p className="text-gray-500 ">Business Type</p>
                    {/* <NormalInputField
                      type="text"
                      placeholder="Enter Your Position"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                    /> */}
                    <Dropdown
                      options={businessTypes}
                      onChange={(selected) => setBusinessType(selected)}
                      value={businessType}
                      placeholder="Select Business Type"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 w-full max-w-[400px]  h-[56px] mx-auto rounded-[10px] max-[1440px]:w-[200px] max-[1440px]:h-[40px] ">
                  <button
                    className="bg-[#1079E0] text-white rounded-lg w-full p-[16px] max-[1440px]:p-[0px]  flex items-center justify-center cursor-pointer"
                    onClick={handleRegister}
                    // disabled={loading}
                  >
                    Save Changes
                    {/* <PiSignInBold /> */}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
