import Navbar from "../../Components/TopHeader/NavBar";
import TopHeader from "../../Components/TopHeader/TopHeader";
import Footer from "../../Components/Footer/Footer";
import { useEffect, useState } from "react";
import { apiRequestGet } from "../../Common/Common";
import { API_URLS } from "../../Apis/api";
import { Link, useParams } from "react-router";
const { AuthApi, DropdownApi } = API_URLS;
import { IoSearchOutline } from "react-icons/io5";
import { IoUnlink } from "react-icons/io5";
import { IoUnlinkSharp } from "react-icons/io5";
import { IoUnlinkOutline } from "react-icons/io5";
import MainSidebar from "../../Components/Sidebar/MainSidebar";

export default function UseFulLinks() {
  const [country, setCountry] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { id } = useParams();


  console.log("id", id);
  console.log("country", country);

  useEffect(() => {
    if (id) {
      fetchCountry(id);
    }
  }, [id]);

  const fetchCountry = async (id) => {
    console.log("12w3ergfbn", id);

    try {
      const response = await apiRequestGet(DropdownApi.getUsefulCounite(id));
      if (response && response.data.result) {
        const stateNames = response.data.result.map((state) => ({
          name: state.city.name,
          id: state.id,
          url: state.url
        }));

        console.log("aaaa",response.data.result.url)
        setCountry(stateNames);
        setFilteredCountry(stateNames);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = country.filter((state) =>
      state.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountry(filtered);
  };

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
                UseFul Links
              </h1>
            </div>

            {/* Search Box */}
            <div
              className="relative bg-[white] shadow-[0px_0px_24px_0px_#00000014] border border-gray-200 flex items-center space-between w-full rounded-lg px-4 "
              style={{
                height: "50px",
                maxWidth: "400px"
              }}
            >
              <input
                type="text"
                placeholder="Search by Counite"
                className="w-full bg-transparent outline-none border-none placeholder-[#606060] text-[#606060] font-[Poppins] font-normal text-[16px] 2xl:text-[18px] max-[1440px]:text-[16px] leading-[26px]"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button
                className="bg-[var(--primary-color)]  text-white w-[32px] sm:w-[38px] h-[32px] sm:h-[38px] p-2  flex 
                      shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,1)] 
                      items-center justify-center rounded-md shadow-md"
              >
                <IoSearchOutline size={20} sm:size={22} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
              {filteredCountry.map((state, index) => (
                <div
                  key={index}
                  className="border rounded-[15px] p-4 text-start shadow-sm bg-white"
                >
                  <div className="border-none p-2 rounded-[8px] bg-[#F7FBFE] flex justify-between">
                    {state.name}
                    <a href={`${state.url}`} target="_blank">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.70329 12.7656C9.99601 13.2905 10.4082 13.7391 10.9065 14.0751C11.4049 14.4111 11.9753 14.625 12.5717 14.6995C13.168 14.7741 13.7736 14.7072 14.3393 14.5042C14.905 14.3012 15.4149 13.9678 15.8278 13.5311L18.8901 10.4689C19.6008 9.75822 20 8.79438 20 7.78937C20 6.78437 19.6008 5.82053 18.8901 5.10988C18.1795 4.39924 17.2156 4 16.2106 4C15.2056 4 14.2418 4.39924 13.5311 5.10988L12 6.64102M14.2967 11.2344C14.004 10.7095 13.5918 10.2609 13.0935 9.92492C12.5951 9.58893 12.0247 9.375 11.4283 9.30046C10.832 9.22591 10.2264 9.29284 9.66072 9.49583C9.09502 9.69882 8.58508 10.0322 8.17216 10.4689L5.10988 13.5311C4.39924 14.2418 4 15.2056 4 16.2106C4 17.2156 4.39924 18.1795 5.10988 18.8901C5.82053 19.6008 6.78437 20 7.78937 20C8.79438 20 9.75822 19.6008 10.4689 18.8901L12 17.359"
                          stroke="#020C16"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
