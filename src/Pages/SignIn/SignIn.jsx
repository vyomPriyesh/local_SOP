import { useState, useEffect } from "react";
import Navbar from "../../Components/TopHeader/NavBar";
import TopHeader from "../../Components/TopHeader/TopHeader";
import home1 from "../../Images/Signin.png";
import { InputField } from "../../Components/Input/Input";
import { PiSignInBold } from "react-icons/pi";
import { useNavigate } from "react-router";
import { showToast } from "../../Common/toastService";

import { ContactAgentModal } from "../../Components/Model/CustomModal";
import { apiRequestPost, apiRequestGet } from "../../Common/Common";
import { API_URLS } from "../../Apis/api";
const { AuthApi, DropdownApi } = API_URLS;

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const handleLogin = async (event) => {
    event.preventDefault();


    let newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) newErrors.email = "Email is required.";

    if (!password) newErrors.password = "Password is required.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }



    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    } else {
      setError("");
    }


    const payload = {
      email: email.trim(),
      password: password.trim(),
    };
    console.log("payload", payload);
    try {
      const response = await apiRequestPost(AuthApi.Login, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response && response.success) {
        const { token, result } = response.data;
        localStorage.setItem("AUTHTOKEN", token);
        localStorage.setItem("FIRSTNAME", result.first_name);
        localStorage.setItem("LASTNAME", result.last_name);
        localStorage.setItem("PASSWORD", result.password);
        localStorage.setItem("USERID", result.id);
        const last_page = localStorage.getItem("last_page");

        // localStorage.setItem("user", JSON.stringify(result));
        showToast(response);
        if (last_page) {
          navigate("/" + last_page)
        } else {
          navigate("/");
        }
      } else {
        console.error("Login failed:", response);
        showToast(response);
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      showToast(error);
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
                  className="w-full h-auto object-contain "
                />
              </div>

              {/* Right Side - Signup Form */}
              <div className="space-y-8 bg-[#F7FBFE] p-6 sm:p-10 rounded-[20px] shadow-[0px_0px_40px_0px_rgba(0,30,108,0.2)] w-full flex flex-col justify-center">
                <h2 className="text-[22px] min-[1441px]:text-[32px] p-3 text-center font-semibold mb-5 sm:mb-4">
                  Sign In to Source Of Property
                </h2>

                <form
                  onSubmit={handleLogin}
                  className="space-y-6 sm:space-y-8    font-normal"
                >
                  <div className="flex flex-col gap-2">
                    {" "}
                    <label className="text-[var(--lable)]">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <InputField
                      type="text"
                      placeholder="Enter Your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.replace(/\s/g, "").toLowerCase())}

                    />
                    {errors.email && email?.trim() === "" && (
                      <p className="text-red-500 text-sm ms-2">{errors.email}</p>
                    )}
                    {(error && email.trim() !== "") && <p className="text-red-500 text-sm">{error}</p>} {/* Error Message */}
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div className="flex flex-col gap-2">
                      {" "}
                      <label className="text-[var(--lable)] block mb-1">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <InputField
                        type="password"
                        placeholder="Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && password?.trim() === "" && (
                        <p className="text-red-500 text-sm ms-2">{errors.password}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    {/* //             <label className="flex items-center gap-2 text-[#6C6C6C] text-[14px] min-[1441px]:text-[18px]">
        //               <input
        //                 type="checkbox"
        //                 className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] border-2 border-[#5C6270] rounded-md bg-white 
        // checked:bg-[var(--primary-color)] checked:border-[var(--primary-color)] cursor-pointer"
        //               />
        //               Remember Me
        //             </label> */}
                    <span
                      className="text-blue-500 hover:underline cursor-pointer text-[14px] min-[1441px]:text-[18px]"
                      onClick={() => navigate("/ForgetPassword")}
                    >
                      Forgot Password?
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-[300px] sm:max-w-[400px] h-[56px] mx-auto rounded-[10px] p-3 sm:p-4 ">
                    <button
                      type="submit"
                      className="bg-[var(--primary-color)] text-white py-2 rounded-lg w-full flex items-center justify-center gap-x-2 cursor-pointer"
                    // disabled={loading}
                    >
                      Sign In
                      <PiSignInBold />
                    </button>
                  </div>
                </form>

                <p className="text-center mt-3 sm:mt-4 text-black cursor-pointer flex justify-center text-[14px] min-[1441px]:text-[18px] ">
                  Don't have an account?{" "}
                  <span
                    className="text-[var(--primary-color)] ml-1"
                    onClick={() => navigate("/Signup")}
                  >
                    Register
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
