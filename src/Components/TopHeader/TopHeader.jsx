import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router";
import Button from "../Button/Button";
import { CgProfile } from "react-icons/cg";

const TopHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Check current path for conditional rendering
  const isSignupPage = location.pathname === "/Signup";
  const isAuthPage = [
    "/Signin",
    "/ForgetPassword",
    "/Newpassword",
    "/Verification",
  ].includes(location.pathname);

  return (
    <header className="bg-black text-white px-5 py-5 relative">
      <div className="mx-auto flex items-center justify-between">
        {/* Left - Logo */}
        <h1 className="text-[14px] sm:text-[22px] font-bold tracking-wide">
          SOURCE OF PROPERTY
        </h1>

        {/* Right - Profile / Buttons */}
        <div className="flex">
          <div className="2xl:hidden sm:flex items-center gap-2 me-3">
            {isSignupPage ? (
              <Button />
            ) : isAuthPage ? (
              <button
                className="bg-white text-black px-2 py-1 rounded-[5px] text-[12px] sm:text-[16px] sm:px-4 sm:py-2 hover:bg-gray-200"
                onClick={() => navigate("/Signup")}
              >
                Register
              </button>
            ) : (
              <>
                {/* <CgProfile
                  size={25}
                  className="cursor-pointer"
                  onClick={() => navigate("/Signup")}
                />
                <span
                  className="hidden md:block text-[18px] cursor-pointer"
                  onClick={() => navigate("/Signup")}
                >
                  Kevin Markey
                </span> */}
                
                {/* <Button />
              <button
              className="bg-white text-black px-4 py-2  lg:px-2 xl:px-4 rounded-lg text-[14px] sm:text-[16px] hover:bg-gray-200"
              onClick={() => navigate("/Signup")}
            >
              Register
            </button> */}
              </>
            )}
          </div>
          <button
            className="2xl:hidden text-white"
            onClick={() => setIsOpen(true)}
          >
            <FaBars size={18} />
          </button>
        </div>

        {/* Offcanvas Menu (Right Side) */}
        <div
          className={`fixed top-0 right-0 h-full w-[280px] bg-black shadow-lg transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 p-5`}
        >
          <h1 className="text-[18px] sm:text-[18px] mt-[40px] font-bold tracking-wide border-b">
            SOURCE OF PROPERTY
          </h1>
          <button
            className="absolute top-4 left-4 text-white"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={22} />
          </button>
          <nav className="flex flex-col gap-4 mt-10 text-[16px]">
            <button
              onClick={() => navigate("/")}
              className="hover:text-gray-400"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/Listing")}
              className="hover:text-gray-400"
            >
              Listing
            </button>
            <button
              onClick={() => navigate("/")}
              className="hover:text-gray-400"
            >
              Posting
            </button>
            <button
              onClick={() => navigate("/")}
              className="hover:text-gray-400"
            >
              Job Board
            </button>
            <button
              onClick={() => navigate("/")}
              className="hover:text-gray-400"
            >
              Publication
            </button>
            <button
              onClick={() => navigate("/")}
              className="hover:text-gray-400"
            >
              Events
            </button>
            <button
              onClick={() => navigate("/")}
              className="hover:text-gray-400"
            >
              Tools
            </button>
            <button
              onClick={() => navigate("/")}
              className="hover:text-gray-400"
            >
              Contact Us
            </button>
            <div className="flex gap-2 justify-center"><Button />
            <button
  className="text-black px-4 py-2 rounded-lg text-[14px] sm:text-[16px] hover:bg-gray-200"
  onClick={() => navigate("/Signup")}
  style={{
    backgroundColor: "white", // Sirf text jitni width ke liye
    display: "inline-block", // Jitna text hoga utni hi width hogi
  }}
>
  Register
</button></div>
            

          </nav>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
