import Navbar from "../../Components/TopHeader/NavBar";
import TopHeader from "../../Components/TopHeader/TopHeader";
import home1 from "../../Images/Verification.png";
import { FiPhone, FiMail } from "react-icons/fi";

import { PiSignInBold } from "react-icons/pi";
import ContactOption from "../../Components/ContactOption/ContactOption";
import {
  InputField,
  InputField1,
  OTPInputField,
} from "../../Components/Input/Input";
import { useNavigate } from "react-router";

export default function Verification() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/NewPassword");
  };

  return (
    <div className="h-screen flex flex-col overflow-auto">
      {/* Header */}
      <div className="hidden lg:block">
        <Navbar />
      </div>

      <div className="block lg:hidden">
        <TopHeader />
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 w-full bg-white rounded-lg">
              {/* Left Side - Illustration */}
              <div className="flex justify-center p-4 md:p-6">
                <img
                  src={home1}
                  alt="Signup Illustration"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Right Side - Signup Form */}
              <div className="space-y-6 sm:space-y-8 bg-[#F7FBFE] p-6 sm:p-10 rounded-[20px] shadow-[0px_0px_40px_0px_rgba(0,30,108,0.2)] w-full flex flex-col justify-center">
                <h2 className="text-[22px] min-[1025px]:text-[32px] p-3 text-center font-semibold mb-5 sm:mb-7">
                  Verification
                </h2>
                <p className="font-medium text-[#6C6C6C] text-center leading-[24px] text-[14px] min-[1025px]:text-[16px]">
                  Enter verification code sent on{" "}
                  <span className="text-[var(--primary-color)] font-semibold">
                    {" "}
                    +1 987-654-3210
                  </span>
                </p>
                <form
                  className="text-[18px] font-normal"
                  onSubmit={handleSubmit}
                >
                  <div className="flex justify-center items-center gap-2 sm:gap-4 lg:gap-6">
                    <OTPInputField type="number" placeholder="1" />
                    <OTPInputField type="number" placeholder="1" />
                    <OTPInputField type="number" placeholder="1" />
                    <OTPInputField type="number" placeholder="1" />
                    <OTPInputField type="number" placeholder="1" />
                    <OTPInputField type="number" placeholder="1" />
                  </div>

                  <div className="grid grid-cols-1 gap-5 w-full max-w-[400px] mx-auto rounded-[10px] p-4 mt-10">
                    <button className="bg-[var(--primary-color)] text-white py-2 rounded-[10px] w-full flex items-center justify-center gap-x-2 cursor-pointer text-[14px] sm:text-[16px]">
                      Verify Code
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
