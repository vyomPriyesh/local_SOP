import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { PiBuildings } from "react-icons/pi";
import { useNavigate } from "react-router";

const TitleAbstractorCard = ({
  cover_image,
  company_logo,

  business_name,
  business_address,
  business_type,
  tags,
  ListingDetail,
  TypeOfService,
  image,
  short_bio,
  id
 
}) => {
  const navigate = useNavigate();
  const license = ListingDetail?.[0]?.licenses === 1 || ListingDetail?.[0]?.e_o_insurance === 1;

  const imgUrl = import.meta.env.VITE_IMAGE_BASEURL;


  return (
    <div
    className="w-full group bg-white rounded-2xl overflow-hidden border border-gray-200 cursor-pointer
    relative hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-100
    after:content-[''] after:absolute after:inset-0 after:rounded-2xl 
    after:bg-transparent after:shadow-[inset_0px_10px_30px_rgba(0,0,0,0.1)] after:pointer-events-none hover:border-gray-300"  
     
    >
      <div className="relative"  onClick={() => navigate(`/ListingDetails?ListingDetails=${id}`)}  >
        {/* Background Image */}
        <img
          src={cover_image == null ? " " :`${imgUrl}${cover_image}`}
          alt="Office Background"
          className="h-[100px] w-full object-cover grayscale transition-all duration-600 group-hover:grayscale-0 contrast-125"
        />

        {/* Title Badge */}
        <div
          className="absolute top-[80px] sm:top-[105px] right-0 bg-[var(--primary-color)] text-white text-[10px] sm:text-[14px]
         font-semibold px-3 py-[5px] rounded-l-lg shadow-md"
         style={{
          backgroundColor:
            business_type === "Title Abstractor"
              ? "#1079E0"
              : business_type === "Title Company"
              ? "#33BA33"
              : business_type === "Real Estate Agent"
              ? "#F76C5E"
              : business_type === "Real Estate Attorney"
              ? "#1E3A5F"
              : business_type === "Appraisal Company"
              ? "#E8A317"
              : "#6A0572",
         }}
        >
          {business_type}
        </div>

        {/* Logo */}
        <div className="absolute top-[0px] left-7 bg-white p-3 shadow-xl rounded-b-lg">
          {/* Red Strip */}
          <div className="absolute top-0 left-0 w-full h-[20px] bg-[#959595]  group-hover:bg-[var(--primary-color)] transition-all duration-100"
            style={{
              "--primary-color":
              business_type === "Title Abstractor"
              ? "#1079E0"
              : business_type === "Title Company"
              ? "#33BA33"
              : business_type === "Real Estate Agent"
              ? "#F76C5E"
              : business_type === "Real Estate Attorney"
              ? "#1E3A5F"
              : business_type === "Appraisal Company"
              ? "#E8A317"
              : "#6A0572",
            }}
          ></div>

          <div className="mt-[30px] md:mt-[20px] mb-[10px] relative">
            <img
             // src={company_logo ? `http://13.200.147.62/listing/${company_logo}` : ""}
             src={
              ["Title Abstractor", "Title Company", "Real Estate Agent"].includes(business_type)
                ? company_logo
                  ? `${imgUrl}${company_logo}`
                  : ""
                : image
                  ? `${imgUrl}${image}`
                  : ""
              }
              alt="Company Logo"
              className="xl:w-[140px] md:h-[70px] md:w-[140px] h-[60px] w-[110px] sm:h-14  rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="p-[15px] pb-[10px] sm:mt-4 pl-[20px] ">
        <div className="lg:flex justify-between align-center items-center"  onClick={() => navigate(`/ListingDetails?ListingDetails=${id}`)}  >
          <div>
            <div className="flex gap-2">
            <div className="flex gap-2">
            {!["Title Abstractor", "Title Company", "Real Estate Agent"].includes(business_type) && (
              <img
              src={company_logo ? `${imgUrl}${company_logo}` : ''}
              alt="Company Logo"
              className="2xl:w-[90px] 2xl:h-[48px] xl:w-[70px] md:h-[30px] md:w-[50px] h-[20px] w-[20px] sm:h-10  rounded-lg"
            />
            )}
            
              <h2 className="text-[20px] 2xl:text-[32px] max-[1440px]:text-[22px] max-[1024px]:text-[24px] font-bold">
              {business_name.length > 20 ? business_name.slice(0, 20) + "..." : business_name}
            </h2>
            </div>
            <div>
            {license ? (
              <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.5 24C43.5 25.665 41.46 27 41.04 28.575C40.62 30.15 41.7 32.37 40.89 33.75C40.08 35.13 37.62 35.325 36.48 36.48C35.34 37.635 35.16 40.08 33.75 40.89C32.34 41.7 30.15 40.62 28.575 41.04C27 41.46 25.665 43.5 24 43.5C22.335 43.5 21 41.46 19.5 41.04C18 40.62 15.705 41.7 14.325 40.89C12.945 40.08 12.75 37.62 11.595 36.48C10.44 35.34 7.995 35.16 7.185 33.75C6.375 32.34 7.455 30.15 7.035 28.575C6.615 27 4.5 25.665 4.5 24C4.5 22.335 6.54 21 6.96 19.5C7.38 18 6.3 15.705 7.11 14.325C7.92 12.945 10.38 12.675 11.52 11.52C12.66 10.365 12.84 7.92 14.25 7.11C15.66 6.3 17.85 7.38 19.425 6.96C21 6.54 22.335 4.5 24 4.5C25.665 4.5 27 6.54 28.575 6.96C30.15 7.38 32.37 6.3 33.75 7.11C35.13 7.92 35.325 10.38 36.48 11.52C37.635 12.66 40.08 12.84 40.89 14.25C41.7 15.66 40.62 17.85 41.04 19.425C41.46 21 43.5 22.335 43.5 24Z" fill="#109138"/>
                <path d="M24 36.75C31.0416 36.75 36.75 31.0416 36.75 24C36.75 16.9584 31.0416 11.25 24 11.25C16.9584 11.25 11.25 16.9584 11.25 24C11.25 31.0416 16.9584 36.75 24 36.75Z" fill="#20BF55"/>
                <path d="M22.6893 27.5538C22.5415 27.5545 22.3951 27.5256 22.2585 27.469C22.122 27.4123 21.9982 27.3289 21.8943 27.2238L18.3993 23.7888C18.1886 23.5778 18.0703 23.2919 18.0703 22.9938C18.0703 22.6956 18.1886 22.4097 18.3993 22.1988C18.6103 21.9881 18.8962 21.8697 19.1943 21.8697C19.4924 21.8697 19.7784 21.9881 19.9893 22.1988L22.6893 24.8688L27.9993 19.6338C28.2122 19.4229 28.5 19.3052 28.7996 19.3067C29.0992 19.3081 29.386 19.4284 29.5968 19.6413C29.8077 19.8541 29.9253 20.142 29.9239 20.4416C29.9225 20.7411 29.8022 21.0279 29.5893 21.2388L23.4693 27.2388C23.368 27.3422 23.2465 27.4236 23.1122 27.4778C22.978 27.532 22.834 27.5579 22.6893 27.5538Z" fill="#EDEBEA"/>
              </svg>
            ) : ''}
            </div>
            </div>
            <p className="text-blue-600 text-[10px] text-[12px] 2xl:text-[18px] max-[1440px]:text-[12px]  flex items-center">
              <PiBuildings className="me-1" /> {business_address.length > 30 ? business_address.slice(0, 30) + "..." : business_address}
            </p>
          </div>
          <button 
            className="h-[32px] px-[10px] ms-auto text-[12px] 2xl:h-[45px] max-[1440px]:h-[30px] text-[var(--primary-color)] sm:px-[20px] border border-[var(--primary-color)]
           rounded-lg shadow flex items-center justify-center "
          >
            Contact <HiOutlineMail className="ms-2" />
          </button>
        </div>

        <p className="text-gray-600 mt-1 text-[12px]"  onClick={() => navigate(`/ListingDetails?ListingDetails=${id}`)}  >
          {/* {ListingDetail[0].description} */}
          {short_bio?.length > 100 ? short_bio?.slice(0, 100) + "..." : short_bio}
        </p>

        <div className="mt-1 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div className="flex gap-2 flex-row overflow-x-auto scroll">
            {TypeOfService?.map((tag, index) => (
              <span
                key={index}
                className="bg-[#e8f3fc] text-[var(--primary-color)] text-[12px] sm:text-[12px] text-nowrap px-2 py-1"
              >
                {tag.name}
              </span>
            ))}
          </div>
          {/* <div className="mt-2 sm:mt-0 flex justify-start sm:justify-between items-center">
            <span className="text-gray-500 text-[12px] 2xl:text-md font-medium">
              Avg. response time{" "}
              <span className="text-green-600 2xl:ms-1  group-hover:text-[var(--primary-color)]">
              {ListingDetail.length > 0 && ListingDetail[0].ave_time ? ListingDetail[0].ave_time : "1 h"}
              </span>
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TitleAbstractorCard;
