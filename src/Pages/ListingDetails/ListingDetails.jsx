import React, { useEffect, useState } from "react";
import Navbar from "../../Components/TopHeader/NavBar";
import TopHeader from "../../Components/TopHeader/TopHeader";
import year from '../../assets/Experience.svg'
import ratingImg from '../../assets/Appointment.svg'
import county from '../../assets/county.svg'
import china from '../../assets/china.svg'
import russia from '../../assets/russia.svg'
import spain from '../../assets/spain.svg'
import islands from '../../assets/islands.svg'
import france from '../../assets/france.svg'
import Transaction from '../../assets/Transaction.svg'
import CustomerSatisfaction from '../../assets/CustomerSatisfaction.svg'
import Footer from "../../Components/Footer/Footer";
import { styled } from '@mui/material/styles';
import {
  FaBriefcase,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

import {
  ContactAgentModal,
  ParentComponent,
  StateCountiesShow,
} from "../../Components/Model/CustomModal";
// const BackgroundImage = new URL("../../Images/i.webp", import.meta.url).href;
import Profile from "../../Images/fcd540feb4463083a64ff0ff7a375a38.jpg";
// import listing_details_1 from "../../Images/listing_details_1.png";
// import listing_details_2 from "../../Images/listing_details_2.png";
import listing_eco from "../../Images/Screenshot 2025-03-06 170121.jpg";
import { TbPasswordUser, TbWorldWww } from "react-icons/tb";
import { FaSackDollar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { RiNewspaperLine, RiVerifiedBadgeFill } from "react-icons/ri";
import { AiOutlineFieldTime } from "react-icons/ai";
import { HiArrowLeft } from "react-icons/hi";
import { Navigate, useNavigate } from "react-router";

import { showToast } from "../../Common/toastService";
import { API_URLS } from "../../Apis/api";
import { apiRequestGet, apiRequestPost } from "../../Common/Common";
import TotalReviewsCard from "../../Components/Review/TotalReviewsCard";
import Averating from "../../Components/Review/Averating";
import { MdContentCopy, MdEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import * as yup from "yup";
import Title from "../../Utiles/Title";
import Detailsicondiv from "../../Utiles/Detailsicondiv";
import { Tooltip, tooltipClasses, Typography } from "@mui/material";

const { AuthApi, DropdownApi, ListingApi } = API_URLS;
const RatingBar = ({ rating, percentage, isHighlighted }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-black flex text-[16px]">
        <FaStar className="me-3 text-blue-500 "></FaStar> {rating}
      </span>
      <div className="w-full bg-gray-300 rounded-full h-[5px]">
        <div
          className={`h-[5px] rounded-full ${isHighlighted ? "bg-blue-500" : "bg-gray-300"
            }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const review_2 = yup.object().shape({
  review: yup.string().required("Review is required"),
});


export default function ListingDetails() {

  const [rating, setRating] = useState(0);
  const imgUrl = import.meta.env.VITE_IMAGE_BASEURL;
  const [expanded, setExpanded] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showHours, setShowHours] = useState(false);

  const [contact, setContact] = useState(null)
  const [reviewOpen, setReviewopen] = useState(false)

  const [status, setStatus] = useState("Checking...");
  const [workingHours, setWorkingHours] = useState(null);
  const [review, setReview] = useState("");
  const [data, setData] = useState([]);
  const [getdata, setgetData] = useState([]);
  const [permission, setPermission] = useState([])
  const ratings = [
    { rating: 5, percentage: 100, isHighlighted: true },
    { rating: 4, percentage: 0, isHighlighted: false },
    { rating: 3, percentage: 0, isHighlighted: false },
    { rating: 2, percentage: 0, isHighlighted: false },
    { rating: 1, percentage: 0, isHighlighted: false },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("location.search:", location.search);
    const params = new URLSearchParams(location.search);
    const idFromUrl = params.get("ListingDetails");
    localStorage.removeItem("last_page");
    // console.log("Product ID from URL:", idFromUrl);

    fetchListingData(idFromUrl);

    // console.log("showModal state changed:", showModal);
  }, [showModal]);

  const fetchListingData = async (idFromUrl) => {
    try {
      // setLoading(true);

      const response = await apiRequestGet(
        ListingApi.getListingDetails(idFromUrl)
      );

      if (response && response.success) {
        setData(response.data.result);
        setWorkingHours(response.data.result.WorkingHour);
        setPermission(response.data.result.ClientContact)
        // console.log("response.data.result", data);
      } else {
        console.error("API Request Failed:", response);
        showToast(response);
      }
    } catch (error) {
      console.error("API Error:", error);
      showToast(error);
    } finally {
      // setLoading(false);
    }

    try {
      // setLoading(true);

      const response1 = await apiRequestGet(
        ListingApi.getListingReview(idFromUrl)
      );

      if (response1 && response1.success) {
        setgetData(response1.data.result.resp);
        // console.log("response.data.result", response1.data.result);
      } else {
        console.error("API Request Failed:", response1);
        showToast(response1);
      }
    } catch (error) {
      console.error("API Error:", error);
      showToast(error);
    } finally {
      // setLoading(false);
    }
  };
  const description = data?.about_us ?? "No description available.";

  const checkStatus = () => {
    if (!workingHours) return "Loading...";
    const now = new Date();
    const currentDay = now.toLocaleString("en-US", { weekday: "long" });
    const currentTime = now.toTimeString().slice(0, 5);
    const todayHours = workingHours.find((day) => day.day === currentDay);
    if (!todayHours) return "Closed";
    const { from_time, to_time } = todayHours;
    return currentTime >= from_time.slice(0, 5) && currentTime < to_time.slice(0, 5) ? "Open Now" : "Closed Now";
  };
  useEffect(() => {
    setStatus(checkStatus());
    const interval = setInterval(() => {
      setStatus(checkStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, [workingHours]);

  const [error, setError] = useState({});

  const handleSubmit = async (idFromUrl) => {
    const AUTHTOKEN = localStorage.getItem("AUTHTOKEN");
    if (!AUTHTOKEN) {
      const response = {
        message: 'Please Login to Continue'
      }
      showToast(response);
      localStorage.setItem("last_page", `ListingDetails?ListingDetails=${idFromUrl}`);
      navigate('/Signin')
      return;
    }


    const payload = {
      ratting: rating,
      review: review,
    };
    // console.log("payload", payload);
    try {
      await review_2.validate({ review }, { abortEarly: false });

      const response = await apiRequestPost(
        ListingApi.ListingReview(idFromUrl),
        payload,
        AUTHTOKEN
      );

      if (response && response.success) {
        showToast(response);
        setRating(0);
        setReview("");
      } else {
        showToast("Failed to post review: " + response.message);
      }
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setError(newErrors);
      // console.error("Error submitting review:", err);
      // showToast("Something went wrong! Please try again.");
    }
  };

  const getBusinessIcon = (businessType) => {
    switch (businessType) {
      case "Title Abstractor":
      case "Title Company":
        return (
          <Detailsicondiv img={county} />
        );
      // case "Title Company":
      //   return (
      //     <Detailsicondiv img={ratingImg} />
      //   );
      case "Real Estate Agent":
      case "Real Estate Attorney":
        return (
          <Detailsicondiv img={ratingImg} />
        );
      // default:
      //   return (
      //     <Detailsicondiv img={ratingImg} />
      //   );
    }
  };

  const convertTo12HourFormat = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const parsedHours = parseInt(hours, 10);
    const ampm = parsedHours >= 12 ? 'PM' : 'AM';
    const twelveHourFormat = parsedHours % 12 || 12;
    return `${twelveHourFormat}:${minutes} ${ampm}`;
  };

  const getBusinessAvailabilityText = (businessType) => {
    switch (businessType) {
      case "Title Abstractor":
      case "Title Company":
        return "Counties Covered";
      case "Real Estate Attorney":
        return "Languages Spoken Bilingual ";
      case "Real Estate Agent":
        return "Available by Appointment";
    }
  };

  const getBusinessIcon2 = (businessType) => {
    switch (businessType) {
      case "Title Abstractor":
        return <Detailsicondiv icon={true} Icondata={FaBriefcase} />;
      case "Title Company":
        return (
          <Detailsicondiv icon={true} Icondata={RiNewspaperLine} />
        );
      case "Real Estate Attorney":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 34 31"
            fill="none"
          >
            <path
              d="M27.2277 17.8238C23.7633 17.8238 20.9554 20.6612 20.9554 24.1619C20.9554 27.6627 23.7633 30.5 27.2277 30.5C30.6921 30.5 33.5 27.6627 33.5 24.1619C33.5 20.6612 30.6921 17.8238 27.2277 17.8238ZM30.0047 23.8919L26.9422 26.3842C26.7596 26.5331 26.5312 26.6138 26.2982 26.6138C26.2594 26.6138 26.2206 26.6115 26.1806 26.6069C25.9077 26.5758 25.6588 26.435 25.4898 26.2158L24.2863 24.665C23.9357 24.2127 24.0145 23.5608 24.4598 23.2065C24.9086 22.8523 25.5515 22.9319 25.9031 23.3819L26.4638 24.1054L28.7156 22.2719C29.1586 21.9108 29.8049 21.9846 30.1612 22.43C30.5174 22.8777 30.4478 23.5319 30.0047 23.8919Z"
              fill="#1079E0"
            />
            <path
              d="M19.2426 24.1631C19.2426 19.7138 22.8247 16.0942 27.2277 16.0942C28.6904 16.0942 30.0584 16.5004 31.2391 17.1973V6.81154C31.2391 4.19231 29.1381 2.06923 26.546 2.06923H24.0796V1.53846C24.0796 0.961539 23.6114 0.5 23.0519 0.5C22.481 0.5 22.0242 0.961539 22.0242 1.53846V2.06923H9.7263V1.53846C9.7263 0.961539 9.26955 0.5 8.69862 0.5C8.12768 0.5 7.67093 0.961539 7.67093 1.53846V2.06923H5.19308C2.60104 2.06923 0.5 4.19231 0.5 6.81154V23.8192C0.5 26.4385 2.60104 28.5615 5.19308 28.5615H20.5421C19.7234 27.2946 19.2426 25.7854 19.2426 24.1631ZM23.2586 11.6854C23.914 11.6854 24.445 12.2219 24.445 12.8842C24.445 13.5465 23.914 14.0831 23.2586 14.0831C22.6031 14.0831 22.0722 13.5465 22.0722 12.8842C22.0722 12.2219 22.6031 11.6854 23.2586 11.6854ZM8.48623 20.615C7.8308 20.615 7.29983 20.0785 7.29983 19.4162C7.29983 18.7538 7.8308 18.2173 8.48623 18.2173C9.14166 18.2173 9.67263 18.7538 9.67263 19.4162C9.67263 20.0785 9.14166 20.615 8.48623 20.615ZM8.48623 14.0831C7.8308 14.0831 7.29983 13.5465 7.29983 12.8842C7.29983 12.2219 7.8308 11.6854 8.48623 11.6854C9.14166 11.6854 9.67263 12.2219 9.67263 12.8842C9.67263 13.5465 9.14166 14.0831 8.48623 14.0831ZM15.873 20.615C15.2175 20.615 14.6866 20.0785 14.6866 19.4162C14.6866 18.7538 15.2175 18.2173 15.873 18.2173C16.5284 18.2173 17.0594 18.7538 17.0594 19.4162C17.0594 20.0785 16.5273 20.615 15.873 20.615ZM15.873 14.0831C15.2175 14.0831 14.6866 13.5465 14.6866 12.8842C14.6866 12.2219 15.2175 11.6854 15.873 11.6854C16.5284 11.6854 17.0594 12.2219 17.0594 12.8842C17.0594 13.5465 16.5273 14.0831 15.873 14.0831Z"
              fill="#1079E0"
            />
          </svg>
        );
      case "Appraisal Company":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 49 49"
            fill="none"
          >
            <path
              d="M38.6017 18.8416V9.40323C38.6017 9.08213 38.3416 8.82258 38.021 8.82258H32.2146C31.8941 8.82258 31.6339 9.08213 31.6339 9.40323V12.5706L25.0547 6.64923C24.9484 6.55342 24.8102 6.5 24.6662 6.5C24.4432 6.5 24.4432 6.5 15.5681 14.4879L6.8584 22.3266C6.73995 22.4329 6.67027 22.5833 6.6662 22.743C6.66214 22.9021 6.72369 23.0559 6.83575 23.1686L8.57769 24.9105C8.79543 25.1271 9.1444 25.1381 9.37433 24.9337L10.7307 23.7283V41.9194C10.7307 42.2405 10.9909 42.5 11.3114 42.5H36.8598V42.4739C36.9498 42.4826 37.038 42.5 37.1292 42.5C38.5814 42.5 39.763 41.319 39.763 39.8668C39.763 39.1636 39.4889 38.5017 38.9913 38.0046L38.6017 37.6145V23.7283L39.9575 24.9337C40.0678 25.0319 40.206 25.0806 40.3436 25.0806C40.4923 25.0806 40.6415 25.0232 40.7541 24.9105L42.4961 23.1686C42.6087 23.0559 42.6703 22.9021 42.6656 22.743C42.6616 22.5839 42.5925 22.4335 42.4734 22.3266L38.6017 18.8416ZM32.7952 9.98387H37.4404V17.7965L32.7952 13.6158V9.98387ZM37.1292 41.3387C36.7355 41.3387 36.3662 41.1854 36.0881 40.9079L31.2937 36.1129L33.3759 34.0307L38.1703 38.8257C38.4484 39.1038 38.6017 39.4737 38.6017 39.8668C38.6017 40.6779 37.9409 41.3387 37.1292 41.3387ZM24.6662 34.371C20.8241 34.371 17.6985 31.2454 17.6985 27.4032C17.6985 23.5611 20.8241 20.4355 24.6662 20.4355C28.5083 20.4355 31.6339 23.5611 31.6339 27.4032C31.6339 31.2454 28.5083 34.371 24.6662 34.371ZM30.8501 32.6662L31.9742 33.7903L31.0533 34.7112L29.9292 33.5871C30.2601 33.3049 30.5679 32.9972 30.8501 32.6662ZM37.4404 36.4532L33.7864 32.7992C33.5687 32.5814 33.1831 32.5814 32.9654 32.7992L32.7952 32.9693L31.5434 31.7174C32.3319 30.4655 32.7952 28.989 32.7952 27.4032C32.7952 22.9206 29.1488 19.2742 24.6662 19.2742C20.1836 19.2742 16.5372 22.9206 16.5372 27.4032C16.5372 31.8858 20.1836 35.5323 24.6662 35.5323C26.2519 35.5323 27.7285 35.0689 28.9804 34.2804L30.2323 35.5323L30.0621 35.7024C29.8351 35.9294 29.8351 36.2964 30.0621 36.5234L34.8774 41.3387H11.892V22.6959L24.6662 11.3414L37.4404 22.6959V36.4532ZM40.3198 23.7022L25.0523 10.1308C24.8323 9.93452 24.5007 9.93452 24.2807 10.1308L9.01259 23.7022L8.09053 22.7801C10.5635 20.5545 22.3692 9.92929 24.6662 7.86219L41.2419 22.7801L40.3198 23.7022Z"
              fill="#1079E0"
            />
            <path
              d="M24.6662 21.5968C21.4645 21.5968 18.8597 24.2015 18.8597 27.4032C18.8597 30.6049 21.4645 33.2097 24.6662 33.2097C27.8678 33.2097 30.4726 30.6049 30.4726 27.4032C30.4726 24.2015 27.8678 21.5968 24.6662 21.5968ZM24.6662 32.0484C22.1049 32.0484 20.021 29.9645 20.021 27.4032C20.021 24.842 22.1049 22.7581 24.6662 22.7581C27.2274 22.7581 29.3113 24.842 29.3113 27.4032C29.3113 29.9645 27.2274 32.0484 24.6662 32.0484Z"
              fill="#1079E0"
            />
            <path
              d="M24.6662 25.6613C24.9861 25.6613 25.2468 25.9214 25.2468 26.2419H26.4081C26.4081 25.4859 25.9209 24.8472 25.2468 24.6068V23.9194H24.0855V24.6068C23.4114 24.8472 22.9242 25.4859 22.9242 26.2419C22.9242 27.2023 23.7058 27.9839 24.6662 27.9839C24.9861 27.9839 25.2468 28.244 25.2468 28.5645C25.2468 28.885 24.9861 29.1452 24.6662 29.1452C24.3462 29.1452 24.0855 28.885 24.0855 28.5645H22.9242C22.9242 29.3205 23.4114 29.9592 24.0855 30.1996V30.8871H25.2468V30.1996C25.9209 29.9592 26.4081 29.3205 26.4081 28.5645C26.4081 27.6041 25.6265 26.8226 24.6662 26.8226C24.3462 26.8226 24.0855 26.5625 24.0855 26.2419C24.0855 25.9214 24.3462 25.6613 24.6662 25.6613Z"
              fill="#1079E0"
            />
          </svg>
        );
      case "Surveyor Company":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 49 49"
            fill="none"
          >
            <path
              d="M18.572 15.1274C18.6893 15.045 18.7407 14.9028 18.6967 14.7681C18.66 14.6333 18.5353 14.536 18.396 14.5435H13.534V12.8219C13.534 12.6422 13.3873 12.5 13.2187 12.5C13.138 12.5 13.0647 12.5299 13.006 12.5898L8.26868 17.1409C8.20268 17.2008 8.16602 17.2906 8.16602 17.3804C8.16602 17.4703 8.20268 17.5526 8.26135 17.62L13.006 22.1636C13.0647 22.2235 13.1453 22.2534 13.226 22.2534C13.27 22.2534 13.314 22.2459 13.3507 22.2235C13.468 22.1711 13.5413 22.0588 13.5413 21.9315V20.2099H14.2673C14.392 20.2099 14.5093 20.1351 14.5533 20.0153C15.4113 18.0242 16.8047 16.325 18.572 15.1274ZM41.0633 31.393L36.326 26.8419C36.194 26.7222 35.996 26.7296 35.8787 26.8569C35.8273 26.9168 35.798 26.9916 35.7907 27.074V28.7881H35.0647C34.94 28.7881 34.8227 28.863 34.7787 28.9827C33.928 30.9738 32.5347 32.6655 30.76 33.8632C30.6427 33.9455 30.5913 34.0877 30.6353 34.2225C30.672 34.3572 30.7967 34.4545 30.936 34.447H35.7907V36.1761C35.7907 36.3034 35.864 36.4232 35.9813 36.4756C36.018 36.4905 36.062 36.5055 36.106 36.498C36.1867 36.498 36.2673 36.4681 36.326 36.4082L41.0633 31.8571C41.1293 31.7972 41.166 31.7074 41.166 31.6176C41.166 31.5352 41.1293 31.4529 41.0633 31.393ZM22.4587 20.8237C21.784 21.5198 21.784 22.6426 22.466 23.3313C22.7887 23.6606 23.2287 23.8478 23.6907 23.8478H24.0353V20.3072H23.6833C23.2213 20.3072 22.7813 20.4943 22.4587 20.8237ZM25.304 28.6908H25.656C26.6167 28.7207 27.416 27.9423 27.438 26.9617C27.4673 25.9811 26.7047 25.1652 25.744 25.1427C25.7147 25.1427 25.678 25.1427 25.6487 25.1427H25.2967V28.6908H25.304ZM34.4267 24.499C34.4267 18.9973 30.056 14.536 24.666 14.536C19.276 14.536 14.9053 18.9973 14.9053 24.499C14.9053 30.0007 19.276 34.462 24.666 34.462C30.056 34.4545 34.4193 30.0007 34.4267 24.499ZM25.6487 23.8478C27.306 23.8104 28.6773 25.1577 28.714 26.8494C28.7507 28.5411 27.4307 29.9409 25.7733 29.9783C25.7293 29.9783 25.6927 29.9783 25.6487 29.9783H25.304V30.8765C25.304 31.2358 25.018 31.5277 24.666 31.5277C24.314 31.5277 24.028 31.2358 24.028 30.8765V29.9783H21.3073C20.9553 29.9783 20.6693 29.6863 20.6693 29.3271C20.6693 28.9678 20.9553 28.6758 21.3073 28.6758H24.028V25.1353H23.676C22.0187 25.1727 20.6473 23.8253 20.6107 22.1336C20.574 20.4419 21.894 19.0422 23.5513 19.0048H23.676H24.028V18.1065C24.028 17.7472 24.314 17.4553 24.666 17.4553C25.018 17.4553 25.304 17.7472 25.304 18.1065V19.0048H28.0247C28.3767 19.0048 28.6627 19.2967 28.6627 19.656C28.6627 20.0153 28.3767 20.3072 28.0247 20.3072H25.304V23.8478H25.6487Z"
              fill="#1079E0"
            />
          </svg>
        );
      case "Real Estate Agent":
        return (
          <Detailsicondiv img={Transaction} />
        );
    }
  };

  const getBusinessAvailabilityText2 = (businessType) => {
    switch (businessType) {
      case "Title Abstractor":
        return "Errors and Omissions";
      case "Real Estate Agent":
        return "Transaction closed";
      case "Title Company":
        return "RON";
      case "Real Estate Attorney":
        return "Available by appointment ";
      case "Appraisal Company":
        return "Appraisal/Month ";
      case "Surveyor Company":
        return "Survey Per Month";
      default:
        return "-";
    }
  };

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} arrow />
  ))(({ theme }) => ({
    '& .MuiTooltip-tooltip': {
      backgroundColor: 'white',
      color: 'black',
      fontSize: '0.7rem !important',
      borderRadius: '5px',
      boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.19), 0px 3px 6px rgba(0, 0, 0, 0.23)',
      border: '1px solid #e0e0e0'
    },
    '& .MuiTooltip-arrow': {
      color: 'white', // Must match tooltip background
      '&:before': {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' // Optional shadow for arrow
      }
    },
  }));

  // const handleCopy = (textToCopy) => {
  //   // alert(textToCopy)
  //   if (navigator.clipboard) {
  //     navigator.clipboard.writeText(textToCopy)
  //       .then(() => {
  //         alert("Text copied to clipboard!");
  //       })
  //       .catch((err) => {
  //         console.error("Failed to copy: ", err);
  //       });
  //   } else {
  //     alert("Clipboard API is not supported in this browser.");
  //   }
  // };


  const Titledata = ({ title, text }) => {
    return (
      <>
        {title &&
          <p className="text-[#454A54] font-medium 2xl:text-xl text-base leading-[28px]">
            {title}
          </p>
        }
        {text &&
          <p className="text-black mt-1 font-semibold 2xl:text-lg text-sm text-wrap">
            {text}
          </p>
        }
      </>
    )
  }

  const Titlewrap = ({ title, text }) => {
    return (
      <>
        {title &&
          <p className="text-center 2xl:text-lg text-base text-[#454A54]">{title}</p>
        }
        {text &&
          <p className="2xl:text-xl text-base  text-center">{text}</p>
        }
      </>
    )
  }

  const filterWrap = () => {
    const fullText = getBusinessAvailabilityText(data?.business_type);
    if (!fullText) return [];

    // Check if we should split by 'by' while preserving it
    if (fullText.includes('by')) {
      const parts = fullText.split('by');
      return [parts[0].trim() + ' by', parts[1].trim()];
    }

    // Default space splitting
    return fullText.split(' ');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="block lg:hidden">
        <TopHeader />
      </div>
      <div className="flex items-center gap-3 mt-3">
        {/* {showModal && <ContactAgentModal onClose={() => setShowModal(false)} />} */}
        {/* Left Arrow */}
        <HiArrowLeft
          className="text-[40px] rounded-xl text-gray-600 cursor-pointer ms-10 border p-2"
          onClick={() => navigate("/Listing")}
        />

        {/* Centered Text with Breadcrumb */}
        <div className="flex flex-col items-center flex-1">
          <p className="text-[22px] font-semibold">{data.business_name}</p>

          {/* Breadcrumb */}
          <p className="text-gray-500 text-[12px] mt-1">
            <span className="text-gray-600">Listing</span>
            <span className="mx-2 text-gray-400"> &gt; </span>
            <span className="text-gray-600">{data.business_name}</span>
          </p>
        </div>
      </div>

      <div className="relative mt-[10px] mx-5 mb-3">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-[15px]"
          style={{
            backgroundImage: data.cover_image
              ? `url(${imgUrl}${data.cover_image})`
              : "",
            height: "250px",
          }}
        ></div>

        {/* Content Container */}
        <div className="relative z-1 mx-auto px-4 max-[425px]:px-0 md:px-8 py-[130px] pb-[30px]  rounded-t-2xl ">
          {/* Agent Profile & Details */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-[32px]">
            {/* Agent Profile */}
            <div className="bg-white p-6 rounded-[30px] shadow-lg xl:col-span-3 2xl:col-span-3 xl:h-[850px]">
              <div className="flex flex-col  xl:block text-center">
                <div className="flex flex-col items-center">
                  {/* Circular Image */}
                  <div className="relative md:h-56 md:w-56 w-48 h-48 aspect-square flex flex-col place-items-center">
                    <img
                      //src={Profile} // Yahan apni image ka path lagayein
                      src={
                        data?.image
                          ? `${imgUrl}${data?.image}`
                          : `${imgUrl}${data?.company_logo}`
                      }
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full border-4 border-white "
                    />

                    {/* Bottom Badge */}
                    {data?.company_logo && data?.image &&
                      <div className="absolute -bottom-5 border border-neutral-300 transform bg-white py-1 px-2.5 rounded-lg shadow-md">
                        <img
                          src={`${imgUrl}${data?.company_logo}`}
                          alt="Logo"
                          className="w-14 h-7 mx-auto rounded-lg"
                        />
                      </div>
                    }
                  </div>
                </div>

                <div className="text-start items-start">
                  {" "}
                  <p className="mt-12 text-[22px] font-bold">
                    {data.business_name}
                  </p>
                  <h2 className="mt-2 text-lg flex gap-[4px] ">
                    {data.first_name} {data.last_name}
                    <span className="">
                      <RiVerifiedBadgeFill
                        size={20}
                        className="text-[#109138]"
                      />
                    </span>
                  </h2>
                  <p
                    className="text-[14px] font-normal rounded-[10px] mt-3 bg-[#F76C5E] text-white py-[4px] px-[10px] w-fit text-center"
                    style={{
                      backgroundColor:
                        data.business_type === "Title Abstractor"
                          ? "#1079E0"
                          : data.business_type === "Title Company"
                            ? "#33BA33"
                            : data.business_type === "Real Estate Agent"
                              ? "#F76C5E"
                              : data.business_type === "Real Estate Attorney"
                                ? "#1E3A5F"
                                : data.business_type === "Appraisal Company"
                                  ? "#E8A317"
                                  : "#6A0572",
                    }}
                  >
                    {data.business_type}
                  </p>
                  <span className=" inline-block text-[#6C6C6C] mt-3 text-sm">
                    {data.short_bio}
                  </span>
                  {/* <div className="flex flex-row place-items-center mt-3 gap-3">
                    <span
                      className="rounded-[10px] text-base font-semibold "
                    // onClick={() => setShowModal(true)}
                    >
                      Contact Abstarctor &nbsp;:
                    </span>
                    <div className="flex flex-row place-items-center gap-5 text-lg">
                      <button className="text-red-500" onClick={() => setContact('email')}><MdEmail /></button>
                      <button className="text-green-600" onClick={() => setContact('phone')}><IoMdCall /></button>
                    </div>
                  </div> */}


                  {showModal && <ParentComponent />}
                  <div className="rounded-lg mt-3 ">
                    <p className=" text-xl font-semibold ">
                      Contact Details
                    </p>
                    <div className="grid grid-cols-3 shadoww border-2 border-[#59a8f7] text-xl mt-2 p-2 w-full rounded-lg  bg-[#F6F7F8] relative">
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">
                              <div className="flex flex-row gap-5 place-items-center">
                                <span className="text-sm">{data?.email}</span>
                                {/* {data?.email &&
                                  <button onClick={() => handleCopy(data?.email)} className="hover:text-blue-600 transition-all duration-300 ease-in"><MdContentCopy /></button>
                                } */}
                              </div>
                            </Typography>
                          </React.Fragment>
                        }
                      >
                        <button className=" w-full justify-center place-items-center py-1 hover:text-blue-600 border-r-2 border-neutral-300 group relative inline-block cursor-pointer" onMouseEnter={() => setContact('email')}>
                          <MdEmail />
                        </button>
                      </HtmlTooltip>
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">
                              <div className="flex flex-row gap-5 place-items-center">
                                <span className="text-sm">+{`${data?.country_code} ${data?.phone}`}</span>
                                {/* {data?.phone &&
                                  <button onClick={() => handleCopy(data?.phone)} className="hover:text-blue-600 transition-all duration-300 ease-in"><MdContentCopy /></button>
                                } */}
                              </div>
                            </Typography>
                          </React.Fragment>
                        }
                      >
                        <button className=" w-full justify-center place-items-center hover:text-blue-600 border-r-2 border-neutral-300 group relative inline-block cursor-pointer" onMouseEnter={() => setContact('phone')}>
                          <IoMdCall />
                        </button>
                      </HtmlTooltip>
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">
                              <div className="flex flex-row gap-5 place-items-center">
                                {data?.website ?
                                  <a href={data?.website} className="w-full flex justify-center text-sm place-items-center text-blue-600 underline" target="_blank">{data?.website?.substring(0, 25)}....</a>
                                  :
                                  <span className="2xl:text-sm text-xs">Website Not Available</span>
                                }
                              </div>
                            </Typography>
                          </React.Fragment>
                        }
                      >
                        <button className=" w-full justify-center place-items-center hover:text-blue-600  group relative inline-block cursor-pointer" onMouseEnter={() => setContact('email')}>
                          <TbWorldWww />
                        </button>
                      </HtmlTooltip>
                      {/* {data.website != null && */}
                      {/* <a href={data?.website} className="w-full flex justify-center place-items-center hover:text-blue-600" target="_blank"><TbWorldWww /></a> */}
                      {/* } */}
                    </div>
                  </div>
                  {/* {contact == 'phone' &&
                    <div className="flex flex-row gap-3 place-items-center mt-2 flex-wrap">
                      <span className="text-sm">Phone No. :</span>
                      <span className="text-sm">{permission?.find(list => list.name == contact) ? '+' + data?.country_code + ' ' + data?.phone : 'Phone No. Not Available'}</span>
                    </div>
                  } */}
                  <div className="flex gap-5 text-white mt-6">
                    <div className="bg-[#1079E0] px-4 py-2 rounded-[9px] flex-1">
                      <p className="text-base">Response time</p>
                      <div className="flex justify-between items-center gap-2">
                        <p className="text-[18px]">1 day</p>
                        <AiOutlineFieldTime className="text-[38px]" />
                      </div>
                    </div>

                    <div className="bg-[#1057A9] px-4 py-2 hidden rounded-[9px] flex-1">
                      <p className="text-[12px]">Response rate</p>
                      <div className="flex justify-between items-center gap-2">
                        <p className="text-[18px]">100%</p>
                        <svg width="45" height="32" viewBox="0 0 45 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.90185 17.1616V29.818C6.90185 30.7642 6.13467 31.5315 5.18841 31.5315C4.24214 31.5315 3.47496 30.7643 3.47496 29.818V20.3405L2.65589 20.8796C2.36557 21.0703 2.03848 21.1615 1.71553 21.1615C1.1583 21.1615 0.612047 20.8905 0.282422 20.3901C-0.237961 19.5995 -0.018797 18.537 0.771867 18.0166L4.24636 15.7301C4.24671 15.7307 4.24699 15.7311 4.24734 15.7316C4.51762 15.5534 4.84043 15.4481 5.18841 15.4481C6.13467 15.4481 6.90185 16.2153 6.90185 17.1616ZM19.7879 20.7498V26.2297C19.7879 29.1529 17.4094 31.5314 14.4862 31.5314C11.563 31.5314 9.18448 29.1529 9.18448 26.2297V20.7498C9.18448 17.8267 11.563 15.4481 14.4862 15.4481C17.4094 15.4481 19.7879 17.8267 19.7879 20.7498ZM16.3611 20.7498C16.3611 19.7158 15.5203 18.875 14.4862 18.875C13.4521 18.875 12.6113 19.7158 12.6113 20.7498V26.2297C12.6113 27.2638 13.4521 28.1046 14.4862 28.1046C15.5203 28.1046 16.3611 27.2638 16.3611 26.2297V20.7498ZM32.674 20.7498V26.2297C32.674 29.1529 30.2955 31.5314 27.3723 31.5314C24.4491 31.5314 22.0706 29.1529 22.0706 26.2297V20.7498C22.0706 17.8267 24.4491 15.4481 27.3723 15.4481C30.2955 15.4481 32.674 17.8267 32.674 20.7498ZM29.2472 20.7498C29.2472 19.7158 28.4064 18.875 27.3723 18.875C26.3382 18.875 25.4974 19.7158 25.4974 20.7498V26.2297C25.4974 27.2638 26.3382 28.1046 27.3723 28.1046C28.4064 28.1046 29.2472 27.2638 29.2472 26.2297V20.7498ZM38.8546 30.4689L44.0559 17.8125C44.4156 16.9374 43.9982 15.9367 43.1222 15.577C42.2479 15.2165 41.2456 15.6356 40.8868 16.5107L35.6855 29.1672C35.3257 30.0423 35.7432 31.0429 36.6191 31.4026C36.8316 31.4904 37.0526 31.5323 37.2692 31.5323C37.9436 31.5323 38.5827 31.1315 38.8546 30.4689ZM38.1677 17.9564C38.1677 18.9027 37.4006 19.6698 36.4543 19.6698C35.508 19.6698 34.7409 18.9027 34.7409 17.9564C34.7409 17.0101 35.508 16.243 36.4543 16.243C37.4006 16.243 38.1677 17.0101 38.1677 17.9564ZM45 29.0234C45 29.9696 44.2329 30.7367 43.2866 30.7367C42.3403 30.7367 41.5732 29.9696 41.5732 29.0234C41.5732 28.0771 42.3403 27.3099 43.2866 27.3099C44.2329 27.31 45 28.0771 45 29.0234ZM28.8771 2.89257C28.2342 2.4939 26.6914 2.63544 25.2256 3.39397C27.0642 6.49257 26.5885 10.4397 25.277 12.4197C26.6528 12.0854 28.2599 11.1725 29.2113 9.61684C30.8184 6.9939 29.9442 3.54824 28.8771 2.89257ZM24.0684 3.94677C22.0756 0.681104 17.7428 -0.296098 16.4185 0.513902C15.0942 1.33677 14.0142 5.61824 16.007 8.8839C17.7556 11.751 21.2913 12.8568 23.027 12.5354L19.4784 6.74964C19.2984 6.4539 19.3884 6.0553 19.697 5.8753C19.9926 5.6825 20.3912 5.78537 20.5841 6.08103L24.1198 11.8539C25.1999 10.4397 25.8171 6.8011 24.0684 3.94677Z" fill="#F7FBFE" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#F9FAFB] p-4 mt-6 rounded-xl shadow-md border">
                    <div className="flex items-start space-x-3">
                      {/* Left Side: Icons with Dotted Line */}
                      <div className="relative flex flex-col items-center">
                        {/* Blue Location Icon */}
                        <svg width="45" height="45" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_26337_49724)">
                            <path d="M11.7583 0.888672C5.27475 0.888672 0 6.16342 0 12.6469C0 17.0729 2.50087 21.1255 6.41775 23.1245L10.2096 28.9702C10.55 29.4949 11.133 29.8117 11.7584 29.8117C12.3839 29.8117 12.9668 29.495 13.3071 28.9702L17.0989 23.1245C21.0156 21.1255 23.5166 17.0729 23.5166 12.6469C23.5164 6.16342 18.2419 0.888672 11.7583 0.888672ZM11.7583 15.8955C9.96688 15.8955 8.5095 14.4382 8.5095 12.6468C8.5095 10.8554 9.96688 9.39817 11.7583 9.39817C13.5495 9.39817 15.0069 10.8555 15.0069 12.6469C15.0069 14.4383 13.5495 15.8955 11.7583 15.8955Z" fill="#6E76E5" />
                            <path d="M32.0094 53.1328C31.0272 53.1328 30.2101 52.3587 30.1664 51.3677C30.1572 51.1575 30.1526 50.9443 30.1526 50.7341V48.9708C30.1526 47.9512 30.9792 47.1247 31.9987 47.1247C33.0182 47.1247 33.8448 47.9513 33.8448 48.9708V50.7341C33.8448 50.8905 33.8483 51.0493 33.8552 51.2056C33.8999 52.2242 33.1104 53.0862 32.0918 53.131C32.0643 53.1322 32.0368 53.1328 32.0094 53.1328ZM31.9987 43.8687C30.9791 43.8687 30.1526 43.0421 30.1526 42.0226V40.2726C30.1527 40.1126 30.1491 39.9507 30.1417 39.7905C30.0953 38.772 30.8834 37.9086 31.9021 37.8623C32.9176 37.8152 33.7839 38.6041 33.8302 39.6227C33.8401 39.8393 33.8449 40.0585 33.8448 40.2738V42.0226C33.8448 43.0422 33.0183 43.8687 31.9987 43.8687ZM29.7793 35.0647C29.1976 35.0647 28.6249 34.7903 28.2658 34.2777C27.8897 33.741 27.4609 33.2368 26.9912 32.7792C26.2608 32.0677 26.2457 30.8988 26.9573 30.1686C27.6688 29.4381 28.8377 29.4232 29.5679 30.1346C30.2023 30.7527 30.7816 31.4338 31.2897 32.159C31.8748 32.994 31.6722 34.1452 30.8372 34.7303C30.5147 34.9561 30.1452 35.0647 29.7793 35.0647ZM22.2351 30.0743C22.1093 30.0743 21.9817 30.0615 21.8536 30.0346C21.2153 29.9006 20.5582 29.8261 19.9001 29.8132C18.8806 29.7932 18.0704 28.9508 18.0902 27.9313C18.1098 26.9242 18.9326 26.1211 19.9352 26.1211C19.9474 26.1211 19.9596 26.1212 19.9718 26.1215C20.8604 26.1388 21.7488 26.2395 22.6126 26.4211C23.6102 26.6307 24.2493 27.6095 24.0398 28.6073C23.8573 29.4771 23.0898 30.0743 22.2351 30.0743Z" fill="#D6D5D8" />
                            <path d="M52.2425 35.9648C45.7589 35.9648 40.4844 41.2396 40.4844 47.7231C40.4844 52.1491 42.9853 56.2017 46.9021 58.2008L50.6939 64.0463C51.0343 64.5711 51.6173 64.8878 52.2426 64.8878C52.868 64.8878 53.451 64.5711 53.7914 64.0463L57.5833 58.2007C61.4999 56.2017 64.0008 52.1491 64.0008 47.7232C64.0008 41.2396 58.726 35.9648 52.2425 35.9648ZM52.2425 50.9718C50.4513 50.9718 48.9939 49.5145 48.9939 47.7231C48.9939 45.9318 50.4513 44.4745 52.2425 44.4745C54.0339 44.4745 55.4913 45.9318 55.4913 47.7231C55.4911 49.5145 54.0339 50.9718 52.2425 50.9718Z" fill="#FF5035" />
                            <path d="M11.7578 0.888672V9.39817C13.5491 9.39817 15.0064 10.8555 15.0064 12.6469C15.0064 14.4383 13.5491 15.8957 11.7578 15.8957V29.8117C12.3833 29.8117 12.9662 29.495 13.3066 28.9702L17.0983 23.1245C21.0151 21.1255 23.5161 17.0729 23.5161 12.6469C23.5159 6.16342 18.2414 0.888672 11.7578 0.888672Z" fill="#4D59C1" />
                            <path d="M52.2422 35.9648V44.4745C54.0334 44.4745 55.4908 45.9318 55.4908 47.7231C55.4908 49.5143 54.0334 50.9717 52.2422 50.9718V64.888C52.8677 64.888 53.4506 64.5712 53.7908 64.0465L57.5827 58.2008C61.4996 56.2017 64.0004 52.1491 64.0004 47.7232C64.0004 41.2396 58.7257 35.9648 52.2422 35.9648Z" fill="#F0204B" />
                            <path d="M32.0078 37.8633V43.8688C33.0246 43.8654 33.8479 43.0405 33.8479 42.0229V40.2743C33.8481 40.0589 33.8432 39.8398 33.8333 39.6232C33.7887 38.6393 32.9783 37.872 32.0078 37.8633Z" fill="#C2C3C9" />
                            <path d="M32.0078 47.127V53.1325C33.0246 53.1291 33.8479 52.3042 33.8479 51.2866V49.5378C33.8481 49.3225 33.8432 49.1033 33.8333 48.8867C33.7887 47.903 32.9783 47.1357 32.0078 47.127Z" fill="#C2C3C9" />
                            <path d="M35.71 61.387C35.245 61.387 34.7796 61.2125 34.4206 60.8622C33.7866 60.2434 33.2079 59.5617 32.7004 58.8357C32.1162 57.9999 32.3201 56.8489 33.1557 56.2648C33.9914 55.6808 35.1426 55.8844 35.7266 56.7202C36.1021 57.2573 36.5304 57.7618 36.9995 58.2197C37.7292 58.9318 37.7435 60.1007 37.0314 60.8303C36.6695 61.2009 36.1899 61.387 35.71 61.387Z" fill="#C2C3C9" />
                            <path d="M44.0502 64.8853C44.0374 64.8853 44.0244 64.8852 44.0116 64.8849C43.1233 64.8667 42.2351 64.7649 41.3714 64.5827C40.3739 64.3721 39.7358 63.3927 39.9464 62.3949C40.1571 61.3974 41.1364 60.7594 42.1342 60.9698C42.7724 61.1045 43.4296 61.1798 44.0876 61.1933C45.1069 61.2142 45.9162 62.0575 45.8953 63.077C45.8746 64.0837 45.0521 64.8853 44.0502 64.8853Z" fill="#C2C3C9" />
                          </g>
                          <defs>
                            <clipPath id="clip0_26337_49724">
                              <rect width="64" height="64" fill="white" transform="translate(0 0.888672)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>

                      {/* Address Info */}
                      <div>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${data.business_address}`} target="blank">
                          <h3 className="font-semibold text-[20px]">
                            Get Direction
                          </h3>
                          <p className="text-gray-500 text-[13px]">
                            {data.business_address}-{data.zip_code}
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Stats & Services */}
            <div className="bg-white p-6 rounded-[30px] shadow-lg xl:col-span-9 2xl:col-span-9">
              {/* <Title text={`Know Your ${data?.business_type}`} /> */}
              <div className="grid grid-cols-4 mb-3 max-[430px]:grid-cols-1 max-[1440px]:grid-cols-4 gap-2 ps-2 py-3 shadoww bg-[#F9FAFB] border-2 border-[#59a8f7] rounded-2xl">
                <div className="flex md:flex-row flex-col place-items-start md:place-items-start gap-2 p-2 w-full border-b-2 md:border-b-0 md:border-r-2 border-neutral-300">
                  <Detailsicondiv img={year} />
                  <div className=" font-semibold space-y-2 w-full">
                    {" "}
                    <div className="">
                      <Titlewrap title={data?.business_type == 'Title' ? 'Established' : 'Years in'} />
                      <Titlewrap title={data?.business_type == 'Company' ? 'Year' : 'Business'} />
                    </div>
                    <p className="2xl:text-xl text-base text-center">{data?.business_type == 'Title Company' ? data.established_year : data.year_experience ?? 0}</p>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col items-center md:items-start gap-2 p-2 w-full border-b-2 md:border-b-0 md:border-r-2 border-neutral-300">
                  {getBusinessIcon(data.business_type)}{" "}
                  <div className=" font-semibold text-[14px] space-y-2">
                    <div className="">
                      <Titlewrap title={filterWrap('by')?.[0]} />
                      <Titlewrap title={filterWrap('by')?.[1]} />
                    </div>
                    {/* <Titlewrap title={getAvailabilityPrefix(data.business_type, 1)} /> */}
                    <p className="2xl:text-xl text-base  text-center">
                      {data?.business_type == 'Real Estate Agent' ?
                        <span>
                          {permission.find(list => list.name == 'appointment') ?
                            'Yes' : 'No'
                          }
                        </span>
                        :
                        <>
                          {data?.listingcounty?.length} +
                        </>
                      }
                    </p>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col items-center md:items-start gap-2 p-2 w-full border-b-2 md:border-b-0 md:border-r-2 border-neutral-300">
                  {getBusinessIcon2(data.business_type)}
                  <div className=" font-semibold text-[14px] space-y-2">
                    <p className="text-center 2xl:text-lg text-base capitalize text-[#454A54]">{getBusinessAvailabilityText2(data.business_type)}</p>
                    <p className="2xl:text-xl text-base  text-center">
                      {data?.business_type == 'Title Abstractor' &&
                        <>
                          {data?.ListingDetail[0]?.e_o_insurance == 1 ? 'Yes' : "No"}
                        </>
                      }
                      {data?.business_type == 'Title Company' &&
                        <>
                          {data?.ListingDetail[0]?.ron === 1 ? 'Yes' : "No"}
                        </>
                      }
                      {data?.business_type == 'Real Estate Agent' &&
                        <span>
                          {data?.ListingDetail[0]?.transaction_per_year}/year
                        </span>
                      }
                      {data?.business_type == 'Real Estate Attorney' &&
                        <>
                          {permission.find(list => list.name == 'appointment') ?
                            'Yes' : 'No'
                          }
                        </>
                      }
                    </p>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col items-center md:items-start gap-2 p-2 w-full">
                  {data.review_platform}
                  <Detailsicondiv img={CustomerSatisfaction} />
                  <div className="font-semibold text-[14px] space-y-2 flex flex-col place-items-center justify-center ">
                    <p className="text-center 2xl:text-lg text-base text-[#454A54]">Customer Satisfaction</p>
                    <div className="flex space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`2xl:text-xl text-sm  text-[var(--primary-color)] }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Offered */}
              <Title text='Service Offered' />
              <div className="flex flex-wrap gap-4 bg-[#F9FAFB]  mb-3 border-2 border-neutral-300 shadowjw rounded-2xl p-4 leading-[28px]">
                {data?.TypeOfService && data.TypeOfService.length > 0 ? (
                  data.TypeOfService.map((service, index) => (
                    <span
                      key={index}
                      className="bg-white text-gray-700 font-medium py-1 px-2 rounded-lg border 2xl:text-base text-sm
                      transition-all duration-300 ease-in-out 
                      border-[var(--primary-color)]"
                    >
                      {service?.name ?? "-"}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-[20px] max-[1440px]:text-[16px]">
                    -
                  </span>
                )}
              </div>

              {!["Real Estate Agent", "Title Abstractor"].includes(
                data.business_type
              ) && (
                  <>
                    <Title text={`Type’s of client served`} />
                    <div className="flex flex-wrap gap-2 bg-[#F9FAFB] border-2 border-neutral-300 rounded-2xl p-[10px] leading-[28px] mb-6">
                      {data?.ClientsDoYouServe?.map((service, index) => (
                        <span
                          key={index}
                          className="bg-white text-gray-700 font-medium  px-[8px] mx-1 my-1 rounded-lg border 2xl:text-lg text-base
                          transition-all duration-300 ease-in-out 
                          border-[var(--primary-color)]"
                        >
                          {service?.name ?? "-"}
                        </span>
                      ))}
                    </div>
                  </>
                )}

              {["Title Company"].includes(data?.business_type) && (
                <>
                  <div>
                    <Title text={`Underwriter Affiliations`} />
                    <div className="flex flex-wrap gap-2 bg-[#F9FAFB] mb-6 border-2 border-neutral-300 rounded-2xl p-[10px] leading-[28px]">
                      {Array.isArray(data?.UnderwriterAffiliation) &&
                        data.UnderwriterAffiliation.length > 0 ? (
                        <div className="flex flex-wrap gap-2 rounded-2xl  leading-[28px]">
                          {data.UnderwriterAffiliation.map((Affiliation, index) => (
                            <span
                              key={index}
                              className="bg-white text-gray-700 font-medium px-[8px] mx-1 my-1 rounded-lg border 2xl:text-lg text-base
                            transition-all duration-300 ease-in-out 
                            border-[var(--primary-color)]"
                            >
                              {Affiliation?.name ?? "-"}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-[12px] p-4">
                          No client types available
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
              {data?.bilingual_services == 1 &&
                <div>
                  <Title text={`Bilingual Service`} />
                  <div className="flex flex-row flex-wrap gap-4 mb-3 border-2 border-neutral-300 p-4 rounded-2xl">
                    {data?.bilingual_service_list.split(",").map((list, i) => (
                      <div className="flex flex-row gap-3 border-[var(--primary-color)] border rounded-lg px-2 py-1 w-fit">
                        <img src={list == 'English' ? islands : list == 'Spanish' ? spain : list == 'Chinise' ? china : list == 'French' ? france : list == 'Russian' && russia} alt="" />
                        <span key={i} className="2xl:text-lg text-sm text-[#454A54] font-medium">{list}</span>
                      </div>
                    ))}
                  </div>
                </div>
              }

              {data?.ListingDetail?.[0]?.specific_neighborhoods &&
                <div className="">
                  <Title text={`Specialize in Neighborhoods`} />
                  <div className="flex flex-wrap gap-2 mb-3 bg-[#F9FAFB] border-2 border-neutral-300 rounded-2xl p-3 leading-[28px]">
                    <p className="2xl:text-lg text-sm text-[#454A54]">
                      {data?.ListingDetail?.[0]?.specific_neighborhoods}
                    </p>
                  </div>
                </div>
              }


              <Title text={`About ${data?.business_type}`} />

              <div className="grid grid-cols-3 mb-3 max-[430px]:grid-cols-1 max-[425px]:p-1 gap-6 bg-[#F9FAFB] border-2 border-neutral-300 rounded-2xl p-3">

                {/* Property Types */}
                {data?.business_type != "Real Estate Attorney" && data?.business_type != "Appraisal Company" && data?.business_type != "Surveyor Company" &&
                  <div className="p-1 md:border-r-2   border-neutral-300">
                    <Titledata title='Specific Property Types' />
                    <Titledata text={data?.PropertyType?.map(item => item.name).join(", ")} />
                  </div>}

                {/* Service Areas */}
                <div className="p-1 md:border-r-2 border-neutral-300">
                  <div>
                    <Titledata title='Served Service Areas' />
                    <div className="flex items-center gap-4 mt-1 relative">
                      {data.listingstate && data.listingstate.length == 64 ? (
                        <Titledata text='NATION WIDE' />
                      ) : ''}

                      <button
                        onClick={() => setShowList(!showList)}
                        className="text-[var(--primary-color)] font-semibold  2xl:text-base text-sm underline rounded-md"
                      > See List
                        {/* See List {console.log("showList", showList)} */}
                      </button>
                      <StateCountiesShow show={showList} close={() => setShowList(!showList)} state={data.listingstate} county={data.listingcounty} />
                      {/* {showList == true && (
                        <div className="absolute top-11 left-0 bg-white shadow-lg rounded-[15px] text-[12px]  w-200">
                          {data.listingstate && data.listingstate.length > 0 ? (
                            <div className="flex">
                              {data.listingstate.map((stateItem) => (
                                <ul>
                                  <li key={stateItem.id} className="p-3 border-b last:border-0  cursor-pointer">
                                    <strong>{stateItem.state.name} : <br /></strong>
                                    {data.listingcounty
                                      .filter((countyItem) => countyItem.county.state_id === stateItem.state.id)
                                      .map((countyItem) => (
                                        <span>{countyItem.county.name}, </span>
                                      ))}
                                  </li>
                                </ul>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 p-2 text-[12px]">
                              No specialization data available
                            </p>
                          )}
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>

                {/* Industry Memberships */}
                <div className="p-1 md:border-0">
                  <Titledata title='Industry Memberships' />
                  <Titledata text={data?.IndustryMembership?.map(item => item.name).join(", ")} />
                </div>

                {/* Certifications */}
                {data?.business_type != "Real Estate Attorney" || data?.business_type != "Appraisal Company" &&
                  <div className="p-1 md:border-r-2 border-neutral-300">
                    <Titledata title={data?.business_type === "Real Estate Agent"
                      ? "License & Certificates"
                      : "Certifications & Specializations"} />
                    {/* <img
                    src="realtor-logo.png"
                    alt="Realtor"
                    className=
                    "h-10 ml-3"
                  /> */}
                    {data?.business_type === "Real Estate Agent" || data?.business_type === "Real Estate Attorney" ?
                      <Titledata text={data?.CertificationSpecialization?.map(item => item.name).join(",")} />
                      :
                      <Titledata text={data?.ListingDetail?.[0]?.certification} />
                    }
                  </div>
                }
                {data?.ListingDetail?.[0]?.price_range &&
                  <div className="p-1 md:border-r-2 border-neutral-300">
                    <Titledata title='Price Range' />
                    <Titledata text={data?.ListingDetail?.[0]?.price_range ?? "-"} />
                  </div>
                }
                {data?.CertificationSpecialization?.length > 0 &&
                  <div className={`p-1 ${data?.ListingDetail?.[0]?.ave_time && 'md:border-r-2 border-neutral-300'}`}>
                    <Titledata title='Certification & Specialization' />
                    <Titledata text={data?.CertificationSpecialization.map(list => list.name).join(", ") ?? "-"} />
                  </div>
                }
                {data?.ListingDetail?.[0]?.ave_time &&
                  <div className={`p-1 ${data?.ListingDetail?.[0]?.transaction_per_month && 'md:border-r-2 border-neutral-300'}`}>
                    <Titledata title='Average Turnaround Time' />
                    <Titledata text={data?.ListingDetail?.[0]?.ave_time ?? "-"} />
                  </div>
                }
                {data?.business_type == 'Title Company' && data?.ListingDetail[0]?.transaction_per_month != null &&
                  <div className="p-1">
                    <Titledata title='Transaction Per Month' />
                    <Titledata text={data?.ListingDetail[0]?.transaction_per_month} />
                  </div>
                }
                {data?.ListingDetail?.[0]?.volume_capacity !== null &&
                  data?.ListingDetail?.[0]?.volume_capacity !== undefined ? (
                  <div className="p-1">
                    <Titledata title='Volume Capacity' />
                    <Titledata text={data.ListingDetail[0].volume_capacity} />
                  </div>
                ) : null}
              </div>

              {/* {Array.isArray(data?.FeeStructure) &&
                data.FeeStructure.length > 0 ? (
                <h3 className="text-[16px] p-4 leading-[36px] font-semibold border-y my-6">
                  Fee Structure:{" "}
                  <span className="text-[24px] text-[#454A54] font-semibold">
                    {data.FeeStructure.map((fee) => fee.name).join(", ")}
                  </span>
                </h3>
              ) : null} */}

              <Title text={`About the Business`} />
              <div className="flex flex-wrap gap-2 mb-3 bg-[#F9FAFB] border-2 border-neutral-300 rounded-2xl p-3 leading-[28px]">
                <p className="2xl:text-lg text-base text-[#454A54]">
                  {expanded
                    ? description
                    : description.slice(0, 150) +
                    (description.length > 150 ? "..." : "")}
                </p>
                {description.length > 150 && (
                  <button
                    className="text-[var(--primary-color)] text-sm border border-[var(--primary-color)] px-[20px] py-[3px] rounded-md"
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>

              <div className="flex flex-row place-items-center">
                <Title text={`Working Hours :`} />
                <button type="button" className="text-white bg-[var(--primary-color)] me-3 aspect-square  rounded-full h-7 w-7 flex justify-center place-items-center"
                  onClick={() => setShowHours(!showHours)}
                > {showHours === true ? "-" : "+"} </button>
                <span className={` font-semibold text-nase ${status === "Open Now" ? "text-green-600" : "text-red-600"}`}
                >{status}</span>
              </div>
              {/* <h3 className="text-[16px] pl-0 p-3 leading-[36px] font-semibold flex gap-3">
                <span>Working Hours : </span>
                <span className={`${status === "Open Now" ? "text-green-600" : "text-red-600"}`}
                >{status}</span>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full px-3 text-center"
                  onClick={() => setShowHours(!showHours)}
                > {showHours === true ? "-" : "+"} </button>
              </h3> */}
              {showHours && (
                <div className="bg-[#F9FAFB] border rounded-2xl p-6 mb-3">
                  <div className="space-y-7">
                    {/* <h1>Monday to Friday</h1> */}
                    {data?.WorkingHour?.map((list, i) => (
                      <div className="flex md:flex-row flex-col md:place-items-center mt-2 gap-3 text-[14px]">
                        <div className="w-1/5">
                          <span>{list.day}</span>
                        </div>
                        {list.from_time != list.to_time &&
                          <>
                            <div className="text-nowrap text-[#6C6C6C] border-[2px] border-[var(--primary-color)] px-[10px] py-[3px] rounded-md bg-white">
                              From{" "}
                              <span className="text font-semibold text-black ms-2">
                                {convertTo12HourFormat(list.from_time)}
                              </span>
                            </div>
                            <div className="text-nowrap text-[#6C6C6C] border-[2px] border-[var(--primary-color)] px-[10px] py-[3px] rounded-md bg-white">
                              To{" "}
                              <span className="text font-semibold text-black ms-2">
                                {convertTo12HourFormat(list.to_time)}
                              </span>
                            </div>
                          </>
                        }
                        {list.from_time == list.to_time &&
                          <div className="mt-1">
                            <span className="text font-semibold text-black mt-4 border-[1px] border-[#D60101] px-[20px] py-[10px] rounded-md">
                              Closed
                            </span>
                          </div>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* <h3 className="text-[16px] pl-0 p-3 leading-[36px] font-semibold">
                Website
              </h3>
              <div className="flex flex-wrap gap-2 bg-[#F9FAFB] border rounded-2xl p-3 leading-[28px]">
                <p className="text-[14px] text-[#454A54]">
                  {data.website != null ? data.website : 'Not Available'}</p>
              </div> */}

              <div className="flex justify-between items-center">
                {" "}
                <Title text={`Reviews`} />
                <div>
                  <button onClick={() => setReviewopen(!reviewOpen)} className="flex justify-center items-center text-[var(--primary-color)] text-[14px] max-[425px]:text-[14px] max-[425px]:px-[15px] max-[425px]:py-[8px]  rounded-md  border border-[var(--primary-color)] px-[20px] py-[5px]">
                    <FaStar className="mr-[4px]" />
                    Write a reivew
                  </button>
                </div>
              </div>
              {reviewOpen &&
                <div className="border rounded-2xl bg-[#F9FAFB] p-3">
                  {/* Star Rating */}
                  <div className="flex space-x-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-[20px] cursor-pointer ${i < rating
                          ? "text-[var(--primary-color)]"
                          : "text-[#C7CAD1]"
                          }`}
                        onClick={() => setRating(i + 1)} // Set rating on click
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-gray-600 text-[12px] max-[425px]:text-[14px]">
                    A few things to consider in your review
                  </p>

                  {/* Tags */}
                  <div className="flex gap-2 mt-2">
                    {["Service Requested", "Quality", "Value"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#F0F5F9] text-[12px] text-[#454A54] px-3 py-1  rounded-lg max-[425px]:text-[12px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Review Input */}
                  <textarea
                    className="w-full mt-3 p-4 border text-[12px] max-[1440px]:text-[12px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Start your review..."
                    rows="4"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  ></textarea>
                  {error?.review && <p className="text-sm text-red-500">{error?.review}</p>}
                  {/* Submit Button */}
                  <button
                    onClick={() => handleSubmit(data.id)}
                    className="mt-3  bg-[var(--primary-color)] text-[12px] max-[1440px]:py-[10px] text-white px-[20px] py-[14px] rounded-lg "
                  >
                    Post Review
                  </button>
                </div>
              }
              {/* Profile Image */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[#F9FAFB] gap-[10px] p-3 border rounded-2xl mt-5">
                {/* Left Section: Profile, Name, Location, Review, Actions */}
                <div>
                  <TotalReviewsCard totalReviews={getdata.total_ratting} />
                </div>

                <div>
                  <Averating rating={getdata.avg_ratting} />
                </div>
                <div>
                  <div className="mt-[5px] xl:w-55 2xl:w-full">
                    {ratings.map((item) => (
                      <RatingBar key={item.rating} {...item} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[auto_250px] bg-[#F9FAFB] gap-10 mt-5 p-3 border rounded-2xl">
                {/* Left Section: Profile, Name, Location, Review, Actions */}
                <div className="">
                  <div className="flex">
                    {" "}
                    <img
                      src={Profile}
                      alt="User"
                      className="w-[50px] h-[50px] rounded-full mr-4"
                    />
                    <div>
                      {" "}
                      <h4 className="font-medium text-[16px]">
                        Henry Scott
                      </h4>
                      <p className="text-gray-500 text-[14px]">
                        Alexandria, VA
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 mt-3 text-[14px] max-[1440px]:text-[14px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, numquam....
                  </p>

                  {/* Actions */}
                  <div className="flex space-x-4 mt-3 font-medium">
                    {/* <button className="text-[12px] ">Like</button> */}
                    {/* <button className="text-[12px]">Reply</button> */}
                  </div>
                </div>

                {/* Right Section: Stars & Date */}
                <div className="text-right">
                  <div className="flex justify-end text-blue-500 text-[20px] ">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="me-[5px]" />
                    ))}
                  </div>
                  <p className="text-gray-500 text-[14px] mt-1">
                    Oct 23, 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
