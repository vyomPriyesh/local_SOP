import Navbar from "../../Components/TopHeader/NavBar";
import TopHeader from "../../Components/TopHeader/TopHeader";
import Footer from "../../Components/Footer/Footer";
import { useEffect, useState } from "react";
import { apiRequestGet } from "../../Common/Common";
import { API_URLS } from "../../Apis/api";
import { Link } from "react-router";
const { AuthApi, DropdownApi } = API_URLS;
import { IoSearchOutline } from "react-icons/io5";
import MainSidebar from "../../Components/Sidebar/MainSidebar";

export default function UseFulLinks() {
  const [states, setStates] = useState([]);
  const [filteredState, setFilteredState] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("states", states);

  useEffect(() => {
    fetchStates();
  },[]);

  const fetchStates = async () => {
    try {
      const response = await apiRequestGet(DropdownApi.usefulState);
      if (response && response.data.result) {
        const stateNames = response.data.result.map((state) => ({
          name: state.state_name,
          id: state.state_id,
        }));
        // console.log(stateNames)
        setStates(stateNames);
        setFilteredState(stateNames)
        // console.log("response.data.result.name",response.data.result)
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = states.filter((state) =>
      state.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredState(filtered);
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

            <div
              className="relative bg-[white] shadow-[0px_0px_24px_0px_#00000014] border border-gray-200 flex items-center space-between w-full rounded-lg px-4 "
              style={{
                height: "50px",
                maxWidth: "400px"
              }}
            >
              <input
                type="text"
                placeholder="Search by State"
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
              {filteredState.map((state, index) => (
                <Link to={`${state.id}`}>
                  <div
                    key={index}
                    className="border rounded-[15px] p-4 text-start shadow-sm bg-white"
                  >
                    <div className="border-none p-2 rounded-[8px] bg-[#F7FBFE]">
                      {state.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
