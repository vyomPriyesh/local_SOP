import { use, useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { RxCross1 } from "react-icons/rx";
import {
  InputField,
  CustomInput,
  CustomInput1,
  CustomInput2,
  CustomPhoneInput,
  CheckBoxButton,
  CustomPhoneInput3,
  CustomPhoneInput1,
} from "../Input/Input";
import DetailsModel from "../../Images/modellistingDetails.png";
import DetailsModel1 from "../../Images/Group1.png";
import Listing2 from "../../Images/Listing2.png";
import ListFirmImage from "../../Images/List_Firm.jpg";
import Model1 from "../../Images/model_listing1-removebg-preview.png";
import { FaFlagUsa } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { CheckboxList, Dropdown } from "../Dropdown/Dropdown";
import { useNavigate } from "react-router";
import { showToast } from "../../Common/toastService";
import { apiRequestPost } from "../../Common/Common";
import { API_URLS } from "../../Apis/api";
import { useMyContext } from "../../Context/Context";
import { Modal } from "flowbite-react";
const { AuthApi, DropdownApi } = API_URLS;
export function ModalsContainer({ onClose }) {
  const [currentModal, setCurrentModal] = useState(1);
  const handleClose = () => {
    if (onClose) {
      onClose(); // Listing component se API call trigger hogi
    }
    setCurrentModal(null);
  };

  return (
    <div className="flex justify-center items-center">
      {console.log("currentModal", currentModal)}
      {currentModal === 1 && (
        <CustomModal
          title="Great! We’ll get your concerned"
          description="We can also help you if you like. What’s your preferred location?"
          lable="Which Area Are You Looking For?"
          placeholder="Zip Code"
          buttonText="Next"
          image={Model1}
          onNext={() => setCurrentModal(2)}
          onClose={() => setCurrentModal(null)}
        />
      )}

      {currentModal === 2 && (
        <CustomModal1
          title="We’re working on your request. One last step"
          description="Share your price range that can help us quickly."
          buttonText="Finish"
          image={Listing2}
          onClose={handleClose}

        />
      )}
    </div>
  );
}

export function CustomModal({
  title,
  description,
  lable,
  placeholder,
  buttonText,
  image,
  onNext,
  onClose,
}) {
  const [inputValue, setInputValue] = useState("");
  const { zipcode, setZipcode } = useMyContext();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-10">
      <div className="bg-white rounded-[15px] w-[500px] p-[38px_14px_14px_14px] sm:h-[670px] sm:w-[630px] sm:p-[48px_24px_24px] relative">
        <button
          className="absolute top-5 right-5 text-gray-700"
          onClick={() => {
            console.log("Closing modal button clicked"); // Debugging
            if (onClose) {
              onClose();
            }
          }}
        >
          <RxCross1 size={24} />
        </button>
        <div className="flex justify-center">
          <img
            src={image}
            alt="Signup Illustration"
            className="object-contain w-[412px] h-[299px]"
          />
        </div>
        <div className="gap-[12px] mt-[12px] text-center">
          <h2 className="text-[24px] font-semibold text-[#1079E0] leading-[32px]">
            {title}
          </h2>
          <p className="text-gray-600 text-[18px] sm:mx-[65px] leading-[28px]">
            {description}
          </p>
        </div>

        <label className="block flex gap-[4px] mt-[20px] text-[18px] font-medium">
          {lable}
          <span className="text-[#D60101]">*</span>
        </label>
        <input
          type="number"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          placeholder={placeholder}
          className="w-full border rounded-[15px] py-[14px] px-[16px] mt-[10px]"
        />

        <button
          className="w-full bg-[var(--primary-color)] text-white rounded-[10px] py-[14px] px-[24px]  mt-[20px]"
          onClick={onNext}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export function CustomModal1({
  title,
  description,
  buttonText,
  image,
  onClose,
}) {
  const { values, setValues } = useMyContext();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 xl:pt-20 z-10">
      <div className="bg-white rounded-[15px] w-[400px]  p-[38px_14px_14px_14px] sm:h-[800px] sm:w-[630px] sm:p-[48px_24px_24px_24px] relative">
        <button
          className="absolute top-5 right-5 text-gray-700"
          onClick={() => {
            console.log("Closing modal button clicked"); // Debugging
            if (onClose) {
              onClose();
            }
          }}
        >
          <RxCross1 size={24} />
        </button>
        <div className="flex justify-center">
          <img
            src={image}
            alt="Illustration"
            className="object-contain w-[412px] h-[299px]"
          />
        </div>
        <div className="text-center mt-[12px]">
          <h2 className="text-[24px] font-semibold text-[var(--primary-color)] leading-[32px]">
            {title}
          </h2>
          <p className="text-gray-600 text-[18px] mx-[65px] leading-[28px]">
            {description}
          </p>
        </div>

        <div className="border border-[#020C1626] px-3 py-10 rounded-[15px] mt-4">
          {" "}
          <div className="mt-4 px-6 relative">
            <div className="relative">
              {/* Left Value Tooltip */}
              <span
                className="absolute -top-9 bg-[#1079E0] text-white px-3 py-1 rounded-lg text-sm transition-all"
                style={{
                  left: `calc(${(values[0] / 100000) * 100}% - 25px)`, // Dynamic position
                }}
              >
                ${values[0].toLocaleString()}
              </span>

              {/* Right Value Tooltip */}
              <span
                className="absolute -top-9 bg-[#1079E0] text-white px-3 py-1 rounded-lg text-sm transition-all"
                style={{
                  left: `calc(${(values[1] / 100000) * 100}% - 25px)`, // Dynamic position
                }}
              >
                ${values[1].toLocaleString()}
              </span>
            </div>

            {/* Slider */}
            <Slider
              range
              min={0}
              max={100000}
              step={1000}
              value={values}
              marks={{
                0: { label: "0", style: { color: "#A0A0A0" } },
                25000: { label: "25,000", style: { color: "#A0A0A0" } },
                50000: { label: "50,000", style: { color: "#A0A0A0" } },
                75000: { label: "75,000", style: { color: "#A0A0A0" } },
                100000: { label: "1,00,000", style: { color: "#A0A0A0" } },
              }}
              onChange={setValues}
              trackStyle={[{ backgroundColor: "#1079E0", height: 8 }]}
              handleStyle={[
                {
                  backgroundColor: "#FFFFFF",
                  borderColor: "#D3D3D3",
                  outline: "none",
                  boxShadow: "none",
                  borderWidth: 1,
                  width: 18,
                  height: 18,
                  opacity: 1,
                },
                {
                  backgroundColor: "#FFFFFF",
                  borderColor: "#D3D3D3",
                  outline: "none",
                  boxShadow: "none",
                  borderWidth: 1,
                  width: 18,
                  height: 18,
                  opacity: 1,
                },
              ]}
              railStyle={{ backgroundColor: "#c5e2ff", height: 8 }}
            />
          </div>
          {/* Input Fields */}
          <div className="flex justify-between mt-10 px-6">
            <div className="flex flex-col w-[48%] ">
              <label className="block flex gap-[4px] mt-[20px] text-[18px] font-medium">
                From ($)
                <span className="text-[#D60101]">*</span>
              </label>
              <input
                type="number"
                className="border rounded-2xl   px-3 mt-3 py-3 xl:text-[18px] border-[#020C1626]"
                value={values[0]}
                onChange={(e) => setValues([Number(e.target.value), values[1]])}
              />
            </div>
            <div className="flex flex-col w-[48%]">
              <label className="block flex gap-[4px] mt-[20px] text-[18px] font-medium ">
                To ($)
                <span className="text-[#D60101]">*</span>
              </label>
              <input
                type="number"
                className="border rounded-2xl px-3 mt-3 py-3 xl:text-[18px] border-[#020C1626]"
                value={values[1]}
                onChange={(e) => setValues([values[0], Number(e.target.value)])}
              />
            </div>
          </div>
        </div>

        <button
          className="w-full bg-[var(--primary-color)] text-white rounded-[10px] py-[14px] px-[24px]  mt-[20px]"
          onClick={onClose}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export function ParentComponent() {
  const [currentModal, setCurrentModal] = useState("contact");

  return (
    <div>
      {/* First Modal */}
      {currentModal === "contact" && (
        <ContactAgentModal
          onClose={() => setCurrentModal(null)}
          onNext={() => setCurrentModal("next")}
        />
      )}

      {/* Second Modal */}
      {currentModal === "next" && (
        <NextModal
          onClose={() => setCurrentModal(null)}
          onNext={() => setCurrentModal("final")} // Open Final Modal
        />
      )}

      {/* Third (Final) Modal */}
      {currentModal === "final" && (
        <FinalModal onClose={() => setCurrentModal(null)} />
      )}
    </div>
  );
}

export function ContactAgentModal({ onClose, onNext }) {
  // const [inputValue, setInputValue] = useState("");
  const [contactMethod, setContactMethod] = useState("phone");
  const [showOtpFields, setShowOtpFields] = useState(false);

  const [showOtpFields1, setShowOtpFields1] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phonenumeber, setPhonenumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");


  const [otp, setOtp] = useState("");
  const [otp1, setOtp1] = useState("");
  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    return phone.replace(/^(\+\d{1,3})(\d+)/, "$1 $2");
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
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-[15px] w-[630px] h-[570px] p-[24px]">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-2xl font-semibold text-[#020C16] leading-8">
            How do you want to be contacted?
          </h2>
          <button
            className="flex items-center justify-center text-gray-500 hover:text-gray-700"
            onClick={() => {
              console.log("Closing modal button clicked"); // Debugging
              if (onClose) {
                onClose();
              }
            }}
          >
            <RxCross1 size={24} />
          </button>
        </div>

        <div className="text-[18px]">
          <div className="flex flex-col gap-[8px]">
            {" "}
            <label className="text-gray-800 block mb-1 text-[18px ]">
              Name <span className="text-red-500 ">*</span>
            </label>
            <input
              type="text"
              // value={inputValue}
              // onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter Your Name"
              className="w-full border rounded-[15px] py-[14px] px-[16px] mt-[2px]"
            />
          </div>
        </div>

        <div className="mt-3 bg-white ">
          {/* Toggle Options */}
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                className="appearance-none w-6 h-6 rounded-md border-2 border-white
             bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
             checked:bg-[var(--primary-color)] checked:border-white
             checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
             relative transition-all duration-200 ease-in-out 
             checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
             checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
             checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                checked={contactMethod === "phone"}
                onChange={() => setContactMethod("phone")}
              />
              <span className="text-gray-700">Phone</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="contactMethod"
                value="email"
                checked={contactMethod === "email"}
                onChange={() => setContactMethod("email")}
                className="appearance-none w-6 h-6 rounded-md border-2 border-white
             bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
             checked:bg-blue-500 checked:border-white
             checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
             relative transition-all duration-200 ease-in-out 
             checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
             checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
             checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
              />

              <span className="text-gray-700">Email</span>
            </label>
          </div>

          {/* Phone Input */}
          {contactMethod === "phone" && (
            <>
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
            </>
          )}

          {/* Email Input */}
          {contactMethod === "email" && (
            <>
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
            </>
          )}
        </div>
        <button
          className="w-full bg-[var(--primary-color)] text-white rounded-[10px] py-[14px] px-[24px] mt-3"
          onClick={onNext} // Close modal when clicked
        >
          Next
        </button>

        <p className="mt-5 text-[#6C6C6C] text-[14px]">
          By submitting your information, you agree that the real estate
          professional identified above may call/text you about your search,
          which may involve use of automated means and pre-recorded/artificial
          voices. You don't need to consent as a condition of buying any
          property, goods, or services. Message/data rates may apply. You also
          agree to our
          <span className="text-[var(--primary-color)] cursor-pointer">
            Terms of Use.
          </span>
        </p>
      </div>
    </div>
  );
}

export function NextModal({ onClose, onNext }) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-[15px] w-[630px] h-[700px] p-[20px]">
        <div className="flex items-center justify-end gap-2">
          <button
            className="flex items-center justify-center text-gray-500 hover:text-gray-700"
            onClick={() => {
              console.log("Closing modal button clicked"); // Debugging
              if (onClose) {
                onClose();
              }
            }}
          >
            <RxCross1 size={24} />
          </button>
        </div>
        <div className="p-3 flex items-center justify-center">
          <img
            src={DetailsModel}
            className="w-full h-full object-cover"
            alt="Details Model"
          />
        </div>

        <div>
          <span className="font-[Poppins] font-semibold text-[24px] leading-[32px] tracking-[0%]">
            When do you need to be contacted?
          </span>
        </div>
        <div>
          <div className="mt-4">
            <CheckboxList />
          </div>
        </div>
        <button
          className="w-full bg-[var(--primary-color)] text-white rounded-[10px] py-[14px] px-[24px] mt-3"
          onClick={onNext} // Close modal when clicked
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function FinalModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-[15px] w-[600px] h-[500px] p-[20px]">
        <div className="flex items-center justify-end gap-2">
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <RxCross1 size={24} />
          </button>
        </div>
        <div className="p-3 flex items-center justify-center">
          <img
            src={DetailsModel1}
            className="w-[250px] h-[250px] object-cover"
            alt="Details Model"
          />
        </div>
        <h2 className="text-[32px] text-center font-semibold">Request Sent</h2>
        <p className="text-center text-[18px] mt-2">Your request was sent</p>

        <button
          className="w-full bg-[var(--primary-color)] text-white rounded-[10px] py-[14px] px-[24px] mt-3"
          onClick={onClose} // Close modal when clicked
        >
          Done
        </button>
      </div>
    </div>
  );
}

