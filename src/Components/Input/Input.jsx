import React, { useEffect, useRef, useState } from "react";
import { TbCloudUpload } from "react-icons/tb";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { PiImageFill } from "react-icons/pi";
import { IoIosRefresh } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";

const NormalInputField = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full h-14 p-4 text-lg text-[#222] rounded-[15px] 
               border border-[rgba(108,108,108,0.15)] 
               focus:border-black focus:border-2 focus:outline-none
               placeholder:text-[#999] focus:placeholder:text-[#555] 

               max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:text-sm max-[1440px]:rounded-[10px] 
               max-[1440px]:placeholder:text-xs"
    />
  );
};

const InputField = ({ type, placeholder, value, onChange, disabled }) => {
  const [showPassword, setShowPassword] = useState("");
  return (
    <div className="relative w-full">
      <input
        type={type === "password" && showPassword ? "text" : type} 
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-14 p-4 text-lg text-[#222] bg-[#e9eaf0] rounded-[15px] outline-none 
                   shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
                   focus:border-[#6c63ff] placeholder:text-[#999] focus:placeholder:text-[#555] 

                   max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:text-sm max-[1440px]:rounded-[10px] 
                   max-[1440px]:placeholder:text-xs
                   [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                   appearance-none"
      />
      
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
        >
          {showPassword ? <FaEye size={20}/>  : <FaEyeLowVision size={20}/> }
        </button>
      )}
    </div>
  );
};

const InputField2 = ({ type, placeholder, value, onChange, disabled }) => {
  return (
    <div className="relative w-full">
      {/* <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">$</span> */}

      <input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-14 p-4 pl-10 text-lg text-[#222] bg-[#e9eaf0] rounded-[15px] outline-none 
                 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
                 focus:border-[#6c63ff] placeholder:text-[#999] focus:placeholder:text-[#555] 
                 max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:text-sm max-[1440px]:rounded-[10px] 
                 max-[1440px]:placeholder:text-xs
                 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                 appearance-none"
      />
    </div>

  )
}
const CheckBoxButton = ({ checked, onChange, value }) => {
  return (
    <input
      type="checkbox"
      className="appearance-none w-6 h-6 rounded-md border-2 border-white
    bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
    checked:bg-[var(--primary-color)] checked:border-white
    checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
    relative transition-all duration-200 ease-in-out 
    checked:before:content-[''] 
    checked:before:absolute checked:before:w-[4px] checked:before:h-[8px] 
    checked:before:border-white checked:before:border-[1.7px] checked:before:border-t-0 
    checked:before:border-l-0 checked:before:left-[8px] checked:before:top-[5px] 
    checked:before:rotate-[45deg]"
      checked={checked}
      onChange={onChange}
      value={value}
    />
  );
};

const OTPInputField = ({ type, placeholder }) => {
  const handleInputChange = (e) => {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    }
  };

  const handleKeyDown = (e) => {
    if (
      !/^[0-9]$/.test(e.key) &&
      !["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-10 h-10 text-center text-sm text-[#222] bg-[#e9eaf0] rounded-[15px] outline-none 
                shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
                focus:border-[#6c63ff] placeholder:text-[#999] focus:placeholder:text-[#555] 
                 min-[1025px]:w-14  min-[1025px]:h-14 min-[1025px]:text-lg min-[1025px]:placeholder:text-lg 
            "
      maxLength={1}
      min="0"
      max="9"
      onInput={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
};

const CustomInput = ({ placeholder, onGetOtp, value, onChange }) => {
  const handleClick = (e) => {
    e.preventDefault(); // Form submit hone se rokne ke liye
    if (onGetOtp) {
      onGetOtp();
    }
  };

  const handleInput = (e) => {
    e.target.value = e.target.value.replace(/\s/g, "").toLowerCase(); // Yeh spaces hata dega
  };

  return (
    <div className="relative w-full">
      <input
        type="email"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={60}
        onInput={handleInput}
        className="w-full h-14 p-2 text-lg text-[#222] bg-[#e9eaf0] rounded-[15px] outline-none 
             shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
             focus:border-[#6c63ff] placeholder:text-[#999] focus:placeholder:text-[#555] 
  
             max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:text-sm max-[1440px]:rounded-[10px] 
             max-[1440px]:placeholder:text-xs"
      />
      {value.length > 0 &&
        <button
          onClick={handleClick}
          type="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[var(--primary-color)]
       shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)]
       text-white px-4 py-1 rounded-lg shadow-md text-[14px] 
  
       max-[1440px]:px-3 max-[1440px]:py-0.5 max-[1440px]:text-xs max-[1440px]:rounded-md"
        >
          Get OTP
        </button>
      }
    </div>
  );
};

const CustomInput1 = ({ placeholder, value, onChange, onGetVerify }) => {
  const handleClick = (e) => {
    e.preventDefault(); // Form submit hone se rokne ke liye
    if (onGetVerify) {
      onGetVerify();
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="number"
        value={value}
        onChange={onChange}
        maxLength={6}
        placeholder={placeholder}
        className="w-full h-14 p-4 text-lg text-[#222] bg-[#e9eaf0] rounded-[15px] outline-none 
             shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
             focus:border-[#6c63ff] placeholder:text-[#999] focus:placeholder:text-[#555]
              max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:text-sm max-[1440px]:rounded-[10px] 
             max-[1440px]:placeholder:text-xs"
      />
      <button
        type="button"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[var(--primary-color)]
       shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)]
       text-white px-4 py-1 rounded-lg shadow-md  text-[14px]
        max-[1440px]:px-3 max-[1440px]:py-0.5 max-[1440px]:text-xs max-[1440px]:rounded-md"
        onClick={handleClick}
      >
        Verify OTP
      </button>
    </div>
  );
};

const CustomInput2 = ({ placeholder, value, onGetOtp, onChange, setAgain }) => {

  const [count, setCount] = useState(30);
  const [otp, setOtp] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Clean up timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startCountdown = () => {
    setOtp(true);
    setCount(30);

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setCount(prevCount => {
        if (prevCount <= 1) {
          clearInterval(timerRef.current);
          setOtp(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const handleClick = () => {
    if (onGetOtp) {
      onGetOtp();
      startCountdown();
    }
  };

  useEffect(() => {
    startCountdown()
  }, [])

  // console.log("phonenumeber", placeholder);
  return (
    <div className="relative w-full">
      <input
        // readOnly
        type="tel"
        disabled={otp}
        // inputMode="tel"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className="w-full h-14 p-4 text-lg text-[#222] bg-[#e9eaf0] rounded-[15px] outline-none 
             shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
             focus:border-[#6c63ff] placeholder:text-[#999] focus:placeholder:text-[#555]
              max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:text-sm max-[1440px]:rounded-[10px] 
            max-[1440px]:placeholder:text-xs"
      />
      <div className="absolute flex flex-row gap-4 w-fit  right-4 top-1/2 transform -translate-y-1/2">
        {otp ? (
          <>
            <button className="text-lg" onClick={() => setAgain(false)}><IoIosRefresh /></button>
            <button
              disabled
              className=" bg-[#919191]
       shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)]
       text-white px-4 py-1 rounded-lg  text-[14px]
        max-[1440px]:px-3 max-[1440px]:py-0.5 max-[1440px]:text-xs max-[1440px]:rounded-md"
            >
              RESEND {count}s
            </button>
          </>
        ) : (
          <button
            onClick={handleClick}
            type="button"
            className=" bg-[var(--primary-color)]
       shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)]
       text-white px-4 py-1 rounded-lg  text-[14px] 
       max-[1440px]:px-3 max-[1440px]:py-0.5 max-[1440px]:text-xs max-[1440px]:rounded-md"
          >
            RESEND
          </button>
        )}
      </div>
    </div>
  );
};
const CustomInput3 = ({ placeholder, value }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        readOnly
        className="w-full h-14 p-4 text-lg text-[#222] bg-[#e9eaf0] rounded-[15px] outline-none 
             shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
             focus:border-[#6c63ff] placeholder:text-[#999] focus:placeholder:text-[#555]
              max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:text-sm max-[1440px]:rounded-[10px] 
            max-[1440px]:placeholder:text-xs"
      />
      <button
        type="button"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 
       
       text-[#5c5b5b] px-4 py-1 rounded-lg  text-[14px]
        max-[1440px]:px-3 max-[1440px]:py-0.5 max-[1440px]:text-xs max-[1440px]:rounded-md"
      >
        <RiVerifiedBadgeFill size={25} className="text-[#109138]" />
      </button>
    </div>
  );
};

const CustomPhoneInput = ({ placeholder, onGetOtp, value, onChange }) => {
  const handlePhoneChange = (phone, country) => {
    if (!country || !country.dialCode) return;

    onChange(phone, country);
  };
  const handleClick = (e) => {
    e.preventDefault(); // Form submit hone se rokne ke liye
    if (onGetOtp) {
      onGetOtp();
    }
  };
  return (
    <div className="relative w-full">
      <div
        className="flex items-center bg-[#e9eaf0] rounded-[15px] max-[1440px]:p-[12px] min-[1441px]:p-[10px] w-full 
        shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
        max-[1440px]:rounded-[10px] max-[1440px]:text-sm"
      >
        <PhoneInput
          country={"us"}
          value={value}
          onChange={(phone, country) => handlePhoneChange(phone, country)}
          inputClass="!bg-transparent !text-[#222] !outline-none !border-none !text-lg max-[1440px]:!text-xs !important max-[1440px]:!h-[12px] !!important"
          buttonClass="!bg-transparent !border-none"
          containerClass="max-[1440px]:!text-xs"
          dropdownClass="max-[1440px]:!text-xs"
          placeholder={placeholder}
          countryCodeEditable={false}
          onlyCountries={["us", "ph", "in"]}
          enableSearch={true}
        // enableAreaCodes={true}
        // // disableCountryGuess={true}
        // disableDropdown={false}
        />
      </div>
      {value.length > 0 &&
        <button
          onClick={handleClick}
          type="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[var(--primary-color)]
        shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)]
        text-white px-4 py-1 rounded-lg shadow-md text-[14px] 
        
        max-[1440px]:px-3 max-[1440px]:py-0.5 max-[1440px]:text-xs max-[1440px]:rounded-md"
        >
          Get OTP
        </button>
      }
    </div>
  );
};


const CustomPhoneInput1 = ({ placeholder, value, onGetOtp, onChange, setAgain }) => {
  const [countt, setCountt] = useState(30);
  const [otp2, setOtp2] = useState(false);
  const timerRef = useRef(null);

  const handlePhoneChange = (phone, country) => {
    if (!country || !country.dialCode) return;
    onChange(phone, country);
  };

  useEffect(() => {
    // Clean up timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startCountdown = () => {
    setOtp2(true);
    setCountt(30);

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setCountt(prevCount => {
        if (prevCount <= 1) {
          clearInterval(timerRef.current);
          setOtp2(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const handleClick2 = () => {
    if (onGetOtp) {
      onGetOtp();
      startCountdown();
    }
  };

  useEffect(() => {
    startCountdown()
  }, [])

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-[#e9eaf0] rounded-[15px] max-[1440px]:p-[12px] min-[1441px]:p-[10px] w-full 
      shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
       max-[1440px]:rounded-[10px] max-[1440px]:text-sm">
        <PhoneInput
          country={"us"}
          value={value}
          disabled={otp2}
          onChange={(phone, country) => handlePhoneChange(phone, country)}
          inputClass="!bg-transparent !text-[#222] !outline-none !border-none !text-lg max-[1440px]:!text-xs !important max-[1440px]:!h-[12px] !!important"
          buttonClass="!bg-transparent !border-none"
          containerClass="max-[1440px]:!text-xs"
          dropdownClass="max-[1440px]:!text-xs"
          placeholder={placeholder}
          enableSearch={true}
        />
      </div>
      <div className="absolute flex flex-row gap-4 w-fit  right-4 top-1/2 transform -translate-y-1/2">
        {otp2 ? (
          <>
            <button className="text-lg" onClick={() => setAgain(false)}><IoIosRefresh /></button>
            <button
              disabled
              className=" bg-[#919191]
       shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)]
       text-white px-4 py-1 rounded-lg  text-[14px]
        max-[1440px]:px-3 max-[1440px]:py-0.5 max-[1440px]:text-xs max-[1440px]:rounded-md"
            >
              RESEND {countt}s
            </button>
          </>
        ) : (
          <button
            onClick={handleClick2}
            type="button"
            className=" bg-[var(--primary-color)]
       shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)]
       text-white px-4 py-1 rounded-lg  text-[14px] 
       max-[1440px]:px-3 max-[1440px]:py-0.5 max-[1440px]:text-xs max-[1440px]:rounded-md"
          >
            RESEND
          </button>
        )}
      </div>
    </div>
  );
};

const CustomPhoneInput3 = ({ placeholder, value }) => {


  return (
    <div className="relative w-full">
      <div
        className="flex items-center bg-[#e9eaf0] rounded-[15px] max-[1440px]:p-[12px] min-[1441px]:p-[10px] w-full 
      shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
      
       max-[1440px]:rounded-[10px] max-[1440px]:text-sm"
      >
        <PhoneInput
          country={"us"}
          value={value}
          inputClass="!bg-transparent !text-[#222] !outline-none !border-none !text-lg max-[1440px]:!text-xs !important max-[1440px]:!h-[12px] !!important"
          buttonClass="!bg-transparent !border-none"
          containerClass="max-[1440px]:!text-xs"
          dropdownClass="max-[1440px]:!text-xs"
          placeholder={placeholder}
          enableSearch={true}
          disabled
        />
      </div>
      <button
        type="button"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 
       
       text-[#5c5b5b] px-4 py-1 rounded-lg  text-[14px]
        max-[1440px]:px-3 max-[1440px]:py-0.5 max-[1440px]:text-xs max-[1440px]:rounded-md"
      >
        <RiVerifiedBadgeFill size={25} className="text-[#109138]" />
      </button>
    </div>
  );
};
const InputField1 = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      max={9}
      min={0}
      className="w-full h-14 p-4 text-lg text-[#222] bg-[#e9eaf0] rounded-[15px] outline-none 
      shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
      focus:border-[#6c63ff] placeholder:text-[#999] focus:placeholder:text-[#555] 

      max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:text-sm max-[1440px]:rounded-[10px] 
      max-[1440px]:placeholder:text-xs"
    />
  );
};
const PasswordInput = ({ label, placeholder }) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <div className="w-full">
      <label className="block text-[#222] font-medium mb-2 text-[14px] min-[1025px]:text-[18px]">
        {label} <span className="text-[#D60101]">*</span>
      </label>
      <div className="relative">
        <input
          type={showPassword ? "password" : "text"}
          placeholder={placeholder}
          className="w-full h-14 p-4 text-lg text-[#222] bg-[#e9eaf0] rounded-[15px] outline-none 
               shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
               focus:border-[#6c63ff] placeholder:text-[#999] focus:placeholder:text-[#555] 

               max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:text-sm max-[1440px]:rounded-[10px] 
               max-[1440px]:placeholder:text-xs"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[22px] h-[22px] bg-[#e9eaf0] 
                     rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)] 
                     flex items-center justify-center text-[var(--primary-color)]"
        >
          {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      </div>
    </div>
  );
};
const FileUpload = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (
      file &&
      (file.type === "application/vnd.ms-excel" ||
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      setFileName(file.name);
      onFileSelect(file); // Parent ko file name bhejna
    } else {
      alert("Only Excel files (.xls, .xlsx) are allowed!");
    }
  };
  return (
    <label
      className="relative w-full h-14 p-4 pr-10 text-lg bg-[#e9eaf0] 
        rounded-[15px] outline-none shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)]
        focus:border-[#6c63ff] cursor-pointer flex items-center justify-between max-[1440px]:text-xs max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:rounded-[10px]"
    >
      <input type="file" className="hidden" onChange={handleFileChange} />
      <span className="text-gray-500 text-lg max-[1440px]:text-xs">
        {fileName || "Upload the spreadsheet"}
      </span>
      <TbCloudUpload
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[24px] h-[24px] bg-[#e9eaf0] rounded-full 
          shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8),4px_4px_6px_rgba(19,40,109,0.15)] 
          flex items-center justify-center transition-transform duration-200 text-[var(--primary-color)] p-1"
      />
    </label>
  );
};

const FileUploadImage = ({ onFileSelect, selectedFile }) => {
  const [file, setFile] = useState(selectedFile || null);
  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      onFileSelect(uploadedFile);
    }
  };

  return (
    <div className="w-full mx-auto">
      <div
        className="relative flex flex-col items-center bg-[#e9eaf0] justify-center border-gray-300 
        rounded-[15px] p-6 cursor-pointer w-full outline-none shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)]"
      >
        <PiImageFill className="text-gray-400 text-4xl mb-2" />
        {file ? (
          <p className="text-gray-700">{file.name}</p>
        ) : (
          <p className="text-gray-500 text-lg max-[1440px]:text-xs text-center">
            Drag and Drop here JPEG, JPG Or PNGs Only
          </p>
        )}
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/jpg"
        />
        <button
          type="button" // Form submit hone se rokne ke liye
          className="mt-3 bg-[var(--primary-color)] text-white px-6 py-2 text-lg max-[1440px]:text-xs rounded-md shadow 
          transition"
          onClick={(e) => {
            e.preventDefault();
            fileInputRef.current.click();
          }}
        >
          Browse
        </button>
      </div>
    </div>
  );
};

