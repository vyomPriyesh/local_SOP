import { RiPagesFill } from "react-icons/ri";
import { PiStarFill } from "react-icons/pi";
import { FaUserTie, FaBriefcase, FaBuilding } from "react-icons/fa";

const MainSidebar = () => {
  return (
    <div className="2xl:w-[372px]  xl:w-[330px] w-[300px]  bg-white border rounded-2xl  h-full px-5 pt-5">
      <div className="p-4">
        <div className="bg-[#e9f4fd] p-4 py-7 rounded-[24px] flex items-center gap-3">
          <div className="bg-[#1079E01F] w-[62px] h-[62px] flex items-center justify-center rounded-full">
            <RiPagesFill className="text-[#1079E0] text-[32px]" />
          </div>
          <div>
            <p className="font-semibold text-[32px] leading-[48px]">100+</p>
            <p className="text-gray-600 text-[16px]">Listed Professionals</p>
          </div>
        </div>

        <div className="bg-[#e8fde8] p-4 py-5 rounded-[24px] flex items-center gap-3 mt-3">
          <div className="bg-[#33BA331F] w-[62px] h-[62px] flex items-center justify-center rounded-full">
            <PiStarFill className="text-[#33BA33] text-[32px]" />
          </div>
          <div>
            <p className="font-semibold text-[24px] leading-[48px]">500+</p>
            <p className="text-gray-600 text-[16px] ">Good rated companies</p>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-[rgba(16,121,224,0.4)]">
        {[
          { name: "Find a Professional", icon: <FaUserTie /> },
          { name: "Find a Job", icon: <FaBriefcase /> },
          { name: "Top Companies", icon: <FaBuilding /> },
        ].map((link, index) => (
          <p
            key={index}
            className="flex items-center py-3 cursor-pointer text-[20px]"
          >
            <span className="mr-4 bg-[#8F95A326] p-[5px] text-[#737B8C] rounded-[5px] text-[22px]">
              {link.icon}
            </span>
            {link.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MainSidebar;