export function ListFirm({ onClose }) {
  const navigate = useNavigate();
  const businessTypes = [
    "Title Abstractor",
    "Title Company",
    "Real Estate Agent",
    "Real Estate Attorney",
    "Appraisal Company",
    "Surveyor Company",
  ];
  const [selectedBusiness, setSelectedBusiness] = useState("");

  const handleNext = () => {
    console.log("selectedBusiness", selectedBusiness);
    if (selectedBusiness) {
      localStorage.setItem('selectedBusiness', selectedBusiness)
      const formattedRoute = selectedBusiness.replace(/\s+/g, "");
      console.log("Navigating to:", `/Business/${formattedRoute}`);
      navigate(`/Business/${formattedRoute}`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-[24px] w-[630px] h-[500px] ">
        <div className="flex items-center justify-between gap-2 bg-[#EEF3F7] py-[16px] px-[32px] rounded-t-[24px]">
          <h2 className="text-[24px] font-semibold text-[#020C16] leading-8">
            List Firm
          </h2>
          <button
            className="flex items-center justify-center text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <RxCross1 size={24} />
          </button>
        </div>

        <div className="p-10 pb-5">
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src={ListFirmImage}
              alt="List Firm"
              className="w-[360px] h-[200px]"
            />
          </div>

          <div>
            <label className="text-[#020C16] block mb-1 text-[18px]">
              Business Type <span className="text-red-500">*</span>
            </label>
            <Dropdown
              options={businessTypes}
              placeholder="Select Business Type"
              onChange={(selectedOption) => {
                console.log("Selected Option:", selectedOption);
                setSelectedBusiness(selectedOption);
              }}
            />
          </div>
        </div>

        <div className="px-[100px]">
          <button
            className="w-full bg-[var(--primary-color)] text-white rounded-[10px] py-[14px] px-[24px] "
            onClick={handleNext}
            disabled={!selectedBusiness}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export function StateCounties({ show, onClose, close, states, counties, handleStateChange, setState, setConty, state, county, allData, setAllData }) {

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState([]);

  const handleState = (state) => {
    setSelectedState(state);
    handleStateChange(state.name);
  };

  const handleCounties = (county) => {
    console.log(county)
    const get = selectedCounty.map(list => list.name)
    const get_2 = get.includes(county.name)
    const get_3 = selectedCounty.filter(list => list.name != county.name)
    if (get_2) {
      setSelectedCounty(get_3)
    } else {
      setSelectedCounty(prev => [...prev, county])
    }

    setAllData(prev => {
      const stateIndex = prev.findIndex(item => item.state?.name === selectedState.name);
      console.log(stateIndex)

      if (stateIndex >= 0) {
        const updated = [...prev];
        const currentCounties = updated[stateIndex].counties;

        const get_ = currentCounties.map(list => list.name)
        const get_2_ = get_?.includes(county.name)
        console.log(get_)
        const get_3_ = currentCounties.filter(list => list.name != county.name)
        if (!get_) {
          console.log('get_')
        }
        if (!get_2_) {
          console.log('get_2_')
        }
        if (!get_3_) {
          console.log('get_3_')
        }

        if (get_2_) {
          updated[stateIndex].counties = get_3_
        } else {
          updated[stateIndex].counties = [...updated[stateIndex].counties, county]
        }



        // if (!currentCounties.has(county)) {
        //   currentCounties.add(county);
        // } else {
        //   currentCounties.delete(county);  // Optionally delete county if it's already there
        // }

        updated[stateIndex] = {
          ...updated[stateIndex],
          counties: Array.from(currentCounties)
        };

        return currentCounties.size === 0
          ? updated.filter((_, i) => i !== stateIndex)
          : updated;
      } else {
        console.log('hello 2')
      }

      return [...prev, {
        state: selectedState,
        counties: [county]
      }];
    });
  };

  console.log(selectedState)

  const handleSave = () => {

    const data = allData.filter(list => list?.counties?.length != 0)
    const data2 = data.map(list => list.state)
    setState(data2)
    const data3 = data.map(list => list.counties).flat()
    setConty(data3)
    onClose();
  }

  useEffect(() => {
    if (state) {
      setSelectedState(state[state?.length - 1])
    }
  }, [state])

  useEffect(() => {
    if (county) {
      setSelectedCounty(county)
    }
  }, [county])

  const handleClose = () => {
    setState([])
    setConty([])
    onClose();
  }

  // Remove the selectedCounty state as it's now managed within allData

  return (

    <Modal show={show} position="top-center" className="xl:pt-0 pt-28 bg-gray-900/50 dark:bg-gray-900/80" onClose={handleClose}>
      <div className="max-w-2xl">
        <Modal.Header className="[&>button]:hidden"> Select States and Counties</Modal.Header>
        <Modal.Body>
          <div className=" pb-5 xl:h-72 lg:h-[32vh] md:h-[35vh] h-[40vh] flex flex-row gap-3">
            <div className="lg:w-1/3 w-1/2">
              <h1 className="mb-3">State</h1>
              <div className="overflow-y-auto flex flex-col gap-2 h-full">
                {states.map((list, i) => (
                  <label className="flex place-items-start w-full" key={i}>
                    <input
                      type={"radio"}
                      name={"radiobutton"}
                      onChange={() => handleState(list)}
                      checked={selectedState?.name == list.name}
                      className="mr-2 w-5 h-5 appearance-none border-2 border-gray-400 rounded-md aspect-square
                              checked:bg-blue-500 checked:border-blue-500 relative 
                              checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
                              checked:before:text-[10px] checked:before:font-bold checked:before:left-1/2 
                              checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                    />

                    <span>{list.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="lg:w-2/3 w-1/2 ps-2">
              <h1 className="mb-3">Counties</h1>
              <div className="overflow-y-auto flex flex-col gap-2 h-full">
                {counties.map((list, i) => (
                  <label className="flex place-items-start w-full" key={i}>
                    <input
                      type={"checkbox"}
                      name={"radiobutton"}
                      checked={selectedCounty.some(l => l.name === list.name)}
                      onChange={() => handleCounties(list)}
                      className="mr-2 w-5 h-5 appearance-none border-2 border-gray-400 rounded-md
                              checked:bg-blue-500 checked:border-blue-500 relative 
                              checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
                              checked:before:text-[10px] checked:before:font-bold checked:before:left-1/2 
                              checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                    />

                    <span>{list.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 h-36 overflow-y-auto overflow-hidden gap-5  w-full p-5 mt-5">
            {allData.map((list, i) => (
              <div key={i}>
                <h1 className="text-gray-500 font-semibold">{list.state?.name}</h1>
                <div className="" >
                  <span>{list.counties?.map(list => list?.name).join(", ")}</span>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </div>
      <Modal.Footer className="flex justify-end">
        <button className="bg-gray-500 px-4 py-2 text-white rounded-lg" onClick={handleClose}>Cancel</button>
        <button className="bg-blue-500 px-4 py-2 text-white rounded-lg" onClick={handleSave}>Save</button>
      </Modal.Footer>
    </Modal>

  );
}

export function StateCountiesShow({ show, close, state, county }) {

  const [states, setStates] = useState([])
  const [counties, setCounties] = useState([])
  const [newConty, setNewcounty] = useState([])
  const [stateId, setStateId] = useState(null)

  const changeData = (id) => {
    setStateId(id)
    const data = counties?.filter(list => list.state_id == id)
    setNewcounty(data)
  }

  useEffect(() => {
    const all = state?.map(list => list.state) ?? [];
    setStates(all)
    changeData(all[0]?.id)
    setCounties(county?.map(list => list.county) ?? [])
  }, [state, county, show])

  console.log(stateId)

  return (

    <Modal show={show} onClose={close} className="xl:pt-0 pt-28 bg-gray-900/50 dark:bg-gray-900/80" >
      <div>
        <Modal.Header ><h4 className="text-black">Served Service Areas</h4></Modal.Header>
        <Modal.Body >
          <div className="pb-5 xl:h-72 lg:h-[32vh] md:h-[35vh] h-[40vh] flex flex-row gap-3">
            <div className="lg:w-1/3 w-1/2 p-2 pt-0 border-r-2 border-gray-300">
              <h1 className="mb-3 font-medium ps-1 border-b-2">State</h1>
              <div className="overflow-y-auto overflow-x-hidden flex flex-col gap-2 h-full">
                {states.map((list, i) => (
                  <label onClick={() => changeData(list.id)}
                    className={`${stateId === list.id ? 'text-blue-600 font-semibold' : 'text-black'} hover:scale-110 ps-1 flex place-items-start w-fit hover:border-2 border-2 border-white cursor-pointer transition-all duration-300 ease-out text-sm`} key={i}>
                    {list.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="lg:w-2/3 w-1/2 ps-2">
              <h1 className="mb-3 font-medium border-b-2">Counties</h1>
              <div className="overflow-y-auto flex flex-col gap-2 h-full">
                {newConty?.map((list, i) => (
                  <label className="flex place-items-start w-full text-sm" key={i}>
                    <span>{list?.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>

  );
}