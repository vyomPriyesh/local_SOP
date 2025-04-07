import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useMyContext } from "../../Context/Context";
import { useNavigate } from "react-router";

const SearchBox = () => {
  const navigate = useNavigate(); 
  const placeholderTexts = [
    'Search "Professionals"',
    'Search "Experts"',
    'Search "Freelancers"',
    'Search "Developers"',
    'Search "Designers"',
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { search, setSearch } = useMyContext();
  useEffect(() => {
    if (isTyping || search) return; 
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
        setAnimate(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [isTyping,search]); // Dependency array me isTyping add kiya hai
  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/Listing`); // Navigate to listing page with query params
    }
  };
  const handleSearch1 = () => {
      navigate(`/Listing`); // Navigate to listing page with query params

  };
  return (
    <div className="flex  px-0 lg:pe-0 xl:pe-0">
      {/* Outer Shadow on Parent Div */}
      <div
        className="relative bg-[#e9eaf0] rounded-[15px]
        shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
        border border-gray-200 flex items-center space-between w-full max-w-[677px] md:max-w-[600px] xl:max-w-[650px] px-4 sm:px-6 md:px-7 md:pe-3 "
        style={{
          height: "60px",
          borderRadius: "40px",
        }}
      >
        {/* Search Box */}
        <input
          type="text"
          placeholder={placeholderTexts[placeholderIndex]}
          className={`w-full bg-transparent outline-none border-none placeholder-[#606060] text-[#606060] font-[Poppins] font-normal text-[16px] sm:text-[18px] leading-[26px] tracking-[0%] transition-all duration-500 ${
            animate ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsTyping(e.target.value.length > 0);
          }}
          value={search}
          onKeyDown={handleSearch}
        />
        {/* Search Icon */}
        <button onClick={handleSearch1}
          className="bg-[var(--primary-color)]  text-white w-[40px] sm:w-[40px] h-[40px] sm:h-[40px] p-2 sm:p-3 flex 
         shadow-[3px_3px_6px_0px_rgba(0,0,0,0.2),-3px_-3px_6px_0px_rgba(255,255,255,0.9)]  
          items-center justify-center rounded-full "
        >
          <IoSearchOutline size={20} sm:size={22} />
        </button>
      </div>
    </div>
  );
};

const SearchBox1 = ({onClick}) => {
  const placeholderTexts = [
    'Search "Professionals"',
    'Search "Experts"',
    'Search "Freelancers"',
    'Search "Developers"',
    'Search "Designers"',
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { search, setSearch } = useMyContext();
  useEffect(() => {
    if (isTyping || search) return; 
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
        setAnimate(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [isTyping,search]); // Dependency array me isTyping add kiya hai

  return (
    <div className="flex justify-center px-0 lg:pe-2 xl:pe-0">
      {/* Outer Shadow on Parent Div */}
      <div
        className="relativ bg-[white] shadow-[0px_0px_24px_0px_#00000014]
        border border-gray-200 flex items-center space-between w-full rounded-lg ps-2 pe-1"
        style={{
          height: "40px",
         
        }}
      >
        {/* Search Box */}
        <input
          type="text"
          placeholder={placeholderTexts[placeholderIndex]}
          className={`w-[300px] bg-transparent outline-none border-none placeholder-[#606060] text-[#606060] font-[Poppins] font-normal text-[16px] 2xl:text-[18px] max-[1440px]:text-[16px] leading-[26px] tracking-[0%] transition-all duration-500  ${
            animate ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsTyping(e.target.value.length > 0);
            setSearch(e.target.value);
          }}
          value={search}
        />
        {/* Search Icon */}
        <button onClick={onClick}
          className="bg-[var(--primary-color)]  text-white w-[32px] sm:w-[32px] h-[32px] sm:h-[32px] p-2 flex 
          shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,1)] 
          items-center justify-center rounded-md shadow-md"
        >
          <IoSearchOutline size={20} sm:size={22} />
        </button>
      </div>
    </div>
  );
};


// const SearchBox1 = () => {
//   const placeholderTexts = [
//     'Search "Professionals"',
//     'Search "Experts"',
//     'Search "Freelancers"',
//     'Search "Developers"',
//     'Search "Designers"',
//   ];

//   const [placeholderIndex, setPlaceholderIndex] = useState(0);
//   const [animate, setAnimate] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [inputValue, setInputValue] = useState("");

//   useEffect(() => {
//     if (isTyping) return; // Agar typing ho rahi hai to animation trigger na ho

//     const interval = setInterval(() => {
//       setAnimate(true);
//       setTimeout(() => {
//         setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
//         setAnimate(false);
//       }, 500);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [isTyping]); // Dependency array me isTyping add kiya hai

//   return (
//     <div className="flex justify-center px-0 lg:pe-4 xl:pe-0">
//       <div
//         className="relative bg-[white] shadow-[0px_0px_24px_0px_#00000014]
//         border border-gray-200 flex items-center space-between w-full rounded-lg px-4 "
//         style={{ height: "50px" }}
//       >
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => {
//             setInputValue(e.target.value);
//             setIsTyping(e.target.value.length > 0);
//           }}
//           placeholder={placeholderTexts[placeholderIndex]}
//           className={`w-full bg-transparent outline-none border-none placeholder-[#606060] text-[#606060] font-[Poppins] font-normal text-[16px] 2xl:text-[18px] max-[1440px]:text-[16px] leading-[26px] tracking-[0%] transition-all duration-500 me-[100px] lg:me-[30px] xl:me-[100px] md:me-[150px] 2xl:me-[200px] ${
//             animate && !isTyping ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
//           }`}
//         />
//         <button
//           className="bg-[#1079E0] hover:bg-blue-700 text-white w-[32px] sm:w-[38px] h-[32px] sm:h-[38px] p-2 flex 
//           shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,1)] 
//           items-center justify-center rounded-md shadow-md"
//         >
//           <IoSearchOutline size={20} sm:size={22} />
//         </button>
//       </div>
//     </div>
//   );
// };

export { SearchBox, SearchBox1 }; // Ensure both components are exported

