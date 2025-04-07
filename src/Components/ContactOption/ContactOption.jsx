import { FiPhone, FiMail } from "react-icons/fi";

const ContactOption = ({
  method,
  phoneNumber,
  icon: Icon,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`flex items-center p-[12px] sm:p-[16px] bg-[#E9EAF0] rounded-xl shadow-md w-full border-2 ${
        isSelected ? "border-[#1079E0]" : "border-transparent"
      }`}
      style={{
        // box-shadow: 2px 2px 9px 0px #13286D1A;

        boxShadow: isSelected ? "2px 2px 9px 0px #13286D1A" : "none",
      }}
    >
      {/* Radio Button with Border */}
      <div className=" mr-3 bg-[#E9EAF0] w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] flex items-center justify-center">
        <input
          type="radio"
          className="h-[12px] w-[12px] sm:h-[18px] sm:w-[18px] cursor-pointer"
          checked={isSelected}
          onChange={onSelect}
        />
      </div>
      <div className="w-[1px] h-[32px] sm:h-[32px] bg-[#020C1626]"></div>

      <div className="flex items-center space-x-2 sm:space-x-3 w-full ps-2">
        {/* Dynamic Icon with Shadow */}
        <div
          className="bg-[#E9EAF0] me-4 w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] rounded-full flex items-center justify-center"
          style={{
            boxShadow: "3px 3px 6px 0px #00000033, 3px -4px 6px 0px #FFFFFFCC",
          }}
        >
          <Icon
            className={`w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] ${
              isSelected ? "text-[#1079E0]" : "text-[#6C6C6C]"
            }`}
          />{" "}
        </div>

        {/* Text Information */}
        <div className="flex flex-col space-y-1">
          <p
            className={`text-[14px] min-[1441px]:text-[18px] text-center sm:text-left ${
              isSelected ? "text-black" : "text-[#6C6C6C]"
            }`}
          >
            {method}
          </p>
          <p
            className={`text-[18px] min-[1441px]:text-[24px]  font-medium text-center sm:text-left ${
              isSelected ? "text-black" : "text-[#6C6C6C]"
            }`}
          >
            {phoneNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactOption;
