import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/TopHeader/NavBar";
import TopHeader from "../../Components/TopHeader/TopHeader";
import homeimage from "../../Images/Homeback.png";
import home1 from "../../Images/home.png";
import { IoSearch } from "react-icons/io5";
import { SearchBox } from "../../Components/SearchBar/SearchBar";
import { MdArrowForwardIos } from "react-icons/md";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMyContext } from "../../Context/Context";

const News  = [
  {
    id: 1,
    title: "The Trump White House shut out the AP. They keep showing up anyway.",
    link: "https://www.msn.com/en-us/news/politics/ar-AA1BCVkY",
  },
  {
    id: 2,
    title: "Amid Political Creator Boom, Megyn Kelly Launches Podcast Network",
    link: "https://www.hollywoodreporter.com/business/digital/megyn-kelly-launches-mk-media-podcast-network-1236171445/",
  },
  {
    id: 3,
    title: "AI-assisted reporting in Boston-area newsrooms raises questions about role of new technology in building a community",
    link: "https://www.boston.com/news/local-news/2025/03/25/ai-assisted-reporting-in-boston-area-newsrooms-raises-questions-about-role-of-new-technology-in-building-a-community/",
  },
  {
    id: 4,
    title: "Nightmare Mickey Mouse horror trailer unleashes terror on .....",
    link: "https://www.dailystar.co.uk/showbiz/nightmare-mickey-mouse-horror-trailer-34928125",
  }
]


const titles = [
  {
    text: "Title Abstractors,",
    gradient: "linear-gradient(to right, #0C5FB0, #3292F0)",
  },
  {
    text: "Title Appraisers,",
    gradient: "linear-gradient(to right, #248424, #33BA33)",
  },
  {
    text: "Attorneys,",
    gradient: "linear-gradient(to right, #0C5FB0, #3292F0)",
  },
  {
    text: "Notaries,",
    gradient: "linear-gradient(to right, #248424, #33BA33)",
  },
  {
    text: "Signing Agents,",
    gradient: "linear-gradient(to right, #0C5FB0, #3292F0)",
  },
];
const HomePage = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen">
      {/* Navbar (Always on Top) */}
      <div className="hidden lg:block sticky top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* TopHeader (For Smaller Screens) */}
      <div className="block lg:hidden sticky top-0 left-0 w-full z-40">
        <TopHeader />
      </div>

      <div className="relative flex flex-col md:flex-row ">
        {/* Sidebar */}
        <div className="hidden md:block h-auto">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div
          className="relative flex-1 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${homeimage})`,
            backgroundPosition: "bottom",
          }}
        >
          <div className=" grid grid-cols-1 lg:grid-cols-2 md:gap-1 place-items-center 2xl:px-3 xl:px-3 md:px-5 px-10">
            {/* Left Section (Text + Search) */}
            <div className="flex flex-col place-items-start  px-20 w-full ">
              <h1 className="text-[32px] sm:text-[50px] text-start md:text-[60px] lg:text-[45px] xl:text-[60px] 2xl:text-[80px] font-bold leading-tight tracking-[0%] text-black font-[Poppins]">
                Find
              </h1>
              <AnimatePresence mode="wait">
                <motion.h1
                  key={index}
                  initial={{ opacity: 0, y: 50, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -50, filter: "blur(2px)" }} // Blur effect on exit
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-[32px] sm:text-[50px] md:text-[60px] lg:text-[45px] xl:text-[60px] 2xl:text-[60px] font-bold leading-tight tracking-[0%] font-[Poppins] bg-clip-text text-transparent"
                  style={{
                    backgroundImage: titles[index].gradient,
                  }}
                >
                  {titles[index].text}
                </motion.h1>
              </AnimatePresence>

              {/* Search Bar */}
              <div className="mt-[32px] md:mt-[64px] lg:mt-[50px] w-full">
                <SearchBox />
              </div>
            </div>

            {/* Right Section (Jobs + News) */}
            <div className="p-4 bg-[#F7FBFE] mt-6 mb-[20px] rounded-2xl w-full  h-auto  lg:me-2 xl:me-3  2xl:mx-0 shadow-[0px_0px_40px_0px_#001E6C1A] ">
              <div className="p-4 border-b border-gray-300">
                <h2 className="text-[20px] sm:text-[24px] md:text-[24px] 2xl:text-[34px] font-semibold border-l-[6px] border-[#1079E0] pl-3">
                  Jobs For You
                </h2>
                <div className="flex justify-center mt-2">
                  <img
                    src={home1}
                    alt="Steps"
                    className="w-full max-w-[258px]"
                  />
                </div>
                {/* <p className="text-[32px] text-center text-[var(--primary-color)] font-semibold pb-[5px]">
                  Exciting Opportunities Await!
                </p>
                <p className="text-[16px] text-center pb-[20px] text-[#6C6C6C] ">
                  Launching soon be the first to know.
                </p> */}
              </div>

              <div className="p-4">
                <div className="pt-4 mb-4">
                  <h2 className="text-[20px] sm:text-[24px] md:text-[24px] xl:text-[24px] 2xl:text-[34px] font-semibold border-l-[6px] border-[#1079E0] pl-3">
                    News For You
                  </h2>
                </div>
                <ul className=" text-md font-medium text-[14px] mt-4 sm:text-[16px] md:text-[18px]  lg:text-[12px] 2xl:text-[16px]">
                  {News.map((text, index) => (
                    <li
                      key={index}
                      className="group border-b border-gray-200 py-[14px] relative  flex items-center justify-between transition-all duration-200 ease-in-out 
                 hover:border-l-[6px] hover:border-l-black hover:bg-white hover:ps-4 cursor-pointer"
                    >
                      <a href={`${text.link}`} target="_blank" className="line-clamp-1">
                        {text.title}
                      </a>

                      {/* Hidden Icon, Visible on Hover */}
                      <MdArrowForwardIos className="text-gray-500 text-lg opacity-0 translate-x-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 me-3 xl:me-2 2xl:me-2" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
