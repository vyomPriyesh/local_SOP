import React, { useEffect, useRef, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineUploadFile } from "react-icons/md";
import { PiCalendarDots } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router";
import { IoIosSearch } from "react-icons/io"; 

const Dropdown = ({ options, placeholder, onChange }) => {
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className={`relative w-full h-14 p-4 pr-10 text-lg bg-[#e9eaf0] 
        rounded-[15px] outline-none shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)]
        focus:border-[#6c63ff] cursor-pointer flex items-center justify-between 
        ${selected === "" ? "text-[#999]" : "text-[#222]"
          } max-[1440px]:text-xs max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:rounded-[10px]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected || placeholder}</span>

        {/* Dropdown Arrow Circle */}
        <div
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-[24px] h-[24px] bg-[#e9eaf0] rounded-full 
          shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)] 
          flex items-center justify-center transition-transform duration-200
          ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          {/* Arrow */}
          <div
            className="w-2 h-2 border-r-[2px] border-b-[2px] rotate-45"
            style={{ borderColor: "rgba(16, 121, 224, 1)" }}
          ></div>
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul
          className={`absolute w-full bg-[#e9eaf0] text-[#818181] shadow-md rounded-[10px] mt-2 z-10
         ${options.length > 4 ? "max-h-[200px] overflow-y-auto" : ""}`}
          style={
            options.length > 4
              ? {
                scrollbarWidth: "thin", // Firefox
                scrollbarColor: "rgba(0,0,0,0.3) transparent", // Firefox
              }
              : {}
          }
        >
          {options.map((option, index) => (
            <li
              key={index}
              className="p-3 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
                onChange(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
const Dropdown2 = ({ options, placeholder, onChange }) => {
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    onChange(option);
    setIsOpen(false); // Option select karte hi dropdown band ho jaye
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`relative w-full h-14 p-4 pr-10 text-lg bg-[#e9eaf0] 
        rounded-[15px] outline-none shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)]
        focus:border-[#6c63ff] cursor-pointer flex items-center justify-between  
        ${selected ? "text-[#222]" : "text-[#999]"} 
        max-[1440px]:text-xs max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:rounded-[10px]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected || placeholder}</span>

        {/* Dropdown Arrow Circle */}
        <div
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-[24px] h-[24px] bg-[#e9eaf0] rounded-full 
          shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)] 
          flex items-center justify-center transition-transform duration-200
          ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          {/* Arrow */}
          <div
            className="w-2 h-2 border-r-[2px] border-b-[2px] rotate-45"
            style={{ borderColor: "rgba(16, 121, 224, 1)" }}
          ></div>
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute text-sm 2xl:text-[18px] w-full bg-white text-[#020C16] shadow-md rounded-[15px] mt-2 z-10 max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={index}
              className={`p-3 2xl:p-4 cursor-pointer hover:bg-gray-200 flex items-center gap-2 border-b 
              ${index === 0 ? "rounded-t-[15px]" : ""} 
              ${index === options.length - 1 ? "rounded-b-[15px] border-b-0" : ""}`}
              onClick={() => handleSelect(option)}
            >
              <input
                type="radio"
                checked={selected === option}
                readOnly
                className="mr-2 2xl:w-5 2xl:h-5 w-4 h-4 appearance-none border-2 border-gray-400 rounded-md
                checked:bg-blue-500 checked:border-blue-500 relative 
                checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
                checked:before:text-[10px] checked:before:font-bold checked:before:left-1/2 
                checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
              />
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Dropdown1 = ({ options, placeholder, onChange }) => {
  const [selected, setSelected] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    if (option === "Select All") {
      if (selected.length === options.length - 1) {
        setSelected([]);
        onChange([]);
      } else {
        setSelected(options.filter((item) => item !== "Select All"));
        onChange(options.filter((item) => item !== "Select All"));
      }
    } else {
      let updatedSelection = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];

      setSelected(updatedSelection);
      onChange(updatedSelection);
    }
  };
  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Button */}
      <div
        className={`relative w-full h-full p-4 pr-10 text-lg bg-[#e9eaf0] 
        rounded-[15px] outline-none shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)]
        focus:border-[#6c63ff] cursor-pointer flex items-center justify-between  
        ${selected.length === 0 ? "text-[#999]" : "text-[#222]"}
        max-[1440px]:text-xs max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:rounded-[10px]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected.length > 0 ? selected.join(", ") : placeholder}</span>

        {/* Dropdown Arrow */}
        <div
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-[24px] h-[24px] bg-[#e9eaf0] rounded-full 
          shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)] 
          flex items-center justify-center transition-transform duration-200
          ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <div
            className="w-2 h-2 border-r-[2px] border-b-[2px] rotate-45"
            style={{ borderColor: "rgba(16, 121, 224, 1)" }}
          ></div>
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute text-sm 2xl:text-[18px] w-full bg-white text-[#020C16] shadow-md rounded-[15px] mt-2 z-10 max-h-60 overflow-y-auto">
          
          <div className="relative p-2 sticky top-0 z-10 bg-white mt-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 px-3 border rounded-lg pr-10 text-[16px] placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoIosSearch className="absolute text-[24px] right-3 top-1/2 transform -translate-y-1/2 text-[var(--primary-color)]" />
          </div>

          {options
            .filter(option => option.toLowerCase().includes(searchTerm.toLowerCase())) 
            .map((option, index) => (
              <li
                key={index}
                className={`p-3 2xl:p-4 cursor-pointer hover:bg-gray-200 flex items-center gap-2 border-b 
                  ${index === 0 ? "rounded-t-[15px]" : ""} 
                  ${index === options.length - 1 ? "rounded-b-[15px] border-b-0" : ""}`}
                onClick={() => handleSelect(option)}
              >
                <input
                  type="checkbox"
                  checked={
                    option === "Select All"
                      ? selected.length === options.length - 1
                      : selected.includes(option)
                  }
                  onChange={() => handleSelect(option)}
                  className="mr-2 2xl:w-5 2xl:h-5 w-4 h-4 appearance-none border-2 border-gray-400 rounded-md
                  checked:bg-blue-500 checked:border-blue-500 relative 
                  checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
                  checked:before:text-[10px] checked:before:font-bold checked:before:left-1/2 
                  checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                />
                {option}
              </li>
            ))
          }
        </ul>
      )}
    </div>
  );
};

const FileUploadEco = ({ onFileSelect, placeholder }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // if (file && file.type === "application/pdf") {
      setFileName(file.name);
      onFileSelect(file); // Parent ko file name bhejna
    // } else {
    //   alert("Only PDF files are allowed!");
    // }
  };

  return (
    <label className="relative w-full h-14 p-4 pr-10 text-lg bg-[#e9eaf0] 
        rounded-[15px] outline-none shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)]
        focus:border-[#6c63ff] cursor-pointer flex items-center justify-between max-[1440px]:text-xs max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:rounded-[10px]">
      <input type="file" className="hidden" onChange={handleFileChange} />
      <span className="text-gray-500 text-lg max-[1440px]:text-xs">
        {fileName || placeholder}
      </span>
      <MdOutlineUploadFile
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[24px] h-[24px] bg-[#e9eaf0] rounded-full 
          shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)] 
          flex items-center justify-center transition-transform duration-200 text-[var(--primary-color)] p-1"
      />
    </label>
  );
};

const DatePicker = ({ id, value, onChange }) => {


  return (
    <div className="relative w-full">
      <label
        className="relative w-full h-14 p-4 pr-10 text-lg bg-[#e9eaf0] 
        rounded-[15px] outline-none shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)]
        focus:border-[#6c63ff] cursor-pointer flex items-center justify-between max-[1440px]:text-xs max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:rounded-[10px]"
        //onClick={() => document.getElementById(id).showPicker()}
        onClick={(event) => {
          event.preventDefault();  // Ensure it's within user interaction
          document.getElementById(id).showPicker();
      }}
      
      >
        <input
          type="date"
          id={id}
          className="absolute top-[-10px] left-0 w-full opacity-0 h-10"
          value={value}
          onChange={onChange}
        />
        <span className="text-gray-500 text-lg max-[1440px]:text-xs">
          {value ? new Date(value).toLocaleDateString("en-US") : "MM-DD-YY"}
        </span>
        <PiCalendarDots className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[24px] h-[24px] bg-[#e9eaf0] rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)] flex items-center justify-center transition-transform duration-200 text-[var(--primary-color)] p-1" />
      </label>
    </div>
  );
};

const CheckboxList = () => {
  const [selected, setSelected] = useState([]);

  const options = [
    "ASAP / Today",
    "Within 2 Weeks",
    "Within a Month",
    "Just Researching for Now",
  ];

  const handleCheckboxChange = (option) => {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {options.map((option, index) => (
        <label key={index} className="flex items-center space-x-3 gap-3 cursor-pointer text-[#020C16] text-[18px]">
          <input
            type="checkbox"
            value={option}
            checked={selected.includes(option)}
            onChange={() => handleCheckboxChange(option)}
            className="appearance-none w-6 h-6 rounded-md border-2 border-white
         bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
         checked:bg-blue-500 checked:border-white
         checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
         relative transition-all duration-200 ease-in-out 
         checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
         checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
         checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
          />
          {option}
        </label>
      ))}
    </div>
  );
};

const ToolsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Dropdown Trigger */}
      <a
        href="#"
        className="hover:text-[var(--primary-color)] flex items-center gap-1 cursor-pointer"
        onClick={(e) => {
          e.preventDefault(); // Prevent page scroll when clicking
          setIsOpen(!isOpen);
        }}
      >
        Tools <IoMdArrowDropdown size={14} />
      </a>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-md">
          <li className="hover:bg-gray-100">
            <Link to="/use-ful-links" className="block px-4 py-2 text-black">
              Useful Links
            </Link>
          </li>
        </ul>

      )}
    </div>
  );
};

export default Dropdown;

export { Dropdown, Dropdown1, Dropdown2, FileUploadEco, DatePicker, CheckboxList, ToolsDropdown };
