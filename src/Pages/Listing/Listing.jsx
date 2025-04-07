import React, { useEffect, useState } from "react";
import Navbar from "../../Components/TopHeader/NavBar";
import TopHeader from "../../Components/TopHeader/TopHeader";
import SidebarAdmin from "../../Components/SideBarAdmin/SidebarListing";
import TitleAbstractorCard from "../../Components/TitleAbstractorCard/TitleAbstractorCard";
import Footer from "../../Components/Footer/Footer";
import {
  CustomModal,
  CustomModal1,
  ListFirm,
  ModalsContainer,
} from "../../Components/Model/CustomModal";
import { SearchBox1 } from "../../Components/SearchBar/SearchBar";
import Model1 from "../../Images/model_listing1-removebg-preview.png";
import TitleAbstractorList from "../../Components/TitleAbstractorCard/TitleAbstractorList";
import { apiRequestPost, apiRequestGet } from "../../Common/Common";
import { API_URLS } from "../../Apis/api";
import { useMyContext } from "../../Context/Context";
import { showToast } from "../../Common/toastService";
import { list } from "postcss";
const { AuthApi, DropdownApi,ListingApi } = API_URLS;




  export default function Listing() {
    const [showModal1, setShowModal1] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [data,setData] = useState([])
    const [count, setCount] = useState([])
    const [loading, setLoading] = useState(false);
 const { zipcode,search ,selectside,values,state,county,sorts} = useMyContext();

 useEffect(() => {
  handleModalClose();
}, []); // Add dependencies if needed

//console.log("count",count)

    const handleModalClose = async () => {
      console.log("selectside", selectside);
      
      const payload = {
        page: 1,
        search:search ? search : null,
        business_type:selectside.length  > 0? selectside : null,
        state:state.length > 0 ? state : null,
        county:county.length > 0 ? county : null,
        price:values,
        sort: sorts,
        pin_code:zipcode,
      };
      // API call on modal close
       try {
            const response = await apiRequestPost(ListingApi.Listing, payload, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            });
      
            if (response && response.success) {
              setData(response.data.result)
              setCount(response.data.businessTypeCounts)
              
              // localStorage.setItem("user", JSON.stringify(result));
              
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
      <div>
        <div className="h-screen flex flex-col bg-[#FAFAFA] mt-5">
          {/* Header */}
          <div className="hidden lg:block fixed top-0 left-0 w-full z-10">
            <Navbar />
          </div>

          <div className="block lg:hidden  fixed top-0 left-0 w-full  z-40">
            <TopHeader />
          </div>

          {/* Main Content with Sidebar */}
          <div className="flex flex-1 pt-[55px] container mx-auto">
            {/* Sidebar */}
            <div className="hidden md:block 2xl:w-[372px]  xl:w-[250px] w-[300px] h-full">
              <SidebarAdmin onchange={ handleModalClose} count = {count}/>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 py-3 px-5 pb-0 overflow-auto border-b bg-[#FAFAFA]">
              <div className=" sm:flex md:block lg:flex justify-between items-center mb-2 sm:mb-3">
                {" "}
                <h1 className="text-[20px] sm:text-[24px] md:text-[30px] 2xl:text-[42px] px-2 font-semibold " onClick={() => setShowModal1(true)}>
                  Listings
                </h1>
                <div className="flex md:justify-between lg:justify-normal 2xl:gap-4 xl:gap-2 gap-4">
                  <SearchBox1  onClick={handleModalClose}/>{" "}
                  <button
                    className=" text-white block md:hidden lg:block px-2 py-1 rounded-[10px] text-[12px] sm:text-[14px] sm:px-4 md:px-0 lg:px-5 2xl:px-4  hover:bg-blue-700"
                    style={{
                      backgroundColor: "var(--primary-color)", // Sirf text jitni width ke liye
                      // Jitna text hoga utni hi width hogi
                    }}
                    onClick={() => setShowModal(true)}
                  >
                    List Form
                  </button>
                  {showModal && <ListFirm onClose={() => setShowModal(false)} />}
                </div>
              </div>

              {/* Grid Layout for Cards */}

              <TitleAbstractorList  data={data} />
            </div>
          </div>
          {showModal1 && <ModalsContainer onClose={handleModalClose} /> }
          <Footer />
        </div>
      </div>
    );
  }
