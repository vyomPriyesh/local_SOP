import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import Button from "../Button/Button";
import { ToolsDropdown } from "../Dropdown/Dropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const firstName = localStorage.getItem("FIRSTNAME");
    const lastName = localStorage.getItem("LASTNAME");

    if (firstName && lastName) {
      setUser({ firstName, lastName });
    }
  }, []);

  // Define paths for different conditions
  const signupPage = location.pathname === "/Signup";
  const authPages = [
    "/Signin",
    "/ForgetPassword",
    "/Newpassword",
    "/verification",
  ].includes(location.pathname);

  return (
    <header className="bg-black text-white p-10 2xl:py-1 xl:py-2 py-2">
      <div className="mx-auto flex items-center justify-between lg:mx-0 2xl:my-1">
        {/* Left - Logo */}
        <Link to='/' className="text-[22px] sm:text-[26px] lg:text-[20px] font-bold tracking-wide">
          SOURCE OF PROPERTY
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

        {/* ----------if set center nav bar to add nav tag --------- */}

        {/* Right - Profile & Buttons */}
        <div className="hidden md:flex items-center gap-2 pe-5 lg:gap-2 lg:pe-0 lg:ps-5 xl:ps-0 2xl:pe-5">
          {/* Center - Navigation */}
          <nav
            className={`${
              isOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row gap-4 xl:gap-4 2xl:gap-4 sm:gap-6 text-[16px] sm:text-[18px] lg:text-[14px] xl:text-[16px] space-x-0 md:space-x-0 xl:space-x-1 2xl:space-x-6 absolute md:static bg-black md:bg-transparent lg:gap-3 top-16 left-0 w-full md:w-auto p-4 lg:px-0 lg:py-4 xl:px-4 xl:py-4 md:p-0 lg:p-0 z-50 whitespace-nowrap`}
          >
            <button
              onClick={() => navigate("/")}
              className="hover:text-[var(--primary-color)]"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/Listing")}
              className="hover:text-[var(--primary-color)]"
            >
              Listing
            </button>
            <button
              onClick={() => navigate("/use-ful-links")}
              className="hover:text-[var(--primary-color)]"
            >
              Useful Links
            </button>
            {/* <a href="#" className="hover:text-gray-400 flex items-center gap-1">
              Posting <IoMdArrowDropdown size={14} />
            </a>
            <a href="#" className="hover:text-[var(--primary-color)]">
              Job Board
            </a>
            <a href="#" className="hover:text-[var(--primary-color)]">
              Publication
            </a>
            <a
              href="#"
              className="hover:text-[var(--primary-color)] flex items-center gap-1"
            >
              Events <IoMdArrowDropdown size={14} />
            </a> */}
            {/* <a
              href="#"
              className="hover:text-[var(--primary-color)] flex items-center gap-1"
            >
              Tools <IoMdArrowDropdown size={14} />
            </a> */}
            {/* <ToolsDropdown/> */}
            <button
              onClick={() => navigate("/Contact-us")}
              className="hover:text-[var(--primary-color)]"
            >
              Contact Us
            </button>
          </nav>
          {user ? (
            <>
              <CgProfile
                size={25}
                className="cursor-pointer"
                onClick={() => navigate("/ListingProfile")}
              />
              <span
                className="hidden lg:block text-[18px] lg:text-[14px] xl:text-[18px] cursor-pointer"
                onClick={() => navigate("/ListingProfile")}
              >
                {user.firstName} {user.lastName}
              </span>
            </>
          ) : signupPage ? (
            <Button />
          ) : authPages ? (
            <button
              className="bg-white text-black px-4 py-2 rounded-lg text-[14px] sm:text-[16px] hover:bg-gray-200"
              onClick={() => navigate("/Signup")}
            >
              Register
            </button>
          ) : (
            <>
              <Button />
              <button
                className="bg-white text-black px-4 py-2 lg:px-2 xl:px-4 rounded-lg text-[14px] sm:text-[16px] hover:bg-gray-200"
                onClick={() => navigate("/Signup")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
