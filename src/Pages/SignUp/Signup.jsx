import { useState } from "react";
import Navbar from "../../Components/TopHeader/NavBar";
import TopHeader from "../../Components/TopHeader/TopHeader";
import home1 from "../../Images/signup.png";
import { showToast } from "../../Common/toastService";
import {
  InputField,
  CustomInput,
  CustomInput1,
  CustomInput2,
  CustomInput3,
  CustomPhoneInput,
  CustomPhoneInput1,
  CustomPhoneInput3,
} from "../../Components/Input/Input";
import { Dropdown } from "../../Components/Dropdown/Dropdown";
import { PiSignInBold } from "react-icons/pi";
import { useNavigate } from "react-router";
import { apiRequestPost } from "../../Common/Common";
import { API_URLS } from "../../Apis/api";
import Check from "../../Utiles/Check";
const { AuthApi, DropdownApi } = API_URLS;

const businessTypes = [
  "Title Abstractor",
  "Title Company",
  "Real Estate Agent",
  "Real Estate Attorney",
  "Appraisal Company",
  "Surveyor Company",
];

export default function Signup() {
  const navigate = useNavigate();
  const [showOtpFields, setShowOtpFields] = useState(false);
  const [showOtpFields1, setShowOtpFields1] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");

  const [address1, setAddress1] = useState("");

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phonenumeber, setPhonenumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otp1, setOtp1] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    let newErrors = {};

    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!companyName) newErrors.companyName = "Company name is required.";
    if (!businessType) newErrors.businessType = "Business type is required.";
    if (!address1) newErrors.address1 = "Address is required.";
    if (!zipCode) newErrors.zipCode = "ZIP code is required.";
    if (!state) newErrors.stete = "State is required.";
    if (!city) newErrors.city = "City is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!phonenumeber) newErrors.phonenumeber = "Phone number is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!isEmailVerified || !isPhoneVerified) {
      showToast({
        message: "Please verify your email and phone.",
        success: false,
      });
      return;
    }

    if (password !== confirmPassword) {
      showToast({ message: "Passwords do not match.", success: false });
      return;
    }

    const payload = {
      first_name: firstName,
      last_name: lastName,
      company_name: companyName,
      business_type: businessType,
      city: city,
      state: state,
      address_1: address1,
      pin_code: zipCode,
      email: email,
      country_code: countryCode,
      phone: phonenumeber,
      password: password,
    };

    try {
      const response = await apiRequestPost(AuthApi.Register, payload);
      if (response && response.success) {
        showToast(response);
        navigate("/Signin");
      } else {
        showToast(response);
      }
    } catch (error) {
      console.error("Error registering:", error);
      showToast({ message: "Registration failed.", success: false });
    }
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    return phone.replace(/^(\+\d{1,3})(\d+)/, "$1 $2");
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Password match validation
    if (value !== password) {
      setPasswordError("Passwords do not match!");
    } else {
      setPasswordError(""); // Clear error if passwords match
    }
  };

  const handlePhoneChange = (phone, country) => {
    if (!country || !country.dialCode) {
      console.warn("Country data is missing or invalid");
      return;
    }
    console.log("country.dialCode ", country.dialCode);
    setCountryCode(`${country.dialCode}`);
    setPhone(phone);
    let cleanPhone = phone
      .replace(new RegExp(`^\\+?${country.dialCode}`), "")
      .trim();
    console.log("cleanPhone ", cleanPhone);

    setPhonenumber(cleanPhone);
  };

  const handleGetEmailOtp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showToast({ message: "invalid email ", success: false });
      return;
    }
    try {
      const response = await apiRequestPost(AuthApi.Send_otp, { email });
      console.log("response", response);
      if (response && response.success) {
        setShowOtpFields(true);
        showToast(response);
      } else {
        console.error("Failed to send OTP for email:", response?.message);
        showToast(response);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleGetPhoneOtp = async () => {
    if (!phonenumeber || phonenumeber.length !== 10) {
      showToast({ message: "invalid Phone number", success: false });
      return; // Stop execution if invalid
    }
    try {
      const payload = {
        phone: phonenumeber,
        country_code: `+${countryCode}`,
      };

      // console.log("Sending OTP request:", payload);

      const response = await apiRequestPost(AuthApi.Send_otp, payload);

      // console.log("Phone OTP Response:", response);

      if (response && response.success) {
        setShowOtpFields1(true);
        showToast(response);
      } else {
        console.error("Failed to send OTP for phone:", response?.message);
        showToast(response);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      let payload = {};
      if (showOtpFields1) {
        payload = {
          phone: phonenumeber,
          otp: otp1,
        };
      } else if (showOtpFields) {
        payload = {
          email: email,
          otp: otp,
        };
      }

      const response = await apiRequestPost(AuthApi.Verify_otp, payload);

      if (response && response.success) {
        showToast(response);
        if (showOtpFields1) {
          setIsPhoneVerified(true);
          setShowOtpFields1(false);
        } else if (showOtpFields) {
          setIsEmailVerified(true);
          setShowOtpFields(false);
        }
      } else {
        console.error("OTP verification failed:", response?.message);
        showToast(response);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handleAll = (e) => {
    const addressComponents = e.address_components || [];

    const details = {
      city: '',
      state: '',
      country: '',
      zipCode: '',
    };

    addressComponents.forEach(component => {
      if (component.types.includes('locality')) {
        details.city = component.long_name;
      } else if (component.types.includes('administrative_area_level_1')) {
        details.state = component.long_name;
      } else if (component.types.includes('country')) {
        details.country = component.long_name;
      } else if (component.types.includes('postal_code')) {
        details.zipCode = component.long_name;
      }
    });

    setState(details?.state)
    setCity(details?.city)
    setZipCode(details?.zipCode)
  }

  return (
    <div className="h-screen flex flex-col scrollbar-hide">
      {/* Header Section */}
      <div className="hidden lg:block fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="block lg:hidden fixed top-0 left-0 w-full z-50">
        <TopHeader />
      </div>

      {/* Main Signup Section */}
      <div className="container mx-auto my-0 px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 w-full bg-white rounded-lg">
            {/* Left Side - Illustration */}
            <div className="md:flex items-start  justify-center md:w-full lg:w-full relative">
              <img
                src={home1}
                alt="Signup Illustration"
                className="w-full h-auto object-contain sticky top-[140px]"
              />
            </div>

            {/* Right Side - Signup Form */}
            <div
              className="bg-[#F7FBFE] p-6  md:p-10  2xl:my-[130px] xl:my-[100px] lg:my-[100px]  rounded-[20px] w-full shadow-[0px_0px_40px_0px_#001E6C1A] scrollbar-hide"
            >
              <h2 className="text-[22px] min-[1441px]:text-[32px]  p-3 text-center font-semibold mb-5 sm:mb-7">
                Register To Source Of Property
              </h2>

              <form
                onSubmit={handleRegister}
                className="space-y-6 sm:space-y-8 text-[14px] min-[1441px]:text-[18px] font-normal"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    {" "}
                    <label className="text-[var(--lable)] block mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <InputField
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      placeholder="Your Middle Name"
                    />
                    {errors.firstName && firstName?.trim() === "" && (
                      <p className="text-red-500 text-sm ms-2">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    {" "}
                    <label className="text-[var(--lable)] block mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <InputField
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      placeholder="Your Last Name"
                    />
                    {errors.lastName && lastName?.trim() === "" && (
                      <p className="text-red-500 text-sm ms-2">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Company & Business Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    {" "}
                    <label className="text-[var(--lable)]0 block mb-1">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <InputField
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      type="text"
                      placeholder="Enter Company Name"
                    />
                    {errors.companyName && companyName?.trim() === "" && (
                      <p className="text-red-500 text-sm ms-2">{errors.companyName}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    {" "}
                    <label className="text-[var(--lable)] block mb-1">
                      Business Type <span className="text-red-500">*</span>
                    </label>
                    <Dropdown
                      options={businessTypes}
                      onChange={(selected) => setBusinessType(selected)}
                      placeholder="Select Business Type"
                    />
                    {errors.businessType && businessType?.trim() === "" && (
                      <p className="text-red-500 text-sm ms-2">{errors.businessType}</p>
                    )}
                  </div>
                </div>

                {/* Address Fields */}
                <div className="flex flex-col gap-2">
                  {" "}
                  <label className="text-[var(--lable)] block mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <Check
                    set={(e) => handleAll(e)}
                    type='text'
                    value={address1}
                    placeholder="Please provide your physical address (or main office location)."
                  />
                  {errors.address1 && address1?.trim() === "" && (
                    <p className="text-red-500 text-sm ms-2">{errors.address1}</p>
                  )}
                </div>
                {/* Location Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-2">
                    {" "}
                    <label className="text-[var(--lable)] block mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <InputField
                      disabled={true}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      type="text"
                      placeholder="Enter State"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    {" "}
                    <label className="text-[var(--lable)] block mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <InputField
                      disabled={true}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      placeholder="Enter City"
                    />
                  </div>

                  {/* <div className="flex flex-col gap-2">
                    {" "}
                    <label className="text-[var(--lable)] block mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <Dropdown
                      options={states.map((state) => state.name)}
                      placeholder={selectedState || "Select State"}
                      onChange={handleStateChange}
                    />
                    {errors.stateId && stateId?.trim() === "" && (
                      <p className="text-red-500 text-sm ms-2">{errors.stateId}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    {" "}
                    <label className="text-[var(--lable)] block mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Dropdown
                      options={cityes.map((city) => city.name)}
                      placeholder={selectedCity || "Select State"}
                      onChange={handleCityChange}
                    />
                    {errors.selectedCity && selectedCity?.trim() === "" && (
                      <p className="text-red-500 text-sm ms-2">{errors.selectedCity}</p>
                    )}
                  </div> */}
                  <div className="flex flex-col gap-2">
                    {" "}
                    <label className="text-[var(--lable)] block mb-1">
                      ZIP Code <span className="text-red-500">*</span>
                    </label>
                    <InputField
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      type="number"
                      placeholder="Enter ZIP"
                    />
                    {errors.zipCode && zipCode?.trim() === "" && (
                      <p className="text-red-500 text-sm ms-2">{errors.zipCode}</p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[var(--lable)]">
                    Email <span className="text-red-500">*</span>
                  </label>
                  {isEmailVerified ? (
                    <CustomInput3 placeholder={email} value={email}

                    />
                  ) : showOtpFields ? (
                    <div className="flex flex-col gap-5">
                      <CustomInput2 placeholder={email} value={email}
                        onGetOtp={handleGetEmailOtp}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <CustomInput1
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => {
                          let newValue = e.target.value;

                          // Ensure only numbers are entered (extra safeguard)
                          newValue = newValue.replace(/\D/g, "");

                          // Allow only up to 6 digits
                          if (newValue.length <= 6) {
                            setOtp(newValue);
                          }
                        }}
                        onGetVerify={handleVerifyOtp}
                      />
                    </div>
                  ) : (
                    <CustomInput
                      placeholder="Enter Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onGetOtp={handleGetEmailOtp}
                    />
                  )}
                  {errors.email && email?.trim() === "" && (
                    <p className="text-red-500 text-sm ms-2">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[var(--lable)]">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  {isPhoneVerified ? (
                    <CustomPhoneInput3
                      placeholder={formatPhoneNumber(phone)}
                      value={formatPhoneNumber(phone)}
                    />
                  ) : showOtpFields1 ? (
                    <div className="flex flex-col gap-5">
                      <CustomPhoneInput1
                        placeholder={formatPhoneNumber(phone)}
                        value={formatPhoneNumber(phone)}
                        onGetOtp={handleGetPhoneOtp}
                        onChange={handlePhoneChange}
                      />
                      <CustomInput1
                        placeholder="Enter OTP"
                        value={otp1}
                        onChange={(e) => {
                          let newValue = e.target.value;

                          // Ensure only numbers are entered (extra safeguard)
                          newValue = newValue.replace(/\D/g, "");

                          // Allow only up to 6 digits
                          if (newValue.length <= 6) {
                            setOtp1(newValue);
                          }
                        }}
                        onGetVerify={handleVerifyOtp}
                      />
                    </div>
                  ) : (
                    <CustomPhoneInput
                      placeholder="Enter your phone number"
                      value={formatPhoneNumber(phone)}
                      onChange={handlePhoneChange}
                      onGetOtp={handleGetPhoneOtp}
                    />
                  )}
                  {errors.phonenumeber && phonenumeber?.trim() === "" && (
                    <p className="text-red-500 text-sm ms-2">{errors.phonenumeber}</p>
                  )}
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 gap-5">
                  <div className="flex flex-col gap-2">
                    {" "}
                    <label className="text-[var(--lable)] block mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <InputField
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Your Password"
                    />
                    {errors.password && password?.trim() === "" && (
                      <p className="text-red-500 text-sm ms-2">{errors.password}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <div className="flex flex-col gap-2">
                    {" "}
                    <label className="text-[var(--lable)] block mb-1">
                      Re-Enter Password <span className="text-red-500">*</span>
                    </label>
                    <InputField
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      placeholder="Enter Confirm Password"
                    />
                    {passwordError != "" && confirmPassword != "" && (
                      <p className="text-red-500 text-sm mt-1 ms-1">
                        {passwordError}
                      </p>
                    )}
                    {errors.confirmPassword && confirmPassword?.trim() === "" && (
                      <p className="text-red-500 text-sm ms-2">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Register Button */}
                <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-[300px] sm:max-w-[400px] h-[56px] mx-auto rounded-[10px] p-3 sm:p-4 ">
                  <button
                    type="submit"
                    className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2
                     cursor-pointer text-[14px] sm:text-[18px] font-normal"
                  >
                    Register <PiSignInBold />
                  </button>
                </div>
              </form>

              <p className="text-center mt-3 sm:mt-4 text-black cursor-pointer flex justify-center text-[12px] sm:text-[18px]">
                Already have an account?{" "}
                <span
                  className="text-blue-500 ml-1"
                  onClick={() => navigate("/Signin")}
                >
                  Sign In
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
