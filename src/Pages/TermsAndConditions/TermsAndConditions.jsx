import Navbar from "../../Components/TopHeader/NavBar";
import TopHeader from "../../Components/TopHeader/TopHeader";
import Footer from "../../Components/Footer/Footer";
import MainSidebar from "../../Components/Sidebar/MainSidebar";

export default function TermsAndConditions() {

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
              Terms and Conditions
              </h1>
            </div>
          </div>        
        </div>

        <Footer />
      </div>
    </div>
  );
}
