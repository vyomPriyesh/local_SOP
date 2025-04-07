import React, { useEffect, useState } from "react";
import { FaUserTie, FaBriefcase, FaBuilding } from "react-icons/fa";
import { PiStarFill } from "react-icons/pi";
import { MdArrowDropDown } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
import { useLocation } from "react-router";
import { IoIosSearch } from "react-icons/io"; // Import search icon
import {  apiRequestGet } from "../../Common/Common";
import { API_URLS } from "../../Apis/api";
import { useMyContext } from "../../Context/Context";
const { AuthApi, DropdownApi } = API_URLS;
const AccordionItem = ({ title, children, isOpen, onClick, searchTerm, onSearchChange }) => {
  return (
    <div className="border-b border-b-[1px] border-[rgba(16,121,224,0.4)]  ">
        <button
          className={`w-full flex justify-between items-center py-4 font-semibold text-[13px] ${
            isOpen ? "pb-0" : ""
          }`}
          onClick={onClick}
        >
        {title}
        <MdArrowDropDown
          className={`transition-transform ${
            isOpen ? "rotate-180" : ""
          } text-[var(--primary-color)] text-[20px]`}
        />
      </button>
      {isOpen && (
        <div className="p-1 pt-0" style={{
          maxHeight: "285px",
          overflow: "auto",
        }}>
          {/* Show search bar if the title is "State" or "Counite" */}
          {["State", "Counite"].includes(title) && (
            <div className="relative mb-3 t-2" style={{
              position: "sticky",
              top: "0",
              zIndex: "1",
              background: "white",
            }}>
              <input
                type="text"
                placeholder={`Search ${title}`}
                className="w-full p-2 px-3 border rounded-lg pr-10 text-[12px] placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <IoIosSearch className="absolute text-[24px]  right-3 top-1/2 transform -translate-y-1/2 text-[var(--primary-color)]" />
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  );
};

const SidebarAdmin = ( { onchange, count }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});
  const [states, setStates] = useState([]);
  const [countys, setCountys] = useState([]); 
  const [stateSearch, setStateSearch] = useState("");
  const [countySearch, setCountySearch] = useState("");
  const location = useLocation();
  const { selectside, setSelectside, state, setState, county, setCounty, sorts, setSorts} = useMyContext();

  //console.log("selectside",selectside)
  //console.log("state",state)
  //console.log("county",county)
  //console.log("sort",sorts)
    useEffect(() => {
      fetchStates();
    }, []);
  
    const fetchStates = async () => {
      try {
        const response = await apiRequestGet(DropdownApi.getCountryStateUrl(1));
        if (response && response.data.result) {
          const stateNames = response.data.result.map(state => ({ name: state.name, id: state.id }));
          // console.log(stateNames)
          setStates(stateNames); 
          // console.log("response.data.result.name",response.data.result)
        }
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    const fetchCountry = async (stateId) => {
      try {
        let Country = [];
        
        for(let id of stateId){
          const response = await apiRequestGet(DropdownApi.getCountryCityUrl(id));
        if (response && response.data.result) {
          const stateNames = response.data.result.map(state => ({ name: state.name }));
          Country = [...Country, ...stateNames]
          // console.log("response.data.result.name",response.data.result)
        }
        setCountys(Country);
        }  
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    }
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const isListingDetailsPage = location.pathname === "/ListingDetails";

  const filters = [
    {
      title: "Business Type",
      options: [
        { name: "Title Abstractor", count: 28 },
        { name: "Title Company", count: 50 },
        { name: "Real Estate Agent", count: 70 },
        { name: "Real Estate Attorney", count: 52 },
        { name: "Appraisal Company", count: 44 },
        { name: "Surveyor Company", count: 100 },
      ],
    },
    {
      title: "State",
      //options: states.filter((state) => state.name.toLowerCase().includes(stateSearch.toLowerCase()))
      options: states.filter((state) =>
        state.name.toLowerCase().includes(stateSearch.toLowerCase())
      ).length > 0
        ? states.filter((state) =>
          state.name.toLowerCase().includes(stateSearch.toLowerCase())
        )
        : [{ name: "Data not found", isPlaceholder: true }],
    },
    {
      title: "Counite",
      //options: countys.filter((county) => county.name.toLowerCase().includes(countySearch.toLowerCase()))
      options: countys.filter((county) => 
        county.name.toLowerCase().includes(countySearch.toLowerCase())
      ).length > 0 
        ? countys.filter((county) => 
          county.name.toLowerCase().includes(countySearch.toLowerCase())
        )
        : [{ name: "Data not found", isPlaceholder: true }]
    },
    {
      title: "Sort By",
      options: [
        { name: "Relevance"},
        { name: "Distance"},
        { name: "Newly Listed"},
        { name: "Turnaround Time" },
      ],
    },
  ];
  // console.log("selectside",selectside)

  const handleCheckboxChange = (sectionTitle, optionName) => {
    setCheckedItems((prev) => {
      const updatedCheckedItems = {
        ...prev,
        [`${sectionTitle}_${optionName}`]: !prev[`${sectionTitle}_${optionName}`],
      };
  
      let updatedFilters = { ...filters };
  
      if (sectionTitle === "Business Type") {
        console.log("business_type");
        const selectedFilters = Object.keys(updatedCheckedItems)
          .filter((key) => updatedCheckedItems[key] && key.startsWith("Business Type_"))
          .map((key) => key.split("_")[1]);
  
        setSelectside(selectedFilters);
        updatedFilters.business_type = selectedFilters.length > 0 ? selectedFilters : null;
      } 
  
      if (sectionTitle === "State") {
        console.log("state");
    
        // Get all selected state names from the checkbox selection
        const selectedStates = Object.keys(updatedCheckedItems)
          .filter((key) => updatedCheckedItems[key] && key.startsWith("State_"))
          .map((key) => key.split("_")[1]); // Extract state name
    
        console.log("Selected State Names:", selectedStates);
    
        // Find corresponding state IDs from `states`
        const selectedStateIds = states
          .filter((state) => selectedStates.includes(state.name)) // Keep only matching states
          .map((state) => state.id); // Extract their IDs
    
        console.log("Selected State IDs:", selectedStateIds);
    
        // Pass all selected state IDs to fetchCountry
        if (selectedStateIds.length > 0) {
          fetchCountry(selectedStateIds); // Fix: Pass full array, not .id
        }
    
        setState(selectedStates);
        updatedFilters.state = selectedStates.length > 0 ? selectedStates : null;
    }
    
      if (sectionTitle === "Counite") {
        console.log("county");
        const selectedCounties = Object.keys(updatedCheckedItems)
          .filter((key) => updatedCheckedItems[key] && key.startsWith("Counite_"))
          .map((key) => key.split("_")[1]);

        setCounty(selectedCounties)
        updatedFilters.county = selectedCounties.length > 0 ? selectedCounties : null;
      }

      if (sectionTitle === "Sort By") {
        Object.keys(updatedCheckedItems).forEach((key) => {
          if (key.startsWith("Sort By_")) {
            updatedCheckedItems[key] = false;
          }
        });
  
        updatedCheckedItems[`${sectionTitle}_${optionName}`] = true;
        const sortIndex = filters.find((f) => f.title === "Sort By").options.findIndex((opt) => opt.name === optionName) + 1;
        setSorts(sortIndex);
        updatedFilters.sort = sortIndex; 
      }

      // onchange(updatedFilters)
      return updatedCheckedItems;
    });
  };

  useEffect(() => {
    onchange(filters)
  },[checkedItems])
  
  return (
    <div className="2xl:w-[372px]  xl:w-[250px] w-[300px]  bg-white  h-full px-5">
      {!isListingDetailsPage ? (
        <>
          <div className="pb-4 pt-6 border-b border-[rgba(16,121,224,0.4)]">
            <h2 className="font-semibold text-[24px] max-[1440px]:text-[16px] max-[1024px]:text-[16px]">
              Filters
            </h2>
          </div>
          {filters.map((section, sectionIndex) => (
            <AccordionItem
              key={sectionIndex}
              title={section.title}
              isOpen={activeIndex === sectionIndex}
              onClick={() => toggleAccordion(sectionIndex)}
              searchTerm={section.title === "State" ? stateSearch : countySearch}
              onSearchChange={section.title === "State" ? setStateSearch : setCountySearch}
            >
               {section.options.map((option) => {
              // console.log("Option Name:", option.name);
              // console.log("Selectside Values:", selectside);

              // Ensure `selectside` is an array
              const selectedArray = Array.isArray(selectside) ? selectside : (selectside ? selectside.split(",") : []);

              // Trim & lowercase to avoid mismatch
              const isPreChecked =
                section.title === "Business Type" &&
                selectedArray.some(item => item.trim().toLowerCase() === option.name.trim().toLowerCase());

              console.log("Match Found?", isPreChecked);

              const isChecked = checkedItems[`${section.title}_${option.name}`] ?? isPreChecked;
            return (
              <div
                key={option.name}
                className="flex justify-between items-center text-[14px] max-[1440px]:text-[12px] text-[#6C6C6C] mt-1"
              >
                <label className="flex items-center w-full justify-between">
                  <div className="flex items-center">
                    {/* Controlled Checkbox */}
                    <input
                      type={section.title === "Sort By" ? "radio" : "checkbox"}
                      name={section.title === "Sort By" ? "radiobutton" : undefined}
                      className="mr-2 w-5 h-5 appearance-none border-2 border-gray-400 rounded-md
                              checked:bg-blue-500 checked:border-blue-500 relative 
                              checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
                              checked:before:text-[10px] checked:before:font-bold checked:before:left-1/2 
                              checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                              onChange={() => handleCheckboxChange(section.title, option.name)}
                              checked={isChecked}  // ✅ Ensure the checkbox remains checked correctly
                              disabled={option.isPlaceholder}
                    />
                   
                    <span>{option.name}</span>
                  </div>

                  {/* ✅ JavaScript se class change hoga */}
                  {option.count && (<span
                    className={`bg-[#F3F3F3] text-[#7F879E]  font-medium px-2 py-1 rounded-lg text-[16px] max-[1440px]:text-[14px]
                            ${isChecked ? "bg-[#ecf6ff] text-[var(--primary-color)]" : ""}`}
                  >
                    {/* {option.count} */}
                    {count?.find(list => list.business_type === option.name)?.count ?? 0}
                  </span>)}
                  
                </label>
              </div>
            );
          })}
            </AccordionItem>
          ))}

          {/* <div className="py-4">
            <button className="w-full bg-[var(--primary-color)] text-white p-2 rounded-lg text-[13px]" onClick={() => onchange(filters)}>
              Apply Filter
            </button>
          </div> */}
        </>
      ) : (
        ""
      )}

      <div className="pb-4">
        <div className="bg-[#e9f4fd] p-2 py-3 rounded-[24px] flex items-center gap-3">
          <div className="bg-[#1079E01F] w-[42px] h-[42px] flex items-center justify-center rounded-full">
            <RiPagesFill className="text-[#1079E0] text-[18px]" />
          </div>
          <div>
            <p className="font-semibold text-[22px] leading-[48px]">100+</p>
            <p className="text-gray-600 text-[12px]">Listed Professionals</p>
          </div>
        </div>

        <div className="bg-[#e8fde8] p-2 py-3 rounded-[24px] flex items-center gap-3 mt-3">
          <div className="bg-[#33BA331F] w-[42px] h-[42px] flex items-center justify-center rounded-full">
            <PiStarFill className="text-[#33BA33] text-[18px]" />
          </div>
          <div>
            <p className="font-semibold text-[22px] leading-[48px]">500+</p>
            <p className="text-gray-600 text-[12px]">Good rated companies</p>
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
            className="flex items-center py-3 cursor-pointer text-[13px]"
          >
            <span className="mr-4 bg-[#8F95A326] p-[5px] text-[#737B8C] rounded-[5px] text-[16px]">
              {link.icon}
            </span>
            {link.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SidebarAdmin;