const CustomRadioButton = ({ label, value, selectedValue, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        className="appearance-none w-6 h-6 rounded-md border-2 border-white
         bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
         checked:bg-[var(--primary-color)] checked:border-white
         checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
         relative transition-all duration-200 ease-in-out 
         checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
         checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
         checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
        checked={selectedValue === value}
        onChange={() => onChange(value)}
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

const CustomTextArea = ({ placeholder, value, onChange, onKeyDown, tags = [], removeTag }) => {
  return (
    <div className="w-full h-30 p-3 rounded-[15px] bg-[#E5E6EB] text-gray-800 
                shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)]">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-400 px-3 py-1 rounded-full text-sm text-white flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-1 focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <textarea
        className="w-full bg-[#E5E6EB] text-gray-800 border-0 outline-0"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        rows="1"
      />
    </div>
  );
};


const CheckBoxGroup = ({ label, options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (value) => {
    const updatedSelection = selectedOptions.includes(value)
      ? selectedOptions.filter((item) => item !== value)
      : [...selectedOptions, value];

    setSelectedOptions(updatedSelection);
    if (onChange) {
      onChange(updatedSelection); // Parent ko selected values bhejna
    }
  };

  return (
    <div>
      <label className="text-gray-800 block mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center my-1 space-x-4 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => handleChange(option)}
              className="appearance-none w-6 h-6 rounded-md border-2 border-white
         bg-[#E5E6EB] shadow-[1px_1px_3px_0px_rgba(0,0,0,0.2),-1px_-1px_3px_0px_rgba(255,255,255,0.8)]
         checked:bg-blue-500 checked:border-white
         checked:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.3),-4px_-4px_8px_0px_rgba(255,255,255,1)] 
         relative transition-all duration-200 ease-in-out 
         checked:before:content-['✓'] checked:before:absolute checked:before:text-white 
         checked:before:text-[12px] checked:before:font-bold checked:before:left-1/2 
         checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
export {
  NormalInputField,
  InputField,
  OTPInputField,
  CustomInput,
  CustomInput1,
  CustomInput2,
  CustomInput3,
  CustomPhoneInput, CustomPhoneInput1, CustomPhoneInput3,
  InputField1,
  PasswordInput,
  FileUpload,
  FileUploadImage,
  CustomRadioButton,
  CheckBoxButton,
  CustomTextArea,
  CheckBoxGroup,
  InputField2
};
