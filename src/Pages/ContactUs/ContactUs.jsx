import { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import MainSidebar from "../../Components/Sidebar/MainSidebar";
import Navbar from "../../Components/TopHeader/NavBar";
import TopHeader from "../../Components/TopHeader/TopHeader";
import * as yup from "yup";

const step1Schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  subject: yup.string().required("Business Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required"),
});


const ContactUs = () => {

  const [error, setErrors] = useState({});
  const [data, setData] = useState({
    name: '',
    subject: '',
    email: '',
    message: '',
  })

  const handleDone = async () => {
    try {
      const formData = {
        name: data.name,
        subject: data.subject,
        email: data.email,
        message: data.message,
      }
      await step1Schema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (err) {
      console.log(err)
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }

  }

  return (
    <div>
      <div className="h-screen flex flex-col bg-[#FAFAFA]">
        {/* Header */}
        <div className="hidden lg:block fixed top-0 left-0 w-full z-10">
          <Navbar />
        </div>

        <div className="block lg:hidden  fixed top-0 left-0 w-full  z-40">
          <TopHeader />
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex flex-1 pt-[50px] md:pt-[70px] ">
          {/* Sidebar */}
          <div className="hidden md:block 2xl:w-[372px]  xl:w-[330px] w-[300px]   h-full">
            <MainSidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-10 px-12 pb-0 overflow-auto border-b bg-[#FAFAFA]">
            <div className=" sm:flex md:block  lg:flex justify-between items-center mb-5 sm:mb-7">
              <h1 className="text-[20px] sm:text-[24px] md:text-[32px] 2xl:text-[42px] p-2 font-semibold ">
                Contact Us
              </h1>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-2 grid grid-cols-1 lg:grid-cols-2 gap-10">

              <div className="space-y-6">
                <div>
                  <p className="text-lg font-semibold text-[20px]">Address :</p>
                  <p className="text-gray-600 text-[20px]">1007 Lexington Ave. Mansfield OH 44907</p>
                </div>

                <div>
                  <p className="text-lg font-semibold text-[20px]">Phone :</p>
                  <p className="text-gray-600 text-[20px]">419-524-5538</p>
                </div>

                <div>
                  <p className="text-lg font-semibold">Email :</p>
                  <p className="text-gray-600 text-[20px]">info@sourceofproperty.com</p>
                </div>

                <div>
                  <p className="text-lg font-bold text-[20px]">Our Social Media :</p>
                  <div className="flex items-center gap-3 mt-2">
                    <a
                      href="#"
                      className="p-3 text-white rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="42"
                        viewBox="0 0 42 42"
                        fill="none"
                      >
                        <rect width="42" height="42" rx="21" fill="#1079E0" />
                        <path
                          d="M21.3438 11.25C19.4154 11.25 17.5303 11.8218 15.9269 12.8932C14.3236 13.9645 13.0739 15.4873 12.3359 17.2688C11.598 19.0504 11.4049 21.0108 11.7811 22.9021C12.1573 24.7934 13.0859 26.5307 14.4495 27.8943C15.813 29.2579 17.5503 30.1865 19.4416 30.5627C21.3329 30.9389 23.2933 30.7458 25.0749 30.0078C26.8565 29.2699 28.3792 28.0202 29.4506 26.4168C30.5219 24.8134 31.0938 22.9284 31.0938 21C31.091 18.415 30.0629 15.9366 28.235 14.1087C26.4071 12.2808 23.9288 11.2527 21.3438 11.25ZM22.0938 29.2153V23.25H24.3438C24.5427 23.25 24.7334 23.171 24.8741 23.0303C25.0147 22.8897 25.0938 22.6989 25.0938 22.5C25.0938 22.3011 25.0147 22.1103 24.8741 21.9697C24.7334 21.829 24.5427 21.75 24.3438 21.75H22.0938V19.5C22.0938 19.1022 22.2518 18.7206 22.5331 18.4393C22.8144 18.158 23.1959 18 23.5938 18H25.0938C25.2927 18 25.4834 17.921 25.6241 17.7803C25.7647 17.6397 25.8438 17.4489 25.8438 17.25C25.8438 17.0511 25.7647 16.8603 25.6241 16.7197C25.4834 16.579 25.2927 16.5 25.0938 16.5H23.5938C22.7981 16.5 22.035 16.8161 21.4724 17.3787C20.9098 17.9413 20.5938 18.7044 20.5938 19.5V21.75H18.3438C18.1448 21.75 17.9541 21.829 17.8134 21.9697C17.6728 22.1103 17.5938 22.3011 17.5938 22.5C17.5938 22.6989 17.6728 22.8897 17.8134 23.0303C17.9541 23.171 18.1448 23.25 18.3438 23.25H20.5938V29.2153C18.4795 29.0223 16.521 28.0217 15.1257 26.4215C13.7304 24.8214 13.0057 22.7449 13.1023 20.6241C13.1989 18.5032 14.1094 16.5013 15.6444 15.0346C17.1794 13.5679 19.2207 12.7495 21.3438 12.7495C23.4668 12.7495 25.5081 13.5679 27.0431 15.0346C28.5781 16.5013 29.4886 18.5032 29.5852 20.6241C29.6818 22.7449 28.9571 24.8214 27.5618 26.4215C26.1665 28.0217 24.208 29.0223 22.0938 29.2153Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="p-3 text-white rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="42"
                        viewBox="0 0 42 42"
                        fill="none"
                      >
                        <rect width="42" height="42" rx="21" fill="#1079E0" />
                        <path
                          d="M21 16.5C20.11 16.5 19.24 16.7639 18.4999 17.2584C17.7599 17.7529 17.1831 18.4557 16.8425 19.2779C16.5019 20.1002 16.4128 21.005 16.5865 21.8779C16.7601 22.7508 17.1887 23.5526 17.818 24.182C18.4474 24.8113 19.2492 25.2399 20.1221 25.4135C20.995 25.5872 21.8998 25.4981 22.7221 25.1575C23.5443 24.8169 24.2471 24.2401 24.7416 23.5001C25.2361 22.76 25.5 21.89 25.5 21C25.4988 19.8069 25.0243 18.663 24.1806 17.8194C23.337 16.9757 22.1931 16.5012 21 16.5ZM21 24C20.4067 24 19.8266 23.8241 19.3333 23.4944C18.8399 23.1648 18.4554 22.6962 18.2284 22.1481C18.0013 21.5999 17.9419 20.9967 18.0576 20.4147C18.1734 19.8328 18.4591 19.2982 18.8787 18.8787C19.2982 18.4591 19.8328 18.1734 20.4147 18.0576C20.9967 17.9419 21.5999 18.0013 22.1481 18.2284C22.6962 18.4554 23.1648 18.8399 23.4944 19.3333C23.8241 19.8266 24 20.4067 24 21C24 21.7956 23.6839 22.5587 23.1213 23.1213C22.5587 23.6839 21.7956 24 21 24ZM25.5 11.25H16.5C15.1081 11.2515 13.7736 11.8051 12.7893 12.7893C11.8051 13.7736 11.2515 15.1081 11.25 16.5V25.5C11.2515 26.8919 11.8051 28.2264 12.7893 29.2107C13.7736 30.1949 15.1081 30.7485 16.5 30.75H25.5C26.8919 30.7485 28.2264 30.1949 29.2107 29.2107C30.1949 28.2264 30.7485 26.8919 30.75 25.5V16.5C30.7485 15.1081 30.1949 13.7736 29.2107 12.7893C28.2264 11.8051 26.8919 11.2515 25.5 11.25ZM29.25 25.5C29.25 26.4946 28.8549 27.4484 28.1516 28.1516C27.4484 28.8549 26.4946 29.25 25.5 29.25H16.5C15.5054 29.25 14.5516 28.8549 13.8483 28.1516C13.1451 27.4484 12.75 26.4946 12.75 25.5V16.5C12.75 15.5054 13.1451 14.5516 13.8483 13.8483C14.5516 13.1451 15.5054 12.75 16.5 12.75H25.5C26.4946 12.75 27.4484 13.1451 28.1516 13.8483C28.8549 14.5516 29.25 15.5054 29.25 16.5V25.5ZM27 16.125C27 16.3475 26.934 16.565 26.8104 16.75C26.6868 16.935 26.5111 17.0792 26.3055 17.1644C26.1 17.2495 25.8738 17.2718 25.6555 17.2284C25.4373 17.185 25.2368 17.0778 25.0795 16.9205C24.9222 16.7632 24.815 16.5627 24.7716 16.3445C24.7282 16.1262 24.7505 15.9 24.8356 15.6945C24.9208 15.4889 25.065 15.3132 25.25 15.1896C25.435 15.066 25.6525 15 25.875 15C26.1734 15 26.4595 15.1185 26.6705 15.3295C26.8815 15.5405 27 15.8266 27 16.125Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="p-3 text-white rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="42"
                        viewBox="0 0 42 42"
                        fill="none"
                      >
                        <rect width="42" height="42" rx="21" fill="#1079E0" />
                        <path
                          d="M29.25 11.25H12.75C12.3522 11.25 11.9706 11.408 11.6893 11.6893C11.408 11.9706 11.25 12.3522 11.25 12.75V29.25C11.25 29.6478 11.408 30.0294 11.6893 30.3107C11.9706 30.592 12.3522 30.75 12.75 30.75H29.25C29.6478 30.75 30.0294 30.592 30.3107 30.3107C30.592 30.0294 30.75 29.6478 30.75 29.25V12.75C30.75 12.3522 30.592 11.9706 30.3107 11.6893C30.0294 11.408 29.6478 11.25 29.25 11.25ZM29.25 29.25H12.75V12.75H29.25V29.25ZM18 19.5V25.5C18 25.6989 17.921 25.8897 17.7803 26.0303C17.6397 26.171 17.4489 26.25 17.25 26.25C17.0511 26.25 16.8603 26.171 16.7197 26.0303C16.579 25.8897 16.5 25.6989 16.5 25.5V19.5C16.5 19.3011 16.579 19.1103 16.7197 18.9697C16.8603 18.829 17.0511 18.75 17.25 18.75C17.4489 18.75 17.6397 18.829 17.7803 18.9697C17.921 19.1103 18 19.3011 18 19.5ZM26.25 22.125V25.5C26.25 25.6989 26.171 25.8897 26.0303 26.0303C25.8897 26.171 25.6989 26.25 25.5 26.25C25.3011 26.25 25.1103 26.171 24.9697 26.0303C24.829 25.8897 24.75 25.6989 24.75 25.5V22.125C24.75 21.6277 24.5525 21.1508 24.2008 20.7992C23.8492 20.4475 23.3723 20.25 22.875 20.25C22.3777 20.25 21.9008 20.4475 21.5492 20.7992C21.1975 21.1508 21 21.6277 21 22.125V25.5C21 25.6989 20.921 25.8897 20.7803 26.0303C20.6397 26.171 20.4489 26.25 20.25 26.25C20.0511 26.25 19.8603 26.171 19.7197 26.0303C19.579 25.8897 19.5 25.6989 19.5 25.5V19.5C19.5009 19.3163 19.5693 19.1393 19.692 19.0026C19.8148 18.866 19.9834 18.7791 20.166 18.7585C20.3485 18.7379 20.5323 18.7851 20.6824 18.891C20.8325 18.9969 20.9385 19.1542 20.9803 19.3331C21.4877 18.9889 22.0792 18.7895 22.6914 18.7561C23.3036 18.7228 23.9133 18.8568 24.455 19.1438C24.9968 19.4308 25.4501 19.86 25.7664 20.3852C26.0826 20.9105 26.2498 21.5119 26.25 22.125ZM18.375 16.875C18.375 17.0975 18.309 17.315 18.1854 17.5C18.0618 17.685 17.8861 17.8292 17.6805 17.9144C17.475 17.9995 17.2488 18.0218 17.0305 17.9784C16.8123 17.935 16.6118 17.8278 16.4545 17.6705C16.2972 17.5132 16.19 17.3127 16.1466 17.0945C16.1032 16.8762 16.1255 16.65 16.2106 16.4445C16.2958 16.2389 16.44 16.0632 16.625 15.9396C16.81 15.816 17.0275 15.75 17.25 15.75C17.5484 15.75 17.8345 15.8685 18.0455 16.0795C18.2565 16.2905 18.375 16.5766 18.375 16.875Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                    <a href="#" className="p-3 text-white rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="42"
                        viewBox="0 0 42 42"
                        fill="none"
                      >
                        <rect width="42" height="42" rx="21" fill="#1079E0" />
                        <path
                          d="M29.1311 28.8478L23.2623 19.6247L29.0532 13.2544C29.1842 13.1067 29.2517 12.9134 29.2411 12.7164C29.2305 12.5193 29.1427 12.3343 28.9966 12.2016C28.8505 12.0689 28.6581 11.9991 28.4609 12.0073C28.2637 12.0155 28.0777 12.1012 27.9432 12.2456L22.427 18.3131L18.631 12.3478C18.5634 12.2413 18.4699 12.1535 18.3593 12.0927C18.2486 12.0319 18.1245 12 17.9982 12H13.4982C13.3638 11.9999 13.2317 12.036 13.116 12.1045C13.0003 12.173 12.9051 12.2713 12.8404 12.3892C12.7757 12.5071 12.7439 12.6402 12.7483 12.7746C12.7527 12.909 12.7931 13.0397 12.8654 13.1531L18.7342 22.3753L12.9432 28.7503C12.8756 28.823 12.8231 28.9083 12.7887 29.0014C12.7543 29.0945 12.7387 29.1935 12.7428 29.2927C12.747 29.3918 12.7708 29.4892 12.8128 29.5791C12.8549 29.669 12.9143 29.7496 12.9878 29.8164C13.0612 29.8831 13.1472 29.9346 13.2407 29.9679C13.3342 30.0012 13.4334 30.0156 13.5325 30.0103C13.6316 30.0049 13.7286 29.98 13.818 29.9369C13.9074 29.8937 13.9874 29.8333 14.0532 29.7591L19.5695 23.6916L23.3654 29.6569C23.4337 29.7625 23.5274 29.8494 23.638 29.9093C23.7486 29.9693 23.8724 30.0005 23.9982 30H28.4982C28.6326 30 28.7644 29.9638 28.88 29.8954C28.9956 29.827 29.0907 29.7288 29.1554 29.611C29.22 29.4933 29.2519 29.3604 29.2476 29.2261C29.2433 29.0918 29.2031 28.9612 29.1311 28.8478ZM24.4098 28.5L14.8642 13.5H17.5829L27.1323 28.5H24.4098Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                <div>
                  <iframe
                    className="w-full h-48"
                    src="https://maps.google.com/maps?q=1007%20Lexington%20Ave,%20Mansfield%20OH%2044907&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1">Name <span className="text-[#D60101]">*</span></label>
                    <input
                      type="text"
                      value={data?.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      placeholder="Enter Your Name"
                      className="w-full p-3 border rounded-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error.name && <p className="text-sm text-red-500">{error.name}</p>}
                  </div>

                  <div>
                    <label className="block mb-1">
                      Subject <span className="text-[#D60101]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Write Subject"
                      value={data?.subject}
                      onChange={(e) => setData({ ...data, subject: e.target.value })}
                      className="w-full p-3 border rounded-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error.subject && <p className="text-sm text-red-500">{error.subject}</p>}
                  </div>

                  <div>
                    <label className="block mb-1">Email <span className="text-[#D60101]">*</span></label>
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      value={data?.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      className="w-full p-3 border rounded-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error.email && <p className="text-sm text-red-500">{error.email}</p>}
                  </div>

                  <div>
                    <label className="block mb-1">
                      Message <span className="text-[#D60101]">*</span>
                    </label>
                    <textarea
                      placeholder="Write Message..."
                      className="w-full p-3 border rounded-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      value={data?.message}
                      onChange={(e) => setData({ ...data, message: e.target.value })}
                    ></textarea>
                    {error.message && <p className="text-sm text-red-500">{error.message}</p>}
                  </div>

                  <button onClick={handleDone} className="w-full bg-[#1079E0] text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default ContactUs;
