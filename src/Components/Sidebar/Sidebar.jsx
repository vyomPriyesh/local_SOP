import { Navigate, useNavigate } from "react-router";
import { useMyContext } from "../../Context/Context";

const Sidebar = () => {
    const { selectside, setSelectside } = useMyContext();
const navigate = useNavigate();
    const handleSelect = (item) => {
      setSelectside((prev) => {
        if (prev.includes(item)) {
          // Remove item if already selected
          return prev.filter((i) => i !== item);
        } else {
          // Add item if not selected
          return [...prev, item];
        }
      });
      navigate("/Listing")
    };
  return (
    <div className="bg-[#ECECEC] w-[50px] flex flex-col  items-center py-4">
      <div className="flex flex-col gap-6 justify-between">
        {[
          "Title Abstractor",
          "Title Company",
          "Real Estate Agent",
          "Real Estate Attorney",
        ].map((item, index) => (
          <div
            key={index}
            className={`flex justify-center items-center text-[18px] lg:text-[13px] font-normal text-right
          border border-gray-400 w-[40px] min-h-[90px] rounded-[50px] px-[8px] py-[20px] border-[1.5px]
          whitespace-normal break-words rotate-180 cursor-pointer
          transition-all duration-[500ms] ease-in-out ${
            selectside.includes(item)
              ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
              : "hover:bg-[var(--primary-color)] hover:text-white hover:border-[var(--primary-color)]"
          }`}
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            onClick={() => handleSelect(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
