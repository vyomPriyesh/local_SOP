import Navbar from "../../Components/TopHeader/NavBar";
import TopHeader from "../../Components/TopHeader/TopHeader";
import home1 from "../../Images/forgetpassword.png";
import { FiPhone, FiMail } from "react-icons/fi";

import { PiSignInBold } from "react-icons/pi";
import ContactOption from "../../Components/ContactOption/ContactOption";
import { useNavigate } from "react-router";
import { useState } from "react";
import { showToast } from "../../Common/toastService";
import { apiRequestPost } from "../../Common/Common";
import { API_URLS } from "../../Apis/api";
import { CustomInput, CustomInput1, CustomInput2, CustomInput3, CustomPhoneInput, CustomPhoneInput1, CustomPhoneInput3 } from "../../Components/Input/Input";
const { AuthApi, DropdownApi } = API_URLS;  
export default function ForgetPassword() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("sms"); // Default to "sms"
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showOtpFields, setShowOtpFields] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [phonenumeber, setPhonenumber] = useState("");
  const [otp1, setOtp1] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [showOtpFields1, setShowOtpFields1] = useState(false);
  const handleSelect = (method) => {
    setSelectedOption((prev) => (prev === method ? null : method));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/Verification");
  };
  const   formatPhoneNumber = (phone) => {
    if (!phone) return "";
    return phone.replace(/^(\+\d{1,3})(\d+)/, "$1 $2");
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
  return (
    <div className="h-screen flex flex-col overflow-auto">
      {/* Header */}
      <div className="hidden lg:block fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="block lg:hidden fixed top-0 left-0 w-full z-50">
        <TopHeader />
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 w-full bg-white rounded-lg">
              {/* Left Side - Illustration */}
              <div className="flex justify-center p-4 md:p-6 mt-10 lg:mt-0">
                <img
                  src={home1}
                  alt="Signup Illustration"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Right Side - Signup Form */}
              <div className="space-y-8 bg-[#F7FBFE] p-10 rounded-[20px] shadow-[0px_0px_40px_0px_rgba(0,30,108,0.2)]">
                <h2 className="text-[22px] min-[1441px]:text-[32px] p-3 text-center font-semibold mb-5 sm:mb-7">
                  Forgot Password?
                </h2>
                <p className="font-medium text-[#6C6C6C] text-center leading-[24px] text-[14px] min-[1025px]:text-[16px]">
                  Select which contact details should we use to reset your
                  password?
                </p>
                <form
                  className="space-y-8 text-[14px] min-[1441px]:text-[18px] font-normal"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 gap-5">
                    <ContactOption
                      method="Via SMS"
                      phoneNumber="+1 987-654-3210"
                      icon={FiPhone}
                      isSelected={selectedOption === "sms"}
                      onSelect={() => handleSelect("sms")}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <ContactOption
                      method="Via Email"
                      phoneNumber="abc@gmail.com"
                      icon={FiMail}
                      isSelected={selectedOption === "email"}
                      onSelect={() => handleSelect("email")}
                    />
                  </div>


                  {selectedOption == "email" && (
          <div className="flex flex-col gap-2">
                          <label className="text-[var(--lable)]">
                            Email <span className="text-red-500">*</span>
                          </label>
                          {isEmailVerified ? (
                            <CustomInput3 placeholder={email} value={email} />
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
                        </div>
      )}

      {selectedOption == "sms" &&  (
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
              </div>
      )}

                  <div className="grid grid-cols-1 gap-5 w-full max-w-[400px] mx-auto rounded-[10px] p-4">
                    <button className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2 cursor-pointer text-[14px] sm:text-[16px]">
                      Submit
                      <PiSignInBold />
                    </button>
                  </div>
                </form>

                {/* Login Link */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
